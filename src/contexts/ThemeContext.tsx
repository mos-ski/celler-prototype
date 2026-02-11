import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeMode = "dark" | "light" | "system";

interface ThemeCtx {
  theme: ThemeMode;
  setThemeMode: (m: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ theme: "dark", setThemeMode: () => {}, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode) {
  const resolved = mode === "system" ? getSystemTheme() : mode;
  document.documentElement.classList.toggle("light", resolved === "light");
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("cex_theme");
    return (saved === "light" || saved === "dark" || saved === "system") ? saved : "dark";
  });

  useEffect(() => {
    localStorage.setItem("cex_theme", theme);
    applyTheme(theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const setThemeMode = (m: ThemeMode) => setTheme(m);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
