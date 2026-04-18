import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // Required for GitHub Pages project sites
  base: '/vestigio/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
