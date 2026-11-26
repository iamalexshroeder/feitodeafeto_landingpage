// Loja — Figma "E-commerce — nova versão" (página 215:112, frame 215:113). É a página inicial do site (/).
// Cada produto da vitrine aponta para um modelo de `models` (preço, fotos e pedido vêm de lá) e tem a
// sua página em /produtos/<slug>. Os textos curtos dos cards são os do Figma.
import { models, type Model } from './content';

export interface LojaProduto {
  slug: string;
  modelId: string;
  /** Etiqueta sobre a foto do card (Figma "Etiqueta"). */
  etiqueta: string;
  /** Descrição curta do card. */
  resumo: string;
  /** Texto pequeno ao lado do preço ("100g", "A partir de"). */
  detalhe: string;
  /** Preço exibido no card (o kit mostra o menor). */
  preco: string;
  /** Pasta das fotos por aroma (troca ao escolher o aroma no card); o kit não tem. */
  pasta?: 'floral' | '100g' | '40g';
  /** Foto do card (versão de 640px). */
  foto: string;
  alt: string;
  /** SEO da página do produto: título (50–60) e descrição (140–160 caracteres). */
  seoTitle: string;
  seoDescription: string;
}

export const lojaProdutos: LojaProduto[] = [
  {
    slug: 'vela-floral-100g',
    seoTitle: 'Vela floral de 100g em cera vegetal | Feito de Afeto',
    seoDescription:
      'Vela floral de 100g com flores de cera sobre a vela, feita à mão em Santos com cera vegetal e pote de vidro. Escolha o aroma e peça pelo WhatsApp.',
    modelId: 'modelo-100g-floral',
    etiqueta: 'Clássica',
    resumo: 'Pote de vidro com tampa de madeira e cerca de 25h de queima.',
    detalhe: '100g',
    preco: 'R$ 55,00',
    pasta: 'floral',
    foto: '/img/floral/pimenta-rosa-640.webp',
    alt: 'Vela floral de 100g Pimenta Rosa, com flores de cera vermelhas sobre a vela',
  },
  {
    slug: 'vela-100g',
    seoTitle: 'Vela aromática de 100g em cera vegetal | Feito de Afeto',
    seoDescription:
      'Vela aromática de 100g feita à mão em Santos, com cera vegetal, pote de vidro e tampa de madeira. Cerca de 25h de queima. Escolha o aroma e peça já.',
    modelId: 'modelo-100g',
    etiqueta: 'Clássica',
    resumo: 'O nosso formato de sempre, com cerca de 25h de queima.',
    detalhe: '100g',
    preco: 'R$ 45,00',
    pasta: '100g',
    foto: '/img/100g/pimenta-rosa-640.webp',
    alt: 'Vela de 100g Pimenta Rosa acesa, em pote de vidro com tampa de madeira',
  },
  {
    slug: 'vela-40g',
    seoTitle: 'Vela aromática de 40g em cera vegetal | Feito de Afeto',
    seoDescription:
      'Vela aromática de 40g feita à mão em Santos, com cera vegetal e pote de vidro. Do tamanho certo para experimentar um aroma novo ou dar de presente.',
    modelId: 'modelo-40g',
    etiqueta: 'Mini',
    resumo: 'Do tamanho certo para experimentar um aroma novo ou presentear.',
    detalhe: '40g',
    preco: 'R$ 20,00',
    pasta: '40g',
    foto: '/img/40g/cereja-com-avela-640.webp',
    alt: 'Vela de 40g Cereja com Avelã acesa',
  },
  {
    slug: 'kit-3-velas',
    seoTitle: 'Kit com 3 velas aromáticas artesanais | Feito de Afeto',
    seoDescription:
      'Kit com 3 velas aromáticas feitas à mão em Santos: escolha o tamanho (100g ou 40g) e os três aromas, iguais ou diferentes. Mais em conta que as avulsas.',
    modelId: 'kit-3-velas',
    etiqueta: 'Para presentear',
    resumo: 'Monte o seu trio com os aromas que quiser, iguais ou diferentes.',
    detalhe: 'A partir de',
    preco: 'R$ 55,00',
    foto: '/img/kit/kit-100g-640.webp',
    alt: 'Kit com 3 velas de 100g: uma na frente e duas atrás',
  },
];

/** Endereço da página do produto. */
export const urlDo = (p: LojaProduto) => `/produtos/${p.slug}`;

export const modeloDo = (p: LojaProduto): Model => {
  const m = models.find((x) => x.id === p.modelId);
  if (!m) throw new Error(`Modelo ${p.modelId} não existe em content.ts`);
  return m;
};
