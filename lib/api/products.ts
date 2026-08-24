import { api } from "./api-client";

export interface Product {
  id: number;
  vendor_id: number;
  category_id: number;
  subcategory_id?: number | null;
  brand_id?: number | null;

  category_name?: string | null;
  brand_name?: string | null;

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
  return api.get<Product>(`/products/${id}`);
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  sort_order: number;
  is_primary: boolean;
}

export async function getProductImages(
  productId: number,
): Promise<ProductImage[]> {
  return api.get<ProductImage[]>(
    `/products/${productId}/images`,
  );
}