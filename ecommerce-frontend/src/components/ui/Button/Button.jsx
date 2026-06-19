import { cn } from "@/utils/cn";

const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border border-gray-400 hover:bg-gray-100",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "px-4 py-2 rounded-md transition font-medium",
        variants[variant],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;