import { cn } from "@/utils/cn";

const Label = ({
  children,
  htmlFor,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "font-medium text-gray-700",
        className
      )}
    >
      {children}

      {required && (
        <span className="text-red-500 ml-1">*</span>
      )}
    </label>
  );
};

export default Label;