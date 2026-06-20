import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import Label from "../Label";

const Input = forwardRef(
  (
    {
      label,
      error,
      className = "",
      id,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        <input
          ref={ref}
          id={id}
          className={cn(
            "border rounded-md px-3 py-2 outline-none",
            "focus:ring-2 focus:ring-blue-500",
            error && "border-red-500",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;