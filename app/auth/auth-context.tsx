"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface User {
    id: number;
    name: string;
    email: string;
    role: "customer" | "vendor" | "admin" | string;
    is_active: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    /* IMPORTANT */
    loading: boolean;

    login: (user: User, token: string) => void;
    logout: () => void;
    refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("vendora_token");

        if (!storedToken) {
            setLoading(false);
            return;
        }

        setToken(storedToken);

        const loadUser = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    localStorage.removeItem("vendora_token");
                    setToken(null);
                    setUser(null);
                    return;
                }

                const data: User = await response.json();

                setUser(data);
            } catch (error) {
                console.error(
                    "Failed to fetch current user:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (
        loggedInUser: User,
        accessToken: string
    ) => {
        localStorage.setItem(
            "vendora_token",
            accessToken
        );

        setToken(accessToken);
        setUser(loggedInUser);
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem("vendora_token");

        setToken(null);
        setUser(null);
        setLoading(false);
    };

    const refreshUser = async (): Promise<User | null> => {
        const currentToken =
            token ||
            localStorage.getItem("vendora_token");

        if (!currentToken) {
            setUser(null);
            return null;
        }

        try {
            const response = await fetch(
                `${API_URL}/auth/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                return null;
            }

            const data: User = await response.json();

            setUser(data);
            setToken(currentToken);

            return data;
        } catch (error) {
            console.error(
                "Failed to refresh user:",
                error
            );

            return null;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated:
                    !!user && !!token,

                /* IMPORTANT */
                loading,

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
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}