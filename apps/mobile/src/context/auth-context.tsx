import { deleteToken, getToken, saveToken } from "@/lib/auth";
import { api } from "@/api/axios";
import { User } from "@food-delivery/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  setSession: (session: { user: User; token: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkExistingSession();
  }, []);

  async function checkExistingSession() {
    try {
      const token = await getToken();
      if (token) {
        const res = await api.get("/auth/me");
        setUser(res.data);
        setToken(token);
      }
    } catch (e) {
      await deleteToken();
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await deleteToken();
    setUser(null);
    setToken(null);
  }

  async function setSession(session: { user: User; token: string }) {
    await saveToken(session.token);
    setUser(session.user);
    setToken(session.token);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, logout, setSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within a AuthProvider")
  return context;
}