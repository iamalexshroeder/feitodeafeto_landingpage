---
version: alpha
name: Feito de Afeto
description: Landing page de velas aromáticas artesanais. Clara, calma e aconchegante — minimalismo de página de produto com calor de casa.
source: Figma "Feito de Afeto — Landing Page" (LTGkf5XlUZs3OcGsCbFeLG), frame Desktop 1440 (node 1:49)
colors:
  bordo: "#6B1E2E"        # marca, CTAs, labels, preço do destaque
  bordo-dark: "#4A121F"   # rodapé, hover do botão primário
  rosa: "#F6DDE1"         # texto sobre bordô, painel do CTA final
  rosa-soft: "#FBEEF0"    # chips, fundo de "Como fazemos"
  creme: "#FCF8F5"        # fundo da página
  white: "#FFFFFF"        # cards, faixa de confiança, FAQ
  ink: "#2A1418"          # títulos e texto principal
  muted: "#7A6266"        # texto de apoio
  line: "#EAD6D9"         # bordas e divisores
  wood: "#B98A63"         # tampa do pote (ilustração)
  tint-pimenta-rosa: "#F3D3D6"
  tint-baunilha: "#F4E8D8"
  tint-morango: "#F7D9DC"
  tint-fadas: "#E9DFF0"
  tint-cereja: "#EBD6CF"
  logo: "#61162C"         # cor própria do logo (assets/); não usar na interface
typography:
  fontFamily: Inter (variável, self-hosted via @fontsource-variable/inter)
  # Grid de 8: tamanho/entrelinha em múltiplos de 8. Títulos com letter-spacing -3px.
  display: { size/line: 72/72, tablet: 56/56, mobile: 40/40, weight: 600, letterSpacing: -3px }
  h2:      { size/line: 48/56, tablet: 40/48, mobile: 32/40, weight: 600, letterSpacing: -3px }
  h3:      { size/line: 32/40, mobile: 24/32, weight: 600, letterSpacing: -1.5px }   # preços, números
  title:   { size/line: 24/32, weight: 600, letterSpacing: -0.5px }                   # títulos de passo
  body-l:  { size/line: 20/32, mobile: 18/32, weight: 400 }
  body:    { size/line: 16/24, weight: 400 }
  small:   { size/line: 14/24, weight: 400 }
  label:   { size/line: 12/16, weight: 600, letterSpacing: 0.1em, textTransform: uppercase }
rounded:
  pill: 999px      # botões e chips
  notes: 16px      # tabela de notas olfativas
  card: 24px       # passos, depoimentos
  media: 32px      # imagem das velas, faixa CTA
  panel: 40px      # CTA final
spacing:
  container: 1200px   # 120px de margem no frame de 1440
  gutter: clamp(20px, 3vw, 40px)
  section-y: 120px    # seções de conteúdo (80px no mobile)
  feature-y: 72px     # cada vela
  feature-gap: 96px   # imagem ↔ texto
components:
  button-primary:   { background: "{colors.bordo}", color: "{colors.white}", radius: "{rounded.pill}", padding: 20px 32px, height: 56px, font: "16px/1 600", icon: none }
  button-secondary: { outline: "inset 1.5px {colors.bordo}", color: "{colors.bordo}", radius: "{rounded.pill}", height: 56px }
  button-ondark:    { background: "{colors.white}", color: "{colors.bordo}", radius: "{rounded.pill}" }
  chip:             { background: "{colors.rosa-soft}", color: "{colors.bordo}", padding: 8px 14px, font: small }
  notes-table:      { background: "{colors.white}", border: "1px {colors.line}", radius: "{rounded.notes}", row-padding: 14px 20px }
  card:             { background: "{colors.white}", radius: "{rounded.card}", padding: 40px 36px }
---

# Feito de Afeto — Design

## Overview

Página de produto em tom de conversa. Muito respiro, um aroma por vez, tipografia grande e precisa (Inter semibold com tracking negativo) e uma paleta quente de creme, rosa e bordô. Implementação em `src/components/sections/` — cada componente cita o node do Figma de origem.

## Colors

- **Fundo creme** (`creme`) na página inteira; **branco** destaca blocos (faixa de confiança, cards, FAQ).
- **Bordô** é a cor de ação: todo CTA, toda label em caixa alta, a faixa "Não sabe qual escolher?".
- **Rosa** só sobre bordô (texto) ou como painel grande (CTA final). **Rosa-soft** para chips e para a seção "Como fazemos".
- Cada aroma tem seu **tint** como fundo da imagem — é o que diferencia as velas visualmente.
- O logo mantém a cor própria (`#61162C`); não misturar com o bordô da interface em superfícies grandes.

## Typography

Uma família só (Inter). Hierarquia por tamanho e peso, nunca por cor extra. Labels sempre em caixa alta com tracking positivo, acima de títulos. Os tamanhos são fluidos (`clamp`) e chegam ao valor do Figma a partir de ~1190px.

## Layout

- Container de 1200px; seções alternam fundo (creme → branco → rosa-soft) para marcar ritmo.
- Velas: grade 600/520 com 96px de espaço, imagem e texto **alternando de lado**. A faixa CTA entra entre a 3ª e a 4ª vela.
- Hero: coluna de texto de 707px; a imagem passa 73px da grade à direita no desktop (como no Figma).
- Mobile: tudo empilha em uma coluna; imagem da vela antes do texto; links do menu somem e fica só o botão.

## Components

