import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward /api/... requests from the dev server to FastAPI, so the React code
    // can call fetch('/api/health') without knowing the backend's address.
    // Docker Compose sets API_PROXY_TARGET; `npm run dev` on its own uses
    // localhost:8000. This only applies to the dev server, not to a production build.
    proxy: {
      '/api': process.env.API_PROXY_TARGET ?? 'http://localhost:8000',
    },
  },
})
