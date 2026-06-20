import { z } from "zod";

export const productSchema = z.object({
  name:        z.string().min(1, "Product name is required").min(3, "Name must be at least 3 characters"),
  description: z.string().min(1, "Description is required").min(10, "Description too short"),
  category:    z.string().min(1, "Category is required"),
  brand:       z.string().min(1, "Brand is required"),
  sku:         z.string().min(1, "SKU is required"),
  price:       z.coerce.number({ invalid_type_error: "Enter a valid price" }).positive("Price must be greater than 0"),
  discount:    z.coerce.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%"),
  stock:       z.coerce.number({ invalid_type_error: "Enter a valid stock" }).int("Stock must be a whole number").min(0, "Stock cannot be negative"),
  status:      z.enum(["active", "inactive"]),
  image:       z.string().optional(),
});
