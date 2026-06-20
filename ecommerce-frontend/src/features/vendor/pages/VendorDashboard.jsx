import { Link } from "react-router-dom";
import { Package, ShoppingBag, DollarSign, Clock, PlusSquare, ArrowRight } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import ProductTable from "../components/ProductTable";
import { ROUTES } from "@/constants/routes";

// Mock order data
const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Alice Johnson", total: 159.98, status: "pending",   date: "2024-06-01" },
  { id: "ORD-002", customer: "Bob Smith",     total: 79.99,  status: "delivered", date: "2024-06-02" },
  { id: "ORD-003", customer: "Carol White",   total: 249.97, status: "shipped",   date: "2024-06-03" },
  { id: "ORD-004", customer: "David Lee",     total: 19.99,  status: "pending",   date: "2024-06-04" },
];

const ORDER_STATUS_COLORS = {
  pending:   "bg-yellow-100 text-yellow-700",
  shipped:   "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

function VendorDashboard() {
  const { user } = useAuth();
  const { products, stats } = useProducts();

  const recentProducts = products.slice(0, 5);
  const pendingOrders  = MOCK_ORDERS.filter((o) => o.status === "pending").length;
  const totalRevenue   = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Good day, {user?.name} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's an overview of your store.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Products"
          value={stats.total}
          subtitle={`${stats.active} active`}
          icon={<Package size={22} />}
          color="bg-blue-50 text-blue-600"
        />
        <DashboardCard
          title="Total Orders"
          value={MOCK_ORDERS.length}
          subtitle="All time"
          icon={<ShoppingBag size={22} />}
          color="bg-purple-50 text-purple-600"
        />
        <DashboardCard
          title="Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          subtitle="Mock data"
          icon={<DollarSign size={22} />}
          color="bg-green-50 text-green-600"
        />
        <DashboardCard
          title="Pending Orders"
          value={pendingOrders}
          subtitle="Needs action"
          icon={<Clock size={22} />}
          color="bg-yellow-50 text-yellow-600"
        />
      </div>

      {/* Recent products */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Products</h2>
          <div className="flex gap-2">
            <Link
              to={ROUTES.VENDOR_ADD_PRODUCT}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
            >
              <PlusSquare size={14} /> Add
            </Link>
            <Link
              to={ROUTES.VENDOR_PRODUCTS}
              className="flex items-center gap-1 text-sm text-green-600 hover:underline"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <ProductTable products={recentProducts} />
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                {["Order ID", "Customer", "Total", "Status", "Date"].map((h) => (
                  <th key={h} className="pb-2 pr-4 font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 pr-4 font-mono text-xs text-blue-600">{o.id}</td>
                  <td className="py-3 pr-4 text-gray-700">{o.customer}</td>
                  <td className="py-3 pr-4 font-semibold text-gray-800">${o.total.toFixed(2)}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${ORDER_STATUS_COLORS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400 text-xs">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
