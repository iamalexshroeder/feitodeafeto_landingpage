// Conteúdo da landing. Fonte: docs/briefing.md (projeto conceitual, dados fictícios).
import type { FaqItem } from '../components/JsonLd.astro';

export const fragrances = [
  { name: 'Manhã de Domingo', notes: 'Algodão, flor de laranjeira e almíscar branco' },
  { name: 'Brisa do Gonzaga', notes: 'Sal marinho, alecrim e cedro' },
  { name: 'Café com Canela', notes: 'Grão de café, canela e baunilha' },
  { name: 'Jardim de Rosas', notes: 'Rosa, peônia e pimenta rosa' },
  { name: 'Lareira', notes: 'Madeira defumada, âmbar e cravo' },
];

export const products = [
  { name: 'Clássica', detail: 'Pote de vidro âmbar, 180 g, cerca de 40 h de queima', price: 'R$ 79' },
  { name: 'Mini', detail: 'Lata de viagem, 80 g, cerca de 18 h de queima', price: 'R$ 39' },
  { name: 'Pavio de madeira', detail: 'Pote de vidro, 220 g, pavio que crepita', price: 'R$ 99' },
];

export const faq: FaqItem[] = [
  {
    question: 'Quanto tempo a vela dura?',
    answer: 'A Clássica dura cerca de 40 horas, a Mini cerca de 18 horas e a de Pavio de madeira cerca de 45 horas.',
  },
  {
    question: 'Como fazer a vela durar mais?',
    answer:
      'Na primeira queima, deixe acesa até a superfície derreter por inteiro (1 a 2 horas) e apare o pavio em 5 mm antes de cada uso.',
  },
  {
    question: 'Vocês entregam onde?',
    answer: 'Em Santos, São Vicente, Guarujá, Praia Grande e Cubatão. Também é possível retirar no ateliê com agendamento.',
  },
  {
    question: 'Dá para personalizar?',
    answer: 'Sim. Rótulo, cartão e aromas podem ser personalizados em kits e lembrancinhas.',
  },
  {
    question: 'Quais as formas de pagamento?',
    answer: 'Pix, cartão de crédito em até 3x e link de pagamento.',
  },
];
