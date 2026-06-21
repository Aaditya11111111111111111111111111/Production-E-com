import { Link } from "react-router-dom";
import {
  Package, ShoppingBag, DollarSign, Clock,
  PlusSquare, ArrowRight, AlertTriangle, Star, TrendingUp,
  Users, Eye,
} from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import { ORDERS, STATUS_COLORS } from "@/mock/orders";
import { REVIEWS } from "@/mock/reviews";
import { ROUTES } from "@/constants/routes";
import { stockBadgeClass, stockLabel } from "../utils/productHelpers";

const QUICK_ACTIONS = [
  { label: "Add Product",    icon: <PlusSquare size={16} />, to: ROUTES.VENDOR_ADD_PRODUCT, color: "bg-green-600 hover:bg-green-700 text-white" },
  { label: "View Orders",    icon: <ShoppingBag size={16} />, to: ROUTES.VENDOR_ORDERS,     color: "bg-blue-600 hover:bg-blue-700 text-white" },
  { label: "Inventory",      icon: <Package size={16} />,    to: ROUTES.VENDOR_INVENTORY,    color: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  { label: "View Reviews",   icon: <Star size={16} />,       to: ROUTES.VENDOR_REVIEWS,     color: "bg-purple-600 hover:bg-purple-700 text-white" },
];

function VendorDashboard() {
  const { user } = useAuth();
  const { products, stats } = useProducts();

  const totalRevenue   = ORDERS.reduce((s, o) => s + o.total, 0);
  const pendingOrders  = ORDERS.filter((o) => o.orderStatus === "pending").length;
  const recentOrders   = ORDERS.slice(0, 5);
  const recentReviews  = REVIEWS.slice(0, 4);
  const lowStockItems  = products.filter((p) => p.stock > 0 && p.stock < 10).slice(0, 5);
  const outOfStock     = products.filter((p) => p.stock === 0).slice(0, 5);
  const topProducts    = [...products].sort((a, b) => b.price * (100 - b.discount) - a.price * (100 - a.discount)).slice(0, 5);

  const avgRating = REVIEWS.length
    ? (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
    : "—";

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good day, {user?.name} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's an overview of your store.</p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard title="Total Products"  value={stats.total}                   subtitle={`${stats.active} active`}    icon={<Package size={22} />}     color="bg-blue-50 text-blue-600" />
        <DashboardCard title="Total Orders"    value={ORDERS.length}                 subtitle="All time"                    icon={<ShoppingBag size={22} />}  color="bg-purple-50 text-purple-600" />
        <DashboardCard title="Revenue"         value={`$${totalRevenue.toFixed(2)}`} subtitle="Mock data"                   icon={<DollarSign size={22} />}   color="bg-green-50 text-green-600" />
        <DashboardCard title="Pending Orders"  value={pendingOrders}                 subtitle="Needs action"                icon={<Clock size={22} />}        color="bg-yellow-50 text-yellow-600" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${a.color}`}
            >
              {a.icon} {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Row: Recent Orders + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
            <Link to={ROUTES.VENDOR_ORDERS} className="text-xs text-green-600 hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  {["Order", "Customer", "Total", "Status"].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-2.5 pr-3 font-mono text-xs text-blue-600 font-semibold">{o.id}</td>
                    <td className="py-2.5 pr-3 text-gray-700 text-xs whitespace-nowrap">{o.customer.name}</td>
                    <td className="py-2.5 pr-3 font-semibold text-gray-800 text-xs">${o.total.toFixed(2)}</td>
                    <td className="py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[o.orderStatus]}`}>
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Widget */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-500" /> Stock Alerts
            </h2>
            <Link to={ROUTES.VENDOR_INVENTORY} className="text-xs text-green-600 hover:underline font-medium flex items-center gap-1">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          {lowStockItems.length + outOfStock.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">All products are well-stocked ✅</p>
          ) : (
            <div className="flex flex-col gap-2">
              {[...outOfStock, ...lowStockItems].slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-1.5">
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-gray-100 shrink-0" />
                  <p className="text-sm text-gray-700 flex-1 truncate">{p.name}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${stockBadgeClass(p.stock)}`}>
                    {stockLabel(p.stock)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row: Top Selling + Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={16} className="text-green-600" /> Top Products
            </h2>
            <Link to={ROUTES.VENDOR_PRODUCTS} className="text-xs text-green-600 hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 py-1">
                <span className="text-xs font-bold text-gray-400 w-4 shrink-0">#{i + 1}</span>
                <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-gray-100 shrink-0" />
                <p className="text-sm text-gray-700 flex-1 truncate">{p.name}</p>
                <p className="text-sm font-bold text-gray-900 shrink-0">${p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Star size={16} className="text-yellow-400" /> Recent Reviews
              <span className="text-xs text-gray-400 font-normal">avg {avgRating}⭐</span>
            </h2>
            <Link to={ROUTES.VENDOR_REVIEWS} className="text-xs text-green-600 hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentReviews.map((r) => (
              <div key={r.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {r.customer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={11} className={i < r.rating ? "text-yellow-400" : "text-gray-200"} fill={i < r.rating ? "currentColor" : "none"} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{r.product}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">"{r.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
