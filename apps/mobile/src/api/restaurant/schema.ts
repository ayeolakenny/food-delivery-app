import z from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().trim().min(1, "Restaurant name is required"),
  description: z.string().trim().optional(),
  address: z.string().trim().min(1, "Address is required"),
  cuisineType: z.string().trim().min(1, "Cuisine type is required"),
});

export const updateRestaurantSchema = z.object({
  name: z.string().trim().optional(),
  description: z.string().trim().optional(),
  address: z.string().trim().optional(),
  cuisineType: z.string().trim().optional(),
  imageUrl: z.string().trim().optional(),
  isOpen: z.boolean().optional(),
});