// Valida o HTML gerado em dist/ contra docs/requisitos-tecnicos.md (seções 1–4).
// Uso: npm run build && npm run validate
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const pages = readdirSync(dist).filter((f) => f.endsWith('.html') && f !== '404.html');
let failures = 0;

const check = (ok, label, detail = '') => {
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures++;
};
const attr = (html, re) => html.match(re)?.[1];

for (const file of pages) {
  const html = readFileSync(join(dist, file), 'utf8');
  console.log(`\n${file}`);

  const title = attr(html, /<title>([^<]*)<\/title>/);
  check(
    !!title && title.length >= 50 && title.length <= 60,
    'title 50–60 caracteres',
    `${title?.length ?? 0}: "${title}"`,
  );

  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  check(!!desc && desc.length >= 140 && desc.length <= 160, 'description 140–160 caracteres', `${desc?.length ?? 0}`);

  check(/<html lang="pt-BR"/.test(html), 'html lang="pt-BR"');
  check(/<meta name="viewport"/.test(html), 'meta viewport');

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  check(
    !!canonical && /^https:\/\//.test(canonical) && !/(\.html|\/index)$/.test(canonical),
    'canonical absoluto https, sem index/.html',
    canonical,
  );
  const ldUrl = attr(html, /"@type":"WebPage","@id":"[^"]*","url":"([^"]*)"/);
  check(!ldUrl || ldUrl === canonical, 'URL do WebPage (JSON-LD) = canonical', ldUrl);

  const robots = attr(html, /<meta name="robots" content="([^"]*)"/);
  check(!!robots, 'meta robots', robots);

  for (const p of ['og:title', 'og:description', 'og:image', 'og:url', 'og:locale']) {
    check(html.includes(`property="${p}"`), p);
  }

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  check(h1s.length === 1, 'um único h1', `${h1s.length}`);

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const skip = levels.find((l, i) => i > 0 && l > levels[i - 1] + 1);
  check(skip === undefined, 'hierarquia de headings sem pular nível', levels.join(' '));

  check((html.match(/<main[\s>]/g) ?? []).length === 1, 'um único <main>');

  const imgsNoAlt = [...html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)].length;
  check(imgsNoAlt === 0, 'todas as imagens com alt', `${imgsNoAlt} sem alt`);

  const ld = attr(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  try {
    const data = JSON.parse(ld ?? '');
    const types = data['@graph'].map((n) => n['@type']);
    check(
      ['Organization', 'WebSite', 'WebPage'].every((t) => types.includes(t)),
      'JSON-LD Organization + WebSite + WebPage',
      types.join(', '),
    );
    const faq = data['@graph'].find((n) => n['@type'] === 'FAQPage');
    if (faq) {
      const visible = faq.mainEntity.every((q) => html.includes(q.name));
      check(visible, 'FAQPage só com perguntas visíveis');
    }
  } catch (e) {
    check(false, 'JSON-LD válido', e.message);
  }
}

console.log('\narquivos');
check(existsSync(join(dist, 'robots.txt')), 'robots.txt');
check(existsSync(join(dist, 'sitemap-index.xml')), 'sitemap-index.xml');
check(existsSync(join(dist, '404.html')), '404.html');
check(existsSync(join(dist, 'og-image.png')), 'og-image.png (1200×630)');

console.log(failures ? `\n${failures} falha(s).` : '\nTudo certo.');
process.exit(failures ? 1 : 0);
