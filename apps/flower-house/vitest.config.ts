import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./")
    }
  },
  test: {
    environment: "jsdom",
    exclude: ["**/e2e/**", "**/node_modules/**"]
  }
});
