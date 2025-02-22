import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import AuthLayout from "../layouts/auth";
import CountryCode from "../components/country-code";

function Auth() {
  // const [isUser, setIsUser] = useState(false);

  return (
    <AuthLayout>
      <div className="py-20">
        <div className="px-28 flex flex-col justify-center">
          <div className="w-96 mx-auto space-y-14">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-gray-500 mt-2 text-sm">
                Join a future gateway for rentals
              </p>
            </div>
            <form className="">
              {/* Email or Phone */}
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
                  className="input mt-1 p-2 block w-full"
                  placeholder="username@mail.com"
                />
              </div>

              {/* Phone number */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <div className="flex items-center gap-2">
                  {/* Country code */}
                  <CountryCode />
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    required
                    className="input mt-1 p-2 block w-full"
                    placeholder="124 674 845"
                  />
                </div>
              </div>

              <div>
                {/* FirstName */}
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
                    autoComplete="given-name"
                    required
                    className="input mt-1 p-2 block w-full"
                    placeholder="First Name"
                  />
                </div>

                {/* LastName */}
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
                    autoComplete="family-name"
                    required
                    className="input mt-1 p-2 block w-full"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {/* Password */}
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
                  autoComplete="current-password"
                  required
                  className="input mt-1 p-2 block w-full"
                  placeholder="Password"
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
                  autoComplete="current-password"
                  required
                  className="input mt-1 p-2 block w-full"
                  placeholder="Confirm Password"
                />
              </div>

              <button
                type="submit"
                className="buttnon text-white p-2 rounded-md 
                          w-full mt-2 flex items-center justify-center 
                          gap-2 bg-blue-500 hover:bg-blue-600 transition-all 
                          duration-200 focus:outline-none focus:ring-2 
                          focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
              </button>

              <div className="mt-8">
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/4 lg:w-1/5"></span>

                  <span className="text-center text-sm text-gray-500">
                    or continue with
                  </span>

                  <span className="border-b w-1/4 lg:w-1/5"></span>
                </div>
              </div>

              {/* Continue with gmail */}
              <button
                type="button"
                className="w-full mt-8 flex items-center justify-center gap-3 
                         bg-white text-gray-700 font-medium 
                         brd rounded-md 
                         py-2 px-4
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 google-btn"
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

export default Auth;
