import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-quill", "react-quilljs"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias @ to src directory
    },
  },
});