- **Button**: três variantes (primária, contorno, sobre escuro), sempre com o ícone de conversa e sempre levando ao WhatsApp com mensagem pronta.
- **Tabela de notas** (Topo / Coração / Fundo) em `<dl>`, label em caixa alta muted.
- **Chips** de especificação (100g, ~25h de queima, Cera vegetal).
- **CandlePhoto** (Figma "Velas", 9:125): foto do pote + rótulo de cada aroma + sombra, em camadas. A foto do pote é a mesma para todas; o rótulo muda. Nos blocos da coleção ocupa 80% da caixa colorida; no hero, 502px.
- **FAQ**: `<details>` nativo; "+" gira 45° ao abrir.

## Regras do projeto

- **Paleta**: só os tokens acima. Nada de cor nova sem passar pelo DESIGN.md.
- **Acessibilidade**: todo par texto/fundo em WCAG AA — `npm run contrast` confere os 18 pares usados. No hero, texto só em ink/bordô sobre o véu creme (o muted não passa sobre a parede).
- **Grid de 8**: espaçamentos, raios, alturas e entrelinhas em múltiplos de 8 (4 só em detalhes). Classes Tailwind de passo ímpar (`gap-1.5`, `py-3.5`…) não são usadas.
- **Títulos** (display e h2): letter-spacing **-3px**.
- **Botões**: só texto, sem ícone nem emoji; 56px de altura. **No celular ocupam toda a largura disponível** (respeitando o padding do container ou do painel); dentro de cards (verso do aroma) ocupam a largura do card. Exceção: o botão do menu.
- **Cards lado a lado têm a mesma altura** (depoimentos, passos): o grid estica todos e o rodapé do card (assinatura) fica alinhado embaixo.
- **Efeitos ao rolar**: `data-reveal` (sobe 24px + fade, 0.8s) e `data-reveal="zoom"` nas imagens; atraso em cascata via `--reveal-delay`. Menu fixo ganha sombra ao rolar. Hero: a cena assenta (escala 1.04 → 1). Nada acima da dobra depende de JS; tudo desliga com `prefers-reduced-motion`.

## Hero

Fundo: "hero-banner 1" no **recorte usado no frame da landing** (1:63), gerado por `npm run hero`. Desktop: imagem de ponta a ponta com a vela Baunilha à direita; título e texto em **bordô-escuro direto sobre a parede** (sem véu), label/estrelas em bordô — todos AA (`npm run contrast`). Mobile: **sem imagem** — só o texto e os botões (a imagem nem é baixada abaixo de 1024px).

## Navbar e logo

Nav branca (fixa ao rolar), logo completo (`/brand/logo.svg`, 40px de altura) e botão "navbar" (contorno, 40px). Rodapé com o logo completo em rosa (`/brand/logo-rosa.svg`). O logo vem do arquivo da marca — usar sempre os SVGs de `public/brand/` (gerados por `npm run brand`).

## Abertura da página

A página esmaece de leve ao abrir (opacidade 0 → 1 em 0.7s, uma vez). Desliga com `prefers-reduced-motion`.

## Carrossel de aromas

Referência: cards da LP Ecolab (Moodboard). Cards 3:4 (282px no desktop, 4 visíveis + o começo do 5º), raio 24, rolagem horizontal com encaixe, setas (48px, contorno bordô) e arrastar com o mouse. **Frente:** foto do Moodboard (vela 100g + 40g acesas sobre os ingredientes), "(nome)" em minúsculas no topo e nome + família embaixo, sobre degradê escuro. **Verso** (hover em mouse, foco no teclado, toque no celular): bordô com um brilho do tint do aroma no canto, pirâmide olfativa e botão "Quero esse aroma" (On Dark, 40px). Giro 3D de 0.7s; com `prefers-reduced-motion`, troca por esmaecimento.

## Modelos

Três blocos no layout dos antigos blocos de vela: **100g com flor de cera** (placeholder até ter foto), **100g** (pote de estúdio) e **40g** (recorte da foto da Cereja do Moodboard). Preço ausente → "Valor sob consulta" (não inventar valores).

## Pilha da coleção

Os 5 blocos de vela e a faixa "Não sabe qual escolher?" param sob o menu e o próximo desliza por cima (sticky + 8px de degrau). O bloco coberto encolhe até 94% e escurece 12% (`--p`, calculado ao rolar). Liga só a partir de 1024px **e** se cada bloco couber na tela; senão, rolagem normal. Com `prefers-reduced-motion`, empilha sem encolher/escurecer.

## Do's and Don'ts

- ✅ Um CTA de WhatsApp por bloco, com mensagem pré-preenchida citando o produto.
- ✅ Respeitar os tints por aroma; manter a alternância de lados.
- ✅ Dados de exemplo sempre sinalizados (avaliação, depoimentos) até existirem reais.
- ❌ Não introduzir segunda família tipográfica nem sombras pesadas — profundidade vem de cor de fundo e bordas `line`.
- ❌ Não usar `text-wrap: balance` nos títulos: as quebras seguem o Figma.
- ❌ Não inventar números (avaliações, vendas) nem schema `aggregateRating`.

## Responsive Behavior

Breakpoints Tailwind: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Grades de 2 colunas a partir de `lg`; 3 colunas (passos, depoimentos) a partir de `md`. Testado de 360 a 1440px sem rolagem horizontal.

## Known Gaps

- As 5 velas usam a mesma foto de pote com rótulos trocados; fotos individuais (ou da vela acesa) dariam mais variedade.
- O Figma não posiciona as fotos dentro dos blocos da coleção (lá ainda há o placeholder); o tamanho de 80% da caixa foi decisão de implementação.
- Não há frame mobile no Figma; o mobile foi derivado do desktop.
- Avaliação "4,9 de 5" e depoimentos são de exemplo.
