import { z } from "zod";

export const shippingSchema = z.object({
  fullName:    z.string().min(1, "Full name is required"),
  phone:       z.string().min(7, "Enter a valid phone number"),
  addressLine1:z.string().min(1, "Address is required"),
  addressLine2:z.string().optional(),
  city:        z.string().min(1, "City is required"),
  state:       z.string().min(1, "State is required"),
  zipCode:     z.string().min(3, "ZIP code is required"),
  country:     z.string().min(1, "Country is required"),
});
