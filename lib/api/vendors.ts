
import { api } from "./api-client";

export interface Vendor {
  id: number;
  user_id: number;
  store_name: string;
  store_description?: string | null;
  phone?: string | null;
  approval_status: string;
  email?: string | null;
  products?: number;
  sales?: number;
}

export async function getVendors(): Promise<Vendor[]> {
  return api.get<Vendor[]>("/admin/vendors");
}

export async function getVendor(
  vendorId: number,
): Promise<Vendor> {
  return api.get<Vendor>(
    `/admin/vendors/${vendorId}`,
  );
}

export async function approveVendor(
  vendorId: number,
): Promise<Vendor> {
  return api.patch<Vendor>(
    `/admin/vendors/${vendorId}/approve`,
    {},
  );
}

export async function rejectVendor(
  vendorId: number,
): Promise<Vendor> {
  return api.patch<Vendor>(
    `/admin/vendors/${vendorId}/reject`,
    {},
  );
}