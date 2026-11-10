// Conteúdo da landing. Fonte: Figma "Feito de Afeto — Landing Page" (frame Desktop 1440, node 1:49).
// Notas olfativas (cabeça / corpo / fundo): cartões "Pirâmide olfativa" da página Moodboard do Figma.
// Projeto conceitual: números e depoimentos são de exemplo (ver docs/briefing.md).
import type { FaqItem } from '../components/JsonLd.astro';

export type Tint = 'pimenta-rosa' | 'baunilha' | 'morango' | 'fadas' | 'cereja';

export interface Candle {
  id: string;
  number: string;
  family: string;
  name: string;
  description: string;
  notes: { top: string; heart: string; base: string };
  tint: Tint;
}

/** Opção do kit (tamanho das 3 velas). saving = diferença para as 3 avulsas. */
export interface KitSize {
  id: string;
  label: string;
  size: string;
  price: string;
  /** Valor numérico (R$) para o schema Product. */
  priceValue: number;
  saving: string;
}

/**
 * Modelos (formatos) da vela — preços do Figma (Landing › Modelos).
 * order: 'single' = escolhe 1 aroma; 'kit' = escolhe tamanho + 3 aromas; sem order = ainda não vende
 * (mostra o status, ex.: "Disponível em breve").
 */
export interface Model {
  id: string;
  label: string;
  name: string;
  /** Nome usado na mensagem do WhatsApp ("a vela de 100g"). */
  orderName: string;
  description: string;
  specs: string[];
  price?: string;
  /** Valor numérico (R$) para o schema Product. */
  priceValue?: number;
  status?: string;
  order?: { type: 'single' } | { type: 'kit'; sizes: KitSize[] };
  media:
    /** src = versão grande; a versão de celular é a mesma com sufixo -640 (scripts/build-images.mjs). */
    | {
        kind: 'photo';
        src: string;
        alt: string;
        width: number;
        height: number;
        /** Foto por aroma (chave = nome do aroma): troca com fade quando a cliente escolhe o aroma. */
        byAroma?: Record<string, { src: string; alt: string; thumb?: string }>;
        /** Foto por tamanho do kit (chave = id do tamanho): troca com fade quando a cliente escolhe o tamanho. */
        bySize?: Record<string, { src: string; alt: string }>;
      }
    | { kind: 'placeholder'; text: string };
  tint: Tint;
}

