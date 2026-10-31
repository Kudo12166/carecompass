import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    // Browser VS Code serves the app under a path like /ports/5173/.
    // Set DEV_BASE in .env to match; everyone else uses the normal "/".
    base: command === 'serve' ? env.DEV_BASE || '/' : '/',
    // Allow access through forwarded/proxy URLs (e.g. cloudfront, Codespaces)
    server: {
      allowedHosts: true,
    },
  }
})
