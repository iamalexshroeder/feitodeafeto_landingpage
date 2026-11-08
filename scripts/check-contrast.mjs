// Confere o contraste WCAG de todos os pares texto/fundo usados na landing.
// Uso: npm run contrast  — falha se algum par ficar abaixo do mínimo.
// Cores: tokens de src/styles/global.css (manter em sincronia).
const c = {
  bordo: '#6b1e2e',
  'bordo-dark': '#4a121f',
  rosa: '#f6dde1',
  'rosa-soft': '#fbeef0',
  creme: '#fcf8f5',
  ink: '#2a1418',
  muted: '#7a6266',
  white: '#ffffff',
  // Parede do hero: média da metade esquerda de public/img/hero-banner.webp (sem véu, como no Figma).
  'hero-parede': '#c9a582',
};

function hex(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(top, bottom, alpha) {
  const a = hex(top);
  const b = hex(bottom);
  return '#' + a.map((v, i) => Math.round(v * alpha + b[i] * (1 - alpha)).toString(16).padStart(2, '0')).join('');
}
function lum(h) {
  const [r, g, b] = hex(h).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [texto, fundo, mínimo, onde]
const pairs = [
  ['ink', 'creme', 4.5, 'texto corrido'],
  ['ink', 'white', 4.5, 'notas, FAQ, cards'],
  ['ink', 'rosa', 4.5, 'CTA final'],
  ['bordo-dark', 'hero-parede', 4.5, 'título e texto do hero'],
  ['ink', 'hero-parede', 4.5, 'prova social do hero'],
  ['bordo', 'hero-parede', 4.5, 'label e estrelas do hero (12px)'],
  ['muted', 'creme', 4.5, 'textos de apoio'],
  ['muted', 'white', 4.5, 'notas (rótulos), FAQ'],
  ['muted', 'rosa-soft', 4.5, 'Como fazemos'],
  ['bordo', 'creme', 4.5, 'labels, links'],
  ['bordo', 'white', 4.5, 'botão sobre escuro'],
  ['bordo', 'rosa-soft', 4.5, 'chips'],
  ['bordo', 'rosa', 4.5, 'título do CTA final, legenda da fundadora'],
  ['white', 'bordo', 4.5, 'botão primário, faixa'],
  ['white', 'bordo-dark', 4.5, 'hover do botão'],
  ['rosa', 'bordo', 4.5, 'textos sobre bordô'],
  ['rosa', 'bordo-dark', 4.5, 'rodapé'],
];
c['rosa/80 sobre bordo'] = mix(c.rosa, c.bordo, 0.8);
c['rosa/70 sobre bordo-dark'] = mix(c.rosa, c['bordo-dark'], 0.7);
pairs.push(['rosa/80 sobre bordo', 'bordo', 4.5, 'nota de exemplo (fundadora)']);
pairs.push(['rosa/70 sobre bordo-dark', 'bordo-dark', 4.5, 'rodapé (opacidade 70%)']);

let fail = 0;
for (const [fg, bg, min, where] of pairs) {
  const r = ratio(c[fg], c[bg]);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${r.toFixed(2).padStart(5)}:1  ${fg} / ${bg}  — ${where}`);
}
console.log(fail ? `\n${fail} par(es) abaixo de AA.` : '\nTodos os pares passam em WCAG AA.');
process.exit(fail ? 1 : 0);
