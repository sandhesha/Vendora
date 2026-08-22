import { api } from "./api-client";

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id: number | null;
  quantity: number;
}

export interface Cart {
  id: number;
  customer_id: number;
  items: CartItem[];
}

export interface AddCartItemRequest {
  product_id: number;
  variant_id?: number | null;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export async function getCart(
  customerId: number,
): Promise<Cart> {
  return api.get<Cart>(
    `/customers/${customerId}/cart`,
  );
}

export async function addCartItem(
  customerId: number,
  data: AddCartItemRequest,
): Promise<CartItem> {
  return api.post<CartItem>(
    `/customers/${customerId}/cart/items`,
    data,
  );
}

export async function updateCartItem(
  itemId: number,
  data: UpdateCartItemRequest,
): Promise<CartItem> {
  return api.patch<CartItem>(
    `/cart/items/${itemId}`,
    data,
  );
}

export async function deleteCartItem(
  itemId: number,
): Promise<{ message: string }> {
  return api.delete<{ message: string }>(
    `/cart/items/${itemId}`,
  );
}