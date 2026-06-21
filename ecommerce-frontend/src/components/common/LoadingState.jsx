import Spinner from "@/components/ui/Spinner";

/**
 * Full-area loading state with optional message.
 * Props: message, fullPage (boolean)
 */
const LoadingState = ({ message = "Loading...", fullPage = false }) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 text-gray-400 ${
      fullPage ? "min-h-screen" : "py-24"
    }`}
    role="status"
    aria-live="polite"
  >
    <Spinner size="lg" />
    <p className="text-sm">{message}</p>
  </div>
);

export default LoadingState;
