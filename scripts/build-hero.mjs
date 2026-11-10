// Otimiza o fundo do hero: Figma › Landing › Hero › "image 12" (node 180:111).
// Fonte: assets/hero/hero-banner.png (1798 × 875, imagem original do Figma: vela Pimenta Rosa na
// mesa de cabeceira). Uso: npm run hero
import sharp from 'sharp';

const SRC = 'assets/hero/hero-banner.png';

// Desktop (srcset): no Figma a foto preenche o hero inteiro (1440 × 701), sem recorte.
await sharp(SRC).resize(1440, 701, { fit: 'cover' }).webp({ quality: 82 }).toFile('public/img/hero-banner.webp');
await sharp(SRC).resize(960, 467, { fit: 'cover' }).webp({ quality: 80 }).toFile('public/img/hero-banner-960.webp');

// Mobile: foto no topo (390 × 400) com a vela inteira no centro (vela em x≈1287, y≈380 da original); a
// base da foto esmaece para o escuro e os textos começam por cima dela.
const cropMobile = { left: 853, top: 0, width: 868, height: 875 };
await sharp(SRC)
  .extract(cropMobile)
  .resize(780, 800)
  .webp({ quality: 80 })
  .toFile('public/img/hero-banner-mobile.webp');
await sharp(SRC)
  .extract(cropMobile)
  .resize(520, 533)
  .webp({ quality: 78 })
  .toFile('public/img/hero-banner-mobile-520.webp');

console.log('Hero gerado em public/img/hero-banner*.webp.');