export const models: Model[] = [
  {
    id: 'modelo-100g-floral',
    label: 'Clássica',
    name: 'Vela floral de 100g',
    orderName: 'vela floral de 100g',
    description:
      'O nosso formato de sempre: pote de vidro com tampa de madeira, que continua com você depois da última chama.',
    specs: ['100g', '~25h de queima', 'Cera vegetal'],
    price: 'R$ 55,00',
    priceValue: 55,
    order: { type: 'single' },
    media: {
      kind: 'photo',
      src: '/img/floral/pimenta-rosa.webp',
      alt: 'Vela floral de 100g Pimenta Rosa acesa, com flores de cera vermelhas sobre a vela, em pote de vidro com a tampa de madeira ao lado',
      width: 1200,
      height: 1120,
      // Uma foto por aroma: a mesma vela floral com o rótulo de cada aroma.
      byAroma: {
        'Pimenta Rosa': {
          src: '/img/floral/pimenta-rosa.webp',
          alt: 'Vela floral de 100g Pimenta Rosa acesa, com flores de cera vermelhas sobre a vela, em pote de vidro com a tampa de madeira ao lado',
        },
        Baunilha: {
          src: '/img/floral/baunilha.webp',
          alt: 'Vela floral de 100g Baunilha acesa, com flores de cera vermelhas sobre a vela, em pote de vidro com a tampa de madeira ao lado',
        },
        'Morango com Champanhe': {
          src: '/img/floral/morango-com-champanhe.webp',
          alt: 'Vela floral de 100g Morango com Champanhe acesa, com flores de cera vermelhas sobre a vela, em pote de vidro com a tampa de madeira ao lado',
        },
        'Perfume das Fadas': {
          src: '/img/floral/perfume-das-fadas.webp',
          alt: 'Vela floral de 100g Perfume das Fadas acesa, com flores de cera vermelhas sobre a vela, em pote de vidro com a tampa de madeira ao lado',
        },
        'Cereja com Avelã': {
          src: '/img/floral/cereja-com-avela.webp',
          alt: 'Vela floral de 100g Cereja com Avelã acesa, com flores de cera vermelhas sobre a vela, em pote de vidro com a tampa de madeira ao lado',
        },
      },
    },
    tint: 'pimenta-rosa',
  },
  {
    id: 'modelo-100g',
    label: 'Clássica',
    name: 'Vela de 100g',
    orderName: 'vela de 100g',
    description:
      'O nosso formato de sempre: pote de vidro com tampa de madeira, que continua com você depois da última chama.',
    specs: ['100g', '~25h de queima', 'Cera vegetal'],
    price: 'R$ 45,00',
    priceValue: 45,
    order: { type: 'single' },
    media: {
      kind: 'photo',
      src: '/img/100g/pimenta-rosa.webp',
      alt: 'Vela de 100g Pimenta Rosa acesa, em pote de vidro, com a tampa de madeira ao lado',
      width: 1200,
      height: 1120,
      byAroma: {
        'Pimenta Rosa': {
          src: '/img/100g/pimenta-rosa.webp',
          alt: 'Vela de 100g Pimenta Rosa acesa, em pote de vidro, com a tampa de madeira ao lado',
        },
        Baunilha: {
          src: '/img/100g/baunilha.webp',
          alt: 'Vela de 100g Baunilha acesa, em pote de vidro, com a tampa de madeira ao lado',
        },
        'Morango com Champanhe': {
          src: '/img/100g/morango-com-champanhe.webp',
          alt: 'Vela de 100g Morango com Champanhe acesa, em pote de vidro, com a tampa de madeira ao lado',
        },
        'Perfume das Fadas': {
          src: '/img/100g/perfume-das-fadas.webp',
          alt: 'Vela de 100g Perfume das Fadas acesa, em pote de vidro, com a tampa de madeira ao lado',
        },
        'Cereja com Avelã': {
          src: '/img/100g/cereja-com-avela.webp',
          alt: 'Vela de 100g Cereja com Avelã acesa, em pote de vidro, com a tampa de madeira ao lado',
        },
      },
    },
    tint: 'pimenta-rosa',
  },
  {
    id: 'modelo-40g',
    label: 'Mini',
    name: 'Vela de 40g',
    orderName: 'vela de 40g',
    description: 'Do tamanho certo para experimentar um aroma novo, levar na viagem ou presentear sem pesar no bolso.',
    specs: ['40g', 'Cera vegetal', 'Pote de vidro'],
    price: 'R$ 20,00',
    priceValue: 20,
    order: { type: 'single' },
    media: {
      kind: 'photo',
      src: '/img/40g/cereja-com-avela.webp',
      alt: 'Vela de 40g Cereja com Avelã acesa, em pote de vidro, com a rolha de cortiça ao lado',
      width: 1200,
      height: 1120,
      byAroma: {
        'Pimenta Rosa': {
          src: '/img/40g/pimenta-rosa.webp',
          alt: 'Vela de 40g Pimenta Rosa acesa, em pote de vidro, com a rolha de cortiça ao lado',
        },
        'Cereja com Avelã': {
          src: '/img/40g/cereja-com-avela.webp',
          alt: 'Vela de 40g Cereja com Avelã acesa, em pote de vidro, com a rolha de cortiça ao lado',
        },
        Baunilha: {
          src: '/img/40g/baunilha.webp',
          alt: 'Vela de 40g Baunilha acesa, em pote de vidro, com a rolha de cortiça ao lado',
        },
        'Perfume das Fadas': {
          src: '/img/40g/perfume-das-fadas.webp',
          alt: 'Vela de 40g Perfume das Fadas acesa, em pote de vidro, com a rolha de cortiça ao lado',
        },
        'Morango com Champanhe': {
          src: '/img/40g/morango-com-champanhe.webp',
          alt: 'Vela de 40g Morango com Champanhe acesa, em pote de vidro, com a rolha de cortiça ao lado',
        },
      },
    },
    tint: 'fadas',
  },
  {
    id: 'kit-3-velas',
    label: 'Para presentear',
    name: 'Kit com 3 velas',
    orderName: 'kit com 3 velas',
    description:
      'Monte o seu trio com os aromas que quiser, iguais ou diferentes. Um para cada canto da casa, ou três presentes resolvidos de uma vez.',
    specs: ['3 velas', 'Aromas à sua escolha', 'Todas do mesmo tamanho'],
    price: 'R$ 125,00',
    order: {
      type: 'kit',
      sizes: [
        {
          id: '100g',
          label: '3 velas de 100g',
          size: '100g',
          price: 'R$ 125,00',
          priceValue: 125,
          saving: 'Economize R$ 10',
        },
        {
          id: '40g',
          label: '3 velas de 40g',
          size: '40g',
          price: 'R$ 55,00',
          priceValue: 55,
          saving: 'Economize R$ 5',
        },
      ],
    },
    media: {
      kind: 'photo',
      src: '/img/kit/kit-100g.webp',
      alt: 'Três velas de 100g acesas: Morango com Champanhe na frente, Baunilha e Cereja com Avelã atrás',
      width: 1200,
      height: 1120,
      bySize: {
        '100g': {
          src: '/img/kit/kit-100g.webp',
          alt: 'Três velas de 100g acesas: Morango com Champanhe na frente, Baunilha e Cereja com Avelã atrás',
        },
        '40g': {
          src: '/img/kit/kit-40g.webp',
          alt: 'Três velas de 40g acesas: Pimenta Rosa na frente, Baunilha e Perfume das Fadas atrás',
        },
      },
    },
    tint: 'baunilha',
  },
];

