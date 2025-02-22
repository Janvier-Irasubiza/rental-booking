import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/auth";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending the reset link
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="py-20">
        <div className="px-28 flex flex-col justify-center">
          <div className="w-96 mx-auto space-y-14">
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-gray-500 mt-2 text-sm">
                Enter your email to reset your password
              </p>
            </div>

            {/* Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 p-2 block w-full border rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="button text-white p-2 rounded-md w-full mt-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 transition"
                >
                  Send Reset Link
                  <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                </button>

                {/* Back to Login Link */}
                <p className="text-sm text-gray-600 text-center mt-4">
                  Remember your password?
                  <Link to="/auth/login" className="ml-1 text-blue-600 hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            ) : (
              // Success Message
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-green-600">
                  Reset Link Sent!
                </h2>
                <p className="text-gray-500 text-sm">
                  We've sent a password reset link to{" "}
                  <span className="font-medium">{email}</span>. Please check
                  your inbox.
                </p>
                <Link
                  to="/auth/login"
                  className="block w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition text-center"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
