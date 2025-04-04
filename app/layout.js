// 'use client';
import { UserProvider } from "@/context/UserContext";
import { LocationProvider } from "@/context/LocationContext";

import "./globals.css";

export const metadata = {
  title: "Jacksonvillians",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="overflow-y-auto">
      <body>
        <UserProvider>
          <LocationProvider>
            {children}
          </LocationProvider>
        </UserProvider>
      </body>
    </html>
  );
}
