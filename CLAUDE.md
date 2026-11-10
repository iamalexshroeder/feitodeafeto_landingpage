# Feito de Afeto — Landing Page

Landing page da marca Feito de Afeto, construída a partir do design no Figma (via Figma MCP).

> **Status:** projeto **conceitual de portfólio**. A marca (velas aromáticas artesanais em Santos/SP), produtos, preços, depoimentos e contatos são **fictícios** e estão definidos em `docs/briefing.md` — usar só o que está lá, sem inventar claims novos. Página publicada com `noindex`. O rodapé traz "Feito de Afeto 2026 - Todos os direitos reservados." (decisão da dona, no lugar do antigo aviso "Projeto conceitual").

## Arquivos de contexto

| Arquivo | Papel | Status |
|---|---|---|
| `PRODUCT.md` | Produto, público, objetivo, tom de voz (gerado pelo `/impeccable init` a partir do briefing) | pendente |
| `DESIGN.md` | Identidade visual: tokens, tipografia, componentes, do's & don'ts — extraído do Figma | pronto |
| `docs/briefing.md` | Briefing (fictício) da marca; o **conteúdo segue o Figma** | pronto |

**Figma (fonte da verdade visual e de conteúdo):** https://www.figma.com/design/LTGkf5XlUZs3OcGsCbFeLG — frame "Feito de Afeto — Landing (Desktop 1440)", node `1:49`. Cada componente em `src/components/sections/` cita o node de origem. Imagens-fonte ficam em `assets/` (ver "Arquivos de imagem") e são otimizadas para `public/img/` com `npm run images`.
| `docs/requisitos-tecnicos.md` | SEO (title, description, semântica, JSON-LD, canonical, indexação), performance e responsividade | **obrigatório** |

## Definição de pronto

Nenhuma página é entregue sem cumprir **todos** os requisitos de `docs/requisitos-tecnicos.md` e passar pela checklist de validação no fim dele (Lighthouse mobile, JSON-LD validado, um único h1, canonical/robots corretos, sem rolagem horizontal de 360 a 1440 px). Reportar os números obtidos, não só "passou".

## Skills do projeto (`.claude/skills/`)

**Design — skill principal: `impeccable`.** Toda decisão de design, layout, copy de interface, animação e revisão visual passa por ela. Modo da landing: **Persuade**.
- Novo trabalho: `/impeccable init` (gera PRODUCT.md) → `/impeccable shape` → construção.
- Revisão: `/impeccable critique`, `/impeccable audit`, `/impeccable polish` antes de publicar.
- Ajustes pontuais: `typeset`, `layout`, `colorize`, `animate`, `adapt`, `clarify`.
- No Windows, o launcher é `.claude/skills/impeccable/scripts/impeccable.cmd`.

**Apoio (só quando a impeccable pedir ou o caso exigir):**
- `react-bits` — componentes animados prontos (texto, hover, fundos). Usar com moderação e dentro do DESIGN.md.
- `gsap-*` (core, timeline, scrolltrigger, plugins, react, performance, utils) — implementação das animações definidas pela impeccable. Sempre respeitar `prefers-reduced-motion`.

**Qualidade de engenharia:**
- `systematic-debugging` — qualquer bug ou comportamento inesperado.
- `verification-before-completion` — antes de declarar algo pronto: rodar o build e ver a página renderizada.
- `requesting-code-review` — ao fechar uma etapa maior.
- `find-skills` — buscar novas skills quando faltar alguma capacidade.

Não usar outras skills de estética (ex.: frontend-design, taste) em paralelo à impeccable — uma direção de design só.

## Fluxo Figma → código

1. Receber o link do frame (`Copy link to selection`).
2. Ler variables/styles do Figma e manter o `DESIGN.md` sincronizado com eles — Figma é a fonte da verdade visual.
3. Implementar seção por seção, usando apenas tokens (nada de cores/espaçamentos soltos).
4. Verificar no navegador em desktop e mobile (375px) antes de seguir.

## Stack