/** Foto de cada aroma no carrossel (Moodboard do Figma); versão de celular com sufixo -360. */
export const aromaPhotos: Record<string, string> = {
  'pimenta-rosa': '/img/aromas/pimenta-rosa.webp',
  baunilha: '/img/aromas/baunilha.webp',
  'morango-com-champanhe': '/img/aromas/morango-com-champanhe.webp',
  'perfume-das-fadas': '/img/aromas/perfume-das-fadas.webp',
  'cereja-com-avela': '/img/aromas/cereja-com-avela.webp',
};

export const candles: Candle[] = [
  {
    id: 'pimenta-rosa',
    number: '01',
    family: 'Floral especiado',
    name: 'Pimenta Rosa',
    description:
      'Vibrante, com o calor da pimenta rosa abraçado por flores. Para a sala, para receber visitas, para quando a casa precisa de energia.',
    notes: {
      top: 'Bergamota, anis e damasco',
      heart: 'Violeta, lírio do vale e pimenta rosa',
      base: 'Almíscar, patchouli e baunilha',
    },
    tint: 'pimenta-rosa',
  },
  {
    id: 'baunilha',
    number: '02',
    family: 'Doce e aconchegante',
    name: 'Baunilha',
    description: 'O cheiro de bolo saindo do forno na casa de vó. Uma vela para noites de cobertor, chá e livro.',
    notes: { top: 'Anis e pêssego', heart: 'Coco e sândalo', base: 'Almíscar e baunilha' },
    tint: 'baunilha',
  },
  {
    id: 'morango-com-champanhe',
    number: '03',
    family: 'Frutado e festivo',
    name: 'Morango com Champanhe',
    description:
      'Leve, alegre e um pouco borbulhante. Feita para celebrar, seja um aniversário, seja uma terça-feira qualquer.',
    notes: {
      top: 'Morango, pêssego, uva e cassis',
      heart: 'Jasmim, rosa e baunilha',
      base: 'Âmbar, sândalo e almíscar',
    },
    tint: 'morango',
  },
  {
    id: 'perfume-das-fadas',
    number: '04',
    family: 'Floral delicado',
    name: 'Perfume das Fadas',
    description:
      'Suave como um fim de tarde. A vela mais delicada da coleção, pensada para o quarto e para os momentos de pausa.',
    notes: {
      top: 'Melão, hortelã e framboesa',
      heart: 'Peônia, jasmim e lírio do vale',
      base: 'Morango, coco e almíscar',
    },
    tint: 'fadas',
  },
  {
    id: 'cereja-com-avela',
    number: '05',
    family: 'Gourmand intenso',
    name: 'Cereja com Avelã',
    description: 'Doce, profunda e marcante. Uma vela de inverno que transforma qualquer canto da casa em cafeteria.',
    notes: { top: 'Cereja, pêssego e cacau', heart: 'Avelã e lírio do vale', base: 'Baunilha, sândalo e almíscar' },
    tint: 'cereja',
  },
];

