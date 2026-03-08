import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { store, UserData } from "@/lib/crypto";

interface AuthCtx {
  isLoggedIn: boolean;
  user: UserData | null;
  login: (email: string, password: string) => string | null;
  signup: (data: UserData) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export const useAuth = () => useContext(AuthContext);

// Mock user for prototype - auto-login
const MOCK_USER: UserData = {
  fullName: "Demo User",
  email: "demo@celler.app",
  password: "demo123",
  username: "DEMO",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setLoggedIn] = useState(store.isLoggedIn());
  const [user, setUser] = useState<UserData | null>(store.getUser());

  // Auto-setup mock user on first load for prototype
  useEffect(() => {
    if (!store.getUser()) {
      store.setUser(MOCK_USER);
    }
    if (!store.isLoggedIn()) {
      store.login();
      setLoggedIn(true);
      setUser(store.getUser());
    }
  }, []);

  const login = useCallback((email: string, password: string): string | null => {
    const saved = store.getUser();
    if (!saved) return "No account found. Please sign up first.";
    if (saved.email !== email || saved.password !== password)
      return "Invalid email or password.";
    store.login();
    setLoggedIn(true);
    setUser(saved);
    return null;
  }, []);

  const signup = useCallback((data: UserData): string | null => {
    store.setUser(data);
    store.login();
    setLoggedIn(true);
    setUser(data);
    return null;
  }, []);

  const logout = useCallback(() => {
    store.logout();
    setLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
