import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: true,
    port: 5020,
    proxy: {
      "/forward": {
        target: "http://localhost:8020",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/forward/, ""),
        secure: false,
        ws: true,
      },
      "/tracker": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tracker/, ""),
        secure: false,
        ws: true,
      },
      "/admin": {
        // target: "http://47.129.9.149:8010",
        target: "http://localhost:8010",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