**Astro 7 + Tailwind 4** (confirmado) — HTML estático, ilhas React só onde houver `react-bits` ou `gsap-react` (adicionar `@astrojs/react` quando precisar). Evitar SPA renderizada só no cliente.

Estrutura:
- `src/config/site.ts` — dados da marca, title/description padrão, WhatsApp, `indexable` (lê `PUBLIC_INDEXABLE`).
- `src/data/content.ts` — fragrâncias, linhas e FAQ (o FAQ alimenta a página **e** o `FAQPage` do JSON-LD).
- `src/components/SEO.astro` — title, description, canonical, robots, Open Graph, Twitter.
- `src/components/JsonLd.astro` — `@graph` Organization + WebSite + WebPage (+ FAQPage).
- `src/layouts/Base.astro` — `<html lang>`, skip link, `<main>` único.
- `src/pages/robots.txt.ts` — libera ou bloqueia conforme `PUBLIC_INDEXABLE`; sitemap via `@astrojs/sitemap`.
- `src/styles/global.css` — tokens do Figma (cores, tints, estilos de texto fluidos, `container-page`) e fonte Inter self-hosted.
- `src/components/ui/Button.astro` — botão (primary/secondary/ondark); repassa atributos `data-*`.
- `src/components/sections/MobileCta.astro` — barra fixa de compra no celular ("A partir de… · Ver modelos").
- Métrica: `Base.astro` dispara `whatsapp_click` no `dataLayer` (e no Plausible, se houver) a cada clique em link do WhatsApp. Sem script de terceiro no código.
- `README.md` — setup, scripts, estrutura e deploy (Netlify, `netlify.toml`).
- `src/components/sections/` — uma seção do Figma por arquivo.

Comandos:
- `npm run dev` — servidor local
- `npm run build` — build de produção em `dist/`
- `npm run validate` — checa title, description, canonical, robots, OG, h1, headings, alt, JSON-LD, robots.txt, sitemap e 404 no `dist/`
- `npm run contrast` — contraste WCAG AA de todos os pares de cor usados
- `npm run check` — tipos (`astro check`); `npm run format` — Prettier (Astro + ordem das classes Tailwind)
- `npm run verify` — check + build + validate + contrast (rodar antes de publicar/commitar)
- `npm run assets` — `brand` + `images` + `hero`; `npm run images` gera cada foto em 2 larguras (grande + `-640`/`-360` para o `srcset`)

**Regras fixas (ver DESIGN.md › Regras do projeto):** paleta do DESIGN.md, contraste AA, grid de 8, títulos com -3px, botões sem ícone/emoji, efeitos leves com `prefers-reduced-motion`.

**Fluxo de trabalho:** a dona do projeto edita direto o frame da landing no Figma (página "Landing Page", node `1:49`). A cada pedido "repassar alterações": ler `get_metadata` do frame, comparar com o código e aplicar o que mudou — mantendo as regras fixas abaixo quando o Figma divergir (ex.: botões ficam com 56px no grid de 8). Quando uma mudança aparece só em um item repetido (ex.: só na Vela 01), aplicar em todos e avisar.

**Figma:** páginas "Landing Page", "Componentes" e "Moodboard". Camadas em português, no padrão `Grupo / Item` (ex.: "Modelos / 40g", "Coleção / Carrossel de aromas", "Rótulo 100g / Baunilha", "Baunilha / Pirâmide olfativa"); textos nomeados pelo papel (Título, Texto, Label), imagens pelo conteúdo (Foto, Pote, Rótulo, Sombra, Logo). Blocos antigos ficam como "Antigo / … (oculto)". Botão: propriedade `Estilo` (Primário, Contorno, Sobre escuro, Menu, Menu preenchido). O Moodboard é referência visual e **fonte de informação** (notas olfativas = cartões "Pirâmide olfativa"); as fotos de lá são de referência — não usar produtos de outras marcas.

Variáveis de ambiente: `SITE_URL` (domínio canônico) e `PUBLIC_INDEXABLE=true` (só quando for indexar).

## Marca

