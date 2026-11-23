import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production' || command === 'build';
  const isVercel = Boolean(process.env.VERCEL);

  return {
    base: process.env.VITE_BASE_PATH || (isVercel ? '/' : isProduction ? '/NITAMUN-4.0/' : '/'),
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (/[\\/]node_modules[\\/]lucide-react[\\/]/.test(id)) {
                return 'vendor-icons';
              }
              if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
                return 'vendor-react';
              }
              if (/[\\/]node_modules[\\/](gsap|lenis)[\\/]/.test(id)) {
                return 'vendor-motion';
              }
            }
          },
        },
      },
      chunkSizeWarningLimit: 800,
    },
  };
});
