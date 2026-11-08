# Requisitos técnicos — SEO, performance e responsividade

Valem para toda página publicada. Uma página só está **pronta** quando passa em todos os critérios de validação abaixo.

Valores marcados `[BRIEFING]` dependem do briefing e não podem ser inventados.

---

## 1. Title e meta description

- `<title>`: **50–60 caracteres**, palavra-chave principal no início, marca no fim. Ex.: `[Proposta principal] | Feito de Afeto`.
- `<meta name="description">`: **140–160 caracteres**, benefício + chamada para ação, escrita para clique (não lista de palavras-chave).
- Únicos por página. Gerados de um só lugar (config/props de SEO), nunca duplicados à mão.
- Open Graph e Twitter Card: `og:title`, `og:description`, `og:image` (**1200×630**, < 300 KB), `og:url`, `og:type=website`, `og:locale=pt_BR`, `twitter:card=summary_large_image`.
- `<html lang="pt-BR">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Favicon (SVG + 32px PNG) e `apple-touch-icon` 180px; `theme-color` com a cor da marca do DESIGN.md.

## 2. Estrutura semântica

- Um único `<h1>`, com a proposta principal. Hierarquia de headings sem pular níveis (h1 → h2 → h3).
- Landmarks: `<header>`, `<nav>` (se houver menu), `<main>` único, `<section>` com heading próprio (`aria-labelledby`), `<footer>`.
- Listas são `<ul>/<ol>`, depoimentos `<blockquote>`/`<figure>`, perguntas frequentes `<details>/<summary>` ou h3 + texto.
- Links são `<a href>`, ações são `<button>`. Texto de link descritivo (nada de "clique aqui").
- Imagens com `alt` descritivo; decorativas com `alt=""`. Ícones SVG decorativos com `aria-hidden="true"`.
- Formulários com `<label>` associado, `autocomplete` correto e mensagens de erro acessíveis.
- Acessibilidade mínima: WCAG 2.2 AA — contraste 4.5:1 (texto) / 3:1 (texto grande e UI), foco visível, navegação por teclado, link "pular para o conteúdo".

## 3. Schema (JSON-LD)

- Um bloco `<script type="application/ld+json">` com `@graph`, gerado a partir dos dados do projeto (não string solta no HTML).
- Sempre: `Organization` (nome, `url`, `logo`, `sameAs` com redes sociais) + `WebSite` + `WebPage` (com `inLanguage: "pt-BR"`), ligados por `@id`.
- Conforme o briefing `[BRIEFING]`:
  - negócio com endereço/atendimento local → `LocalBusiness` (ou subtipo, ex. `Bakery`, `Store`) com `address`, `telephone`, `openingHoursSpecification`, `geo`;
  - produtos à venda → `Product` com `offers`;
  - seção de perguntas → `FAQPage` (só com perguntas realmente visíveis na página);
  - avaliações → somente se forem reais e visíveis; nunca inventar `aggregateRating`.
- O conteúdo do schema tem de bater com o conteúdo visível da página.

## 4. Canonical e indexação

- `<link rel="canonical">` absoluto apontando para a URL final (`https://`, domínio definitivo `[BRIEFING]`, com ou sem barra final — escolher um e manter).
- Uma única versão acessível: redirecionar `http→https` e `www↔sem-www` (301) na hospedagem.
- `robots.txt` liberando o site e apontando para o sitemap; `sitemap.xml` com as URLs canônicas.
- Produção: `<meta name="robots" content="index, follow, max-image-preview:large">`.
- Previews/staging: `noindex, nofollow` (por variável de ambiente), para não indexar ambientes de teste.
- Página 404 própria, com status 404 real.

## 5. Performance

Metas (mobile, Lighthouse/PageSpeed, conexão 4G simulada):

| Métrica | Meta |
|---|---|
| LCP | ≤ 2,5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0,1 |
| Lighthouse Performance / SEO / Acessibilidade / Boas práticas | ≥ 90 / 100 / ≥ 95 / ≥ 95 |
| JS enviado na carga inicial | ≤ 100 KB gzip |

Como chegar lá:
- HTML estático/pré-renderizado (conteúdo no HTML, não montado só no cliente).
- Imagens em AVIF/WebP, com `width`/`height` (ou `aspect-ratio`), `srcset`/`sizes`; imagem do hero com `fetchpriority="high"` e sem lazy; demais com `loading="lazy"`.
- Fontes: no máximo 2 famílias, `woff2`, self-hosted, subset latino, `font-display: swap`, preload só da fonte do hero.
- CSS crítico enxuto; JS de animação (GSAP / React Bits) carregado só onde é usado, depois da interação ou da renderização inicial.
- Animações só com `transform`/`opacity`; respeitar `prefers-reduced-motion`.
- Scripts de terceiros (analytics, pixel) com `defer`/carregamento tardio.

## 6. Responsividade

- Mobile-first. Testar em **360, 390, 768, 1024, 1280 e 1440 px** — sem rolagem horizontal em nenhuma.
- Layout fluido (`clamp()` para tipografia e espaçamentos, conforme tokens do DESIGN.md).
- Alvos de toque ≥ 44×44 px; texto base ≥ 16 px no mobile.
- Imagens e mídia nunca estouram o container; o hero funciona em telas baixas (paisagem).
- Seguir os frames mobile/desktop do Figma quando existirem.

---

## Validação (antes de dar como pronto)

1. **Build de produção** sem erros e servido localmente.
2. **Lighthouse** (mobile e desktop) dentro das metas da seção 5.
3. **HTML**: inspecionar o código-fonte gerado — title, description, canonical, robots, OG, `lang`, um único h1.
4. **JSON-LD**: validar em [Rich Results Test](https://search.google.com/test/rich-results) e [Schema.org Validator](https://validator.schema.org/) (após publicar ou colando o código).
5. **Acessibilidade**: `/impeccable audit` + checagem de teclado e contraste.
6. **Responsivo**: conferir no navegador em todas as larguras da seção 6.
7. **Indexação** (após publicar): `robots.txt`, `sitemap.xml`, redirecionamentos 301 e envio do sitemap no Google Search Console.
