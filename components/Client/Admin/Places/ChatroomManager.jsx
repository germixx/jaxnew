'use client'

import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { marked } from 'marked';

const slashCommands = [
    { name: '/kick', description: 'Kick a user from the chat' },
    { name: '/ban', description: 'Ban a user permanently' },
    { name: '/assign', description: 'Assign a task to a user' },
    { name: '/status', description: 'Set a custom status' },
    { name: '/clear', description: 'Clear the chat history' }
];

const socket = io('http://localhost:3001') // Replace with your server
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
export default function AdminChatroomInnerModal() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Chloe' },
        { id: 2, name: 'Maya' },
        { id: 3, name: 'Tyler' },
        { id: 4, name: 'Admin' },
        { id: 5, name: 'Chloe' },
        { id: 6, name: 'Maya' },
        { id: 7, name: 'Tyler' },
        { id: 8, name: 'Admin' },
        { id: 9, name: 'Chloe' },
        { id: 10, name: 'Maya' },
        { id: 11, name: 'Tyler' },
        { id: 12, name: 'Admin' },
    ])

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [showUsers, setShowUsers] = useState(false)
    const [toast, setToast] = useState('')
    const chatEndRef = useRef(null)

    // Auto-scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        setMessages(mockMessages)
    }, [])

    // Listen for messages from socket
    useEffect(() => {
        socket.on('chat-message', (data) => {
            setMessages((prev) => [...prev, data])
        })
        return () => socket.off('chat-message')
    }, [])

    const showToast = (msg) => {
        setToast(msg)
        setTimeout(() => setToast(''), 3000)
    }

    // Slash command parser
    const handleSlashCommand = (msg) => {
        const parts = msg.trim().split(' ')
        const cmd = parts[0]
        const target = parts[1]

        if (cmd === '/kick') {
            setUsers((prev) => prev.filter((u) => u.name !== target))
            showToast(`User "${target}" has been kicked.`)
            return true
        }

        if (cmd === '/ban') {
            setUsers((prev) => prev.filter((u) => u.name !== target))
            showToast(`User "${target}" has been banned.`)
            return true
        }

        return false
    }

    const sendMessage = () => {
        const trimmed = newMessage.trim()
        if (!trimmed) return

        if (trimmed.startsWith('/')) {
            const handled = handleSlashCommand(trimmed)
            if (handled) {
                setNewMessage('')
                return
            }
        }

        const messageData = {
            id: Date.now(),
            user: 'Admin',
            content: trimmed,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }

        socket.emit('chat-message', messageData)
        setMessages((prev) => [...prev, messageData])
        setNewMessage('')
        showToast('Message sent!')
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
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center border-b pb-2 last:border-none overflow-auto"
                        >
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleSlashCommand(`/kick ${user.name}`)}
                                    className="text-orange-500 hover:text-orange-700 text-xs"
                                    title="Kick"
                                >
                                    🦶
                                </button>
                                <button
                                    onClick={() => handleSlashCommand(`/ban ${user.name}`)}
                                    className="text-red-500 hover:text-red-700 text-xs"
                                    title="Ban"
                                >
                                    🚫
                                </button>
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


// import { useState } from 'react'
// import { Picker } from 'emoji-mart'
// // import 'emoji-mart/css/emoji-mart.css'

// const slashCommands = [
//     { name: '/kick', description: 'Kick a user from the chat' },
//     { name: '/ban', description: 'Ban a user permanently' },
//     { name: '/assign', description: 'Assign a task to a user' },
//     { name: '/status', description: 'Set a custom status' },
//     { name: '/clear', description: 'Clear the chat history' }
// ]

// const usersInRoom = [
//     { id: 1, name: 'Chloe' },
//     { id: 2, name: 'Maya' },
//     { id: 3, name: 'Tyler' },
//     { id: 4, name: 'Admin' }
// ]

// const currentUser = 'Admin'

// const mockMessages = [
//     {
//         id: 1,
//         user: 'Chloe',
//         content: 'Morning everyone! ☀️',
//         time: '10:01 AM',
//         reactions: [
//             { emoji: '🔥', users: ['Maya'] },
//             { emoji: '😂', users: ['Admin', 'Maya'] }
//         ]
//     },
//     {
//         id: 2,
//         user: 'Tyler',
//         content: 'Working on the dashboard today!',
//         time: '10:05 AM',
//         reactions: []
//     }
// ]

// export default function AdminChatroomInner() {
//     const [newMessage, setNewMessage] = useState('')
//     const [messages, setMessages] = useState(mockMessages)
//     const [showSuggestions, setShowSuggestions] = useState(false)
//     const [filteredCommands, setFilteredCommands] = useState([])
//     const [mentionSuggestions, setMentionSuggestions] = useState([])
//     const [showMentions, setShowMentions] = useState(false)
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false)
//     const [emojiPickerFor, setEmojiPickerFor] = useState(null)

//     const handleInputChange = (e) => {
//         const value = e.target.value
//         setNewMessage(value)

