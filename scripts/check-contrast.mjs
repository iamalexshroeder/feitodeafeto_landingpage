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
  erro: '#d50000',
  'wood-dark': '#8e6a4c',
  whatsapp: '#37ce65',
  // Hero desktop (sem véu, como no Figma): pior ponto (5% mais escuro) da parede atrás de cada texto,
  // medido em public/img/hero-banner.webp.
  'hero-label': '#d7bea4',
  'hero-titulo': '#ccac8e',
  'hero-texto': '#d2b598',
};

function hex(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(top, bottom, alpha) {
  const a = hex(top);
  const b = hex(bottom);
  return (
    '#' +
    a
      .map((v, i) =>
        Math.round(v * alpha + b[i] * (1 - alpha))
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
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
  ['bordo', 'hero-label', 4.5, 'label do hero (desktop)'],
  ['bordo', 'hero-titulo', 3, 'título do hero (desktop, texto grande)'],
  ['ink', 'hero-texto', 4.5, 'texto do hero (desktop)'],
  ['bordo-dark', 'rosa', 4.5, 'texto da faixa de ajuda (celular)'],
  ['bordo-dark', 'white', 4.5, 'título da faixa de ajuda (desktop)'],
  ['ink', 'rosa-soft', 4.5, 'texto do CTA final (celular)'],
  ['rosa', 'bordo-dark', 4.5, 'título e label de Como fazemos (desktop)'],
  ['bordo-dark', 'creme', 4.5, 'título e texto do hero (celular)'],
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
  ['erro', 'white', 4.5, 'mensagens de erro nos campos da sacola'],
  ['erro', 'creme', 4.5, 'mensagens de erro sobre o creme'],
  ['wood-dark', 'creme', 4.5, 'título "Vidro + tampa" nos benefícios'],
];
// Exceções aprovadas pela dona do projeto (aparecem como aviso, não reprovam).
const exceptions = [['white', 'whatsapp', 4.5, 'botões do WhatsApp no desktop (verde do Figma, escolha de marca)']];
c['rosa/80 sobre bordo'] = mix(c.rosa, c.bordo, 0.8);
c['rosa/70 sobre bordo-dark'] = mix(c.rosa, c['bordo-dark'], 0.7);
pairs.push(['rosa/80 sobre bordo', 'bordo', 4.5, 'labels do verso do card de aroma']);
pairs.push(['rosa/70 sobre bordo-dark', 'bordo-dark', 4.5, 'rodapé (opacidade 70%)']);

let fail = 0;
for (const [fg, bg, min, where] of pairs) {
  const r = ratio(c[fg], c[bg]);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${r.toFixed(2).padStart(5)}:1  ${fg} / ${bg}  — ${where}`);
}
for (const [fg, bg, min, where] of exceptions) {
  console.log(`  aviso ${ratio(c[fg], c[bg]).toFixed(2).padStart(5)}:1  ${fg} / ${bg}  — ${where} (exceção aprovada, mínimo ${min})`);
}
console.log(fail ? `\n${fail} par(es) abaixo de AA.` : `\nTodos os pares passam em WCAG AA (fora ${exceptions.length} exceção aprovada, acima).`);
process.exit(fail ? 1 : 0);
