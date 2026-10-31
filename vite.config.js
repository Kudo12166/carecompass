import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Allow access through forwarded/proxy URLs (e.g. cloudfront, Live Share)
  server: {
    allowedHosts: true,
  },
})
