'use client';

import * as socketIOClient from "socket.io-client";

// // import { socket } from "../../../../util/socket";
import { io } from "socket.io-client";

import { useEffect, useState, useRef } from "react";
import Picker from '@emoji-mart/react';
// import 'emoji-mart/css/emoji-mart.css'
import data from '@emoji-mart/data';

const ENDPOINT = "https://jacksonvillians.com";

const usersInRoom = [
  { id: 1, name: 'Chloes' },
  { id: 2, name: 'Maya' },
  { id: 3, name: 'Tylers' },
  { id: 4, name: 'Admin' },
  { id: 5, name: 'Chloez' },
  { id: 6, name: 'Mayaz' },
  { id: 7, name: 'Tylerz' },
  { id: 8, name: 'Adminz' },
  { id: 9, name: 'Chloer' },
  { id: 10, name: 'Mayas' },
  { id: 11, name: 'Tyler' },
  { id: 12, name: 'Admins' },
];

const mockMessages = [
  {
    id: 1,
    user: 'Chloe',
    content: 'Morning everyone! ☀️',
    time: '10:01 AM',
    image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
    reactions: [
      { emoji: '🔥', users: ['Chloe'] },
      { emoji: '😂', users: ['Tyler', 'Maya'] }
    ]
  },
  {
    id: 2,
    user: 'Tyler',
    content: 'Working on the dashboard today!',
    time: '10:05 AM',
    image: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
    reactions: []
  },
  {
    id: 4,
    user: 'Admin',
    content: 'Yo wtf is going on kiddos!',
    time: '11:22 AM',
    image: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
    reactions: [
      { emoji: '🔥', users: ['Tyler'] },
      { emoji: '😂', users: ['Chloe', 'Maya'] }
    ]
  },
];

