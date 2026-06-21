import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { PlusSquare, Download } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useNotifications } from "@/context/NotificationContext";
import { usePagination } from "../hooks/usePagination";
import ProductTable from "../components/ProductTable";
import ProductFilters from "../components/ProductFilters";
import BulkActions from "../components/BulkActions";
import Pagination from "../components/Pagination";
import { exportProductsCSV } from "../utils/exportCSV";
import { ROUTES } from "@/constants/routes";

const INITIAL_FILTERS = {
  query:    "",
  category: "all",
  status:   "all",
  stock:    "all",
  sort:     "newest",
};

function applyFilters(products, filters) {
  let result = [...products];

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    );
  }
  if (filters.category !== "all") result = result.filter((p) => p.category === filters.category);
  if (filters.status   !== "all") result = result.filter((p) => p.status   === filters.status);
  if (filters.stock === "out")     result = result.filter((p) => p.stock === 0);
  else if (filters.stock === "low") result = result.filter((p) => p.stock > 0 && p.stock < 10);
  else if (filters.stock === "instock") result = result.filter((p) => p.stock > 0);

  switch (filters.sort) {
    case "oldest":     result.sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break;
    case "price_asc":  result.sort((a, b) => a.price - b.price); break;
    case "price_desc": result.sort((a, b) => b.price - a.price); break;
    default:           result.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
  }
  return result;
}

function VendorProducts() {
  const { products, stats, bulkDelete, bulkSetStatus } = useProducts();
  const { push } = useNotifications();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const filtered = useMemo(() => applyFilters(products, filters), [products, filters]);

  const { page, totalPages, paginated, setPage, goNext, goPrev, reset } = usePagination(filtered, 10);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setSelectedIds(new Set());
    reset();
  };

  // ── Selection ─────────────────────────────────────────────
  const handleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = () => {
    const pageIds = paginated.map((p) => p.id);
    const allSelected = pageIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      setSelectedIds((prev) => { const n = new Set(prev); pageIds.forEach((id) => n.delete(id)); return n; });
    } else {
      setSelectedIds((prev) => { const n = new Set(prev); pageIds.forEach((id) => n.add(id)); return n; });
    }
  };

  // ── Bulk actions ──────────────────────────────────────────
  const selectedArr = [...selectedIds];

  const handleBulkDelete = () => {
    if (!selectedArr.length) return;
    if (!window.confirm(`Delete ${selectedArr.length} product(s)?`)) return;
    bulkDelete(selectedArr);
    push("warning", `${selectedArr.length} product(s) deleted.`);
    setSelectedIds(new Set());
  };

  const handleBulkActivate = () => {
    bulkSetStatus(selectedArr, "active");
    push("success", `${selectedArr.length} product(s) activated.`);
    setSelectedIds(new Set());
  };

  const handleBulkDeactivate = () => {
    bulkSetStatus(selectedArr, "inactive");
    push("info", `${selectedArr.length} product(s) deactivated.`);
    setSelectedIds(new Set());
  };

  const handleExport = () => {
    exportProductsCSV(filtered);
    push("success", `Exported ${filtered.length} products to CSV.`);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {stats.total} total · {stats.active} active · {stats.outOfStock} out of stock
            {stats.lowStock > 0 && (
              <span className="ml-2 text-yellow-600 font-semibold">· {stats.lowStock} low stock</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-xl transition"
          >
            <Download size={15} /> Export CSV
          </button>
          <Link
            to={ROUTES.VENDOR_ADD_PRODUCT}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl transition"
          >
            <PlusSquare size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters filters={filters} onChange={handleFilterChange} />

      {/* Bulk action bar */}
      <BulkActions
        count={selectedArr.length}
        onClear={() => setSelectedIds(new Set())}
        onDelete={handleBulkDelete}
        onActivate={handleBulkActivate}
        onDeactivate={handleBulkDeactivate}
      />

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-800">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <ProductTable
          products={paginated}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPage={setPage}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}

export default VendorProducts;
