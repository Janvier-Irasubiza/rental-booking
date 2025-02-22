import DashboardLayout from "../layouts/dashboard";
import { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";

function Profile() {
  // State to handle form data
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+250 781 336 634",
    bio: "Passionate about travel and rentals.",
    avatar: "https://source.unsplash.com/100x100/?portrait",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profileData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfileData((prevData) => ({
          ...prevData,
          avatar: fileReader.result as string,
        }));
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div className="mt-12 p-8 bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">My Profile</h2>
            <p className="text-sm text-gray-500">
              Update your personal information
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="User Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <label className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-700 transition">
                <CameraIcon className="h-5 w-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Click the camera icon to change your avatar
            </p>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
