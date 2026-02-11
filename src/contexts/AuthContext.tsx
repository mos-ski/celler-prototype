import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setLoggedIn] = useState(store.isLoggedIn());
  const [user, setUser] = useState<UserData | null>(store.getUser());

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
