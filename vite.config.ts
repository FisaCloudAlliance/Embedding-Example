import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

const mdPlugins = {
  name: "load-markdown",
  load(id) {
    if (id.endsWith(".md")) {
      return `export default ${JSON.stringify(fs.readFileSync(id, "utf-8"))}`;
    }
  },
  resolveId(source) {
    if (source.endsWith(".md")) {
      return path.resolve(process.cwd(), source);
    }
  },
};
export default defineConfig({
  plugins: [
    react(),
    mdPlugins,
  ],
  build: {
    outDir: "build",
    sourcemap: false,
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
