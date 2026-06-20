/**
 * Props: title, value, subtitle, icon (JSX), color (Tailwind bg class)
 */
const DashboardCard = ({ title, value, subtitle, icon, color = "bg-blue-50 text-blue-600" }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-6 flex items-start justify-between gap-4">
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${color}`}>
      {icon}
    </div>
  </div>
);

export default DashboardCard;
