import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Init from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
    } else {
      setDark(true);
    }
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center btn-press transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={16} className="text-gold" /> : <Moon size={16} className="text-foreground" />}
    </button>
  );
};

export default ThemeToggle;
