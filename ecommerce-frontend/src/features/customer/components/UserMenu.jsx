import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Package, Heart, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
          {initials}
        </div>
        <span className="hidden md:block max-w-[100px] truncate">{user?.name}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border z-50 py-1 max-w-[calc(100vw-2rem)]">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>

          <Link
            to={ROUTES.CUSTOMER_PROFILE}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <User size={16} /> My Profile
          </Link>
          <Link
            to={ROUTES.CUSTOMER_ORDERS}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Package size={16} /> My Orders
          </Link>
          <Link
            to={ROUTES.CUSTOMER_WISHLIST}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Heart size={16} /> Wishlist
          </Link>

          <div className="border-t mt-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
