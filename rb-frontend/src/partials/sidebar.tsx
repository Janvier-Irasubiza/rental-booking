import {
  CalendarDaysIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Overview",
      path: "/@me",
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      name: "My Rentals",
      path: "/@me/rentals",
      icon: <Squares2X2Icon className="h-6 w-6" />,
    },
    {
      name: "Bookings",
      path: "/@me/bookings",
      icon: <CalendarDaysIcon className="h-6 w-6" />,
    },
    {
      name: "Profile",
      path: "/@me/profile",
      icon: <UserCircleIcon className="h-6 w-6" />,
    },
    {
      name: "Settings",
      path: "/@me/settings",
      icon: <Cog6ToothIcon className="h-6 w-6" />,
    },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white px-6 py-10 shadow-lg">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <nav className="space-y-4 font-medium">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition ${
                isActive
                  ? "bg-indigo-700 shadow-lg ring-2 ring-white ring-opacity-50 font-semibold"
                  : "hover:bg-indigo-500"
              }`
            }
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