//         if (value.startsWith('/')) {
//             const query = value.slice(1).toLowerCase()
//             const matches = slashCommands.filter((cmd) =>
//                 cmd.name.slice(1).startsWith(query)
//             )
//             setFilteredCommands(matches)
//             setShowSuggestions(matches.length > 0)
//         } else {
//             setShowSuggestions(false)
//         }

//         const atMatch = value.match(/@(\w*)$/)
//         if (atMatch) {
//             const query = atMatch[1].toLowerCase()
//             const matches = usersInRoom.filter((u) =>
//                 u.name.toLowerCase().startsWith(query)
//             )
//             setMentionSuggestions(matches)
//             setShowMentions(matches.length > 0)
//         } else {
//             setShowMentions(false)
//         }
//     }

//     const sendMessage = () => {
//         if (!newMessage.trim()) return
//         setMessages((prev) => [
//             ...prev,
//             {
//                 id: Date.now(),
//                 user: currentUser,
//                 content: newMessage,
//                 time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//                 reactions: []
//             }
//         ])
//         setNewMessage('')
//         setShowSuggestions(false)
//         setShowMentions(false)
//     }

//     const toggleReaction = (msgId, emoji) => {
//         setMessages((prev) =>
//             prev.map((msg) => {
//                 if (msg.id !== msgId) return msg
//                 const r = msg.reactions.find((r) => r.emoji === emoji)
//                 if (r) {
//                     if (r.users.includes(currentUser)) {
//                         r.users = r.users.filter((u) => u !== currentUser)
//                     } else {
//                         r.users.push(currentUser)
//                     }
//                     return { ...msg, reactions: [...msg.reactions] }
//                 } else {
//                     return {
//                         ...msg,
//                         reactions: [...msg.reactions, { emoji, users: [currentUser] }]
//                     }
//                 }
//             })
//         )
//     }

//     const addReaction = (msgId, emoji) => {
//         setEmojiPickerFor(null)
//         toggleReaction(msgId, emoji)
//     }

//     return (
//         <div className="space-y-4">
//             {/* USERS LIST */}
//             <div className="flex flex-wrap gap-2 text-sm">
//                 {usersInRoom.map((user) => (
//                     <div key={user.id} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
//                         {user.name}
//                         <button className="text-xs text-red-500 ml-1">Ban</button>
//                         <button className="text-xs text-yellow-500">Kick</button>
//                     </div>
//                 ))}
//             </div>

//             {/* CHAT MESSAGES */}
//             <div className="bg-gray-100 p-3 rounded-md h-72 overflow-y-auto space-y-3">
//                 {messages.map((msg) => (
//                     <div key={msg.id} className="relative">
//                         <div className="text-sm">
//                             <strong>{msg.user}</strong>: {msg.content}
//                             <div className="text-xs text-gray-500">{msg.time}</div>
//                         </div>
//                         <div className="flex items-center gap-2 mt-1">
//                             {msg.reactions.map((r) => (
//                                 <button
//                                     key={r.emoji}
//                                     onClick={() => toggleReaction(msg.id, r.emoji)}
//                                     className="text-sm px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
//                                 >
//                                     {r.emoji} <span className="text-xs text-gray-600">{r.users.length}</span>
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={() => setEmojiPickerFor(msg.id)}
//                                 className="text-gray-400 hover:text-gray-600 text-sm"
//                             >
//                                 ➕
//                             </button>
//                             {emojiPickerFor === msg.id && (
//                                 <div className="absolute z-40">
//                                     <Picker onSelect={(e) => addReaction(msg.id, e.native)} theme="light" />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* TEXTAREA + AUTOCOMPLETE */}
//             <div className="relative w-full">
//                 <textarea
//                     className="w-full p-2 text-sm rounded border resize-none focus:outline-none"
//                     placeholder="Type a message, or / for commands"
//                     rows={2}
//                     value={newMessage}
//                     onChange={handleInputChange}
//                 />
//                 <button
//                     onClick={sendMessage}
//                     className="absolute bottom-2 right-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
//                 >
//                     Send
//                 </button>

//                 {showSuggestions && (
//                     <ul className="absolute bottom-14 left-0 bg-white border w-64 shadow-md rounded z-20">
//                         {filteredCommands.map((cmd) => (
//                             <li
//                                 key={cmd.name}
//                                 onClick={() => {
//                                     setNewMessage(cmd.name + ' ')
//                                     setShowSuggestions(false)
//                                 }}
//                                 className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
//                             >
//                                 <span className="text-blue-600 font-mono">{cmd.name}</span>
//                                 <span className="ml-2 text-gray-500">{cmd.description}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 )}

//                 {showMentions && (
//                     <ul className="absolute bottom-14 left-0 bg-white border w-64 shadow-md rounded z-30">
//                         {mentionSuggestions.map((user) => (
//                             <li
//                                 key={user.id}
//                                 onClick={() => {
//                                     const updated = newMessage.replace(/@(\w*)$/, `@${user.name} `)
//                                     setNewMessage(updated)
//                                     setShowMentions(false)
//                                 }}
//                                 className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
//                             >
//                                 <span className="text-blue-600 font-semibold">@{user.name}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     )
// }
