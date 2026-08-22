import { api } from "./api-client";

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number | null;
  product_name: string;
  sku: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customer_id: number;
  vendor_id: number;
  address_id: number;
  order_number: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  address_id: number;
  payment_method: string;
}

export async function createOrders(
  customerId: number,
  data: CreateOrderRequest,
): Promise<Order[]> {
  return api.post<Order[]>(
    `/customers/${customerId}/orders`,
    data,
  );
}

export async function getCustomerOrders(
  customerId: number,
): Promise<Order[]> {
  return api.get<Order[]>(
    `/customers/${customerId}/orders`,
  );
}