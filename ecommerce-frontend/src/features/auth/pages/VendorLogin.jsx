import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Store, BarChart2, Package, Users } from "lucide-react";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import VendorLoginForm from "../components/VendorLoginForm";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";
import logo from "@/assets/images/logo.png";

const perks = [
  { icon: Store,    text: "Manage your storefront" },
  { icon: BarChart2, text: "Real-time sales analytics" },
  { icon: Package,  text: "Order & inventory tracking" },
  { icon: Users,    text: "Customer insights & reviews" },
];

const BrandPanel = () => (
  <>
    <div>
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-15 w-auto object-contain brightness-0 invert" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-200 mb-2">Vendor Portal</p>
      <h2 className="text-2xl font-bold leading-snug">
        Sell more,<br />grow faster.
      </h2>
      <p className="mt-3 text-sm text-violet-100/80 leading-relaxed">
        Access your vendor dashboard, track orders, and manage your store.
      </p>
      <ul className="mt-8 space-y-3">
        {perks.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-violet-100">
            <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
              <Icon size={14} />
            </div>
            {text}
          </li>
        ))}
      </ul>
    </div>
    <p className="text-xs text-violet-200/40">© 2025 ECommerce</p>
  </>
);

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
      toast.error(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard accent="violet" panel={<BrandPanel />}>
      <AuthHeader
        tag="Vendor"
        title="Welcome back"
        subtitle="Sign in to your vendor dashboard"
      />
      <VendorLoginForm onSubmit={handleSubmit} loading={loading} />
      <p className="text-sm text-center text-gray-500 mt-6">
        Don't have a vendor account?{" "}
        <Link to={ROUTES.VENDOR_REGISTER} className="text-violet-600 font-semibold hover:underline">
          Apply now
        </Link>
      </p>
      <p className="text-xs text-center text-gray-400 mt-3">
        Looking to shop?{" "}
        <Link to={ROUTES.CUSTOMER_LOGIN} className="text-gray-500 hover:underline">
          Customer login
        </Link>
      </p>
    </AuthCard>
  );
}

export default VendorLogin;
