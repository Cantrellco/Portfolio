import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Shaders live in .frag/.vert files imported with Vite's native `?raw` suffix —
// no glsl plugin (vite-plugin-glsl does not support Vite 8 yet).
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
  },
})
