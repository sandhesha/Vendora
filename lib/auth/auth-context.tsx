"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "admin" | "vendor" | "customer";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const TOKEN_KEY = "access_token";
const USER_KEY = "vendora_user";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);

      if (savedToken) {
        setToken(savedToken);
      }

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser) as User);
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  function login(newUser: User, newToken: string) {
  console.log("[AUTH] login() called");
  console.log("[AUTH] user:", newUser);
  console.log("[AUTH] token received:", Boolean(newToken));
  console.log("[AUTH] token length:", newToken?.length);

  localStorage.setItem(TOKEN_KEY, newToken);
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));

  console.log(
    "[AUTH] token stored:",
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );

  setToken(newToken);
  setUser(newUser);
}

  async function refreshUser() {
    const currentToken =
      token || localStorage.getItem(TOKEN_KEY);

    if (!currentToken) {
      return;
    }

    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh user");
    }

    const updatedUser = (await response.json()) as User;

    setUser(updatedUser);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(updatedUser),
    );
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}