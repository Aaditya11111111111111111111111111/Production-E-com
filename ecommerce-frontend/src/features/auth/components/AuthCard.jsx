import Card from "@/components/ui/Card";

const AuthCard = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className={`w-full max-w-md ${className}`}>
        {children}
      </Card>
    </div>
  );
};

export default AuthCard;
