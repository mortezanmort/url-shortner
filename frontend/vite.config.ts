import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  build: {
    target: "es2020", // or "es2019",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
