import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TrendingUp, Globe, Zap, BadgeCheck } from "lucide-react";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import VendorRegisterForm from "../components/VendorRegisterForm";
import { ROUTES } from "@/constants/routes";
import logo from "@/assets/images/logo.png";

const perks = [
  { icon: Globe,       text: "Reach millions of shoppers" },
  { icon: TrendingUp,  text: "Grow revenue month over month" },
  { icon: Zap,         text: "Quick & easy product listing" },
  { icon: BadgeCheck,  text: "Verified vendor badge" },
];

const BrandPanel = () => (
  <>
    <div>
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-15 w-auto object-contain brightness-0 invert" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-200 mb-2">Become a Vendor</p>
      <h2 className="text-2xl font-bold leading-snug">
        Your store,<br />your success.
      </h2>
      <p className="mt-3 text-sm text-violet-100/80 leading-relaxed">
        Join our vendor community and start selling to a global audience today.
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

function VendorRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Vendor register:", data);
      toast.success("Vendor account created! Please login.");
      navigate(ROUTES.VENDOR_LOGIN, { replace: true });
    } catch (err) {
      toast.error(err.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard accent="violet" panel={<BrandPanel />}>
      <AuthHeader
        tag="Vendor"
        title="Start selling today"
        subtitle="Create your vendor account in minutes"
      />
      <VendorRegisterForm onSubmit={handleSubmit} loading={loading} />
      <p className="text-sm text-center text-gray-500 mt-6">
        Already have a vendor account?{" "}
        <Link to={ROUTES.VENDOR_LOGIN} className="text-violet-600 font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

export default VendorRegister;
