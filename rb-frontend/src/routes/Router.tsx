import {
  BrowserRouter as AppRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../portal/dashboard";
import Discover from "../partials/discover";
import MyRentals from "../portal/my-rentals";
import Bookings from "../portal/bookings";
import Profile from "../portal/profile";
import Settings from "../portal/settings";
import Sidebar from "../partials/sidebar";
import AuthRoutes from "./auth";
import RentalInfo from "../pages/rental-info";
import ProtectedRoute from "../configs/protect-route";
import GoogleCallback from "../configs/google-auth-callback";

const Router = () => {
  return (
    <AppRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/itm" element={<RentalInfo />} />

        {/* Auth routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        {/* Google OAuth callback */}
        <Route path="/auth/google/callback" element={<GoogleCallback />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/@me" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="rentals" element={<MyRentals />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </AppRouter>
  );
};

// Dashboard Layout
const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Router;
