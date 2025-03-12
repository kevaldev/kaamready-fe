import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@schemas": path.resolve(__dirname, "./src/schemas"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
    },
  },
});
