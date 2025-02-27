import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center relative">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, Frank M</h1>

      {/* User Profile Icon with Dropdown Toggle */}
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold focus:outline-none"
        >
          FM
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition ease-in-out">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                to="profile"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md font-medium"
                role="menuitem"
              >
                <UserCircleIcon className="h-5 w-5" />
                <p>Profile</p>
              </Link>
              <Link
                to="settings"
                className="flex items-center space-x-2 font-medium px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <Cog6ToothIcon className="h-5 w-5" />
                <p>Settings</p>
              </Link>
              <button
                className="flex w-full items-center space-x-2 font-medium px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
                role="menuitem"
              >
                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                <p>Logout</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
