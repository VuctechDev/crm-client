import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import vitePluginRequire from "vite-plugin-require";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias @ to src directory
    },
  },
});
