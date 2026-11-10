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
  wood-dark: "#8E6A4C"    # texto em tom madeira (benefício "Vidro + tampa"), AA sobre creme
  whatsapp: "#37CE65"     # botões do WhatsApp no desktop (Dúvidas, CTA final) — exceção aprovada ao AA (texto branco, 2,1:1)
  tint-pimenta-rosa: "#F3D3D6"
  tint-baunilha: "#F4E8D8"
  tint-morango: "#F7D9DC"
  tint-fadas: "#E9DFF0"
  tint-cereja: "#EBD6CF"
  logo: "#61162C"         # cor própria do logo (assets/); não usar na interface
  estrela: "#FFD900"      # só as estrelas decorativas do hero no celular; nunca em texto
typography:
  fontFamily: Inter (variável, self-hosted via @fontsource-variable/inter)
  # Grid de 8: tamanho/entrelinha em múltiplos de 8. Títulos com letter-spacing -3px.
  # Desktop no padrão de sites de produto consolidados (Apple/Shopify): 56 · 40 · 28 · 20 · 18 · 16 · 14 · 12.
  display: { size/line: 56/64, tablet: 48/56, mobile: 40/40, weight: 600, letterSpacing: -3px }
  h2:      { size/line: 40/48, tablet: 36/40, mobile: 32/40, weight: 600, letterSpacing: -3px }
  h3:      { size/line: 28/32, mobile: 24/32, weight: 600, letterSpacing: -1.5px }   # preços, números
  title:   { size/line: 20/24, mobile: 24/32, weight: 600, letterSpacing: -0.5px }   # títulos de card/passo
  body-l:  { size/line: 18/32, weight: 400 }
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

Uma família só (Inter). Hierarquia por tamanho e peso, nunca por cor extra. Labels sempre em caixa alta com tracking positivo, acima de títulos. Uma família só — nada de serifa ou segunda fonte. Na opção de tamanho do kit: label (tamanho) → preço → economia, cada um na sua linha. Os tamanhos são fluidos (`clamp`) e chegam ao valor do Figma a partir de ~1190px.

## Layout

- Container de 1200px. **Desktop** (Figma): página branca com seções alternando branco e creme — coleção, título dos modelos, 40g, faixa de ajuda, Quem faz, Dúvidas e CTA em branco; benefícios, 100g, kit e depoimentos em creme; Como fazemos em bordô-escuro. Painéis (faixa de ajuda, Quem faz, CTA) em creme sobre o branco. **Celular:** fundo creme, Como fazemos e CTA em rosa suave, Dúvidas em branco.
- Menu no desktop: logo à esquerda; links e "Fale com a gente" juntos à direita.
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
- **Botões**: só texto, sem ícone nem emoji (exceção: o ícone de sacola — no menu do celular e, no desktop, flutuante no canto inferior direito, 56px bordô com o contador em rosa); no desktop, os botões de conversa ("Tirar dúvida", "Pedir pelo WhatsApp") são verdes (`whatsapp`), no celular bordô; 56px de altura no celular e 48px no desktop. **No celular ocupam toda a largura disponível** (respeitando o padding do container ou do painel); dentro de cards (card de aroma aberto) ocupam a largura do card. Exceção: o botão do menu.
- **Cards lado a lado têm a mesma altura** (depoimentos, passos): o grid estica todos e o rodapé do card (assinatura) fica alinhado embaixo.
- **Faixa do topo**: o texto tem um brilho contínuo (rosa-bebê → branco → rosa-bebê, 4,5s, linear); com "reduzir movimento" fica parado no rosa. No Figma, o texto leva esse degradê como preenchimento.
- **Estilos de texto no Figma** (Display, H2, H3, Body L, Body, Strong, Label e os Mobile/…) seguem a escala do site: 56/64, 40/48, 28/32, 18/32, 16/24, 12/16.
- **Efeitos ao rolar**: `data-reveal` (sobe 24px + fade, 0.8s) e `data-reveal="zoom"` nas imagens; atraso em cascata via `--reveal-delay`. Menu fixo ganha sombra ao rolar. Hero: a cena assenta (escala 1.04 → 1). Nada acima da dobra depende de JS; tudo desliga com `prefers-reduced-motion`.

## Hero

