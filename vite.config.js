import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pdfjs-dist': resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf'),
    },
  },
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
  server: {
    host: true,
    allowedHosts: ['af659b4a-e25c-4d2e-bd0e-f4165b78fd62-00-8msh7urdqn2h.pike.replit.dev'],
  },
});