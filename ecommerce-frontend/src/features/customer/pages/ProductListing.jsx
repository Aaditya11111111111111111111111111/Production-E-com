import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products, MAX_PRICE } from "@/data/products";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";
import EmptyState from "../components/EmptyState";
import SearchAutocomplete from "../components/SearchAutocomplete";

// ── Default filter state ──────────────────────────────────────
const DEFAULT_FILTERS = {
  categories: [],
  maxPrice: MAX_PRICE,
  minRating: 0,
  inStockOnly: false,
};

// ── Sort helper ───────────────────────────────────────────────
function applySort(items, sortBy) {
  const arr = [...items];
  switch (sortBy) {
    case "price_asc":  return arr.sort((a, b) => a.price - b.price);
    case "price_desc": return arr.sort((a, b) => b.price - a.price);
    case "name_asc":   return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "rating":     return arr.sort((a, b) => b.rating - a.rating);
    case "newest":
    default:           return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }
}

function ProductListing() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") ?? "";
  const urlQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    categories: urlCategory ? [urlCategory] : [],
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Filter + search + sort ────────────────────────────────
  const filtered = useMemo(() => {
    let result = products;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filters.categories.length) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    result = result.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    return applySort(result, sort);
  }, [query, sort, filters]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setQuery("");
  };

  const activeFilterCount =
    filters.categories.length +
    (filters.maxPrice < MAX_PRICE ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <nav className="text-sm text-gray-500 flex items-center gap-1">
        <Link to="/customer" className="hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Products</span>
      </nav>

      {/* ── Heading + Search ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Inline search with autocomplete */}
        <div className="w-full sm:w-72">
          <SearchAutocomplete
            variant="inline"
            initialValue={urlQuery}
            placeholder="Search products..."
            onQueryChange={setQuery}
          />
        </div>
      </div>

      {/* ── Controls row ────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="hidden lg:flex items-center gap-1 text-xs text-red-500 hover:underline"
            >
              <X size={13} /> Clear filters
            </button>
          )}
        </div>

        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {/* ── Layout: sidebar + grid ───────────────────────────── */}
      <div className="flex gap-6 items-start">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-60 shrink-0">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
          />
        </div>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative ml-auto w-72 h-full bg-white overflow-y-auto shadow-xl p-4">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No products found"
              description="Try adjusting your search or filters to find what you're looking for."
              actionLabel="Clear filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
