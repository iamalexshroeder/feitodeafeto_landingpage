// Otimiza o fundo do hero: Figma › Componentes › Assets › "hero-banner 1" (node 13:130).
// Fonte: assets/hero/hero-banner.jpg (1376 × 768, imagem original do Figma).
// Uso: npm run hero
import sharp from 'sharp';

const SRC = 'assets/hero/hero-banner.jpg';

// Desktop (srcset): o recorte que o Figma mostra no hero (1:63). A imagem está a 120.63% da
// caixa 1440 × 803.72 (topo -97px no hero) e deslocada -10.29% → região visível da foto
// original: x 0–1141, y 142–697 (proporção 1440 × 701 do hero).
const crop = { left: 0, top: 142, width: 1141, height: 555 };
await sharp(SRC).extract(crop).resize(1440, 701).webp({ quality: 82 }).toFile('public/img/hero-banner.webp');
await sharp(SRC).extract(crop).resize(960).webp({ quality: 80 }).toFile('public/img/hero-banner-960.webp');
// Mobile: o hero não tem imagem (só texto).

console.log('Hero gerado em public/img/hero-banner*.webp.');
