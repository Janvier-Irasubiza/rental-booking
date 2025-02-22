import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div className="border-b py-5 px-28">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold">Logo</div>
          <div className="space-x-6">
            <Link to="/" className="font-medium hover:text-gray-600">
              Home
            </Link>
            <Link
              to="/discover"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              Discover
            </Link>
          </div>
          <div className="space-x-6 flex items-center">
            <Link
              to=""
              className="font-medium border-2 border-pink-600 hover:bg-pink-600 hover:text-white text-gray-500 px-4 py-1 rounded-lg transition"
            >
              List your rental
            </Link>
            <Link to="/auth/login">
              <ArrowRightEndOnRectangleIcon className="h-10 w-10 pry-txt p-0 m-0" />
            </Link>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold focus:outline-none">
              UI
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
