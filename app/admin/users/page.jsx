'use client';
import UsersTable from '@/components/Client/Admin/Users/Table';
import { useState } from "react";

export default function AdminUsers() {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@email.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@email.com", role: "Editor", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@email.com", role: "User", status: "Active" },
    { id: 4, name: "David Green", email: "david@email.com", role: "User", status: "Pending" },
  ]);

  // Search state
  const [search, setSearch] = useState("");

  // Handle search filter
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="antialiased">
      <div className="p-4 md:ml-64 h-auto pt-20">
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-black">Users</h1>
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
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{user.name}</td>
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
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
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
        </div>
        {/* <UsersTable /> */}
      </div>
    </div>
  );
}