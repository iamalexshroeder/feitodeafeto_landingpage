// Conteúdo da landing. Fonte: Figma "Feito de Afeto — Landing Page" (frame Desktop 1440, node 1:49).
// Notas olfativas (cabeça / corpo / fundo): cartões "Pirâmide olfativa" da página Moodboard do Figma.
// Projeto conceitual: avaliações, números e depoimentos são de exemplo (ver docs/briefing.md).
import type { FaqItem } from '../components/JsonLd.astro';

export type Tint = 'pimenta-rosa' | 'baunilha' | 'morango' | 'fadas' | 'cereja';

/** Geometria da foto no Figma (frame "Velas", 9:125), em % da caixa da imagem. */
export interface CandlePhotoSpec {
  label: 'pimenta' | 'baunilha' | 'morango' | 'fadas' | 'cereja';
  labelTop: number;
  shadowTop: number;
  shadowLeft: number;
}

export interface Candle {
  id: string;
  number: string;
  family: string;
  name: string;
  description: string;
  notes: { top: string; heart: string; base: string };
  price: string;
  tint: Tint;
  cta: string;
  photo: CandlePhotoSpec;
}

export const specs = ['100g', '~25h de queima', 'Cera vegetal'];

/** Modelos (formatos) da vela. Preço null = ainda não informado → "Valor sob consulta". */
export interface Model {
  id: string;
  label: string;
  name: string;
  description: string;
  specs: string[];
  price: string | null;
  cta: string;
  media: { kind: 'photo'; src: string; alt: string } | { kind: 'jar' } | { kind: 'placeholder'; text: string };
  tint: Tint;
}

export const models: Model[] = [
  {
    id: 'modelo-100g-flor',
    label: 'Edição especial',
    name: '100g com flor de cera',
    description:
      'A vela de 100g com uma flor esculpida em cera dentro do pote. Mais detalhada, feita para presentear e para ficar à vista.',
    specs: ['100g', 'Flor de cera', 'Tampa de madeira'],
    price: null,
    cta: 'Quero a de 100g com flor',
    media: { kind: 'placeholder', text: 'Foto do modelo com flor de cera' },
    tint: 'pimenta-rosa',
  },
  {
    id: 'modelo-100g',
    label: 'Clássica',
    name: '100g',
    description:
      'O nosso formato de sempre: pote de vidro com tampa de madeira, que continua com você depois da última chama.',
    specs: ['100g', '~25h de queima', 'Cera vegetal'],
    price: 'R$ 49,90',
    cta: 'Quero a de 100g',
    media: { kind: 'jar' },
    tint: 'baunilha',
  },
  {
    id: 'modelo-40g',
    label: 'Mini',
    name: '40g',
    description:
      'Do tamanho certo para experimentar um aroma novo, levar na viagem ou presentear sem pesar no bolso.',
    specs: ['40g', 'Cera vegetal', 'Pote de vidro'],
    price: null,
    cta: 'Quero a de 40g',
    media: { kind: 'photo', src: '/img/modelo-40g.webp', alt: 'Vela de 40g Cereja com Avelã acesa entre cerejas e avelãs' },
    tint: 'cereja',
  },
];

/** Foto de cada aroma no carrossel (Moodboard do Figma). */
export const aromaPhotos: Record<string, string> = {
  'pimenta-rosa': '/img/aromas/pimenta.webp',
  baunilha: '/img/aromas/baunilha.webp',
  'morango-com-champanhe': '/img/aromas/morango.webp',
  'perfume-das-fadas': '/img/aromas/fadas.webp',
  'cereja-com-avela': '/img/aromas/cereja.webp',
};