- Originais do logo em `assets/marca/` (`logo.svg` + PNGs) — **não editar**; são a fonte.
- `npm run brand` (`scripts/build-brand-assets.mjs`) gera a partir do SVG: `public/brand/logo.svg` (nav, "Quem faz"), `logo-rosa.svg` (rodapé), `logo-512.png` (schema), `public/og-image.png` (1200×630), `favicon.svg`, `favicon-32x32.png` e `apple-touch-icon.png`.
- No SVG original os miolos das letras são formas off-white; o script os converte em máscara para o logo ficar vazado de verdade. Usar sempre os arquivos gerados, nunca o original direto na página.
- Cores do logo: bordô `#61162C`, rosa `#F3C4CC`, off-white `#F3F3F2`.

## Arquivos de imagem

Nomes em minúsculas, com hífen, sem espaços. `<aroma>` = id do aroma em `src/data/content.ts`: `pimenta-rosa`, `baunilha`, `morango-com-champanhe`, `perfume-das-fadas`, `cereja-com-avela`.

| Fonte (`assets/`) | O que é | Vira (`public/`) |
|---|---|---|
| `marca/logo.svg`, `logo-fundo-*.png` | logo original | `brand/*`, favicons, OG (`npm run brand`) |
| `hero/hero-banner.png` | foto do hero (Figma 180:111, vela Pimenta Rosa) | `img/hero-banner{-960,}.webp` (desktop) e `img/hero-banner-mobile{-520,}.webp` (banner do celular, vela no centro) (`npm run hero`) |
| `aromas/<aroma>.jpg` | fotos do Moodboard | `img/aromas/<aroma>{-360,}.webp` |
| `produto/100g/<aroma>.png` | fotos do modelo 100g por aroma: Pimenta Rosa é a foto do Figma; as outras são ela com a arte do rótulo (`rotulos/100g`) aplicada | `img/100g/<aroma>{-640,}.webp` |
| `produto/40g/<aroma>.png` | fotos do modelo 40g por aroma: base Cereja com Avelã (Figma) com o rótulo 40g de cada aroma aplicado; originais em `produto/40g/fotos-originais/` | `img/40g/<aroma>{-640,-thumb,}.webp` |
| `produto/floral/<aroma>.png` | vela floral de 100g por aroma: Pimenta Rosa é a foto do Figma; as outras são ela com o rótulo do aroma (tirado de `produto/100g`, alinhado e com a luz corrigida) | `img/floral/<aroma>{-640,-thumb,}.webp` |
| `fundadora/giovaneli.png` | foto da fundadora (Figma 192:111) | `img/fundadora{-400,}.webp` |
| `produto/kit/kit-<tamanho>.png` | kit com 3 velas (1 na frente, 2 atrás), por tamanho | `img/kit/kit-<tamanho>{-640,}.webp` |
| `produto/pote-100g.png`, `produto/vela-40g-perfume-das-fadas.png` | potes recortados (alternativas) | — |
| `rotulos/` | rótulos (arte) | — (referência) |
| `ui/avatar.svg` | detalhe de interface | `img/avatar.svg` |
| `referencias/` | mockups e peças de divulgação | — (não usados no site) |

`assets/_remover/` (fora do git) guarda arquivos substituídos/duplicados; pode ser apagado.

## Ambiente (Windows)

O build exige o **Microsoft Visual C++ Redistributable (x64)** — sem ele o binário nativo do compilador do Astro (`satteri`) falha com `ERR_DLOPEN_FAILED`.

Node e Git estão instalados, mas a sessão pode herdar um PATH antigo. Se `node`/`git` não forem reconhecidos, recarregar o PATH no comando:

```powershell
$env:Path=[Environment]::GetEnvironmentVariable('Path','Machine')+';'+[Environment]::GetEnvironmentVariable('Path','User')
```

## Convenções

- Idioma do conteúdo e da comunicação: português (BR).
- Credenciais e chaves só em `.env` (nunca commitadas).
- `.skills-arquivadas/` guarda skills removidas do projeto; não usar.
