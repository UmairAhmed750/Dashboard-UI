"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  // Load initial theme from HTML class or localStorage
  React.useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark") || 
                        localStorage.getItem("theme") === "dark";
    setIsDark(isDarkTheme);
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-secondary hover:bg-accent text-foreground transition-all cursor-pointer active:scale-95 shadow-sm"
    >
      {isDark ? (
        <Sun size={16} className="text-yellow-500" />
      ) : (
        <Moon size={16} className="text-slate-700" />
      )}
    </button>
  );
}