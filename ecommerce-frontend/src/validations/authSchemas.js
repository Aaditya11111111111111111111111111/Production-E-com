import { z } from "zod";

const emailField = z.string().min(1, "Email is required").email("Enter a valid email address");

const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters");

// ── Customer Login ──────────────────────────────────────────
export const customerLoginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// ── Vendor Login ────────────────────────────────────────────
export const vendorLoginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// ── Customer Register ────────────────────────────────────────
export const customerRegisterSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required").min(2, "Name is too short"),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ── Vendor Register ──────────────────────────────────────────
export const vendorRegisterSchema = z
  .object({
    businessName: z.string().min(1, "Business name is required"),
    ownerName: z.string().min(1, "Owner name is required"),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ── Forgot Password ──────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: emailField,
});
