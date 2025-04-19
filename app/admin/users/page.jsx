'use client';
import UsersTable from '@/components/Client/Admin/Users/Table';
import { useEffect, useState } from "react";
import Loading from '@/components/Loading';

import { getUsers } from '@/util/functions/client/admin/functions';

export default function AdminUsers() {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect( () => {
    
    (async () => {
      let usrs = await getUsers();
      setUsers(usrs.users);
      setLoading(false);
    })();
  
  }, []);

  return (
    <div>
      {
        loading ? (
            <div className="md:ml-64 pt-15">
              <div className="p-4 min-h-[calc(100vh-80px)] flex justify-center items-center">
                <Loading />
              </div>
            </div>
        ) : (
          <div className="p-4 md:ml-64 h-auto pt-20 text-black">
            <UsersTable users={users} />
          </div>
        )
      }

    </div>
  );
}