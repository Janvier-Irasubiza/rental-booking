import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import AuthLayout from "../../layouts/auth";
import CountryCode from "../../components/country-code";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        email: formData.email,
        phone: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password1: formData.password,
        password2: formData.confirmPassword,
      });

      if (response.status === 201) {
        // redirect to dashboard
        localStorage.setItem("access_token", response.data.token);
        navigate("/@me");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Signup failed", error);
    }
  };

  return (
    <AuthLayout>
      <div className="">
        <div className="px-28 flex flex-col justify-center">
          <div className="w-2/5 mx-auto space-y-14 border p-8 rounded-lg">
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-gray-500 mt-2 text-sm">
                Create an account to join our rental platform.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="mt-1 p-2 block w-full border rounded-lg"
                  placeholder="username@mail.com"
                  onChange={handleChange}
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <CountryCode />
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="mt-1 p-2 block w-full border rounded-lg"
                    placeholder="123 456 789"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* First Name */}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="mt-1 p-2 block w-full border rounded-lg"
                  placeholder="John"
                  onChange={handleChange}
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="mt-1 p-2 block w-full border rounded-lg"
                  placeholder="Doe"
                  onChange={handleChange}
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="mt-1 p-2 block w-full border rounded-lg"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="mt-1 p-2 block w-full border rounded-lg"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="button text-white p-2 rounded-md w-full mt-2 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 transition"
              >
                Sign Up
                <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
              </button>

              {/* Link to Login */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?
                <Link
                  to="/auth/login"
                  className="ml-1 text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="border-b w-1/4"></span>
                  <span className="text-sm text-gray-500">
                    or continue with
                  </span>
                  <span className="border-b w-1/4"></span>
                </div>
              </div>

              {/* Google Login */}
              <button
                type="button"
                className="w-full mt-4 flex items-center justify-center gap-3 bg-white text-gray-700 font-medium border rounded-md py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
