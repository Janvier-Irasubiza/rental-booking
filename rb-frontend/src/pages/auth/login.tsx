import { useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/auth";
import api from "../../configs/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login/", {
        email,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      navigate("/@me");
    } catch (err) {
      navigate("/auth/login");
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/social/google/";
  };

  return (
    <AuthLayout>
      <div className="py-20">
        <div className="px-28 flex flex-col justify-center">
          <div className="w-2/5 mx-auto space-y-14 border p-8 rounded-lg">
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-gray-500 mt-2 text-sm">
                Access your account to manage rentals.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <p className="text-red-500 text-center">{error}</p>}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 p-2 block w-full border rounded-lg"
                  placeholder="username@mail.com"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <p className="text-sm text-right text-blue-600 hover:underline">
                    <Link to="/auth/forgot-password">Forgot Password?</Link>
                  </p>
                </div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 p-2 block w-full border rounded-lg"
                  placeholder="Password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="button text-white p-2 rounded-md w-full mt-2 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 transition"
              >
                Login
                <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
              </button>

              {/* Link to Sign Up */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Don't have an account?
                <Link
                  to="/auth/register"
                  className="ml-1 text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>

              {/* Google Login */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="border-b w-1/4"></span>
                  <span className="text-sm text-gray-500">
                    or continue with
                  </span>
                  <span className="border-b w-1/4"></span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
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
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
