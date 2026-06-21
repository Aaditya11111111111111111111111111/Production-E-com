import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { vendorRegisterSchema } from "@/validations";

const VendorRegisterForm = ({ onSubmit, loading = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: { businessName: "", ownerName: "", email: "", password: "", confirmPassword: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="vendor-business-name"
          type="text"
          label="Business name"
          placeholder="Acme Store"
          error={errors.businessName?.message}
          {...register("businessName")}
        />
        <Input
          id="vendor-owner-name"
          type="text"
          label="Your name"
          placeholder="Jane Doe"
          error={errors.ownerName?.message}
          {...register("ownerName")}
        />
      </div>
      <Input
        id="vendor-reg-email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="relative">
        <Input
          id="vendor-reg-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          className="pr-10"
          {...register("password")}
        />
        <button type="button" onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-[36px] text-gray-400 hover:text-gray-600 transition"
          aria-label={showPassword ? "Hide" : "Show"}>
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      <div className="relative">
        <Input
          id="vendor-confirm-password"
          type={showConfirm ? "text" : "password"}
          label="Confirm password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          className="pr-10"
          {...register("confirmPassword")}
        />
        <button type="button" onClick={() => setShowConfirm((v) => !v)}
          className="absolute right-3 top-[36px] text-gray-400 hover:text-gray-600 transition"
          aria-label={showConfirm ? "Hide" : "Show"}>
          {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      <Button type="submit" variant="violet" fullWidth loading={loading} size="lg">
        Create vendor account
      </Button>
    </form>
  );
};

export default VendorRegisterForm;
