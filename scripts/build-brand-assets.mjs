// Gera os assets de marca a partir do logo original (assets/marca/logo.svg).
// Uso: npm run brand
//
// O SVG original desenha o miolo das letras (o, e, a...) como formas off-white sobre
// um fundo off-white. Aqui essas formas viram máscara, para que os vazados sejam
// transparentes de verdade e o logo funcione sobre qualquer fundo.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const SOURCE = 'assets/marca/logo.svg';
const INK = '#61162C'; // bordô
const PAPER = '#F3F3F2'; // off-white (fundo/miolos no original)
const ROSA = '#F3C4CC';

const svg = readFileSync(SOURCE, 'utf8');
const paths = [...svg.matchAll(/<path d="([^"]+)" fill="(#[0-9A-Fa-f]{6})"\/>/g)]
  .map(([, d, fill]) => ({ d, fill: fill.toUpperCase() }))
  // descarta o retângulo de fundo
  .filter((p) => !/^M0 0H1280V1280H0V0Z$/.test(p.d));

// Limites (no sistema 1280×1280 do original). A tagline fica abaixo de y≈930.
const yMin = (d) => Math.min(...[...d.matchAll(/-?\d+\.?\d*/g)].map((m) => +m[0]).filter((_, i) => i % 2));
const isTagline = (p) => yMin(p.d) > 930;
const FULL = { x: 200, y: 296, w: 882, h: 702 };
const WORDMARK = { x: 200, y: 296, w: 882, h: 578 };
const F_LETTER = paths.find((p) => p.fill === INK && p.d.startsWith('M') && yMin(p.d) < 310);

function logoSvg(box, { tagline = true, color = INK, id = 'm' } = {}) {
  const shapes = paths
    .filter((p) => tagline || !isTagline(p))
    .map((p) => `<path d="${p.d}" fill="${p.fill === INK ? '#fff' : '#000'}"/>`)
    .join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.x} ${box.y} ${box.w} ${box.h}" width="${box.w}" height="${box.h}">` +
    `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}">${shapes}</mask></defs>` +
    `<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" fill="${color}" mask="url(#${id})"/></svg>`
  );
}

// Favicon: o "f" do logo sobre rosa. O "f" ocupa x 211–381, y 308–719.
function faviconSvg() {
  const size = 500;
  const cx = 296;
  const cy = 513;
  const x = cx - size / 2;
  const y = cy - size / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${size} ${size}">` +
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="110" fill="${ROSA}"/>` +
    `<path d="${F_LETTER.d}" fill="${INK}"/></svg>`
  );
}

// Coloca um logo dentro de uma tela, centralizado.
function canvas(width, height, background, box, logoHeight, opts) {
  const logoWidth = (box.w / box.h) * logoHeight;
  const inner = logoSvg(box, opts)
    .replace('<svg ', `<svg x="${(width - logoWidth) / 2}" y="${(height - logoHeight) / 2}" `)
    .replace(/ width="\d+" height="\d+"/, ` width="${logoWidth}" height="${logoHeight}"`);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
    `<rect width="100%" height="100%" fill="${background}"/>${inner}</svg>`
  );
}

const png = (svgText, out) => sharp(Buffer.from(svgText)).png({ compressionLevel: 9 }).toFile(out);

mkdirSync('public/brand', { recursive: true });
// Logo completo (nav, "Quem faz") e em rosa (color/rosa) para o rodapé bordô-escuro.
// Para uma versão só com o nome (sem "Velas aromáticas"): logoSvg(WORDMARK, { tagline: false }).
writeFileSync('public/brand/logo.svg', logoSvg(FULL));
writeFileSync('public/brand/logo-rosa.svg', logoSvg(FULL, { color: '#F6DDE1' }));
writeFileSync('public/favicon.svg', faviconSvg());

await Promise.all([
  sharp(Buffer.from(faviconSvg())).resize(32, 32).png().toFile('public/favicon-32x32.png'),
  sharp(Buffer.from(faviconSvg())).resize(180, 180).png().toFile('public/apple-touch-icon.png'),
  // Logo quadrado para o schema (Organization.logo) — Google pede raster ≥ 112 px.
  png(canvas(512, 512, PAPER, FULL, 360), 'public/brand/logo-512.png'),
  // Open Graph 1200×630.
  png(canvas(1200, 630, ROSA, FULL, 400), 'public/og-image.png'),
]);

console.log('Assets de marca gerados em public/ e public/brand/.');
