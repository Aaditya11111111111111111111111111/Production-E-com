import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { productSchema } from "@/validations/productSchemas";
import { categories } from "@/data/categories";
import ImageUploadPanel from "./ImageUploadPanel";

const STATUSES = [
  { value: "active",   label: "Active — visible to customers" },
  { value: "inactive", label: "Inactive — hidden from store" },
];

const ProductForm = ({
  defaultValues,
  onSubmit,
  loading = false,
  submitLabel = "Save Product",
}) => {
  const [images, setImages] = useState(
    defaultValues?.images?.length
      ? defaultValues.images
      : defaultValues?.image
        ? [defaultValues.image]
        : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      sku: "",
      price: "",
      discount: 0,
      stock: "",
      status: "active",
      image: "",
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data) => {
    // Inject image management data
    const primaryImage = images[0] || data.image || "";
    onSubmit({ ...data, image: primaryImage, images });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

      {/* Row 1: Name + Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="name"  label="Product Name" placeholder="e.g. Wireless Headphones" error={errors.name?.message}  required {...register("name")} />
        <Input id="brand" label="Brand"         placeholder="e.g. Sony"                error={errors.brand?.message} required {...register("brand")} />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Describe your product..."
          {...register("description")}
          className={`border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 resize-none ${
            errors.description ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
      </div>

      {/* Row 2: Category + SKU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            {...register("category")}
            className={`border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 bg-white ${
              errors.category ? "border-red-400" : "border-gray-200"
            }`}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
        </div>
        <Input id="sku" label="SKU" placeholder="e.g. PROD-001" error={errors.sku?.message} required {...register("sku")} />
      </div>

      {/* Row 3: Price + Discount + Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input id="price"    type="number" step="0.01" label="Price ($)"      placeholder="0.00" error={errors.price?.message}    required {...register("price")} />
        <Input id="discount" type="number" min="0" max="100" label="Discount (%)" placeholder="0"    error={errors.discount?.message} {...register("discount")} />
        <Input id="stock"    type="number" min="0" label="Stock"           placeholder="0"    error={errors.stock?.message}    required {...register("stock")} />
      </div>

      {/* Image Management */}
      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
        <ImageUploadPanel images={images} onChange={setImages} />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">Status</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {STATUSES.map((s) => (
            <label key={s.value} className="flex items-center gap-3 flex-1 border-2 rounded-xl px-4 py-3 cursor-pointer transition hover:border-green-300">
              <input type="radio" value={s.value} {...register("status")} className="accent-green-600" />
              <span className="text-sm text-gray-700">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" fullWidth loading={loading} className="bg-green-600 hover:bg-green-700 mt-2">
        {submitLabel}
      </Button>
    </form>
  );
};

export default ProductForm;
