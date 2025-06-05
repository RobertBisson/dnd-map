import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'screens': path.resolve(__dirname, 'src/screens'),
      'Services': path.resolve(__dirname, 'src/Services'),
      'assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
  },
  publicDir: 'public',
});
