import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-indigo-600 to-purple-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Discover
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  List Your Rental
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>
              Email:{" "}
              <a
                href="mailto:support@yourapp.com"
                className="hover:text-gray-400"
              >
                support@yourapp.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+250781336634" className="hover:text-gray-400">
                +250 781 336 634
              </a>
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-facebook-f"></i>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="hover:text-pink-500">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="" className="hover:text-">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form action="#">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="w-full mt-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p>&copy; 2025 Rental Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
