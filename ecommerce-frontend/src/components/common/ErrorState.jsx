/**
 * Generic error state panel.
 * Props: title, message, onRetry
 */
const ErrorState = ({ title = "Something went wrong", message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
    <span className="text-5xl select-none">⚠️</span>
    <h2 className="text-lg font-bold text-gray-700">{title}</h2>
    {message && <p className="text-sm text-gray-400 max-w-xs">{message}</p>}
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 text-sm font-semibold text-green-600 hover:underline"
      >
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;
