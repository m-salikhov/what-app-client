import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import Sitemap from 'vite-plugin-sitemap';

const isDev = process.env.NODE_ENV === 'development';

const sitemapOptions: Parameters<typeof Sitemap>[0] = {
  hostname: 'https://4gk-base.andvarif.ru/',
  dynamicRoutes: ['/entry', '/playmode', '/addbylink', '/all', '/about'],
  changefreq: {
    '/': 'weekly',
    '/all': 'weekly',
    '/playmode': 'weekly',
    '/about': 'monthly',
    '/entry': 'monthly',
    '/addbylink': 'monthly',
  },
  priority: { '/all': 0.9, '/playmode': 0.8, '/about': 0.5, '/entry': 0.6, '/addbylink': 0.7 },
  xmlns: {
    news: false,
    xhtml: false,
    image: false,
    video: false,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), svgr(), Sitemap(sitemapOptions)],

  resolve: {
    alias: {
      Shared: '/src/Shared',
      Store: '/src/Store',
      src: '/src',
    },
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: isDev ? '[local]-[name]-[hash:base64:5]' : '[hash:base64:5]',
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/vitest.setup.ts',
  },
});
