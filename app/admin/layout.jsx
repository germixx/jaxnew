'use client';

import { useEffect, useState} from "react";

import AdminNavBar from '../../components/Client/Admin/navbar';

import { useUser } from "@/context/UserContext";

// export const metadata = {
//     title: "Admin | Dashboard",
//     description: "Generated by create next app",
//   };
  
  const AdminLayout = ({children}) => {

    const { user, login, logout } = useUser();
    const [username, setUsername] = useState("Loading..."); 
    
    useEffect(() => {
      document.title = "Admin | Dashboard"; // Updates the browser tab title
    }, []);

    return (
      <div>
        <AdminNavBar user={user} logout={logout} />
        {children}
      </div>
    )
  }
   
  export default AdminLayout;