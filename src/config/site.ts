// Dados centrais da marca. Fonte: docs/briefing.md (projeto conceitual, dados fictícios).

export const site = {
  name: 'Feito de Afeto',
  tagline: 'Feito à mão, feito com afeto.',
  locale: 'pt_BR',
  lang: 'pt-BR',
  themeColor: '#6B1E2E',
  defaultTitle: 'Velas Aromáticas Artesanais em Santos | Feito de Afeto',
  defaultDescription:
    'Velas aromáticas de cera vegetal feitas à mão em Santos. Cinco aromas, potes de 100g e 40g e kit com 3. Entrega em Santos e região: peça pelo WhatsApp.',
  ogImage: '/og-image.png',
  // Raster quadrado para o schema; os SVGs do logo ficam em /brand. Gerados por `npm run brand`.
  logo: '/brand/logo-512.png',
  // Projeto conceitual: só indexar quando PUBLIC_INDEXABLE=true no ambiente.
  indexable: import.meta.env.PUBLIC_INDEXABLE === 'true',
  // WhatsApp de atendimento (formato internacional, só dígitos: 55 + DDD + número).
  whatsapp: '5513991639726',
  instagram: 'https://www.instagram.com/feitodeafeto_velas',
  instagramHandle: '@feitodeafeto_velas',
  // Entrega e pagamento (informados pela dona do projeto).
  delivery: 'Santos e região',
  payment: 'Pix',
  areaServed: ['Santos', 'São Vicente', 'Guarujá', 'Praia Grande', 'Cubatão'],
} as const;

/** URL canônica absoluta: remove "index", ".html" e barra final (exceto na raiz). */
export function canonicalUrl(pathname: string, base: URL | undefined): string {
  const clean = pathname
    .replace(/\/index(\.html)?$/, '/')
    .replace(/\.html$/, '')
    .replace(/(.)\/$/, '$1');
  return new URL(clean || '/', base).href;
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
