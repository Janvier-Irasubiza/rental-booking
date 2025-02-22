import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div className="border-b py-5 px-28">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold">Logo</div>
          <div className="space-x-6">
            <Link to="" className="font-medium">
              Home
            </Link>
            <Link to="" className="font-medium">
              Discover
            </Link>
          </div>
          <div className="space-x-6 flex items-center">
            <Link
              to=""
              className="font-medium bg-accent hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition"
            >
              List your rental
            </Link>
            <Link to="/auth">
              <ArrowRightEndOnRectangleIcon className="h-10 w-10 pry-txt p-0 m-0" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
