import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { shippingSchema } from "@/validations/checkoutSchemas";

const COUNTRIES = ["United States", "United Kingdom", "India", "Canada", "Australia", "Germany"];

/**
 * Props:
 *   onSubmit(data)  – called with validated form data
 *   formId          – id to link an external submit button via form= attribute
 */
const ShippingAddressForm = ({ onSubmit, formId = "shipping-form" }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: "United States" },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="fullName"     label="Full Name"       placeholder="John Doe"      error={errors.fullName?.message}     {...register("fullName")} />
        <Input id="phone"        label="Phone Number"    placeholder="+1 555 000 000" error={errors.phone?.message}        {...register("phone")} type="tel" />
      </div>

      <Input id="addressLine1" label="Address Line 1" placeholder="123 Main Street"  error={errors.addressLine1?.message} {...register("addressLine1")} />
      <Input id="addressLine2" label="Address Line 2 (optional)" placeholder="Apt, Suite, Floor…" {...register("addressLine2")} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input id="city"    label="City"     placeholder="New York"  error={errors.city?.message}    {...register("city")} />
        <Input id="state"   label="State"    placeholder="NY"        error={errors.state?.message}   {...register("state")} />
        <Input id="zipCode" label="ZIP Code" placeholder="10001"     error={errors.zipCode?.message} {...register("zipCode")} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
        <select
          id="country"
          {...register("country")}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        >
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
      </div>
    </form>
  );
};

export default ShippingAddressForm;
