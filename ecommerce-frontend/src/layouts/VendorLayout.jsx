import { useState } from "react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "@/features/vendor/components/VendorSidebar";
import VendorTopbar from "@/features/vendor/components/VendorTopbar";

export default function VendorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <div className="hidden lg:flex">
        <VendorSidebar />
      </div>

      {/* ── Mobile sidebar overlay ───────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <VendorSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main area ────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <VendorTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
