import { Server } from "socket.io";

import redis from './util/redis.js';

// import mongoDB  from './util/mongodb';

const chatUsers = [];
const socketUserIDs = [];

// Array.prototype.remove = function () {
//   var what, a = arguments, L = a.length, ax;
//   while (L && this.length) {
//       what = a[--L];
//       while ((ax = this.indexOf(what)) !== -1) {
//           this.splice(ax, 1);
//       }
//   }
//   return this;
// };

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
});

async function isUserBanned(roomID, username) {
  const key = `ban:${roomID}:${username}`;
  return await redis.exists(key);
}

async function banUser(roomID, username, duration = 999999999) {
  const key = `ban:${roomID}:${username}`;
  await redis.set(key, '1', 'EX', duration);
}

async function getUserSocketFromRedisDB (roomID, username) {
    return await redis.get(`user_socket:${roomID}:${username}`);
}

async function isUserKicked(roomID, username) {
  const key = `kick:${roomID}:${username}`;
  return await redis.exists(key);
}

async function kickUser(roomID, username, duration = 300) {
  const key = `kick:${roomID}:${username}`;
  await redis.set(key, 'true', 'EX', duration);
}

async function getOnlineUsers(roomId) {
  return await redis.smembers(`online:${roomId}`);
}

async function userLeave(roomId, username) {
  await redis.srem(`online:${roomId}`, username);
}

async function addUserToRoom(roomID, username, metadata = {}) { 

  //Add to set
  await redis.sadd(`online:${roomID}`, `${username}`);

  // Set Hash for metadata
  if (metadata && Object.keys(metadata).length > 0) {
    await redis.hset(`online_user:${roomID}:${username}`, metadata);
  }

}  

async function getOnlineUsersWithMetadata(roomID) {
  const usernames = await redis.smembers(`online:${roomID}`);

  const users = await Promise.all(
    usernames.map(async (username) => {
      const metadata = await redis.hgetall(`online_user:${roomID}:${username}`);
      return {
        username,
        ...metadata
      };
    })
  );

  return users;
}

