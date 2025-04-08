'use client'

import { useState } from 'react'

export default function AdminChatroomInnerModal() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Chloe', role: 'member' },
        { id: 2, name: 'Tyler', role: 'moderator' },
        { id: 3, name: 'Maya', role: 'member' },
    ])

    const [messages, setMessages] = useState([
        {
            id: 101,
            user: 'Chloe',
            content: 'This event was amazing! 🎉',
            time: '10:02 AM',
        },
        {
            id: 102,
            user: 'Tyler',
            content: 'Make sure to follow the rules, folks.',
            time: '10:05 AM',
        },
        {
            id: 103,
            user: 'Maya',
            content: 'Where can I find the schedule?',
            time: '10:07 AM',
        },
    ])

    const [toast, setToast] = useState('')
    const [showUsers, setShowUsers] = useState(false)
    const [newMessage, setNewMessage] = useState('')

    const showToast = (msg) => {
        setToast(msg)
        setTimeout(() => setToast(''), 3000)
    }

    const banUser = (id) => {
        const banned = users.find((u) => u.id === id)
        setUsers(users.filter((u) => u.id !== id))
        showToast(`User "${banned.name}" has been banned.`)
    }

    const kickUser = (id) => {
        const kicked = users.find((u) => u.id === id)
        setUsers(users.filter((u) => u.id !== id))
        showToast(`User "${kicked.name}" has been kicked.`)
    }

    const deleteMessage = (id) => {
        setMessages(messages.filter((m) => m.id !== id))
        showToast(`Message deleted.`)
    }

    const sendMessage = () => {
        if (!newMessage.trim()) return
        const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })

        setMessages([
            ...messages,
            {
                id: Date.now(),
                user: 'Admin',
                content: newMessage.trim(),
                time: timestamp,
            },
        ])
        setNewMessage('')
        showToast('Message sent!')
    }

    return (
        <div className="h-96 w-full bg-gray-200 rounded-md overflow-hidden p-4 flex flex-col relative">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Chatroom – Admin View</h3>
                <button
                    onClick={() => setShowUsers(!showUsers)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                    {showUsers ? 'Hide Users' : 'Show Users'}
                </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-white p-3 rounded shadow-sm flex justify-between items-start"
                    >
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {msg.user} <span className="text-gray-500 text-xs">• {msg.time}</span>
                            </p>
                            <p className="text-sm text-gray-700">{msg.content}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => deleteMessage(msg.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                🗑️
                            </button>
                            <button className="text-yellow-500 hover:text-yellow-700 text-sm" title="Pin (placeholder)">
                                📌
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="mt-3 flex gap-2 items-end">
                <textarea
                    className="flex-1 p-2 text-sm rounded border resize-none focus:outline-none"
                    placeholder="Type your message..."
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

            {/* Users Panel */}
            {showUsers && (
                <div className="absolute right-4 top-16 w-64 bg-white border rounded shadow-lg p-4 z-10 space-y-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Users in Chat</h4>
                    {users.length === 0 && (
                        <p className="text-sm text-gray-400">No users currently in chat.</p>
                    )}
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center border-b pb-2 last:border-none"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => kickUser(user.id)}
                                    className="text-orange-500 hover:text-orange-700 text-xs"
                                    title="Kick"
                                >
                                    🦶
                                </button>
                                <button
                                    onClick={() => banUser(user.id)}
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