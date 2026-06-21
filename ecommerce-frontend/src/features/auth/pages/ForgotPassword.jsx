import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import AuthCard from "../components/AuthCard";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { ROUTES } from "@/constants/routes";

const BrandPanel = () => (
  <>
    <div>
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-8">
        <span className="text-white font-bold text-lg">E</span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Account Recovery</p>
      <h2 className="text-2xl font-bold leading-snug">
        We've got<br />you covered.
      </h2>
      <p className="mt-3 text-sm text-blue-100/80 leading-relaxed">
        Enter your email and we'll send you a secure link to reset your password.
      </p>
      <div className="mt-8 flex items-start gap-3">
        <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
          <Mail size={15} />
        </div>
        <p className="text-sm text-blue-100/70 leading-relaxed">
          Check your spam folder if you don't see the email within a few minutes.
        </p>
      </div>
    </div>
    <p className="text-xs text-blue-200/40">© 2025 ECommerce</p>
  </>
);

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Forgot password:", data);
      toast.success("Reset link sent if email exists.");
      setSent(true);
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard accent="blue" panel={<BrandPanel />}>
      <div className="mb-7">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
          Password Reset
        </span>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Forgot your password?</h1>
        <p className="text-sm text-gray-500 mt-1">No worries, we'll send you reset instructions.</p>
      </div>

      {sent ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 text-center">
          ✅ Check your inbox for the reset link.
        </div>
      ) : (
        <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />
      )}

      <p className="text-sm text-center text-gray-500 mt-6">
        <Link to={ROUTES.CUSTOMER_LOGIN} className="inline-flex items-center gap-1 text-gray-500 hover:text-blue-600 font-medium transition">
          <ArrowLeft size={14} /> Back to login
        </Link>
      </p>
    </AuthCard>
  );
}

export default ForgotPassword;
