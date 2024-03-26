import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom"
  }
});

//ex) https://github.com/vercel/next.js/tree/canary/examples/with-vitest
