import {
  ShareIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// Booking type definition
type Booking = {
  id: number;
  rentalName: string;
  rentalImage: string;
  guestName: string;
  price: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  bookingRange: string;
};

function RecentBookings() {
  // Sample booking data
  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      rentalName: "Luxury Condo",
      rentalImage: "https://source.unsplash.com/100x100/?apartment",
      guestName: "John Doe",
      price: 200,
      status: "Confirmed",
      bookingRange: "June 1 - June 10, 2025",
    },
    {
      id: 2,
      rentalName: "Sport Car",
      rentalImage: "https://source.unsplash.com/100x100/?car",
      guestName: "Anna Smith",
      price: 150,
      status: "Pending",
      bookingRange: "July 1 - July 5, 2025",
    },
    {
      id: 3,
      rentalName: "Yacht Rental",
      rentalImage: "https://source.unsplash.com/100x100/?boat",
      guestName: "Michael Brown",
      price: 500,
      status: "Cancelled",
      bookingRange: "August 15 - August 20, 2025",
    },
  ]);

  // Status color coding
  const statusColors = {
    Confirmed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <>
      {/* Bookings Table */}
      <div className="mt-8 overflow-x-auto rounded-lg border-b">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 uppercase text-sm text-gray-600">
            <tr>
              <th className="p-4">Rental</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition">
                {/* Rental Info */}
                <td className="p-4 flex items-center space-x-4">
                  <img
                    src={booking.rentalImage}
                    alt={booking.rentalName}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{booking.rentalName}</p>
                    <p className="text-xs text-gray-400">
                      ${booking.price} • {booking.bookingRange}
                    </p>
                  </div>
                </td>

                {/* Guest Info */}
                <td className="p-4">
                  <p className="font-medium">{booking.guestName}</p>
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[booking.status]
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition">
                    <ShareIcon className="h-5 w-5" />
                    <span className="hidden md:block">Share</span>
                  </button>

                  {booking.status === "Confirmed" && (
                    <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition">
                      <CheckCircleIcon className="h-5 w-5" />
                      <span className="hidden md:block">Complete</span>
                    </button>
                  )}

                  {booking.status === "Pending" && (
                    <button className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-800 transition">
                      <XCircleIcon className="h-5 w-5" />
                      <span className="hidden md:block">Cancel</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecentBookings;
