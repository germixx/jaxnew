'use client'

import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { io } from "socket.io-client";

// import { getSocket } from '@/util/socket';

const ENDPOINT = "https://jacksonvillians.com";

// const slashCommands = [
//     { name: '/kick', description: 'Kick a user from the chat' },
//     { name: '/ban', description: 'Ban a user permanently' },
//     { name: '/assign', description: 'Assign a task to a user' },
//     { name: '/status', description: 'Set a custom status' },
//     { name: '/clear', description: 'Clear the chat history' }
// ];

const mockMessages = [
    {
        id: 1,
        user: 'Chloe',
        content: 'Hey team! **Deployment** was a success 🎉',
        time: '10:12 AM',
    },
    {
        id: 2,
        user: 'Tyler',
        content: 'Can someone check the `analytics.js` file? It’s breaking on line 42.',
        time: '10:13 AM',
    },
    {
        id: 3,
        user: 'Maya',
        content: '@Chloe congrats! Let’s push the new **event module** live.',
        time: '10:14 AM',
    },
    {
        id: 4,
        user: 'Admin',
        content: '/kick Tyler',
        time: '10:15 AM',
    },
    {
        id: 5,
        user: 'Chloe',
        content: 'Wait what 😳 was that real or test?',
        time: '10:16 AM',
    },
    {
        id: 6,
        user: 'Admin',
        content: '`Note:` Use `/ban username` to block permanently.',
        time: '10:17 AM',
    },
    {
        id: 7,
        user: 'Maya',
        content: 'Loving the new dark mode toggle 🔥',
        time: '10:18 AM',
    },
    {
        id: 8,
        user: 'Chloe',
        content: '**FYI:** Docs are now live at [our portal](https://example.com/docs)',
        time: '10:19 AM',
    },
]
export default function AdminChatroomInnerModal(props) {
   
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [toast, setToast] = useState('');
    const [socket, setSocket] = useState(null);
    const [currentUser, setCurrentUser] = useState('');
    const [userData, setUserData] = useState('');
    const chatEndRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    useEffect( () => {
        if(props.user) {
          setCurrentUser(props.user.username);
          setUserData(props.user);
          
        }
        
    }, [props]);

    useEffect(() => {
        setMessages(mockMessages);
        const newSocket = io(ENDPOINT+`?username=${props.user.username}` + "&roomID=" + props.location.room_id + "&business_name="+props.location.locationName+ "&user_role=" + props.user.role, {
            transports: ["websocket"],
        });
        
        newSocket.on(`intro`, (data) => {
            
            console.log(data,' i s intro')
            // newSocket.broadcast.emit(`message-${props.placeData.room_id}`, data)
          });

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket");
        });

        newSocket.on(`online-users`, (data) => {
            console.log(data,'is usersres');
            setUsers(data);
        });

        newSocket.on(`message`, (data) => {
            console.log(data,' is messagez data')
        });

        newSocket.on(`message-${props.location.room_id}`, (data) => {
            console.log("Room Message:", data);
            
            setMessages((prev) => [
              ...prev,
              data
            ]);
        });

        setSocket(newSocket);
        
        return () => {
            newSocket.disconnect();
            setSocket(null);
        };

    }, []);

    // useEffect(() => {
    //     // Client-side only
    //     if (typeof window !== 'undefined') {
    //       const s = getSocket(props.user.username, props.location.room_id);
           

    //     s.on(`message-${props.location.room_id}`, (data) => {
    //         console.log("Room Messagez:", data);
            
    //         setMessages((prev) => [
    //           ...prev,
    //           data
    //         ]);
    //     });

    //       setSocket(s);
    //     }

    // return () => socket.off('chat-message')
    //   }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    }

    // Slash command parser
    const handleSlashCommand = (msg) => {
        
        const parts = msg.trim().split(' ');
        const cmd = parts[0];
        const targetUser = parts[1];
        const duration = parts[2] || 900;

        if (cmd === '/kick') {
            
            socket.emit('kick_user', {targetUser, duration, roomID: props.location.room_id});
            showToast(`User "${targetUser}" has been kicked.`);
            return true;
        }

        if (cmd === '/ban') {
            socket.emit('ban_user', {targetUser, roomID: props.location.room_id });
            showToast(`User "${targetUser}" has been banned.`);
            return true;
        }

        return false;
    }

    const sendMessage = () => {
        const trimmed = newMessage.trim();
        if (!trimmed) return;

        if (trimmed.startsWith('/')) {
            const handled = handleSlashCommand(trimmed)
            if (handled) {
                setNewMessage('');
                return;
            }
        }
        
        socket.emit(`room-${props.location.room_id}`, {
            id: Date.now(),
            user: props.user.username,
            role: props.user.role,
            content: trimmed,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            reactions: []
          });

        setNewMessage('');
        showToast('Message sent!');
    }

    return (
        <div className="h-96 w-full bg-gray-200 rounded-md overflow-hidden p-4 flex flex-col relative">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-black">Chatroom – Admin View</h3>
                <button
                    onClick={() => setShowUsers(!showUsers)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                    {showUsers ? 'Hide Users' : 'Show Users'}
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-white p-3 rounded shadow-sm flex flex-col"
                    >
                        <p className="text-sm font-semibold text-gray-800">
                            {msg.user}{' '}
                            <span className="text-gray-500 text-xs">• {msg.time}</span>
                        </p>
                        <div
                            className="text-sm text-gray-700 mt-1 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                                // __html: msg.content
                                __html: marked(msg.content.replace(/@(\w+)/g, '<span class="text-blue-600 font-semibold">@$1</span>')),
                            }}
                        />
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="mt-3 flex gap-2 items-end">
                <textarea
                    className="flex-1 p-2 text-sm rounded border resize-none focus:outline-none text-black"
                    placeholder="Type a message, use @ to mention or /ban username"
                    rows={2}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                    Send
                </button>
            </div>

            {/* User List */}
            {showUsers && (
                <div className="absolute right-4 top-16 w-64 bg-white border rounded shadow-lg p-4 z-10 space-y-3 overflow-auto max-h-80">
                    <h4 className="font-semibold text-gray-700 mb-2">Users in Chat</h4>
                    {users.map((user, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b pb-2 last:border-none overflow-auto"
                        >
                            <p className="text-sm font-medium text-gray-800">{user.username}</p>
                            <div className="flex gap-1">
                                {user.role === 'admin' ? (
                                    <div>
                                        <button
                                            onClick={() => handleSlashCommand(`/kick ${user.username}`)}
                                            className="text-orange-500 hover:text-orange-700 text-xs"
                                            title="Kick"
                                            disabled
                                        >
                                            <span style={{ opacity: 0.3 }}>🦶</span>
                                        </button>
                                        <button
                                            onClick={() => handleSlashCommand(`/ban ${user.username}`)}
                                            className="text-red-500 hover:text-red-700 text-xs"
                                            title="Ban"
                                            disabled
                                        >
                                            <span style={{ opacity: 0.3, marginLeft: '0.5rem' }}>🚫</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                    <button
                                        onClick={() => handleSlashCommand(`/kick ${user.username}`)}
                                        className="text-orange-500 hover:text-orange-700 text-xs cursor-pointer"
                                        title="Kick"
                                    >
                                    🦶
                                    </button>
                                    <button
                                        onClick={() => handleSlashCommand(`/ban ${user.username}`)}
                                        className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                                        title="Ban"
                                    >
                                    🚫
                                    </button>
                                </div>
                                )}

                                {/* <button
                                    onClick={() => handleSlashCommand(`/kick ${user}`)}
                                    className="text-orange-500 hover:text-orange-700 text-xs cursor-pointer"
                                    title="Kick"
                                >
                                🦶
                                </button>
                                <button
                                    onClick={() => handleSlashCommand(`/ban ${user}`)}
                                    className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                                    title="Ban"
                                >
                                🚫
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className="absolute bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded shadow">
                    {toast}
                </div>
            )}
        </div>
    )
}