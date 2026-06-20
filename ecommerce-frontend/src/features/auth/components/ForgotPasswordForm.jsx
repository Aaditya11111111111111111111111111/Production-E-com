import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { forgotPasswordSchema } from "@/validations";

const ForgotPasswordForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        id="forgot-email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Button type="submit" fullWidth loading={loading}>
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
