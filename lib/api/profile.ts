// lib/api/profile.ts

import { api } from "./api-client";

/* =========================================================
   TYPES
   ========================================================= */

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface Address {
  id: number;
  user_id: number;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface AddressCreate {
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  is_default?: boolean;
}

export interface AddressUpdate {
  full_name?: string;
  phone?: string;
  address_line?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
}

/* =========================================================
   GET MY PROFILE
   ========================================================= */

export async function getMyProfile(): Promise<UserProfile> {
  return api.get<UserProfile>("/users/me");
}

/* =========================================================
   UPDATE MY PROFILE
   ========================================================= */

export async function updateMyProfile(
  data: {
    name?: string | null;
  },
): Promise<UserProfile> {
  return api.patch<UserProfile>(
    "/users/me",
    data,
  );
}

/* =========================================================
   GET MY ADDRESSES
   ========================================================= */

export async function getMyAddresses(): Promise<Address[]> {
  const data = await api.get<Address[]>(
    "/users/me/addresses",
  );

  if (!Array.isArray(data)) {
    throw new Error(
      "Invalid addresses response from server.",
    );
  }

  return data;
}

/* =========================================================
   CREATE ADDRESS
   ========================================================= */

export async function createAddress(
  data: AddressCreate,
): Promise<Address> {
  return api.post<Address>(
    "/users/me/addresses",
    {
      full_name:
        data.full_name.trim(),

      phone:
        data.phone.trim(),

      address_line:
        data.address_line.trim(),

      city:
        data.city.trim(),

      state:
        data.state.trim(),

      postal_code:
        data.postal_code.trim(),

      country:
        data.country?.trim() || "India",

      is_default:
        data.is_default ?? false,
    },
  );
}

/* =========================================================
   UPDATE ADDRESS
   ========================================================= */

export async function updateAddress(
  addressId: number,
  data: Partial<AddressCreate>,
): Promise<Address> {
  if (!addressId) {
    throw new Error(
      "Invalid address ID.",
    );
  }

  const cleanData: AddressUpdate = {};

  if (data.full_name !== undefined) {
    cleanData.full_name =
      data.full_name.trim();
  }

  if (data.phone !== undefined) {
    cleanData.phone =
      data.phone.trim();
  }

  if (data.address_line !== undefined) {
    cleanData.address_line =
      data.address_line.trim();
  }

  if (data.city !== undefined) {
    cleanData.city =
      data.city.trim();
  }

  if (data.state !== undefined) {
    cleanData.state =
      data.state.trim();
  }

  if (data.postal_code !== undefined) {
    cleanData.postal_code =
      data.postal_code.trim();
  }

  if (data.country !== undefined) {
    cleanData.country =
      data.country.trim();
  }

  if (data.is_default !== undefined) {
    cleanData.is_default =
      data.is_default;
  }

  return api.patch<Address>(
    `/users/me/addresses/${addressId}`,
    cleanData,
  );
}

/* =========================================================
   DELETE ADDRESS
   ========================================================= */

export async function deleteAddress(
  addressId: number,
): Promise<void> {
  if (!addressId) {
    throw new Error(
      "Invalid address ID.",
    );
  }

  await api.delete<void>(
    `/users/me/addresses/${addressId}`,
  );
}