/** Benefícios (Figma 1:92): cada destaque com a sua cor (classe Tailwind). */
export const trust = [
  { title: 'Cera 100% vegetal', text: 'Queima limpa e mais lenta', color: 'text-muted' },
  { title: 'Feita à mão', text: 'Em pequenos lotes, uma a uma', color: 'text-bordo' },
  { title: 'Vidro + tampa de madeira', text: 'Pote reutilizável depois da vela', color: 'text-wood-dark' },
  { title: 'Pedido pelo WhatsApp', text: 'Atendimento direto com a gente', color: 'text-bordo-dark' },
];

export const steps = [
  {
    icon: 'escolha',
    title: 'Você escolhe',
    text: 'Escolha o aroma aqui na página e chame a gente no WhatsApp com um clique.',
  },
  {
    icon: 'maos',
    title: 'A gente produz',
    text: 'Cada vela é feita à mão, sob encomenda, com cera vegetal e aroma selecionado.',
  },
  {
    icon: 'entrega',
    title: 'Chega até você',
    text: 'Embalada com cuidado e pronta para presentear ou acender no mesmo dia.',
  },
];

export const testimonials = [
  {
    quote:
      'Comprei a de Baunilha para mim e voltei para pegar mais duas de presente. O cheiro fica no quarto mesmo apagada.',
    author: 'Jadhe Nunes',
    detail: 'Comprou Baunilha',
  },
  {
    quote: 'Atendimento pelo WhatsApp super rápido. Me ajudaram a escolher e acertaram em cheio.',
    author: 'Edimur',
    detail: 'Comprou Morango com Champanhe',
  },
  {
    quote: 'A Pimenta Rosa virou a vela oficial da minha sala. E o pote eu reaproveitei.',
    author: 'Julia Pereira',
    detail: 'Comprou Pimenta Rosa',
  },
];

export const faq: FaqItem[] = [
  {
    question: 'Quanto tempo a vela dura?',
    answer: 'Cerca de 25 horas de queima. Para render mais, acenda por no máximo 3 horas seguidas.',
  },
  {
    question: 'Por que cera vegetal?',
    answer: 'Ela queima de forma mais limpa e mais lenta, e espalha melhor o aroma pelo ambiente.',
  },
  {
    question: 'Como faço o pedido?',
    answer:
      'Escolha o modelo e o aroma e clique em "Adicionar à sacola". Na sacola, informe os dados de entrega e envie o pedido pelo WhatsApp, com a mensagem pronta; lá a gente combina a entrega e o pagamento.',
  },
  {
    question: 'Vocês entregam onde?',
    answer: 'Entregamos em Santos e região. O dia e os detalhes da entrega a gente combina com você pelo WhatsApp.',
  },
  {
    question: 'Quais as formas de pagamento?',
    answer: 'Por enquanto, só Pix. A chave é enviada no atendimento pelo WhatsApp.',
  },
  {
    question: 'Como funciona o kit com 3 velas?',
    answer:
      'Você escolhe o tamanho (3 de 100g por R$ 125,00 ou 3 de 40g por R$ 55,00) e os três aromas, iguais ou diferentes. Sai mais em conta que comprar as velas avulsas.',
  },
  {
    question: 'Qual o prazo de produção?',
    answer: 'As velas são feitas sob encomenda e ficam prontas em poucos dias. Confirmamos o prazo no atendimento.',
  },
  {
    question: 'Posso reaproveitar o pote?',
    answer: 'Pode e deve. Depois de limpar a cera restante, o pote de vidro com tampa de madeira vira porta-objetos.',
  },
];
