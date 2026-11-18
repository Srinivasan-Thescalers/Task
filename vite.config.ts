/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces so Codespaces port forwarding can reach the dev server.
    host: true,
    port: 5173,
    strictPort: true,
    // Codespaces serves the app from https://<name>-5173.app.github.dev
    allowedHosts: ['.app.github.dev'],
    proxy: {
      // The browser can't reach 127.0.0.1:54321 inside the Codespace, so the app
      // talks to `${origin}/supabase/...` and Vite forwards it to the local Supabase API.
      '/supabase': {
        target: 'http://127.0.0.1:54321',
        changeOrigin: true,
        ws: true, // Realtime uses websockets
        rewrite: (path) => path.replace(/^\/supabase/, ''),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
