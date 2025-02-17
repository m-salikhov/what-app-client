import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      Shared: '/src/Shared',
      Store: '/src/Store',
      src: '/src',
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/vitest.setup.ts',
  },
});
