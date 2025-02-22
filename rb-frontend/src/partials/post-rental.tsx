import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type PostRentalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rentalData: any) => void;
};

const PostRentalModal = ({
  isOpen,
  onClose,
  onSubmit,
}: PostRentalModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    location: "",
    status: "Available",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Post New Rental
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rental Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter rental name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Price per night
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="e.g., 200"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="e.g., New York, USA"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition"
          >
            Post Rental
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRentalModal;
