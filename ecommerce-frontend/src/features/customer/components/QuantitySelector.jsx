import { Minus, Plus } from "lucide-react";

/**
 * Props: value, onChange, min (default 1), max (default 99)
 */
const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <Minus size={16} />
      </button>

      <span className="w-12 text-center text-sm font-semibold text-gray-800 select-none">
        {value}
      </span>

      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;
