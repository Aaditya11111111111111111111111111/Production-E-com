const AvailabilityFilter = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-gray-700 mb-1">Availability</p>
      <label className="flex items-center gap-2 cursor-pointer group">
        <div
          onClick={() => onChange(!value)}
          role="switch"
          aria-checked={value}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onChange(!value)}
          className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            value ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              value ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-blue-600 transition">
          In Stock Only
        </span>
      </label>
    </div>
  );
};

export default AvailabilityFilter;
