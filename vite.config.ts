import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-ui': ['lucide-react', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities', 'react-rnd'],
          'vendor-pdf-core': ['pdf-lib'],
          'vendor-pdf-worker': ['pdfjs-dist'],
          'vendor-utils': ['jszip', 'heic2any', 'tesseract.js'],
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
});