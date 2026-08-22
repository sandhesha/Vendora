import { api } from "./api-client";

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  is_active: boolean;
}

export interface Subcategory {
  id: number;
  name: string;
  description?: string | null;
  category_id: number;
  is_active: boolean;
}

export async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>("/categories");
}

export async function getCategory(
  categoryId: number,
): Promise<Category> {
  return api.get<Category>(`/categories/${categoryId}`);
}

export async function getSubcategories(): Promise<Subcategory[]> {
  return api.get<Subcategory[]>("/subcategories");
}

export async function getSubcategory(
  subcategoryId: number,
): Promise<Subcategory> {
  return api.get<Subcategory>(
    `/subcategories/${subcategoryId}`,
  );
}