Fundo: "hero-banner 1" no **recorte usado no frame da landing** (1:63), gerado por `npm run hero`, com o **degradê bordô do Figma** por cima (90% até 27% da largura, some em 88%). Desktop: título em **branco**, label e prova social em **rosa**, texto em **rosa suave** e "Ver a coleção" em contorno branco — todos AA graças ao degradê (`npm run contrast` mede o pior ponto atrás de cada texto). Mobile: **sem imagem** — texto em bordô-escuro sobre o creme, botões e, sobre "Mais de 100 velas vendidas", 5 estrelas decorativas (`--color-estrela` #FFD900, só ilustração). A imagem nem é baixada abaixo de 1024px.

## Navbar e logo

Nav branca (fixa ao rolar), **56px de altura** (logo de 40 + 8 em cima e embaixo), logo completo (`/brand/logo.svg`, 40px de altura) e botão "navbar" (contorno, 40px). Rodapé com o logo completo em rosa (`/brand/logo-rosa.svg`). O logo vem do arquivo da marca — usar sempre os SVGs de `public/brand/` (gerados por `npm run brand`).

## Abertura da página

A página esmaece de leve ao abrir (opacidade 0 → 1 em 0.7s, uma vez). Desliga com `prefers-reduced-motion`.

## Carrossel de aromas

Referência: cards da LP Ecolab (Moodboard). Cards 5:7 (282px no desktop, 4 visíveis + o começo do 5º), raio 24, rolagem horizontal com encaixe, setas (48px, contorno bordô) e arrastar com o mouse. **Fechado:** foto do Moodboard (vela 100g + 40g acesas sobre os ingredientes), dica no topo ("Veja os detalhes" no desktop, "Toque para ver detalhes" no celular) e nome + família embaixo, sobre degradê escuro. **Aberto** (hover com mouse, foco no teclado, toque no celular): **sem giro** — o card cresce 3% com sombra, a foto aproxima (1.06) e as informações sobem 16px e aparecem por cima: nome, pirâmide olfativa e botão "Quero esse aroma" (On Dark, 40px), sobre bordô sólido até 88% da altura (texto sempre no sólido, AA), esmaecendo para a foto no topo.

Animações (desligam com `prefers-reduced-motion`, que deixa só o esmaecimento): entrada em cascata (90ms entre cards); abrir/fechar em 0.35–0.5s. No toque, abre já ao soltar o dedo (sem esperar o clique). No Figma: componente "Card Aroma" (Componentes) com propriedades **Aroma** (5) × **Estado** (Fechado/Aberto).

## Modelos

Três blocos no layout dos antigos blocos de vela, sem número na imagem (a Flor de Cera saiu: só entra o que dá para comprar): **Vela de 100g** (uma foto por aroma, mesmo estúdio; começa em Pimenta Rosa e troca com fade ao escolher o aroma; R$ 45,00), **Vela de 40g** (uma foto por aroma, mesma base: só o rótulo muda, como na 100g; R$ 20,00) e **Kit com 3 velas** (foto com 3 velas — uma na frente, duas atrás — que troca com o tamanho escolhido; 3 de 100g R$ 120,00 ou 3 de 40g R$ 55,00, com a economia em relação às avulsas). Preços vêm do Figma/dona; não inventar valores.

**Tamanho no desktop:** cada bloco de modelo cabe numa tela de notebook (~680px) sob o menu — imagem 600×512, 16px de respiro vertical, 16px entre os itens; no kit, sem chips (as opções de tamanho já dizem isso) e cada opção com preço e economia na mesma linha.

**Galeria de aromas (100g e 40g):** como em loja online — "Aroma: <nome>" e, logo abaixo, 5 miniaturas (uma por aroma), na coluna de texto; clicar troca a foto (fade de 0,6s), o nome do aroma ao lado e a mensagem do WhatsApp. A escolhida ganha anel bordô. Começa no aroma da foto padrão. Nesses modelos não há campo de aroma; o kit continua com os 3 campos.

**Pedido** (em cada modelo à venda): select "Aroma" (pílula branca 56px, anel `line`, seta bordô); no kit, seletor de tamanho (2 pílulas, a escolhida em bordô) + 3 selects de aroma. A escolha monta a mensagem do WhatsApp; sem JS, o botão abre a mensagem padrão. Embaixo: botão "Quero encomendar" + "VALOR"/preço ao lado (no celular: valor em cima, botão em largura total) e a linha "Entrega em Santos e região · Pagamento via Pix". Os seletores ainda não estão no Figma.

## Sacola (carrinho)

Em cada modelo e no kit, o botão principal é **"Adicionar à sacola"** (com o aroma/tamanho escolhidos); embaixo, o link "Ou peça só este direto pelo WhatsApp". Ao adicionar: o botão mostra "Adicionado à sacola", aparece um aviso escuro com "Ver sacola" e o menu ganha o botão **"Sacola · n"** (só texto; no celular ele ocupa o lugar do "Fale com a gente"). A barra fixa do celular vira "Sacola · n itens / total" + "Ver sacola".

O painel abre à direita (pouco menos da metade da tela no desktop; tela inteira no celular), com os itens e o resumo em formato de **ticket** (papel branco, data, **mini card fatiado** com a foto de cada item — até 4 fatias, "+n" na última —, linhas tracejadas e serrilhado embaixo). No Figma: seção "Sacola — telas (site)" na página Landing. Tem **3 passos** (Sacola → Entrega → Enviar): itens com −/+ e remover; nome, cidade (Santos e região), bairro e rua/número **obrigatórios** (mensagem de erro em cada campo; não avança nem envia sem eles) e observações opcionais (salvos no aparelho); resumo, **próximos passos** (enviar → confirmar aromas, prazo e entrega → pagar via Pix → entregar) e "Enviar pelo WhatsApp" com a mensagem pronta. Total sempre "sem a entrega". Sem servidor nem pagamento online. Métricas: `add_to_cart`, `begin_checkout`, `send_order` no dataLayer.

## Modelos ao rolar

Os blocos de modelo e a faixa "Não sabe qual escolher?" só esmaecem ao entrar na tela (`data-reveal`: sobe 24px + fade, 0,8s). Sem efeito de pilha.

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
- Frame mobile (390, iPhone 13) no Figma: node 47:37. No celular a faixa de benefícios não aparece.
- "Mais de 100 velas vendidas" (Figma) e os depoimentos são de exemplo até haver dados reais.
