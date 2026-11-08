# Feito de Afeto — landing page

Landing page de velas aromáticas artesanais (Santos e região). Site estático em **Astro 7 + Tailwind 4**: todo o conteúdo sai pronto no HTML, com JavaScript pequeno só para os efeitos e para montar o pedido do WhatsApp.

> Projeto conceitual de portfólio: depoimentos e números de vendas são de exemplo. O site sai com `noindex` até `PUBLIC_INDEXABLE=true`.

## Começar

Requisitos: Node 22+ (no Windows, também o Microsoft Visual C++ Redistributable x64).

```bash
npm install
cp .env.example .env   # ajuste SITE_URL
npm run dev            # http://localhost:4321
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor local com recarga |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o `dist/` localmente |
| `npm run verify` | Tipos (`astro check`) + build + validação de SEO + contraste — rodar antes de publicar |
| `npm run validate` | Confere title, description, canonical, robots, OG, h1, headings, alt, JSON-LD, robots.txt, sitemap e 404 |
| `npm run contrast` | Contraste WCAG AA de todos os pares de cor usados |
| `npm run format` | Formata o código (Prettier + Astro + ordem das classes Tailwind) |
| `npm run assets` | Regera logos/favicons/OG (`brand`), fotos (`images`) e hero (`hero`) a partir de `assets/` |

## Estrutura

```
src/
  config/site.ts        dados da marca, WhatsApp, Instagram, entrega, pagamento, indexação
  data/content.ts       aromas, modelos (preços, kit), passos, depoimentos, FAQ
  layouts/Base.astro    <head>, SEO, JSON-LD, efeitos ao rolar, métrica de cliques
  components/
    SEO.astro           title, description, canonical, robots, Open Graph, Twitter
    JsonLd.astro        Organization + WebSite + WebPage + Product/Offer + FAQPage
    sections/           uma seção do Figma por arquivo
    ui/Button.astro     botão (primary / secondary / ondark)
  pages/                index, 404, robots.txt
  styles/global.css     tokens do Figma (cores, tipografia, container)
scripts/                otimização de imagens e validações
assets/                 imagens-fonte (o site usa as versões de public/)
```

Conteúdo e preços mudam em `src/data/content.ts`; contatos em `src/config/site.ts`. Design: `DESIGN.md`. Requisitos técnicos: `docs/requisitos-tecnicos.md`.

## Conversão e métrica

- **Sacola:** `src/scripts/cart.ts` (itens, total, mensagem, dados salvos no localStorage) + `src/components/cart/CartDrawer.astro` (painel em 3 passos). O pedido sai como mensagem pronta no WhatsApp.

- Todo CTA leva ao WhatsApp com mensagem pronta. Nos modelos, a escolha de aroma (e de tamanho no kit) entra na mensagem.
- No celular, uma barra fixa "A partir de R$ 20,00 · Ver modelos" aparece depois do hero e some perto dos pedidos, do CTA final e do rodapé.
- Cada clique em link do WhatsApp dispara `whatsapp_click` no `window.dataLayer` (`location`, `item`, `label`) e no Plausible, se instalado. Para medir: instalar o GTM/GA4 ou o Plausible e usar esse evento como conversão.

## Publicar (Netlify)

`netlify.toml` já define build, pasta e cabeçalhos (cache e segurança). No painel:

1. Conectar o repositório.
2. Variáveis: `SITE_URL` (domínio final) e, quando for indexar, `PUBLIC_INDEXABLE=true`.
3. Configurar o domínio e o redirecionamento `www` ↔ sem `www`.
4. Depois de publicar: testar o JSON-LD no Rich Results Test e enviar o sitemap no Search Console.
