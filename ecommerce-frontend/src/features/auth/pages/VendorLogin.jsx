import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import AuthDivider from "../components/AuthDivider";
import VendorLoginForm from "../components/VendorLoginForm";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

function VendorLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      login({ email: data.email, password: data.password, role: "vendor" });
      toast.success("Welcome back!");
      navigate(ROUTES.VENDOR, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Welcome Back" subtitle="Sign in to your vendor account" />
      <VendorLoginForm onSubmit={handleSubmit} loading={loading} />
      <AuthDivider />
      <AuthFooter text="Don't have an account?" linkLabel="Register" linkTo={ROUTES.VENDOR_REGISTER} />
    </AuthCard>
  );
}

export default VendorLogin;
