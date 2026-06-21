import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/categories";

/**
 * Product filter bar for VendorProducts page.
 * Props: filters (object), onChange(key, value)
 */
const ProductFilters = ({ filters, onChange }) => (
  <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
    {/* Search */}
    <div className="relative flex-1 min-w-[180px]">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={filters.query}
        onChange={(e) => onChange("query", e.target.value)}
        placeholder="Search by name or SKU..."
        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 bg-white"
      />
    </div>

    {/* Category */}
    <select
      value={filters.category}
      onChange={(e) => onChange("category", e.target.value)}
      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="all">All Categories</option>
      {categories.map((c) => (
        <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
      ))}
    </select>

    {/* Status */}
    <select
      value={filters.status}
      onChange={(e) => onChange("status", e.target.value)}
      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="all">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

    {/* Stock */}
    <select
      value={filters.stock}
      onChange={(e) => onChange("stock", e.target.value)}
      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="all">All Stock</option>
      <option value="instock">In Stock</option>
      <option value="low">Low Stock (&lt;10)</option>
      <option value="out">Out of Stock</option>
    </select>

    {/* Sort */}
    <select
      value={filters.sort}
      onChange={(e) => onChange("sort", e.target.value)}
      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="price_asc">Price: Low → High</option>
      <option value="price_desc">Price: High → Low</option>
    </select>
  </div>
);

export default ProductFilters;
