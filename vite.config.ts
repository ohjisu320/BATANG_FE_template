import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@thatopen/components',
      '@thatopen/components-front',
      '@thatopen/fragments',
    ],
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    // electron-vite 전환 시 outDir를 renderer/로 변경
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three'],
          d3: ['d3'],
        },
      },
    },
  },
})
