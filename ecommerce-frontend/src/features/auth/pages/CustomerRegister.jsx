import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Sparkles, Gift, Heart, Lock } from "lucide-react";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import CustomerRegisterForm from "../components/CustomerRegisterForm";
import { ROUTES } from "@/constants/routes";
import logo from "@/assets/images/logo.png";

const perks = [
  { icon: Sparkles, text: "Personalised recommendations" },
  { icon: Gift,     text: "Member-only discounts" },
  { icon: Heart,    text: "Save items to wishlist" },
  { icon: Lock,     text: "Safe & secure payments" },
];

const BrandPanel = () => (
  <>
    <div>
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-15 w-auto object-contain brightness-0 invert" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Join Today</p>
      <h2 className="text-2xl font-bold leading-snug">
        Start your<br />shopping journey.
      </h2>
      <p className="mt-3 text-sm text-blue-100/80 leading-relaxed">
        Create a free account and unlock a world of products.
      </p>
      <ul className="mt-8 space-y-3">
        {perks.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-blue-100">
            <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
              <Icon size={14} />
            </div>
            {text}
          </li>
        ))}
      </ul>
    </div>
    <p className="text-xs text-blue-200/40">© 2025 ECommerce</p>
  </>
);

function CustomerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Customer register:", data);
      toast.success("Account created! Please login.");
      navigate(ROUTES.CUSTOMER_LOGIN, { replace: true });
    } catch (err) {
      toast.error(err.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard accent="blue" panel={<BrandPanel />}>
      <AuthHeader
        tag="Customer"
        title="Create your account"
        subtitle="It's free and takes less than a minute"
      />
      <CustomerRegisterForm onSubmit={handleSubmit} loading={loading} />
      <p className="text-sm text-center text-gray-500 mt-6">
        Already have an account?{" "}
        <Link to={ROUTES.CUSTOMER_LOGIN} className="text-blue-600 font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

export default CustomerRegister;
