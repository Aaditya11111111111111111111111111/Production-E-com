import { cn } from "@/utils/cn";

const Card = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md border p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
}) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className = "",
}) => (
  <h2
    className={cn(
      "text-xl font-semibold",
      className
    )}
  >
    {children}
  </h2>
);

export const CardContent = ({
  children,
  className = "",
}) => (
  <div className={cn(className)}>
    {children}
  </div>
);

export const CardFooter = ({
  children,
  className = "",
}) => (
  <div
    className={cn(
      "mt-4 flex justify-end",
      className
    )}
  >
    {children}
  </div>
);

export default Card;