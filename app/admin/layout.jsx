import AdminNavBar from '../../components/Client/Admin/navbar';

export const metadata = {
    title: "Admin | Dashboard",
    description: "Generated by create next app",
  };
  
  const AdminLayout = ({children}) => {
    return (
      <div>
        <AdminNavBar />
        {children}
      </div>
    )
  }
   
  export default AdminLayout;