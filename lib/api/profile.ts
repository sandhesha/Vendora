const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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

function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
}

export async function getMyProfile(): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  return response.json();
}

export async function updateMyProfile(
  data: { name?: string | null }
): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update profile");
  }

  return response.json();
}

export async function getMyAddresses(): Promise<Address[]> {
  const response = await fetch(`${API_URL}/users/me/addresses`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to load addresses");
  }

  return response.json();
}

export async function createAddress(
  data: AddressCreate
): Promise<Address> {
  const response = await fetch(`${API_URL}/users/me/addresses`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create address");
  }

  return response.json();
}

export async function updateAddress(
  addressId: number,
  data: Partial<AddressCreate>
): Promise<Address> {
  const response = await fetch(
    `${API_URL}/users/me/addresses/${addressId}`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update address");
  }

  return response.json();
}

export async function deleteAddress(
  addressId: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/users/me/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete address");
  }
}
