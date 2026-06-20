import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, ChevronDown, Menu, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

/**
 * Props: onMenuClick — opens mobile sidebar
 */
const VendorTopbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const [hasNotif] = useState(true); // mock

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "V";

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 shrink-0">
      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <Store size={18} className="text-green-600" />
          <span className="font-semibold text-gray-800 text-sm hidden sm:block">
            {user?.name ?? "Vendor"}
          </span>
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-gray-700 transition" aria-label="Notifications">
          <Bell size={20} />
          {hasNotif && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropOpen((v) => !v)}
            onBlur={() => setTimeout(() => setDropOpen(false), 150)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            aria-haspopup="true"
            aria-expanded={dropOpen}
          >
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <span className="hidden sm:block max-w-[120px] truncate">{user?.name}</span>
            <ChevronDown size={14} className={`transition-transform ${dropOpen ? "rotate-180" : ""}`} />
          </button>

          {dropOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50 py-1 overflow-hidden">
              <div className="px-4 py-2 border-b">
                <p className="text-xs font-semibold text-gray-800 truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default VendorTopbar;
