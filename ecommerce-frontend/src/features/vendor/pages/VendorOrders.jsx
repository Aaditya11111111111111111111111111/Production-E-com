import { useState, useMemo } from "react";
import { Eye, Search } from "lucide-react";
import { ORDERS, ORDER_STATUSES, STATUS_COLORS } from "@/mock/orders";
import OrderDetailsModal from "../components/OrderDetailsModal";

const STORAGE_KEY = "vendor_order_statuses";

function loadStatuses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch { return {}; }
}

function VendorOrders() {
  const [overrides, setOverrides] = useState(loadStatuses);
  const [selected, setSelected] = useState(null);
  const [query, setQuery]   = useState("");
  const [filter, setFilter] = useState("all");

  // Merge persisted status overrides into ORDERS
  const orders = useMemo(() =>
    ORDERS.map((o) => ({ ...o, orderStatus: overrides[o.id] ?? o.orderStatus })),
    [overrides]
  );

  const filtered = useMemo(() => {
    let result = orders;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (o) => o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q)
      );
    }
    if (filter !== "all") result = result.filter((o) => o.orderStatus === filter);
    return result;
  }, [orders, query, filter]);

  const handleStatusChange = (id, newStatus) => {
    const updated = { ...overrides, [id]: newStatus };
    setOverrides(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Keep modal in sync
    if (selected?.id === id) setSelected((prev) => ({ ...prev, orderStatus: newStatus }));
  };

  const counts = useMemo(() => {
    const c = { all: orders.length };
    ORDER_STATUSES.forEach((s) => { c[s] = orders.filter((o) => o.orderStatus === s).length; });
    return c;
  }, [orders]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">{counts.all} total orders</p>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...ORDER_STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
              filter === s
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s} {counts[s] > 0 && <span>({counts[s]})</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search order ID or customer..."
          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                {["Order ID","Customer","Products","Total","Payment","Status","Date",""].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-16 text-center text-gray-400">No orders found</td></tr>
              ) : filtered.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 font-semibold">{o.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {o.customer.avatar}
                      </div>
                      <span className="text-gray-700 whitespace-nowrap">{o.customer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{o.products.length} item{o.products.length !== 1 ? "s" : ""}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">${o.total.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-500 capitalize">
                    {o.paymentMethod === "cod" ? "COD" : o.paymentMethod.toUpperCase()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 outline-none cursor-pointer capitalize ${STATUS_COLORS[o.orderStatus]}`}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs whitespace-nowrap">{o.date}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelected(o)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <OrderDetailsModal
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default VendorOrders;
