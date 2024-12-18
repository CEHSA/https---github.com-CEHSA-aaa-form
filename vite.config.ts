import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: '/wp-content/plugins/react-form-integration/form-assets/',
  define: {
    'process.env.NODE_ENV': command === 'build' ? '"production"' : '"development"'
  },
  server: {
    cors: true,
    proxy: {
      '/wp-json': {
        target: 'https://aaarent.co.za',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://aaarent.co.za',
        changeOrigin: true,
      }
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
}));
// Vitest extension is activated because Vitest is installed or there is a Vite/Vitest config file in the workspace.
