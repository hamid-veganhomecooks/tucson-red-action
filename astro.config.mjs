// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tucsonredaction.org',
  // Fully static output — `npm run build` writes plain files to dist/, which is
  // exactly what Cloudflare Pages serves. No adapter needed.
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'file',
  },
});
