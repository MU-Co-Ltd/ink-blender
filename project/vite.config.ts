import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { join } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  plugins: [
    TanStackRouterVite({
      target: 'react',
      routesDirectory: join(__dirname, './src/pages'),
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
})
