import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z.string().email("Enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .optional(),
});

export const vendorRegisterSchema = z.object({
  ownerName: z
    .string()
    .min(2, "Owner name is required"),

  email: z
    .string()
    .email("Enter a valid email address"),

  phone: z
    .string()
    .min(10, "Enter a valid phone number"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  storeName: z
    .string()
    .min(2, "Store name is required"),

  storeDescription: z
    .string()
    .min(10, "Store description must be at least 10 characters"),

  address: z
    .string()
    .min(5, "Business address is required"),
});