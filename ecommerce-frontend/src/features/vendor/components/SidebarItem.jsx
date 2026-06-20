import { NavLink } from "react-router-dom";

/**
 * Props: to, icon (JSX), label, onClick (for mobile close)
 */
const SidebarItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    end={to === "/vendor"}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        isActive
          ? "bg-green-600 text-white shadow-sm"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`
    }
  >
    <span className="shrink-0">{icon}</span>
    <span className="truncate">{label}</span>
  </NavLink>
);

export default SidebarItem;
