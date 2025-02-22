import { ReactNode } from "react";
import DashboardHeader from "../partials/dashboard-header";
import Sidebar from "../partials/sidebar";

interface Props {
  children: ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
