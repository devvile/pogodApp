import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Router
            if (id.includes('react-router')) {
              return 'router';
            }
            // State management
            if (id.includes('redux') || id.includes('@reduxjs/toolkit')) {
              return 'redux';
            }
            // Data fetching
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            // UI libraries
            if (id.includes('lucide-react')) {
              return 'ui';
            }
            // Other vendor dependencies
            return 'vendor';
          }
        },
        // File naming for production
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0] || 'asset';
          if (/\.(css)$/.test(fileName)) {
            return 'css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(fileName)) {
            return 'images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    
    // Optimize build performance
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false, // Disable in production for better performance
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Enable compression
    reportCompressedSize: true,
  },
  
  // Explicitly define environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    __DEV__: false,
  },
  
  // ESBuild optimizations for production
  esbuild: {
    // Remove console logs and debugger statements in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Optimize for modern browsers
    target: 'es2020',
  },
  
  // Server configuration for preview
  preview: {
    port: 5173,
    host: true,
    strictPort: true,
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      '@reduxjs/toolkit',
      '@tanstack/react-query',
      'lucide-react',
    ],
  },
});