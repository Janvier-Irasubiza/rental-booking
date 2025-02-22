import { useState } from "react";
import DashboardLayout from "../layouts/dashboard";
import {
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import PostRentalModal from "../partials/post-rental";

// Sample rental data type
type Rental = {
  id: number;
  name: string;
  image: string;
  price: number;
  location: string;
  status: "Available" | "Booked";
  bookingInfo?: {
    from: string;
    to: string;
    bookedBy: string;
  };
};

function MyRentals() {
  const [rentals, setRentals] = useState<Rental[]>([
    {
      id: 1,
      name: "Luxury Condo",
      image: "https://source.unsplash.com/100x100/?apartment",
      price: 200,
      location: "New York, USA",
      status: "Available",
    },
    {
      id: 2,
      name: "Sport Car",
      image: "https://source.unsplash.com/100x100/?car",
      price: 150,
      location: "Los Angeles, USA",
      status: "Booked",
      bookingInfo: {
        from: "2025-06-01",
        to: "2025-06-10",
        bookedBy: "John Doe",
      },
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: number) => {
    setRentals(rentals.filter((rental) => rental.id !== id));
  };

  const handlePostRental = (rentalData: Rental) => {
    setRentals((prev) => [...prev, { ...rentalData, id: Date.now() }]);
  };

  return (
    <DashboardLayout>
      <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">My Rentals</h2>
            <p className="text-sm text-gray-500 font-medium">
              Manage all your rentals
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
          >
            + Post Rental
          </button>
        </div>

        {/* Rentals Table */}
        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg border-b">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100 uppercase text-sm text-gray-600">
              <tr>
                <th className="p-4">Rental</th>
                <th className="p-4">Price</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {rentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-gray-50 transition">
                  {/* Rental Info */}
                  <td className="flex items-center space-x-4 p-4">
                    <img
                      src={rental.image}
                      alt={rental.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <p className="font-medium">{rental.name}</p>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <p className="font-semibold">${rental.price}</p>
                    <p className="text-xs text-gray-400">Per night</p>
                  </td>

                  {/* Location */}
                  <td className="p-4">{rental.location}</td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        rental.status === "Available"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {rental.status}
                    </span>
                    {rental.status === "Booked" && rental.bookingInfo && (
                      <div className="mt-1 text-xs text-gray-500">
                        <p>
                          {rental.bookingInfo.from} - {rental.bookingInfo.to}
                        </p>
                        <p>By {rental.bookingInfo.bookedBy}</p>
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 space-x-2 flex items-center">
                    <LinkIcon className="h-5 w-5 text-indigo-500 cursor-pointer hover:text-indigo-700" />
                    <PencilSquareIcon className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700" />
                    <TrashIcon
                      className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleDelete(rental.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing {rentals.length} rentals
          </p>
          <div className="flex space-x-2 text-sm font-medium">
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              Prev
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              Next
            </button>
          </div>
        </div>

        {/* Post Rental Modal */}
        <PostRentalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostRental}
        />
      </div>
    </DashboardLayout>
  );
}

export default MyRentals;