export default function ChatModal(props) {
  
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [showMentions, setShowMentions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerFor, setEmojiPickerFor] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [userData, setUserData] = useState('');
  const chatEndRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  const [cssColors, setCSScolors] = useState(['#F0FFFF', '#FF69B4', '#CD5C5C', '#DAA520', '#4B0082', '#ADD8E6', '#DB7093',
    '#191970', '#C71585', '#48D1CC', '#7CFC00', '#32CD32', '#800000', '#00FA9A', '#FF00FF', '#BA55D3', '#9370DB',
    '#663399', '#F4A460', '#FA8072', '#FFA500', '#4169E1', '#FF0000', '#800080', '#4169E1', '#00FF7F', '#9ACD32', '#EE82EE', '#40E0D0',
    '#D8BFD8', '#FF6347', '#4682B4', '#008080', '#00BFFF', '#FF8C00', '#ADD8E6', '#B0E0E6', '#FF1493', '#F08080', '#0000CD', '#A0522D', '#DC143C'
  ]);

  // Auto-scroll to latest message
  useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect( () => {
    if(props.user) {
      setCurrentUser(props.user.username);
      setUserData(props.user);
    }
    
  }, [props]);

  useEffect( () => {
    // socket = socketIOClient.io(ENDPOINT + "?username=" + (props.user ? props.user.username : '') + "&roomID=" + router.query.id + "&business_name=" + router.query.name, { secure: true })
    // socket = socketIOClient.io(ENDPOINT + "?username=test" , { secure: true })

    if (props.chatIsOpen && !socket) {

      const newSocket = io(ENDPOINT+`?username=${props.user.username}` + "&roomID=" + props.placeData.room_id + "&business_name=" + props.placeData.locationName, {
          transports: ["websocket"],
      });
  
      newSocket.on("connect", () => {
          console.log("Connected to WebSocket");
      });
  
      newSocket.on("message", (data) => {
        console.log("New message:", data);
      });

      newSocket.on(`message-${props.placeData.room_id}`, (data) => {
        // console.log("Room Message:", data);
        setMessages((prev) => [
          ...prev,
          data
        ]);
      });

      newSocket.on(`emoji-${props.placeData.room_id}`, (data) => {        
          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id !== data.msgID) return msg
              const r = msg.reactions.find((r) => r.emoji === data.reactions)
              if (r) {
                if (r.users.includes(data.user)) {
                  r.users = r.users.filter((u) => u !== data.user)
                } else {
                  r.users.push(currentUser)
                }
                return { ...msg, reactions: [...msg.reactions] }
              } else {
                return {
                  ...msg,
                  reactions: [...msg.reactions, { emoji: data.reactions, users: [data.user] }]
                }
              }
            })
        )
      });

      newSocket.on(`intro`, (data) => {
        setMessages(prev => [...prev,  {...data, content: `${data.username} has joined the chat`} ]);
      });

      newSocket.on(`onExit`, (data) => {
        setMessages(prev => [...prev,  {...data, content: `${data.username} has left the chat`} ]);
      });
  
      setSocket(newSocket);
      setIsOpen(props.chatIsOpen);
  
        return () => {
          newSocket.disconnect();
          newSocket.emit('onLeave', {status:true});
          setSocket(null);
        };
    }

  }, [props.chatIsOpen]);

  const closeModal = () => {
    props.disconnectChat();
    document.getElementById('chatModal').style.display = 'none';
  }

  const handleEmojiSelect = (emoji) => {
    console.log(emoji);
  };

  const handleInputChange = (e) => {
    const value = e.target.value
    setNewMessage(value)

    if (value.startsWith('/')) {
      const query = value.slice(1).toLowerCase()
      const matches = slashCommands.filter((cmd) =>
        cmd.name.slice(1).startsWith(query)
      )
      setFilteredCommands(matches)
      setShowSuggestions(matches.length > 0)
    } else {
      setShowSuggestions(false)
    }

    const atMatch = value.match(/@(\w*)$/)
    if (atMatch) {
      const query = atMatch[1].toLowerCase()
      const matches = usersInRoom.filter((u) =>
        u.name.toLowerCase().startsWith(query)
      )
      setMentionSuggestions(matches)
      setShowMentions(matches.length > 0)
    } else {
      setShowMentions(false)
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    socket.emit(`room-${props.placeData.room_id}`, {
      id: Date.now(),
      user: currentUser,
      content: newMessage,
      role: props.user.role,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: []
    });
    setNewMessage('')
    setShowSuggestions(false)
    setShowMentions(false)
  }

  const toggleReaction = (msgId, emoji) => {
    socket.emit(`emoji-${props.placeData.room_id}`, {
      id: Date.now(),
      msgID: msgId,
      user: currentUser,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: emoji
    });

  }

  const addReaction = (msgId, emoji) => {
    setEmojiPickerFor(null)
    toggleReaction(msgId, emoji)
  }

  return (
    <div id="chatModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 hidden" onClick={closeModal}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl h-3/4 flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{props ? props.placeData.locationName : ''}</h2>
          <span className="float-left">Users Chatting: {usersInRoom.length}</span>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl">&times;</button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            msg.type === 'SYSTEM' ? (
              <div key={Date.now()} className="text-red text-center">{msg.content}</div>
            ) : (
              currentUser === msg.user ? (       
                <div className="flex items-start gap-2.5 justify-end" key={msg.id}>
                  <div className="flex flex-col w-full max-w-[480px] leading-1.5 p-4 border-gray-200 bg-blue-500 text-white rounded-s-xl rounded-ee-xl">
                     <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                       <span className="text-sm font-semibold">You</span>
                       <span className="text-sm font-normal">{msg.time}</span>
                     </div>
                     <p className="text-sm font-normal py-2.5">{msg.content}</p>
                     <div className="flex flex-wrap items-center gap-1">
                      {msg.reactions.map((r) => (
                        <button
                          key={r.emoji}
                          onClick={() => toggleReaction(msg.id, r.emoji)}
                          className="text-sm px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-black"
                        >
                          {r.emoji} <span className="text-xs text-gray-600">{r.users.length}</span>
                        </button>
                      ))}
                      <button onClick={() => setEmojiPickerFor(msg.id)} className="text-gray-400 hover:text-gray-600 text-sm">➕</button>
                      {emojiPickerFor === msg.id && (
                        <div className="z-40 absolute">
                          <Picker
                            data={data}
                            onEmojiSelect={(e) => addReaction(msg.id, e.native)}
                            theme="light"
                          />
                        </div>
                      )}
                    </div>
                     
                  </div>
               </div>
               ) : ( 
                  <div key={msg.id} className={`flex items-start gap-2.5 ${msg.user === currentUser ? 'justify-end' : ''}`}>
                  {msg.user !== currentUser && (
                    <img className="w-8 h-8 rounded-full" src={msg.image} alt={msg.user} />
                  )}
                  <div className={`flex flex-col w-full max-w-[480px] leading-1.5 p-4 ${msg.user === currentUser ? 'bg-blue-500 text-white rounded-s-xl rounded-ee-xl' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-e-xl rounded-es-xl'}`}>
                    <div className={`flex items-center space-x-2 rtl:space-x-reverse ${msg.user === currentUser ? 'justify-end' : ''}`}>
                      <span className="text-sm font-semibold">{msg.user === currentUser ? 'You' : msg.user}</span>
                      <span className="text-sm font-normal">{msg.time}</span>
                    </div>
                    <p className="text-sm font-normal py-2.5">{msg.content}</p>
                    <div className="flex flex-wrap items-center gap-1">
                      {msg.reactions.map((r) => (
                        
                        <button
                          key={r.emoji}
                          onClick={() => toggleReaction(msg.id, r.emoji)}
                          className="text-sm px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-black"
                        >
                          {r.emoji} <span className="text-xs text-gray-600">{r.users.length}</span>
                        </button>
                      ))}
                      <button onClick={() => setEmojiPickerFor(msg.id)} className="text-gray-400 hover:text-gray-600 text-sm">➕</button>
                      {emojiPickerFor === msg.id && (
                        <div className="z-40 absolute">
                          <Picker
                            data={data}
                            onEmojiSelect={(e) => addReaction(msg.id, e.native)}
                            theme="light"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                )
            )

          ))
          }
          <div ref={chatEndRef} />

        </div>

        <div className="p-4 border-t dark:border-gray-600 relative">
          <div className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="absolute top-1/2 -translate-y-1/2 right-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send</button>
          </div>

          {showSuggestions && (
            <ul className="absolute bottom-16 left-0 bg-white border w-64 shadow-md rounded z-20">
              {filteredCommands.map((cmd) => (
                <li
                  key={cmd.name}
                  onClick={() => {
                    setNewMessage(cmd.name + ' ')
                    setShowSuggestions(false)
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  <span className="text-blue-600 font-mono">{cmd.name}</span>
                  <span className="ml-2 text-gray-500">{cmd.description}</span>
                </li>
              ))}
            </ul>
          )}

          {showMentions && (
            <ul className="absolute bottom-16 left-0 bg-white border w-64 shadow-md rounded z-30">
              {mentionSuggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    const updated = newMessage.replace(/@(\w*)$/, `@${user.name} `)
                    setNewMessage(updated)
                    setShowMentions(false)
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  <span className="text-blue-600 font-semibold">@{user.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
 