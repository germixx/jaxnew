'use client';

import NavBar from '../../components/Client/Dashboard/navbar';
import BreadCrumb from '../../components/Client/Breadcrumb';

const DashboardPage = () => {
  return (
    <div className="flex flex-col h-screen">
        <div className="p-4 md:ml-64 pt-20 flex-grow overflow-hidden ">
          <BreadCrumb />
          Dashboard PAge
        </div>
      </div>
  )
}

export default DashboardPage;