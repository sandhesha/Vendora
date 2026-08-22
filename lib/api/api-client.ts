const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  // Only set JSON content type when a body exists
  if (options.body !== undefined && options.body !== null) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  console.log(`[API] ${options.method || "GET"} ${url}`);

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("[API] Connection failed:", error);

    throw new Error(
      `Cannot connect to backend at ${API_BASE_URL}. Make sure FastAPI is running on port 8000.`,
    );
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const data = await response.json();

      if (data?.detail) {
        message =
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail);
      } else if (data?.message) {
        message = data.message;
      }
    } catch {
      // Response was not JSON
    }

    console.error(`[API] ${response.status}: ${message}`);

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text.trim()) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    console.error("[API] Invalid JSON response:", text);

    throw new Error("Backend returned an invalid JSON response.");
  }
}

export const api = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, {
      method: "GET",
    });
  },

  post<T>(
    endpoint: string,
    body?: unknown,
  ): Promise<T> {
    return request<T>(endpoint, {
      method: "POST",
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });
  },

  patch<T>(
    endpoint: string,
    body?: unknown,
  ): Promise<T> {
    return request<T>(endpoint, {
      method: "PATCH",
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });
  },

  put<T>(
    endpoint: string,
    body?: unknown,
  ): Promise<T> {
    return request<T>(endpoint, {
      method: "PUT",
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });
  },

  delete<T>(
    endpoint: string,
  ): Promise<T> {
    return request<T>(endpoint, {
      method: "DELETE",
    });
  },
};