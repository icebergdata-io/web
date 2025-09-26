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
        },
        // Add crossorigin attributes to preloads
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'index' ? '[name]-[hash].js' : '[name]-[hash].js'
        },
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
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
  },
  // Configure server for proper CORS handling
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    },
    // Add CORS headers for API requests
    cors: true
  },
  // Configure HTML transforms for proper crossorigin attributes
  html: {
    transform: (html) => {
      // Add crossorigin="anonymous" to all preload links
      return html.replace(
        /<link rel="preload" href="\/assets\/([^"]+\.(js|css))"/g,
        '<link rel="preload" href="/assets/$1" crossorigin="anonymous"'
      )
    }
  }
})
