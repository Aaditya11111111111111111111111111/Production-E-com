import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingBag, Star, Truck, Shield } from "lucide-react";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import CustomerLoginForm from "../components/CustomerLoginForm";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";
import logo from "@/assets/images/logo.png";

const perks = [
  { icon: ShoppingBag, text: "Thousands of products" },
  { icon: Star,        text: "Exclusive member deals" },
  { icon: Truck,       text: "Fast & reliable delivery" },
  { icon: Shield,      text: "Secure & safe checkout" },
];

const BrandPanel = () => (
  <>
    <div>
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-15 w-auto object-contain brightness-0 invert" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Customer Portal</p>
      <h2 className="text-2xl font-bold leading-snug">
        Shop smarter,<br />live better.
      </h2>
      <p className="mt-3 text-sm text-blue-100/80 leading-relaxed">
        Sign in to access your orders, wishlist, and exclusive deals.
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

function CustomerLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      login({ email: data.email, password: data.password, role: "customer" });
      toast.success("Welcome back!");
      navigate(ROUTES.CUSTOMER, { replace: true });
    } catch (err) {
      toast.error(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard accent="blue" panel={<BrandPanel />}>
      <AuthHeader
        tag="Customer"
        title="Welcome back"
        subtitle="Sign in to continue shopping"
      />
      <CustomerLoginForm onSubmit={handleSubmit} loading={loading} />
      <p className="text-sm text-center text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link to={ROUTES.CUSTOMER_REGISTER} className="text-blue-600 font-semibold hover:underline">
          Create one
        </Link>
      </p>
      <p className="text-xs text-center text-gray-400 mt-3">
        Are you a vendor?{" "}
        <Link to={ROUTES.VENDOR_LOGIN} className="text-gray-500 hover:underline">
          Vendor login
        </Link>
      </p>
    </AuthCard>
  );
}

export default CustomerLogin;
