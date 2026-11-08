# Briefing — Feito de Afeto

> **Projeto conceitual (portfólio).** Marca, avaliações, depoimentos e contatos são **fictícios** ou de exemplo. Publicar com `noindex` e aviso de projeto conceitual.
>
> **Fonte da verdade do conteúdo: o Figma** ("Feito de Afeto — Landing Page", frame Desktop 1440). Este briefing resume o Figma e completa o que ele não cobre (localização, contato, tom de voz, SEO).

---

## 1. A marca

**Feito de Afeto** — velas aromáticas feitas à mão, sob encomenda, com cera vegetal e pote de vidro com tampa de madeira que continua com a cliente depois da última chama. Atendimento e pedidos 100% pelo WhatsApp.

- **Localização (fictícia):** Santos (SP), atendendo Santos e região; o site fala em "feitas à mão no Brasil".
- **Assinatura:** *Velas feitas à mão para perfumar seus momentos de afeto.*

## 2. Produto (Figma)

Modelos (Figma): **100 g** (~25 h, pote de vidro + tampa de madeira) **R$ 45,00** · **40 g** (pote com rolha) **R$ 20,00** · **100 g com flor de cera** *em breve*. Todas de cera vegetal.

Notas: cartões "Pirâmide olfativa" da página Moodboard do Figma.

| # | Aroma | Família | Cabeça | Corpo | Fundo |
|---|---|---|---|---|---|
| 01 | Pimenta Rosa | Floral especiado | Bergamota, anis e damasco | Violeta, lírio do vale e pimenta rosa | Almíscar, patchouli e baunilha |
| 02 | Baunilha | Doce e aconchegante | Anis e pêssego | Coco e sândalo | Almíscar e baunilha |
| 03 | Morango com Champanhe | Frutado e festivo | Morango, pêssego, uva e cassis | Jasmim, rosa e baunilha | Âmbar, sândalo e almíscar |
| 04 | Perfume das Fadas | Floral delicado | Melão, hortelã e framboesa | Peônia, jasmim e lírio do vale | Morango, coco e almíscar |
| 05 | Cereja com Avelã | Gourmand intenso | Cereja, pêssego e cacau | Avelã e lírio do vale | Baunilha, sândalo e almíscar |

**Em avaliação:** linha de 40 g e versão de 100 g com flor de cera (ver discussão de estratégia na conversa / próximos passos).

## 3. Público-alvo

Mulheres de 25 a 45 anos que valorizam casa, autocuidado e presentes com significado; compram pelo celular, via Instagram e WhatsApp. Também quem procura presente.

## 4. Objetivo da landing

1. **Conversão:** abrir o WhatsApp com mensagem pronta citando o aroma.
2. **Métrica:** cliques em botões de WhatsApp / visitas.

## 5. Diferenciais (faixa de confiança)

Cera 100% vegetal (queima limpa e mais lenta) · Feita à mão em pequenos lotes · Vidro + tampa de madeira (pote reutilizável) · Pedido direto pelo WhatsApp.

## 6. Tom de voz

Acolhedor, calmo e próximo — como uma amiga indicando algo que ama. Frases curtas, linguagem sensorial, "você" e "a gente". Sem exageros nem excesso de exclamações.

## 7. Direção visual

Ver `DESIGN.md`. Creme, rosa e bordô; Inter; muito respiro; cada aroma com sua cor de fundo.

## 8. Estrutura da página (Figma)

Faixa de anúncio → Nav → Hero → Faixa de confiança → A coleção (5 velas, faixa "Não sabe qual escolher?" entre a 3ª e a 4ª) → Como fazemos (3 passos) → Depoimentos → Dúvidas (FAQ) → CTA final → Rodapé.

## 9. Perguntas frequentes (Figma)

Quanto tempo a vela dura? · Por que cera vegetal? · Como faço o pedido? · Qual o prazo de produção? · Posso reaproveitar o pote? — textos em `src/data/content.ts`.

## 10. Contato (fictício)

- **WhatsApp:** (13) 99999-0000 — número de exemplo.
- **Instagram:** @feitodeafeto.velas — exemplo.

## 11. SEO

- **Palavra-chave principal:** velas aromáticas artesanais
- **Secundárias:** vela de cera vegetal, vela aromática para presente, velas artesanais Santos.
- **Title:** `Velas Aromáticas Artesanais em Santos | Feito de Afeto`
- **Description:** definida em `src/config/site.ts`.
- **Schema:** Organization + WebSite + WebPage + FAQPage. Sem `aggregateRating` (avaliações de exemplo).

## 12. Pendências de conteúdo

- Fotos individuais das velas (hoje: mesma foto de pote com o rótulo de cada aroma, do frame "Velas" do Figma).
- Depoimentos e avaliação reais.
- Número de WhatsApp e Instagram reais, se o projeto virar loja.
