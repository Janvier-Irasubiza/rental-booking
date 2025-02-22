import { ReactNode } from "react";
import AuthNav from "../partials/auth-nav";

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div>
      <AuthNav />
      {children}

      {/* Footer */}
      <footer className="py-5 px-28">
        <div className="text-center text-gray-400 text-sm">
          &copy; 2025 Rental Booking. All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;
