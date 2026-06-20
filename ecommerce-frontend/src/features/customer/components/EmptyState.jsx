import { Link } from "react-router-dom";

/**
 * Reusable empty state.
 * Props: icon, title, description, actionLabel, actionTo, onAction
 */
const EmptyState = ({
  icon = "🔍",
  title = "Nothing here yet",
  description,
  actionLabel,
  actionTo,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
      <span className="text-6xl select-none">{icon}</span>
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      {description && (
        <p className="text-sm text-gray-400 max-w-xs">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-full transition text-sm"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-full transition text-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
