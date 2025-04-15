import { Server } from "socket.io";

import redis from './util/redis.js';

// import mongoDB  from './util/mongodb';

const chatUsers = [];
const socketUserIDs = [];

Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

const addToChatArray = (uname, rmid, bname) => {
  if (!rmid || rmid === 'undefined') {
      return;
  }
  chatUsers[rmid].users.push(uname);
  chatUsers[rmid].userCount = chatUsers[rmid].userCount + 1;
}

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
});

async function isUserBanned(roomID, username) {
  const key = `ban:${roomID}:${username}`
  return await redis.exists(key)
}

async function banUser(roomID, username, duration = 300) {
  const key = `ban:${roomID}:${username}`
  await redis.set(key, '1', 'EX', duration)
}

async function getOnlineUsers(roomId) {
  return await redis.smembers(`online:${roomId}`)
}

async function userLeave(roomId, username) {
  await redis.srem(`online:${roomId}`, username)
}

  io.on("connection", async (socket) => {

    // console.log(socket, ' is the socket', socket.handshake.query)
    console.log("A user connected:", socket.id, socket.handshake.query.username, socket.handshake.query.roomID, socket.handshake.query.business_name);

    const {username, roomID, business_name} = socket.handshake.query;

    if (!username || !roomID) {
      console.log('Missing username or roomID, disconnecting.')
      return socket.disconnect()
    }

    const banned = await isUserBanned(roomID, username)
    if (banned) {
      console.log(`🚫 ${username} is banned from room ${roomID}`)
      socket.emit('banned', 'You are banned from this room.')
      return socket.disconnect()
    }

    socket.join(socket.handshake.query.roomID);

    // Add user to Redis Online room users list
    await redis.sadd(`online:${roomID}`, `${username}`);

    // Add Socket ID to array for specific messaging
    socketUserIDs[socket.handshake.query.username] = socket.id;

    // Assign username to socket
    socket.username = socket.handshake.query.username;

    // Assign requested room ID
    socket.room = socket.handshake.query.roomID;

    // Assign request room name
    socket.roomName = socket.handshake.query.business_name;

    // Date Joined
    socket.date_joined = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // User socket joins room
    // socket.join(socket.handshake.query.roomID);

    // addToChatArray(socket.handshake.query.username, socket.handshake.query.roomID, socket.handshake.query.business_name)

    // Alert channel that new user joined the room
    io.sockets.in(socket.room).emit('intro', { type: 'SYSTEM', username: socket.username, date: socket.date_joined });
    
    // Get online users list
    const users = await redis.smembers(`online:${roomID}`);
    console.log(users, ' is da users')
    io.sockets.in(socket.room).emit('online-users',  users );
 
  
    socket.on(`room-${socket.handshake.query.roomID}`, (data) => {
      io.emit(`message-${socket.handshake.query.roomID}`, data)
    });

    socket.on(`emoji-${socket.handshake.query.roomID}`, (data) => {
      io.emit(`emoji-${socket.handshake.query.roomID}`, data)
    });

    socket.on('ban_user', async ({ targetUser, duration }) => {
      await banUser(roomID, targetUser, duration || 300)
      io.to(roomID).emit('message', `${targetUser} has been banned.`)
    })

    socket.onAny((event, data) => {
      console.log(`📥 Received event "${event}" with data:`, data);
    });

    socket.on("message", (data) => {
      console.log("Message received:", data);
      io.emit("message", data); // Broadcast message to all clients
    });

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

    socket.on('onLeave', async (data) => { 
      socket.to(socket.room).emit('onExit', { type: 'SYSTEM', username: socket.username, date: socket.date_joined });
    });

    socket.on('disconnect', async (daata) => {
      console.log("User disconnected:", socket.id);
      await redis.srem(`online:${roomID}`, username)
      io.sockets.in(socket.room).emit('online-users', await redis.smembers(`online:${roomID}`));
 
      if (chatUsers[socket.room] !== undefined) {
          chatUsers[socket.room].userCount = chatUsers[socket.room].userCount - 1;
          chatUsers[socket.room].users.remove(socket.username);
          io.sockets.in(socket.room).emit(`users ${socket.room}`, { users: chatUsers[socket.room] });
      }

    });

  });

  return io;
}