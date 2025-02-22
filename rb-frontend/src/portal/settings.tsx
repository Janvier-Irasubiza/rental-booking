import DashboardLayout from "../layouts/dashboard";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BellAlertIcon,
  LockClosedIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

function Settings() {
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    dataSharing: false,
  });

  // Password update state
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Alert state for successful actions
  const [alert, setAlert] = useState("");

  // Toggle Functions
  const toggleNotification = (type: "email" | "sms") => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  const togglePrivacy = (type: "profileVisibility" | "dataSharing") => {
    setPrivacy({ ...privacy, [type]: !privacy[type] });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion request submitted.");
  };

  const handleSavePreferences = () => {
    setAlert("Your preferences have been saved successfully!");
    setTimeout(() => setAlert(""), 3000); // Clear alert after 3 seconds
  };

  return (
    <DashboardLayout>
      <div className="mt-12 p-8 bg-white rounded-3xl shadow-2xl max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Settings</h2>
            <p className="text-sm text-gray-500">
              Manage your account preferences
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSavePreferences}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg transition"
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {alert && (
          <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md text-green-700">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            {alert}
          </div>
        )}

        {/* Main Settings Section - Flex Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Notification Preferences */}
          <section className="w-full flex flex-col gap-6 p-6 bg-gray-50 rounded-2xl shadow-md transition hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 flex space-x-4 items-center">
              <BellAlertIcon className="w-6 h-6 mr-4" /> Notifications
            </h3>
            <div className="flex justify-between items-center">
              <span>Email Notifications</span>
              <Switch
                checked={notifications.email}
                onChange={() => toggleNotification("email")}
                className={`${
                  notifications.email ? "bg-indigo-600" : "bg-gray-300"
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
              >
                <span className="sr-only">Toggle Email Notifications</span>
                <span
                  className={`${
                    notifications.email ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>

            <div className="flex justify-between items-center">
              <span>SMS Notifications</span>
              <Switch
                checked={notifications.sms}
                onChange={() => toggleNotification("sms")}
                className={`${
                  notifications.sms ? "bg-pink-600" : "bg-gray-300"
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
              >
                <span className="sr-only">Toggle SMS Notifications</span>
                <span
                  className={`${
                    notifications.sms ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="w-full flex flex-col gap-6 p-6 bg-gray-50 rounded-2xl shadow-md transition hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 flex space-x-4 items-center">
              <LockClosedIcon className="w-6 h-6 mr-4" /> Privacy
            </h3>
            <div className="flex justify-between items-center">
              <span>Profile Visibility</span>
              <Switch
                checked={privacy.profileVisibility}
                onChange={() => togglePrivacy("profileVisibility")}
                className={`${
                  privacy.profileVisibility ? "bg-indigo-600" : "bg-gray-300"
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
              >
                <span className="sr-only">Toggle Profile Visibility</span>
                <span
                  className={`${
                    privacy.profileVisibility
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>

            <div className="flex justify-between items-center">
              <span>Allow Data Sharing</span>
              <Switch
                checked={privacy.dataSharing}
                onChange={() => togglePrivacy("dataSharing")}
                className={`${
                  privacy.dataSharing ? "bg-indigo-600" : "bg-gray-300"
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
              >
                <span className="sr-only">Toggle Data Sharing</span>
                <span
                  className={`${
                    privacy.dataSharing ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </section>
        </div>

        {/* Password and Danger Zone */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Change Password */}
          <section className="w-full flex flex-col gap-6 p-6 bg-gray-50 rounded-2xl shadow-md transition hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center space-x-4">
              <KeyIcon className="w-6 h-6 mr-4" /> Change Password
            </h3>
            <div className="flex flex-col gap-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                className="flex-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="flex-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="flex-1 p-3 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
            <button className="self-end px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Update Password
            </button>
          </section>

          {/* Danger Zone */}
          <section className="w-full flex flex-col gap-4 p-6 bg-red-50 rounded-2xl shadow-inner transition hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-red-700 flex items-center space-x-4">
              <ExclamationTriangleIcon className="w-6 h-6 mr-4" />
              Delete My Account
            </h3>
            <p className="text-sm text-red-600">
              Deleting your account is permanent and cannot be undone. Please
              proceed with caution.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="self-start flex items-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              Delete Account
            </button>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
