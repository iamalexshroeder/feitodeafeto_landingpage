// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL canônica do site. Defina SITE_URL no ambiente de deploy.
const site = process.env.SITE_URL ?? 'https://feitodeafeto.com.br';

export default defineConfig({
  site,
  trailingSlash: 'never',
  // CSS embutido no HTML: página única, evita a requisição que bloqueia a renderização.
  build: { format: 'file', inlineStylesheets: 'always' },
  // A loja (protótipo) fica fora do sitemap até ser aprovada.
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/loja') })],
  vite: { plugins: [tailwindcss()] },
});
