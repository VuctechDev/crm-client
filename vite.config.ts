import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [esbuildCommonjs(["react-quill", "react-quilljs", "quill"])],
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias @ to src directory
    },
  },
});
