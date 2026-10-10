import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const getInitialTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("wec-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (savedTheme === "light" || (savedTheme === null && prefersLight)) {
      return "light";
    }
  }
  return "dark";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    // Sync the initial theme to DOM in case the script tag was missing or out of sync
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("wec-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.dispatchEvent(new Event("wec-theme-change"));
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <div className={`${styles.icon} ${theme === "dark" ? styles.dark : styles.light}`} />
    </button>
  );
}
