'use client';

import { useState } from "react";

export default function AdminSettings() {
  // Settings state
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    enable2FA: false,
    siteMaintenance: false,
    defaultLanguage: "English",
  });

  // Toggle settings
  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (    
    <div className="antialiased">
      <div className="p-4 md:ml-64 h-auto pt-20">
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-4">Settings</h1>

            {/* Settings List */}
            <div className="space-y-4">
              {/* Dark Mode */}
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span>Dark Mode</span>
                <button 
                  onClick={() => handleToggle("darkMode")}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.darkMode ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-[0.15rem] w-5 h-5 bg-white rounded-full transition ${
                      settings.darkMode ? "right-1" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>

              {/* Email Notifications */}
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span>Email Notifications</span>
                <button 
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.emailNotifications ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-[0.15rem] w-5 h-5 bg-white rounded-full transition ${
                      settings.emailNotifications ? "right-1" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span>Enable 2FA</span>
                <button 
                  onClick={() => handleToggle("enable2FA")}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.enable2FA ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-[0.15rem] w-5 h-5 bg-white rounded-full transition ${
                      settings.enable2FA ? "right-1" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>

              {/* Site Maintenance Mode */}
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span>Maintenance Mode</span>
                <button 
                  onClick={() => handleToggle("siteMaintenance")}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.siteMaintenance ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-[0.15rem] w-5 h-5 bg-white rounded-full transition ${
                      settings.siteMaintenance ? "right-1" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>

            </div>

            {/* Save Button */}
            <div className="mt-6 text-right">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}