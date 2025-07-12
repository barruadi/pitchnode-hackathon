/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import tailwindcss from '@tailwindcss/vite'

dotenv.config();

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 300, // bisa disesuaikan, 300ms cukup aman
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  cacheDir: '../node_modules/.vite',
  define: {
    'process.env': process.env,
  },
  test: {
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
  },
});
