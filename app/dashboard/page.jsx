'use client';

import NavBar from '../../components/Client/Dashboard/navbar';
import BreadCrumb from '../../components/Client/Breadcrumb';

const DashboardPage = () => {
  return (
    <div className="antialiased">
        <div className="p-4 md:ml-64 h-auto pt-20">
          <BreadCrumb />
          Dashboard PAge
        </div>
      </div>
  )
}

export default DashboardPage;