import { X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import { MAX_PRICE } from "@/data/products";

const FilterSidebar = ({ filters, onChange, onReset, onClose }) => {
  const set = (key) => (val) => onChange({ ...filters, [key]: val });

  return (
    <aside className="flex flex-col gap-6 bg-white rounded-2xl border shadow-sm p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-xs text-blue-600 hover:underline"
          >
            Reset all
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 lg:hidden"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <hr className="border-gray-100" />

      <CategoryFilter selected={filters.categories} onChange={set("categories")} />
      <hr className="border-gray-100" />
      <PriceFilter min={0} max={MAX_PRICE} value={filters.maxPrice} onChange={set("maxPrice")} />
      <hr className="border-gray-100" />
      <RatingFilter selected={filters.minRating} onChange={set("minRating")} />
      <hr className="border-gray-100" />
      <AvailabilityFilter value={filters.inStockOnly} onChange={set("inStockOnly")} />
    </aside>
  );
};

export default FilterSidebar;