io.on("connection", async (socket) => {
    console.log("A user connected:", socket.id, socket.handshake.query.username, socket.handshake.query.roomID, socket.handshake.query.business_name);

    const {username, roomID, business_name, user_role} = socket.handshake.query;

    // check is parameters are set
    if (!username || !roomID) {
      console.log('Missing username or roomID, disconnecting.');
      return socket.disconnect();
    }

    // Check if user is banned
    const banned = await isUserBanned(roomID, username);
    if (banned) {
      console.log(`🚫 ${username} is banned from room ${roomID}`);
      socket.emit('join-denied', {type:'ban', message: 'You have been banned from this room'});
      return socket.disconnect();
    }

    const kicked = await isUserKicked(roomID, username);
    if(kicked) {
      console.log(`🚫 ${username} is kicked from room ${roomID}`);
      socket.emit('join-denied', {type:'kick', message: 'You have been kicked from this room'});
      return socket.disconnect();
    }

    const isUsers = await redis.smembers(`online:${roomID}`);
    let res = isUsers.includes(username);
    if(res) {
      socket.emit(`already-in-chat`, 'already in chat')
      return socket.disconnect();
    }

    const userSocketKey = `user_socket:${roomID}:${username}`;
    const existingSocketId = await redis.get(userSocketKey);

      // Kick old socket if needed
    if (existingSocketId && existingSocketId !== socket.id) {
      const oldSocket = io.sockets.sockets.get(existingSocketId);
      if (oldSocket) oldSocket.disconnect(true);
    }

     // Save socket -> user info
    await redis.set(userSocketKey, socket.id);
    await redis.hset(`socket:${socket.id}`, {
      username,
      roomID
    });

    // Joins room by ID
    socket.join(roomID);

    // Add user to Redis Online room users list
    // await redis.sadd(`online:${roomID}`, `${username}`);
    await addUserToRoom(roomID, username, {role: user_role});
  
    // Save for local memory use
    socket.data.username = username;
    socket.data.roomID = roomID;
    socket.data.business_name = business_name;
    socket.data.user_role = user_role;
    socket.date_joined = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Alert channel that new user joined the room
    io.sockets.in(roomID).emit('intro', { type: 'SYSTEM', username: socket.data.username, date: socket.date_joined });
    
    // Get online users list
    // const users = await redis.smembers(`online:${roomID}`);
    const users = await getOnlineUsersWithMetadata(roomID);
    io.sockets.in(roomID).emit('online-users',  users );
    
    socket.on(`room-${socket.handshake.query.roomID}`, (data) => {
      io.emit(`message-${socket.handshake.query.roomID}`, data)
    });

    socket.on(`emoji-${socket.handshake.query.roomID}`, (data) => {
      io.emit(`emoji-${socket.handshake.query.roomID}`, data)
    });

    socket.on('kick_user', async ({ targetUser, duration, roomID }) => {      
      let targetSocketID = await getUserSocketFromRedisDB(roomID, targetUser);
      let targetID = await io.sockets.sockets.get(targetSocketID);
      if (targetID) {
        targetID.emit('join-denied', {type:'kick', message: 'You have been kicked from this room'});
        targetID.disconnect(true);
      }
      await kickUser(roomID, targetUser, duration);
      io.to(roomID).emit('message', `${targetUser} has been kicked.`)
    });

    socket.on('ban_user', async ({ targetUser, duration }) => {
      let targetSocketID = await getUserSocketFromRedisDB(roomID, targetUser);
      let targetID = await io.sockets.sockets.get(targetSocketID);
      if (targetID) {
        targetID.emit('join-denied', {type:'ban', message: 'You have been banned from this room'});
        targetID.disconnect(true);
      }
      await banUser(roomID, targetUser)
      io.to(roomID).emit('message', `${targetUser} has been banned.`)
    });

    socket.onAny((event, data) => {
      console.log(`📥 Received event "${event}" with data:`, data);
    });

    socket.on("message", (data) => {
      console.log("Message received:", data);
      io.emit("message", data); // Broadcast message to all clients
    });

    socket.on('onLeave', async (data) => { 
      socket.to(socket.room).emit('onExit', { type: 'SYSTEM', username: socket.data.username, date: socket.data.date_joined });
    });

    socket.on('disconnect', async (daata) => {

      const { username, roomID } = await redis.hgetall(`socket:${socket.id}`);
      if (!username || !roomID) return;

      const userSocketKey = `user_socket:${roomID}:${username}`;
      const savedSocketId = await redis.get(userSocketKey);

      if (savedSocketId === socket.id) {
        await redis.del(userSocketKey);
        await redis.srem(`online:${roomID}`, username);
        await redis.del(`socket:${socket.id}`);
        await redis.del(`online_user:${roomID}:${username}`);
    
        // const users = await redis.smembers(`online:${roomID}`);
        const users = await getOnlineUsersWithMetadata(roomID);
        io.to(roomID).emit('online-users', users);
      }

      console.log("User disconnected:", socket.id);

    });

  });

  return io;
}





  //   socket.on('message-received', (e) => {
  //     console.log(e , ' is message recieves')
  //     // Import Chatroom mongo model, pass room ID to model
  //     let Chatroom = require('./models/Chatroom')(e.room_id);

  //     // Pass message to room
  //     io.sockets.in(socket.handshake.query.roomID).emit('room-listen', {
  //         "type": e.type,
  //         "id": e.id,
  //         "username": e.username,
  //         "date": new Date().toISOString().slice(0, 19).replace('T', ' '),
  //         "message": e.message
  //     });

  //     // Prepare message 
  //     let addMsg = new Chatroom({ business_name: e.business_name, username: e.username, message: e.message, time_sent: Date.now() });

  //     // Save message to Database
  //     addMsg.save((error) => {
  //         if (error) {
  //             return console.log(`error has occurred: ${error}`);
  //         }
  //         // console.log('Document is successfully saved.');
  //     });

  // });