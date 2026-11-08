// Otimiza as imagens exportadas do Figma (assets/figma/) para public/img/.
// Uso: npm run images
//
// Reproduz o recorte que o Figma aplica em cada camada (object-cover da foto e
// escala não uniforme dos rótulos) e exporta em WebP no dobro do tamanho de exibição.
import { mkdirSync, copyFileSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'assets/figma';
const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// Foto do pote (a mesma para todas as velas — Figma "Product image").
// 1024×1024 em object-cover numa caixa de proporção 502.32 × 450.02.
{
  const box = { w: 502.3245849609375, h: 450.01513671875 };
  const scale = Math.max(box.w / 1024, box.h / 1024);
  const cropH = Math.round(box.h / scale);
  const top = Math.round((1024 - cropH) / 2);
  await sharp(`${SRC}/hero-product.png`)
    .extract({ left: 0, top, width: 1024, height: cropH })
    .resize(1004, 900)
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(`${OUT}/vela-pote.webp`);
}

// Rótulos — frame "Velas" (9:125). Cada rótulo é esticado para w% × h% da caixa,
// deslocado left% / top% e recortado pela caixa (proporção 148.463 × 135.352).
const LABEL_BOX = { w: 258.6616516113281, h: 235.81881713867188 }; // tamanho de exibição no hero
const labels = [
  { id: 'cereja', src: 'hero-label.png', w: 118.05, h: 142.01, left: 8.7, top: 18.93 },
  { id: 'fadas', src: 'rotulo-fadas.png', w: 133.73, h: 168.07, left: 17.01, top: 34.31 },
  { id: 'morango', src: 'rotulo-morango.png', w: 119.63, h: 148.88, left: 9.48, top: 24.69 },
  { id: 'baunilha', src: 'rotulo-baunilha.png', w: 131.38, h: 150.94, left: 16.86, top: 23.27 },
  { id: 'pimenta', src: 'rotulo-pimenta.png', w: 119.63, h: 148.88, left: 10.01, top: 24.69 },
];

for (const l of labels) {
  const k = 2; // 2x
  const boxW = Math.round(LABEL_BOX.w * k);
  const boxH = Math.round(LABEL_BOX.h * k);
  const imgW = Math.round((LABEL_BOX.w * l.w * k) / 100);
  const imgH = Math.round((LABEL_BOX.h * l.h * k) / 100);
  const left = Math.round((LABEL_BOX.w * l.left * k) / 100);
  const top = Math.round((LABEL_BOX.h * l.top * k) / 100);
  await sharp(`${SRC}/${l.src}`)
    .resize(imgW, imgH, { fit: 'fill' })
    .extract({ left, top, width: Math.min(boxW, imgW - left), height: Math.min(boxH, imgH - top) })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(`${OUT}/rotulo-${l.id}.webp`);
}

// Aromas (carrossel): fotos do Moodboard do Figma (10:83, 10:85, 10:87, 10:89, 10:90),
// exportadas em 2388 × 3200 (fontes em JPEG q90). Cards de ~320 × 428 → 640 × 856 (2x), proporção 3:4.
mkdirSync(`${OUT}/aromas`, { recursive: true });
for (const id of ['pimenta', 'baunilha', 'morango', 'fadas', 'cereja']) {
  await sharp(`${SRC}/aromas/${id}.jpg`)
    .resize(640, 856, { fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(`${OUT}/aromas/${id}.webp`);
}

// Modelo 40g: recorte da vela pequena na foto da Cereja com Avelã.
await sharp(`${SRC}/aromas/cereja.jpg`)
  .extract({ left: 20, top: 1220, width: 1070, height: 1000 })
  .resize(1070, 1000)
  .webp({ quality: 80 })
  .toFile(`${OUT}/modelo-40g.webp`);

// SVGs pequenos: copiados como estão.
for (const f of [
  'hero-shadow.svg',
  'avatar.svg',
  'icon-whatsapp-primary.svg',
  'icon-whatsapp-secondary.svg',
  'icon-whatsapp-ondark.svg',
]) {
  copyFileSync(`${SRC}/${f}`, `${OUT}/${f}`);
}

console.log('Imagens geradas em public/img/.');
