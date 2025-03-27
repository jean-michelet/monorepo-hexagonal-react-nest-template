import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
    define: {
      "process.env": {},
    },
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgr(),
      nodePolyfills({
        protocolImports: true,
      }),
      visualizer(),
    ],
  };
});
