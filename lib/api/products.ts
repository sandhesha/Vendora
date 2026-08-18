import { api } from "./api-client";

export interface Product {
  id: number;
  vendor_id: number;
  category_id: number;
  subcategory_id?: number | null;
  brand_id?: number | null;
  name: string;
  description?: string | null;
  sku: string;
  price: number;
  stock: number;
  image_url?: string | null;
  is_active: boolean;
}

export async function getProducts(): Promise<Product[]> {
  return api.get<Product[]>("/products");
}

export async function getProduct(
  id: number,
): Promise<Product> {
  return api.get<Product>(
    `/products/${id}`,
  );
}