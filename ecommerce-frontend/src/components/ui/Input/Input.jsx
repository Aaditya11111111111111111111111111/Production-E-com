import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import Label from "../Label";

const Input = forwardRef(
  ({ label, error, className = "", id, required = false, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900",
            "placeholder:text-gray-400",
            "outline-none transition-all duration-150",
            "focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-100",
            error && "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
