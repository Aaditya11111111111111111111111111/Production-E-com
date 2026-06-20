const PriceFilter = ({ min, max, value, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-gray-700">Price Range</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>${min}</span>
        <span className="font-semibold text-blue-600">${value}</span>
        <span>${max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600 cursor-pointer"
        aria-label="Maximum price"
      />
      <p className="text-xs text-gray-500">Up to ${value}</p>
    </div>
  );
};

export default PriceFilter;
