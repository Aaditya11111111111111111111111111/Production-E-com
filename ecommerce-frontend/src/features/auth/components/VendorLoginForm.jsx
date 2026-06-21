import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { vendorLoginSchema } from "@/validations";
import { ROUTES } from "@/constants/routes";

const VendorLoginForm = ({ onSubmit, loading = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(vendorLoginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        id="vendor-email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="relative">
        <Input
          id="vendor-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          className="pr-10"
          {...register("password")}
        />
        <button type="button" onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-[36px] text-gray-400 hover:text-gray-600 transition"
          aria-label={showPassword ? "Hide password" : "Show password"}>
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
          <input type="checkbox" className="accent-violet-600 rounded" {...register("rememberMe")} />
          Remember me
        </label>
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-violet-600 hover:underline font-medium">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" variant="violet" fullWidth loading={loading} size="lg">
        Sign in
      </Button>
    </form>
  );
};

export default VendorLoginForm;
