import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary:   "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 hover:-translate-y-0.5",
    violet:    "bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-200 hover:-translate-y-0.5",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white shadow-sm hover:-translate-y-0.5",
    outline:   "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
    danger:    "bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200 hover:-translate-y-0.5",
    ghost:     "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 active:translate-y-0",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed translate-y-0",
        className
      )}
      {...props}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
