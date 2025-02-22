import { ReactNode } from "react";
import DashboardHeader from "../partials/dashboard-header";

interface Props {
  children: ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <main className="flex-1 p-10">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
