import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    host: true,
    port: 5020,
    proxy: {
      "/user": {
        target: "http://172.31.7.29:8020",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
