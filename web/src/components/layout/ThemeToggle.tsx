import { useEffect, useState, useRef } from "react";
import styles from "./ThemeToggle.module.css";

const getInitialTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("wec-theme");
    if (savedTheme === "light") {
      return "light";
    }
  }
  return "dark";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Ensure initial DOM state matches if not set
    const currentDom = document.documentElement.getAttribute("data-theme");
    if (!currentDom) {
      document.documentElement.setAttribute("data-theme", theme);
    }

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme?: "dark" | "light" }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      } else {
        const liveTheme =
          (document.documentElement.getAttribute("data-theme") as
            | "dark"
            | "light") || "dark";
        setTheme(liveTheme);
      }
    };

    window.addEventListener("wec-theme-change", handleThemeChange);
    return () => {
      window.removeEventListener("wec-theme-change", handleThemeChange);
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [theme]);

  const toggleTheme = () => {
    // Synchronously check current DOM attribute to eliminate stale-state race conditions during rapid clicks
    const currentDom = document.documentElement.getAttribute("data-theme");
    const current = currentDom === "light" ? "light" : "dark";
    const nextTheme: "dark" | "light" = current === "dark" ? "light" : "dark";

    // Trigger controlled, synchronized CSS transition
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("wec-theme", nextTheme);
    } catch {
      // ignore storage access errors
    }
    setTheme(nextTheme);
    window.dispatchEvent(
      new CustomEvent("wec-theme-change", { detail: { theme: nextTheme } }),
    );

    if (transitionTimerRef.current !== null) {
      clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
      transitionTimerRef.current = null;
    }, 250);
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <div
        className={`${styles.icon} ${theme === "dark" ? styles.dark : styles.light}`}
      />
    </button>
  );
}
