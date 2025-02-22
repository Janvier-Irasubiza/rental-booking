import DashboardLayout from "../layouts/dashboard";
import {
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import RecentBookings from "../partials/recent-bookings";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mt-12 space-y-10">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Rentals */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow hover:shadow-md transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Active Rentals</h2>
              <ArrowTrendingUpIcon className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-5xl font-bold mt-4">5</p>
          </div>

          {/* Total Bookings */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-xl p-6 shadow hover:shadow-md transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Total Bookings</h2>
              <CalendarDaysIcon className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-5xl font-bold mt-4">12</p>
          </div>

          {/* Earnings */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl p-6 shadow hover:shadow-md transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Earnings</h2>
              <CurrencyDollarIcon className="h-8 w-8 opacity-75" />
            </div>
            <p className="text-5xl font-bold mt-4">$1,200</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-8 rounded-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Recent Bookings
            </h2>
            <button className="font-medium text-gray-700">All Bookings</button>
          </div>
          <RecentBookings />
        </div>

        {/* Profile Overview */}
        <div className="flex flex-col md:flex-row bg-white p-8 rounded-3xl items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            className="w-24 h-24 rounded-full border-4 border-indigo-600 object-cover hover:scale-105 transition-transform duration-300"
            alt="User Avatar"
          />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">John Doe</h3>
            <p className="text-gray-500">johndoe@example.com</p>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full transition hover:shadow-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
