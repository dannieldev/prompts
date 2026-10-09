import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          heroui: ["@heroui/react"],
          lucide: ["lucide-react"],
        },
      },
    },
  },
  server: {
    port: 3018,
    strictPort: true,
  },
});
