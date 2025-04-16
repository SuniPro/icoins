import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
    port: 5130,
    proxy: {
      "/user": {
        target: "http://13.214.147.245:8070",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
