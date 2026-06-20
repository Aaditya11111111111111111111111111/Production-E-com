/**
 * Generic placeholder for vendor pages not yet built.
 * Usage: <VendorPlaceholder title="Analytics" icon="📊" />
 */
const VendorPlaceholder = ({ title, icon = "🚧" }) => (
  <div className="flex flex-col items-center justify-center py-28 gap-3 text-center">
    <span className="text-6xl">{icon}</span>
    <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
    <p className="text-gray-400 text-sm">This page is coming soon.</p>
  </div>
);

export default VendorPlaceholder;
