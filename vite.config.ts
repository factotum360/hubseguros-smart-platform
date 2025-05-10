import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost", // Cambiado para evitar problemas en entornos Windows
    port: 8080,
    open: true,
  },
  plugins: [
    react({
      tsDecorators: true,
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: mode === "development", // Solo mapas en modo desarrollo
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
}));
