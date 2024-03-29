import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: ["**/e2e/**", "**/node_modules/**"]
  }
});

//ex) https://github.com/vercel/next.js/tree/canary/examples/with-vitest
