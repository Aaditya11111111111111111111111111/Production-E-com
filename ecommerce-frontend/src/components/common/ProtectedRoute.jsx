import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

/**
 * Wraps a route so only authenticated users with the right role can access it.
 * Props:
 *   allowedRole  – "customer" | "vendor" | undefined (undefined = any logged-in user)
 *   redirectTo   – where to send guests (defaults to HOME)
 */
const ProtectedRoute = ({ children, allowedRole, redirectTo = ROUTES.HOME }) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) return <Navigate to={redirectTo} replace />;

  if (allowedRole && role !== allowedRole) {
    // Logged in but wrong role — send to their own dashboard
    const fallback = role === "vendor" ? ROUTES.VENDOR : ROUTES.CUSTOMER;
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;
