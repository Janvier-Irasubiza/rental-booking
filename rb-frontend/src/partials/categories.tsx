import { HomeIcon, TruckIcon } from "@heroicons/react/24/outline";
import Search from "./search";

function Categories() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-8 py-4 space-x-10">
        <button className="flex flex-col items-center justify-center">
          <HomeIcon className="h-6 w-6" />
          <div className="text-sm mt-1 font-medium">Condo</div>
        </button>
        <button className="flex flex-col items-center justify-center">
          <TruckIcon className="h-6 w-6" />
          <div className="text-sm mt-1 font-medium">Car</div>
        </button>
      </div>
      <div>
        <Search />
      </div>
    </div>
  );
}

export default Categories;
