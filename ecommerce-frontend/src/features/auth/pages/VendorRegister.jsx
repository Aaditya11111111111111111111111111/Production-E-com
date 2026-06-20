import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import AuthDivider from "../components/AuthDivider";
import VendorRegisterForm from "../components/VendorRegisterForm";
import { ROUTES } from "@/constants/routes";

function VendorRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // TODO: call register API
      console.log("Vendor register:", data);
      toast.success("Vendor account created! Please login.");
      navigate(ROUTES.VENDOR_LOGIN, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Create Vendor Account" subtitle="Start selling on our platform" />
      <VendorRegisterForm onSubmit={handleSubmit} loading={loading} />
      <AuthDivider />
      <AuthFooter text="Already have an account?" linkLabel="Login" linkTo={ROUTES.VENDOR_LOGIN} />
    </AuthCard>
  );
}

export default VendorRegister;
