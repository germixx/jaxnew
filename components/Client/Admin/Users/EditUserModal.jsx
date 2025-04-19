import { useState } from "react";

const tabs = ["Details", "MAP", "Activity"];

export default function EditUserModal({ onClose, user }) {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    fullName: user.fullName || '',
    role: user.role || 'viewer',
    emlMarketing: user.emlMarketing || false,
    deleted: user.deleted || false,
    verified: user.verified || false,
    banned: user.banned || false,
  });

  const [activeTab, setActiveTab] = useState("Details");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    onClose();
  };

  console.log(user, ' is da user')

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB: Details */}
        {activeTab === "Details" && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">User</option>
                  
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm">Profile Image</label><br />
                <img
                  src={user.profileImage || "/placeholder.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Signed Up</label><br />
                <p className="text-gray-600">{new Date(user.timeSignedUp).toLocaleString()}</p>
              </div>

              <div className="col-span-2 grid grid-cols-4 gap-4 mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="emlMarketing"
                    checked={formData.emlMarketing}
                    onChange={handleChange}
                  />
                  <span>Email Marketing</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleChange}
                  />
                  <span>Verified</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="deleted"
                    checked={formData.deleted}
                    onChange={handleChange}
                  />
                  <span>Deleted</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="banned"
                    checked={formData.banned}
                    onChange={handleChange}
                  />
                  <span>Banned</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* TAB: MAP */}
        {activeTab === "MAP" && (
          <div className="text-center text-gray-600">
            <p className="mb-4">Location or geodata will display here.</p>
            {/* Placeholder or actual embedded map here */}
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <span>🗺️ Map view coming soon</span>
            </div>
          </div>
        )}

        {/* TAB: Activity */}
        {activeTab === "Activity" && (
          <div className="text-sm text-gray-700">
            <p>No recent activity found.</p>
          </div>
        )}
      </div>
    </div>
  );
}