import { useState } from "react";
import { Package, AlertTriangle, XCircle, CheckCircle, Layers } from "lucide-react";
import { useInventory } from "../hooks/useInventory";
import { useNotifications } from "@/context/NotificationContext";
import InventoryCard from "../components/InventoryCard";
import { stockBadgeClass, stockLabel } from "../utils/productHelpers";
import toast from "react-hot-toast";

function VendorInventory() {
  const { products, summary, updateStock } = useInventory();
  const { push } = useNotifications();
  const [edits, setEdits] = useState({});

  const handleChange = (id, val) => {
    setEdits((prev) => ({ ...prev, [id]: val }));
  };

  const handleSave = (product) => {
    const raw = edits[product.id];
    if (raw === undefined || raw === "") return;
    const qty = parseInt(raw, 10);
    if (isNaN(qty) || qty < 0) { toast.error("Enter a valid stock number"); return; }
    updateStock(product.id, qty);
    setEdits((prev) => { const n = { ...prev }; delete n[product.id]; return n; });

    // Fire notification for low/out
    if (qty === 0) push("error", `"${product.name}" is now Out of Stock.`);
    else if (qty < 10) push("warning", `"${product.name}" is low stock (${qty} left).`);
    else push("success", `Stock updated for "${product.name}" → ${qty} units.`);
  };

  const handleKeyDown = (e, product) => {
    if (e.key === "Enter") handleSave(product);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <p className="text-sm text-gray-500 mt-0.5">Monitor stock levels and update quantities.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <InventoryCard title="Total Products" value={summary.total}      color="bg-blue-50 text-blue-600"   icon={<Package size={18} />} />
        <InventoryCard title="In Stock"       value={summary.inStock}    color="bg-green-50 text-green-600" icon={<CheckCircle size={18} />} />
        <InventoryCard title="Low Stock"      value={summary.lowStock}   color="bg-yellow-50 text-yellow-600" icon={<AlertTriangle size={18} />} sub="< 10 units" />
        <InventoryCard title="Out of Stock"   value={summary.outOfStock} color="bg-red-50 text-red-500"     icon={<XCircle size={18} />} />
        <InventoryCard title="Total Units"    value={summary.totalUnits} color="bg-purple-50 text-purple-600" icon={<Layers size={18} />} />
      </div>

      {/* Low stock alert banner */}
      {summary.lowStock + summary.outOfStock > 0 && (
        <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-800">
          <AlertTriangle size={16} className="text-yellow-500 shrink-0" />
          <span>
            <strong>{summary.outOfStock}</strong> out of stock and <strong>{summary.lowStock}</strong> low stock products need attention.
          </span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                {["Product", "SKU", "Category", "Price", "Current Stock", "Update Stock", "Status"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                  {/* Product */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" />
                      <p className="font-medium text-gray-800 truncate max-w-[160px]">{p.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs font-mono">{p.sku}</td>
                  <td className="py-3 px-4 text-gray-500 capitalize">{p.category.replace("-", " ")}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">${p.price.toFixed(2)}</td>

                  {/* Current stock badge */}
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stockBadgeClass(p.stock)}`}>
                      {stockLabel(p.stock)}
                    </span>
                  </td>

                  {/* Inline stock editor */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={edits[p.id] ?? p.stock}
                        onChange={(e) => handleChange(p.id, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, p)}
                        className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-green-400 text-center"
                      />
                      <button
                        onClick={() => handleSave(p)}
                        disabled={edits[p.id] === undefined}
                        className="text-xs font-semibold bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg transition"
                      >
                        Save
                      </button>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorInventory;
