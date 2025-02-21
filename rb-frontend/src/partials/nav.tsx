import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import Categories from "./categories";

function Nav() {
  return (
    <nav>
      <div className="border-b py-4 px-28">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold">Logo</div>
          <div className="space-x-6">
            <a href="" className="font-medium">
              Home
            </a>
            <a href="" className="font-medium">
              Discover
            </a>
          </div>
          <div className="space-x-6 flex items-center">
            <a href="" className="font-medium">
              List your rental
            </a>
            <button type="button" className="flex items-center justify-center">
              <ArrowRightEndOnRectangleIcon className="" />
            </button>
          </div>
        </div>
      </div>
      <div className="px-28">
        <Categories />
      </div>
    </nav>
  );
}

export default Nav;
