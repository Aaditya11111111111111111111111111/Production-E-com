/**
 * Summary card for the Inventory page.
 * Props: title, value, sub, color (Tailwind bg+text pair), icon (JSX)
 */
const InventoryCard = ({ title, value, sub, color = "bg-blue-50 text-blue-600", icon }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-start justify-between gap-4">
    <div>
      <p className="text-xs text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      {icon}
    </div>
  </div>
);

export default InventoryCard;
