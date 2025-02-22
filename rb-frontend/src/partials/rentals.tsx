import {
  HomeIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { DateFilter } from "./filter";
import { Range } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiedPiperHat } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

type Rental = {
  id: number;
  name: string;
  image: string | undefined;
  location: string;
  price: string;
  range: string;
  type?: string;
  availableFrom: string;
  availableTo: string;
};

function Rentals() {
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);

  const rentals: Rental[] = [
    {
      id: 1,
      name: "Condo in New York",
      location: "Kigali/Rwanda",
      price: "2000",
      image: undefined,
      range: "night",
      type: "real-estate",
      availableFrom: "2022-10-01",
      availableTo: "2022-10-10",
    },
    {
      id: 2,
      name: "Car in LA",
      location: "Kigali/Rwanda",
      price: "3000",
      image: undefined,
      range: "hour",
      type: "vehicles",
      availableFrom: "2022-10-01",
      availableTo: "2022-10-10",
    },
    {
      id: 3,
      name: "Boat Rental",
      location: "Kigali/Rwanda",
      price: "",
      image: undefined,
      range: "hour",
      type: "vehicles",
      availableFrom: "2022-10-01",
      availableTo: "2022-10-10",
    },
    {
      id: 4,
      name: "Bike Rental",
      location: "Karongi/Rwanda",
      price: "1000",
      image: undefined,
      range: "hour",
      type: "vehicles",
      availableFrom: "2022-10-01",
      availableTo: "2022-10-10",
    },
  ];

  const handleFilter = (range: Range) => {
    if (!range.startDate || !range.endDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const checkIn = new Date(range.startDate);
    const checkOut = new Date(range.endDate);

    const filtered = rentals.filter((rental) => {
      const availableFrom = new Date(rental.availableFrom);
      const availableTo = new Date(rental.availableTo);
      return checkIn >= availableFrom && checkOut <= availableTo;
    });

    setFilteredRentals(filtered);
  };

  return (
    <div className="flex flex-col py-4">
      {/* Rentals Section */}
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center space-x-10">
          <button className="flex flex-col items-center justify-center border-b-2 border-primary-text">
            <HomeIcon className="h-6 w-6" />
            <p className="text-sm mt-1 font-medium">Real Estate</p>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-600">
            <TruckIcon className="h-6 w-6" />
            <p className="text-sm mt-1 font-medium">Vehicles</p>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-600">
            <WrenchScrewdriverIcon className="h-6 w-6" />
            <p className="text-sm mt-1 font-medium">Equipment</p>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-600">
            <FontAwesomeIcon icon={faPiedPiperHat} className="text-2xl" />
            <p className="text-sm mt-1 font-medium">Lifestyle</p>
          </button>
        </div>

        {/* Date Filter */}
        <div>
          <DateFilter onFilter={handleFilter} />
        </div>
      </div>

      {/* Display Rentals */}
      <div className="mt-6">
        {(filteredRentals.length > 0 ? filteredRentals : rentals).length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(filteredRentals.length > 0 ? filteredRentals : rentals).map(
              (rental) => (
                <Link to="/itm">
                  <div
                    key={rental.id}
                    className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={rental.image}
                        alt={rental.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </div>

                    {/* Rental Details */}
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{rental.name}</h3>
                        <p className="font-semibold">
                          ${rental.price}/{rental.range}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{rental.location}</p>
                      {/* Availability */}
                      <p className="text-sm text-gray-500">
                        {" "}
                        {new Date(rental.availableFrom).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                          }
                        )}{" "}
                        -{" "}
                        {new Date(rental.availableTo).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {filteredRentals.length === 0
              ? "No rentals available for the selected dates."
              : "Select dates to filter available rentals."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Rentals;
