import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Reusable spinner.
 * Props: size (sm|md|lg), className
 */
const sizeMap = { sm: 16, md: 24, lg: 36 };

const Spinner = ({ size = "md", className = "" }) => (
  <Loader2
    size={sizeMap[size] ?? 24}
    className={cn("animate-spin text-green-600", className)}
    aria-label="Loading"
  />
);

export default Spinner;
