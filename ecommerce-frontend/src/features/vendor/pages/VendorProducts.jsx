import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PlusSquare, Search } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import ProductTable from "../components/ProductTable";
import { ROUTES } from "@/constants/routes";

function VendorProducts() {
  const { products, stats } = useProducts();
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = useMemo(() => {
    let result = products;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") {
      result = result.filter((p) => p.status === filterStatus);
    }
    return result;
  }, [products, query, filterStatus]);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {stats.total} total · {stats.active} active · {stats.outOfStock} out of stock
          </p>
        </div>
        <Link
          to={ROUTES.VENDOR_ADD_PRODUCT}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl transition"
        >
          <PlusSquare size={16} /> Add Product
        </Link>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <ProductTable products={filtered} />
      </div>
    </div>
  );
}

export default VendorProducts;
