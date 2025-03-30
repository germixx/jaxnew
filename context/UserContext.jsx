"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  
  // Example: Fetch user from localStorage (or an API)
  useEffect(() => {
    
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user data
    sessionStorage.removeItem('accessToken');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);