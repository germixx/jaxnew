'use client';

import { useState, useEffect  } from "react";

import EditUserModal from './EditUserModal';

const UsersTable = ({ users }) => {
    console.log(users,' is aksjd')
  // Search state
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Handle search filter
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const showEditModal = () => {

  }
  console.log(currentUser, ' current')
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
           
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Users</h1>
            <input
            type="text"
            placeholder="Search users..."
            className="border px-3 py-2 rounded-lg w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border bg-white">
            <thead>
                <tr className="bg-gray-200 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                    <span
                        className={`px-2 py-1 rounded text-xs ${
                        user.status === "Active" ? "bg-green-200 text-green-800" :
                        user.status === "Inactive" ? "bg-gray-300 text-gray-700" :
                        "bg-yellow-200 text-yellow-800"
                        }`}
                    >
                        {user.verified === 0 ? ('false') : ('true')}
                    </span>
                    </td>
                    <td className="p-3">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600" onClick={() => {setCurrentUser(user)}}>Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Pagination (Static for now) */}
            <div className="flex justify-between mt-4">
                <button className="bg-gray-300 px-4 py-2 rounded">← Previous</button>
                <button className="bg-gray-300 px-4 py-2 rounded">Next →</button>
            </div>
        </div>
        
        {currentUser && (
            <EditUserModal 
                user={currentUser} 
                onClose={() => setCurrentUser(null)}    
            />
        )}
  </div>
  )
}

export default UsersTable;

