import { Outlet } from "react-router-dom";
import CustomerNavbar from "@/features/customer/components/CustomerNavbar";
import CustomerFooter from "@/features/customer/components/CustomerFooter";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>

      <CustomerFooter />
    </div>
  );
}
