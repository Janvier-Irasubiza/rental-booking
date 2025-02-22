import { useState } from "react";
import { HomeIcon, TruckIcon, StarIcon } from "@heroicons/react/24/solid";
import { DateFilter } from "./filter";
import { Range } from "react-date-range";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiedPiperHat } from "@fortawesome/free-brands-svg-icons/faPiedPiperHat";
import App from "../layouts/app";

// Rental Type
type Rental = {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  image: string;
  availableFrom: string;
  availableTo: string;
  rating: number;
};

function Discover() {
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);

  // Sample Rentals Data
  const rentals: Rental[] = [
    {
      id: 1,
      name: "Luxury Condo in New York",
      location: "New York, USA",
      pricePerNight: 250,
      image: "https://source.unsplash.com/600x400/?apartment,nyc",
      availableFrom: "2025-06-01",
      availableTo: "2025-06-10",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Sport Car in LA",
      location: "Los Angeles, USA",
      pricePerNight: 180,
      image: "https://source.unsplash.com/600x400/?car,losangeles",
      availableFrom: "2025-06-05",
      availableTo: "2025-06-15",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Yacht Rental",
      location: "Miami, USA",
      pricePerNight: 500,
      image: "https://source.unsplash.com/600x400/?boat,miami",
      availableFrom: "2025-07-01",
      availableTo: "2025-07-10",
      rating: 5.0,
    },
    {
      id: 4,
      name: "Mountain Cabin",
      location: "Aspen, USA",
      pricePerNight: 150,
      image: "https://source.unsplash.com/600x400/?cabin,aspen",
      availableFrom: "2025-07-15",
      availableTo: "2025-07-25",
      rating: 4.2,
    },
  ];

  // Filtering Rentals Based on Date Selection
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
    <App>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="bg-cover bg-center h-80 flex items-center justify-center"
          style={{
            backgroundImage:
              "url(https://source.unsplash.com/1600x400/?travel,adventure)",
          }}
        >
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h1 className="text-3xl font-bold text-center mb-4">
              Find Your Next Adventure
            </h1>
            <DateFilter onFilter={handleFilter} />
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex justify-center space-x-10 py-8">
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

        {/* Rentals Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
          {(filteredRentals.length > 0 ? filteredRentals : rentals).map(
            (rental) => (
              <div
                key={rental.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={rental.image}
                  alt={rental.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">{rental.name}</h3>
                    <p className="font-bold">${rental.pricePerNight}/night</p>
                  </div>
                  <p className="text-sm text-gray-500">{rental.location}</p>
                  <div className="flex items-center mt-2">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <p className="ml-1 text-sm font-medium">{rental.rating}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Available from{" "}
                    {new Date(rental.availableFrom).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      }
                    )}{" "}
                    to{" "}
                    {new Date(rental.availableTo).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12 text-center">
          <h2 className="text-2xl font-bold">Become a Host</h2>
          <p className="mt-2">
            Earn extra income by listing your property or vehicle today.
          </p>
          <button className="mt-4 px-6 py-2 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-100 transition">
            List Your Rental
          </button>
        </div>
      </div>
    </App>
  );
}

export default Discover;
