/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  base: "/WEC-Analysis-2026/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
