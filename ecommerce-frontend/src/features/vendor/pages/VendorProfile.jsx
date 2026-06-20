import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Save } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const STORAGE_KEY = "vendor_profile";

const profileSchema = z.object({
  storeName:   z.string().min(1, "Store name is required"),
  ownerName:   z.string().min(1, "Owner name is required"),
  email:       z.string().email("Enter a valid email"),
  phone:       z.string().min(7, "Enter a valid phone number"),
  address:     z.string().min(1, "Address is required"),
  description: z.string().optional(),
  logoUrl:     z.string().optional(),
  bannerUrl:   z.string().optional(),
});

const DEFAULT_PROFILE = {
  storeName:   "Acme Store",
  ownerName:   "Jane Vendor",
  email:       "vendor@test.com",
  phone:       "+1 555-1234",
  address:     "456 Commerce Ave, New York, NY 10001",
  description: "We sell premium quality products across electronics, fashion, and home goods.",
  logoUrl:     "",
  bannerUrl:   "",
};

function loadProfile() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : DEFAULT_PROFILE;
  } catch { return DEFAULT_PROFILE; }
}

function VendorProfile() {
  const [saving, setSaving] = useState(false);
  const saved = loadProfile();

  const { register, handleSubmit, watch, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: saved,
  });

  const logoUrl   = watch("logoUrl");
  const bannerUrl = watch("bannerUrl");

  const onSubmit = (data) => {
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaving(false);
      toast.success("Profile saved!");
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your store information.</p>
      </div>

      {/* Banner preview */}
      <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 border">
        {bannerUrl && (
          <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
        )}
        {!bannerUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
            Banner preview
          </div>
        )}

        {/* Logo overlay */}
        <div className="absolute bottom-0 left-6 translate-y-1/2">
          <div className="w-16 h-16 rounded-xl border-4 border-white bg-green-600 overflow-hidden flex items-center justify-center shadow-md">
            {logoUrl
              ? <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              : <span className="text-white font-bold text-xl">V</span>
            }
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-6 bg-white rounded-2xl border shadow-sm p-6">

        {/* Image URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="logoUrl"   label="Store Logo URL"   placeholder="https://..." {...register("logoUrl")}   error={errors.logoUrl?.message} />
          <Input id="bannerUrl" label="Banner Image URL" placeholder="https://..." {...register("bannerUrl")} error={errors.bannerUrl?.message} />
        </div>

        <hr className="border-gray-100" />

        {/* Basic info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="storeName" label="Store Name"  placeholder="My Awesome Store" required {...register("storeName")} error={errors.storeName?.message} />
          <Input id="ownerName" label="Owner Name"  placeholder="Jane Doe"         required {...register("ownerName")} error={errors.ownerName?.message} />
          <Input id="email"     label="Email"        type="email" placeholder="store@email.com" required {...register("email")} error={errors.email?.message} />
          <Input id="phone"     label="Phone"        type="tel"   placeholder="+1 555-0000"      required {...register("phone")} error={errors.phone?.message} />
        </div>

        <Input id="address" label="Address" placeholder="Street, City, State, ZIP" required {...register("address")} error={errors.address?.message} />

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Store Description</label>
          <textarea
            id="description"
            rows={3}
            placeholder="Tell customers about your store..."
            {...register("description")}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 resize-none"
          />
        </div>

        <Button
          type="submit"
          loading={saving}
          className="bg-green-600 hover:bg-green-700 w-fit flex items-center gap-2"
        >
          <Save size={15} /> Save Profile
        </Button>
      </form>
    </div>
  );
}

export default VendorProfile;
