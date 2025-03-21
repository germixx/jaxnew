import BreadCrumb from '../../components/Client/Breadcrumb';

const Admin = () => {
  return (
    <div className="antialiased">
      <div className="p-4 md:ml-64 h-auto pt-20">
        <BreadCrumb />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-black">Total Users</h3>
              <p className="text-3xl font-bold mt-2 text-black">1,250</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-black">Revenue</h3>
              <p className="text-3xl font-bold mt-2 text-black">$34,560</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-black">New Orders</h3>
              <p className="text-3xl font-bold mt-2 text-black">124</p>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Admin;