import { ArrowUpDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "newest",     label: "Newest" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc",   label: "Name: A–Z" },
  { value: "rating",     label: "Highest Rated" },
];

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={16} className="text-gray-400 shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
