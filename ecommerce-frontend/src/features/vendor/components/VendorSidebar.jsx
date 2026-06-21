import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, PlusSquare, ShoppingBag,
  Users, Star, BarChart2, UserCircle, Settings, X, Layers,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import { ROUTES } from "@/constants/routes";

const NAV = [
  {
    section: "Main",
    items: [
      { to: ROUTES.VENDOR_DASHBOARD,  icon: <LayoutDashboard size={18} />, label: "Dashboard"   },
      { to: ROUTES.VENDOR_PRODUCTS,   icon: <Package size={18} />,         label: "Products"    },
      { to: ROUTES.VENDOR_ADD_PRODUCT,icon: <PlusSquare size={18} />,      label: "Add Product" },
      { to: "/vendor/inventory",      icon: <Layers size={18} />,          label: "Inventory"   },      { to: ROUTES.VENDOR_ORDERS,     icon: <ShoppingBag size={18} />,     label: "Orders"      },
      { to: ROUTES.VENDOR_CUSTOMERS,  icon: <Users size={18} />,           label: "Customers"   },
    ],
  },
  {
    section: "Analytics",
    items: [
      { to: ROUTES.VENDOR_REVIEWS,    icon: <Star size={18} />,            label: "Reviews"     },
      { to: ROUTES.VENDOR_ANALYTICS,  icon: <BarChart2 size={18} />,       label: "Analytics"   },
    ],
  },
  {
    section: "Account",
    items: [
      { to: ROUTES.VENDOR_PROFILE,    icon: <UserCircle size={18} />,      label: "Profile"     },
      { to: ROUTES.VENDOR_SETTINGS,   icon: <Settings size={18} />,        label: "Settings"    },
    ],
  },
];

/**
 * Props: onClose — for mobile overlay close button
 */
const VendorSidebar = ({ onClose }) => (
  <aside className="flex flex-col h-full bg-gray-900 text-white w-64 shrink-0">
    {/* Logo */}
    <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
      <Link to={ROUTES.VENDOR_DASHBOARD} className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">V</span>
        </div>
        <span className="font-bold text-white text-lg">Vendor Hub</span>
      </Link>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-white lg:hidden" aria-label="Close sidebar">
          <X size={20} />
        </button>
      )}
    </div>

    {/* Nav */}
    <nav className="flex-1 overflow-y-auto px-3 py-5 flex flex-col gap-6">
      {NAV.map((group) => (
        <SidebarSection key={group.section} title={group.section}>
          {group.items.map((item) => (
            <SidebarItem key={item.to} {...item} onClick={onClose} />
          ))}
        </SidebarSection>
      ))}
    </nav>

    {/* Footer */}
    <div className="px-4 py-4 border-t border-white/10 text-xs text-gray-500">
      Vendor Panel v1.0
    </div>
  </aside>
);

export default VendorSidebar;