export const candles: Candle[] = [
  {
    id: 'pimenta-rosa',
    number: '01',
    family: 'Floral especiado',
    name: 'Pimenta Rosa',
    description:
      'Vibrante, com o calor da pimenta rosa abraçado por flores. Para a sala, para receber visitas, para quando a casa precisa de energia.',
    notes: { top: 'Bergamota, anis e damasco', heart: 'Violeta, lírio do vale e pimenta rosa', base: 'Almíscar, patchouli e baunilha' },
    price: 'R$ 49,90',
    tint: 'pimenta-rosa',
    cta: 'Quero a Pimenta Rosa',
    photo: { label: 'pimenta', labelTop: 29.25, shadowTop: 58.53, shadowLeft: -8.83 },
  },
  {
    id: 'baunilha',
    number: '02',
    family: 'Doce e aconchegante',
    name: 'Baunilha',
    description: 'O cheiro de bolo saindo do forno na casa de vó. Uma vela para noites de cobertor, chá e livro.',
    notes: { top: 'Anis e pêssego', heart: 'Coco e sândalo', base: 'Almíscar e baunilha' },
    price: 'R$ 49,90',
    tint: 'baunilha',
    cta: 'Quero a Baunilha',
    photo: { label: 'baunilha', labelTop: 30.07, shadowTop: 58.46, shadowLeft: -10.02 },
  },
  {
    id: 'morango-com-champanhe',
    number: '03',
    family: 'Frutado e festivo',
    name: 'Morango com Champanhe',
    description:
      'Leve, alegre e um pouco borbulhante. Feita para celebrar, seja um aniversário, seja uma terça-feira qualquer.',
    notes: { top: 'Morango, pêssego, uva e cassis', heart: 'Jasmim, rosa e baunilha', base: 'Âmbar, sândalo e almíscar' },
    price: 'R$ 49,90',
    tint: 'morango',
    cta: 'Quero a Morango com Champanhe',
    photo: { label: 'morango', labelTop: 29.32, shadowTop: 58.46, shadowLeft: -8.83 },
  },
  {
    id: 'perfume-das-fadas',
    number: '04',
    family: 'Floral delicado',
    name: 'Perfume das Fadas',
    description:
      'Suave como um fim de tarde. A vela mais delicada da coleção, pensada para o quarto e para os momentos de pausa.',
    notes: { top: 'Melão, hortelã e framboesa', heart: 'Peônia, jasmim e lírio do vale', base: 'Morango, coco e almíscar' },
    price: 'R$ 49,90',
    tint: 'fadas',
    cta: 'Quero a Perfume das Fadas',
    photo: { label: 'fadas', labelTop: 28.87, shadowTop: 60.25, shadowLeft: -8.83 },
  },
  {
    id: 'cereja-com-avela',
    number: '05',
    family: 'Gourmand intenso',
    name: 'Cereja com Avelã',
    description: 'Doce, profunda e marcante. Uma vela de inverno que transforma qualquer canto da casa em cafeteria.',
    notes: { top: 'Cereja, pêssego e cacau', heart: 'Avelã e lírio do vale', base: 'Baunilha, sândalo e almíscar' },
    price: 'R$ 49,90',
    tint: 'cereja',
    cta: 'Quero a Cereja com Avelã',
    photo: { label: 'cereja', labelTop: 28.87, shadowTop: 56.82, shadowLeft: -8.83 },
  },
];

export const trust = [
  { title: 'Cera 100% vegetal', text: 'Queima limpa e mais lenta' },
  { title: 'Feita à mão', text: 'Em pequenos lotes, uma a uma' },
  { title: 'Vidro + tampa de madeira', text: 'Pote reutilizável depois da vela' },
  { title: 'Pedido pelo WhatsApp', text: 'Atendimento direto com a gente' },
];

export const steps = [
  { number: '01', title: 'Você escolhe', text: 'Escolha o aroma aqui na página e chame a gente no WhatsApp com um clique.' },
  {
    number: '02',
    title: 'A gente produz',
    text: 'Cada vela é feita à mão, sob encomenda, com cera vegetal e fragrância selecionada.',
  },
  { number: '03', title: 'Chega até você', text: 'Embalada com cuidado e pronta para presentear ou acender no mesmo dia.' },
];

export const testimonials = [
  {
    quote:
      'Comprei a de Baunilha para mim e voltei para pegar mais duas de presente. O cheiro fica no quarto mesmo apagada.',
    author: 'Cliente 1',
    detail: 'Comprou Baunilha',
  },
  {
    quote: 'A Pimenta Rosa virou a vela oficial da minha sala. E o pote eu reaproveitei para guardar pincéis.',
    author: 'Cliente 2',
    detail: 'Comprou Pimenta Rosa',
  },
  {
    quote: 'Atendimento pelo WhatsApp super rápido. Me ajudaram a escolher e acertaram em cheio.',
    author: 'Cliente 3',
    detail: 'Comprou Morango com Champanhe',
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
      'Escolha o aroma e clique em qualquer botão. Você cai direto no nosso WhatsApp para combinar entrega e pagamento.',
  },
  {
    question: 'Qual o prazo de produção?',
    answer:
      'As velas são feitas sob encomenda e ficam prontas em poucos dias. Confirmamos o prazo no atendimento.',
  },
  {
    question: 'Posso reaproveitar o pote?',
    answer:
      'Pode e deve. Depois de limpar a cera restante, o pote de vidro com tampa de madeira vira porta-objetos.',
  },
];
