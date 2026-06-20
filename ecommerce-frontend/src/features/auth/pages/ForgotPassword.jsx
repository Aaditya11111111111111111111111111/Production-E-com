import { useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { ROUTES } from "@/constants/routes";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // TODO: call reset password API
      console.log("Forgot password:", data);
      toast.success("If that email exists, a reset link has been sent.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot Password"
        subtitle="Enter your email and we'll send you a reset link"
      />
      <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />
      <AuthFooter text="Remember your password?" linkLabel="Login" linkTo={ROUTES.CUSTOMER_LOGIN} />
    </AuthCard>
  );
}

export default ForgotPassword;
