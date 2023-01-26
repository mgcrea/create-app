/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "src",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "test",
        replacement: resolve(__dirname, "test"),
      },
    ],
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["test/setup.ts"],
  },
});
