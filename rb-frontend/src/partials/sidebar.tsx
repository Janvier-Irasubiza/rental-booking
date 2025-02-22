import {
  CalendarDaysIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState("Overview");

  const menuItems = [
    { name: "Overview", icon: <ChartBarIcon className="h-6 w-6" /> },
    { name: "My Rentals", icon: <Squares2X2Icon className="h-6 w-6" /> },
    { name: "Bookings", icon: <CalendarDaysIcon className="h-6 w-6" /> },
    { name: "Profile", icon: <UserCircleIcon className="h-6 w-6" /> },
    { name: "Settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="space-y-4 font-medium">
        {menuItems.map((item) => (
          <a
            href="#"
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center p-3 rounded-lg transition ${
              active === item.name
                ? "bg-indigo-700 shadow-md ring-2 ring-white ring-opacity-50 font-semibold"
                : "hover:bg-indigo-500"
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
