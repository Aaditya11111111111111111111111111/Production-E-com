import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import AuthDivider from "../components/AuthDivider";
import CustomerRegisterForm from "../components/CustomerRegisterForm";
import { ROUTES } from "@/constants/routes";

function CustomerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // TODO: call register API
      console.log("Customer register:", data);
      toast.success("Account created! Please login.");
      navigate(ROUTES.CUSTOMER_LOGIN, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Create Account" subtitle="Sign up as a customer" />
      <CustomerRegisterForm onSubmit={handleSubmit} loading={loading} />
      <AuthDivider />
      <AuthFooter text="Already have an account?" linkLabel="Login" linkTo={ROUTES.CUSTOMER_LOGIN} />
    </AuthCard>
  );
}

export default CustomerRegister;
