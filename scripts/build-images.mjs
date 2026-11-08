// Otimiza as imagens-fonte de assets/ para public/img/.
// Uso: npm run images
//
//   assets/produto/pote-100g.png             → public/img/pote-100g.webp
//   assets/rotulos/figma/<aroma>.png         → public/img/rotulos/<aroma>.webp
//   assets/aromas/<aroma>.jpg                → public/img/aromas/<aroma>.webp
//   assets/produto/vela-40g-*-maos.jpg       → public/img/vela-40g.webp
//   assets/produto/vela-100g-*.jpg           → public/img/vela-100g.webp
//   assets/produto/kit-3-velas.png           → public/img/kit-3-velas.webp
//   assets/ui/*.svg                          → public/img/*.svg
//
// <aroma> = id do aroma em src/data/content.ts (pimenta-rosa, baunilha, morango-com-champanhe,
// perfume-das-fadas, cereja-com-avela). Reproduz o recorte que o Figma aplica em cada camada
// (object-cover da foto e escala não uniforme dos rótulos) e exporta em WebP 2x.
import { mkdirSync, copyFileSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'assets';
const OUT = 'public/img';
const AROMAS = ['pimenta-rosa', 'baunilha', 'morango-com-champanhe', 'perfume-das-fadas', 'cereja-com-avela'];
mkdirSync(`${OUT}/rotulos`, { recursive: true });
mkdirSync(`${OUT}/aromas`, { recursive: true });

// Pote de 100g (a mesma foto para todos os aromas — Figma "Product image").
// 1024×1024 em object-cover numa caixa de proporção 502.32 × 450.02.
{
  const box = { w: 502.3245849609375, h: 450.01513671875 };
  const scale = Math.max(box.w / 1024, box.h / 1024);
  const cropH = Math.round(box.h / scale);
  const top = Math.round((1024 - cropH) / 2);
  await sharp(`${SRC}/produto/pote-100g.png`)
    .extract({ left: 0, top, width: 1024, height: cropH })
    .resize(1004, 900)
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(`${OUT}/pote-100g.webp`);
}

// Rótulos sobre o pote — Figma › Componentes › "Velas". Cada rótulo é esticado para w% × h% da
// caixa, deslocado left% / top% e recortado pela caixa (proporção 148.463 × 135.352).
const LABEL_BOX = { w: 258.6616516113281, h: 235.81881713867188 }; // tamanho de exibição no hero
const labels = {
  'cereja-com-avela': { w: 118.05, h: 142.01, left: 8.7, top: 18.93 },
  'perfume-das-fadas': { w: 133.73, h: 168.07, left: 17.01, top: 34.31 },
  'morango-com-champanhe': { w: 119.63, h: 148.88, left: 9.48, top: 24.69 },
  baunilha: { w: 131.38, h: 150.94, left: 16.86, top: 23.27 },
  'pimenta-rosa': { w: 119.63, h: 148.88, left: 10.01, top: 24.69 },
};
for (const [id, l] of Object.entries(labels)) {
  const k = 2; // 2x
  const boxW = Math.round(LABEL_BOX.w * k);
  const boxH = Math.round(LABEL_BOX.h * k);
  const imgW = Math.round((LABEL_BOX.w * l.w * k) / 100);
  const imgH = Math.round((LABEL_BOX.h * l.h * k) / 100);
  const left = Math.round((LABEL_BOX.w * l.left * k) / 100);
  const top = Math.round((LABEL_BOX.h * l.top * k) / 100);
  await sharp(`${SRC}/rotulos/figma/${id}.png`)
    .resize(imgW, imgH, { fit: 'fill' })
    .extract({ left, top, width: Math.min(boxW, imgW - left), height: Math.min(boxH, imgH - top) })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(`${OUT}/rotulos/${id}.webp`);
}

// Carrossel de aromas: fotos do Moodboard (velas acesas sobre os ingredientes), 2388 × 3200.
// Cards de ~282 × 395 → 640 × 856 (2x), recorte cover.
for (const id of AROMAS) {
  await sharp(`${SRC}/aromas/${id}.jpg`)
    .resize(640, 856, { fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(`${OUT}/aromas/${id}.webp`);
}

// Modelo 40g: foto do pote com rolha (Perfume das Fadas) nas mãos (1024 × 1024). Recorte na
// proporção da caixa do modelo (600 × 560), mantendo o pote no centro. A versão recortada sem
// fundo (vela-40g-perfume-das-fadas.png) fica em assets/ como alternativa.
await sharp(`${SRC}/produto/vela-40g-perfume-das-fadas-maos.jpg`)
  .extract({ left: 0, top: 68, width: 1024, height: 956 })
  .webp({ quality: 82 })
  .toFile(`${OUT}/vela-40g.webp`);

// Modelo 100g: foto da vela Baunilha sendo acesa (2000 × 2000). Recorte na proporção da caixa do
// modelo (600 × 560), centrado na vela, e exportado em 2x.
await sharp(`${SRC}/produto/vela-100g-baunilha-acesa.jpg`)
  .extract({ left: 0, top: 42, width: 2000, height: 1867 })
  .resize(1200, 1120)
  .webp({ quality: 80 })
  .toFile(`${OUT}/vela-100g.webp`);

// Kit com 3 velas: mãos segurando três potes de 100g (1024 × 1024, Figma "Modelos / Kit").
// Mesmo recorte do Figma: imagem 788px em x -72 / y -228 numa caixa de 600 × 560.
await sharp(`${SRC}/produto/kit-3-velas.png`)
  .extract({ left: 94, top: 296, width: 780, height: 728 })
  .webp({ quality: 82 })
  .toFile(`${OUT}/kit-3-velas.webp`);

// SVGs pequenos: copiados como estão.
for (const f of ['sombra-vela.svg', 'avatar.svg']) {
  copyFileSync(`${SRC}/ui/${f}`, `${OUT}/${f}`);
}

console.log('Imagens geradas em public/img/.');
