// Gera dist/_headers com a Content-Security-Policy da página, depois do build.
// O Astro embute alguns <script> pequenos direto no HTML; para não liberar 'unsafe-inline',
// cada um entra na política pelo hash SHA-256. Roda a cada build, então os hashes nunca ficam velhos.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const html = readdirSync(dist).filter((f) => f.endsWith('.html'));

const hashes = new Set();
for (const file of html) {
  const page = readFileSync(join(dist, file), 'utf8');
  for (const [, attrs, body] of page.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs) || /application\/ld\+json/.test(attrs) || !body.trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  }
}

// Serviços externos que a página chama do navegador: busca de CEP na sacola.
const connect = ['https://viacep.com.br', 'https://brasilapi.com.br'];

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(' ')}`.trim(),
  // style-src precisa de 'unsafe-inline': o CSS é embutido no HTML (build.inlineStylesheets) e há atributos style.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${connect.join(' ')}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

writeFileSync(join(dist, '_headers'), `/*\n  Content-Security-Policy: ${csp}\n`);
console.log(`CSP: ${hashes.size} script(s) inline com hash em ${html.length} página(s) → dist/_headers`);
