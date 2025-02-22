import DashboardLayout from "../layouts/dashboard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mt-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Active Rentals
            </h2>
            <p className="text-4xl font-bold text-indigo-600 mt-2">5</p>
          </div>
          <div className="bg-white  rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Bookings
            </h2>
            <p className="text-4xl font-bold text-green-600 mt-2">12</p>
          </div>
          <div className="bg-white  rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700">Earnings</h2>
            <p className="text-4xl font-bold text-pink-600 mt-2">$1,200</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-10 bg-white p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-600">John Doe booked your Condo</span>
              <span className="text-gray-400 text-sm">2 days ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Anna Smith booked your Car</span>
              <span className="text-gray-400 text-sm">4 days ago</span>
            </li>
          </ul>
        </div>

        {/* Profile Overview */}
        <div className="mt-10 bg-white p-6 rounded-xl  flex items-center">
          <img
            src="https://via.placeholder.com/100"
            className="w-24 h-24 rounded-full mr-6"
            alt="User Avatar"
          />
          <div>
            <h3 className="text-xl font-bold">[User Name]</h3>
            <p className="text-gray-500">[user@email.com]</p>
            <button className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
