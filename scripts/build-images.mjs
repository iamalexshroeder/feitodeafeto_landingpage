// Otimiza as imagens-fonte de assets/ para public/img/ (WebP, em 2 larguras para o srcset).
// Uso: npm run images
//
//   assets/aromas/<aroma>.jpg                → public/img/aromas/<aroma>{-360,}.webp   (carrossel)
//   assets/produto/100g/<aroma>.png          → public/img/100g/<aroma>{-640,}.webp     (modelo 100g, por aroma)
//   assets/produto/40g/<aroma>.png           → public/img/40g/<aroma>{-640,}.webp      (modelo 40g, por aroma)
//   assets/produto/kit/kit-<tamanho>.png     → public/img/kit/kit-<tamanho>{-640,}.webp (kit, por tamanho)
//   assets/produto/floral/<aroma>.png        → public/img/floral/<aroma>{-640,-thumb,}.webp (vela floral de 100g)
//   assets/fundadora/giovaneli.png           → public/img/fundadora{-400,}.webp      (Quem faz)
//   assets/ui/avatar.svg                     → public/img/avatar.svg
//
// <aroma> = id do aroma em src/data/content.ts. As larguras batem com o `srcset` dos componentes:
// a versão sem sufixo é a maior (2x no desktop); a com sufixo atende o celular.
import { mkdirSync, copyFileSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'assets';
const OUT = 'public/img';
const AROMAS = ['pimenta-rosa', 'baunilha', 'morango-com-champanhe', 'perfume-das-fadas', 'cereja-com-avela'];
mkdirSync(`${OUT}/aromas`, { recursive: true });

/** Recorta (opcional), gera a versão grande e a pequena. */
async function variants(input, out, { crop, large, small, quality = 80 }) {
  const base = () => (crop ? sharp(input).extract(crop) : sharp(input));
  await base().resize(large.w, large.h, { fit: 'cover' }).webp({ quality }).toFile(`${out}.webp`);
  await base().resize(small.w, small.h, { fit: 'cover' }).webp({ quality }).toFile(`${out}-${small.w}.webp`);
}

// Carrossel: fotos do Moodboard (2388 × 3200). Card de 282 × 395 (desktop) / até 312 (celular).
for (const id of AROMAS) {
  await variants(`${SRC}/aromas/${id}.jpg`, `${OUT}/aromas/${id}`, {
    large: { w: 640, h: 856 },
    small: { w: 360, h: 482 },
    quality: 78,
  });
}

// Modelos: caixa de 600 × 560 (desktop) / ~342 de largura (celular). Recortes do Figma.
// Modelo 100g: uma foto por aroma. Pimenta Rosa é a foto do Figma; as demais são a mesma foto com a
// arte real do rótulo de cada aroma (assets/rotulos/100g) aplicada por cima.
mkdirSync(`${OUT}/100g`, { recursive: true });
for (const id of AROMAS) {
  await variants(`${SRC}/produto/100g/${id}.png`, `${OUT}/100g/${id}`, {
    large: { w: 1200, h: 1120 },
    small: { w: 640, h: 597 },
    quality: 80,
  });
}
// Modelo 40g: uma foto por aroma (Figma "banner-vela-*"), trocada quando a cliente escolhe o aroma.
// Recorte central (cover) na proporção da caixa. Pimenta Rosa: foto da Cereja com o rótulo trocado.
mkdirSync(`${OUT}/40g`, { recursive: true });
for (const id of AROMAS) {
  await variants(`${SRC}/produto/40g/${id}.png`, `${OUT}/40g/${id}`, {
    large: { w: 1200, h: 1120 },
    small: { w: 640, h: 597 },
    quality: 80,
  });
}
// Vela floral de 100g: uma foto por aroma. Pimenta Rosa é a foto do Figma (196:179); as demais são ela com o
// rótulo de cada aroma no lugar (tirado da foto 100g do aroma, alinhado e com a luz corrigida).
mkdirSync(`${OUT}/floral`, { recursive: true });
for (const id of AROMAS) {
  await variants(`${SRC}/produto/floral/${id}.png`, `${OUT}/floral/${id}`, {
    large: { w: 1200, h: 1120 },
    small: { w: 640, h: 597 },
    quality: 80,
  });
  await sharp(`${SRC}/produto/floral/${id}.png`)
    .resize(160, 160, { fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(`${OUT}/floral/${id}-thumb.webp`);
}
// Quem faz: foto da fundadora (Figma 192:111, 941 × 1672). Desktop: coluna de 343 × 609 (2x = 686);
// celular: 343 × 369 com recorte no topo (object-position no CSS).
await variants(`${SRC}/fundadora/giovaneli.png`, `${OUT}/fundadora`, {
  large: { w: 686, h: 1218 },
  small: { w: 400, h: 711 },
  quality: 80,
});
// Kit: 3 velas (1 na frente, 2 atrás), uma imagem por tamanho; montadas a partir das fotos por aroma.
mkdirSync(`${OUT}/kit`, { recursive: true });
for (const id of ['kit-100g', 'kit-40g']) {
  await variants(`${SRC}/produto/kit/${id}.png`, `${OUT}/kit/${id}`, {
    large: { w: 1200, h: 1120 },
    small: { w: 640, h: 597 },
    quality: 80,
  });
}

// Miniaturas (galeria de aromas nos blocos 100g e 40g): 160 × 160, recorte central.
for (const size of ['100g', '40g']) {
  for (const id of AROMAS) {
    await sharp(`${SRC}/produto/${size}/${id}.png`)
      .resize(160, 160, { fit: 'cover' })
      .webp({ quality: 78 })
      .toFile(`${OUT}/${size}/${id}-thumb.webp`);
  }
}

for (const id of ['kit-100g', 'kit-40g']) {
  await sharp(`${SRC}/produto/kit/${id}.png`)
    .resize(160, 160, { fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(`${OUT}/kit/${id}-thumb.webp`);
}

copyFileSync(`${SRC}/ui/avatar.svg`, `${OUT}/avatar.svg`);

console.log('Imagens geradas em public/img/.');
