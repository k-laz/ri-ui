import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  // base: process.env.NODE_ENV === 'prod' ? '/ri-ui/' : '/',
  base: '',
  build: {
    manifest: true,

    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
