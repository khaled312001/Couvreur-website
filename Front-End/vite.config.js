import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    // Defer CSS loading to avoid render-blocking
    cssRollupOptions: {
      output: {
        assetFileNames: 'assets/css/[name]-[hash][extname]'
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Lazy load large libraries
          if (id.includes('node_modules')) {
            // Keep React core libraries together in vendor chunk (loads first)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-is') || id.includes('scheduler')) {
              return 'vendor';
            }
            // Bundle recharts with its dependencies in a separate chunk
            // But ensure it depends on vendor chunk which has React
            if (id.includes('recharts')) {
              return 'charts';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('axios') || id.includes('lucide-react')) {
              return 'utils';
            }
            return 'vendor';
          }
        },
        // Optimize chunk sizes
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Optimize asset inlining
    assetsInlineLimit: 4096
  },
  preview: {
    port: 3000,
    host: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'axios', 'recharts'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-is']
  }
})
