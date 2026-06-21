import { Link } from "react-router-dom";

/**
 * Generic empty state panel.
 * Props: icon, title, description, actionLabel, actionTo, onAction
 */
const EmptyState = ({ icon = "📭", title = "Nothing here", description, actionLabel, actionTo, onAction }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
    <span className="text-5xl select-none">{icon}</span>
    <h2 className="text-lg font-bold text-gray-700">{title}</h2>
    {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
    {actionLabel && actionTo && (
      <Link
        to={actionTo}
        className="mt-2 inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
      >
        {actionLabel}
      </Link>
    )}
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="mt-2 inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
