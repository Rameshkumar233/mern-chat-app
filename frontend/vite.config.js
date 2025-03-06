import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy:
            process.env.NODE_ENV === "development"
                ? {
                      "/api": {
                          target: "http://localhost:5000", // Use localhost in dev
                          changeOrigin: true,
                          rewrite: (path) => path.replace(/^\/api/, ""),
                      },
                  }
                : undefined, // No proxy in production
    },
});
