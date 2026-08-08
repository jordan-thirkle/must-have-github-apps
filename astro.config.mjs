import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const site = import.meta.env.PUBLIC_SITE_URL || 'https://must-have-github-apps.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'always',
});
