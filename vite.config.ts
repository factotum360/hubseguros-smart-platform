import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: true, // Abre el navegador automáticamente
  },
  plugins: [
    react({
      // Configuración adicional para React
      tsDecorators: true,
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // Añadir extensiones soportadas
  },
  // ***** ¡¡¡ESTA ES LA LÍNEA QUE DEBE CAMBIAR!!! *****
  base: '/hubseguros-smart-platform/', // Asegúrate de que esta ruta coincida con el nombre de tu repositorio en GitHub Pages
  // **************************************************
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
}));