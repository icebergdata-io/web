import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    },
    // Optimize for static hosting
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging
    sourcemap: false,
    // Minify for production
    minify: 'terser',
    // Ensure proper chunking for better caching
    chunkSizeWarningLimit: 1000
  },
  // Optimize for SEO
  define: {
    __DEV__: false
  }
})
