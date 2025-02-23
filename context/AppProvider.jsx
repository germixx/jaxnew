"use client";
import { UserProvider } from "./UserContext";
import { LocationProvider } from "./LocationContext";

export const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <LocationProvider>{children}</LocationProvider>
    </UserProvider>
  );
};