/**
 * Props: title, value, growth, icon (JSX), color
 */
const AnalyticsCard = ({ title, value, growth, icon, color = "bg-blue-50 text-blue-600" }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-start justify-between gap-4">
    <div className="flex flex-col gap-1">
      <p className="text-xs text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {growth && (
        <p className={`text-xs font-semibold ${growth.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
          {growth} vs last month
        </p>
      )}
    </div>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      {icon}
    </div>
  </div>
);

export default AnalyticsCard;
