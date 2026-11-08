# Feito de Afeto — Landing Page

Landing page da marca Feito de Afeto, construída a partir do design no Figma (via Figma MCP).

> **Status:** setup inicial. Briefing ainda não recebido — não inventar conteúdo, público ou claims da marca. Usar placeholders claros (`[TEXTO DO BRIEFING]`) onde faltar informação.

## Arquivos de contexto

| Arquivo | Papel | Status |
|---|---|---|
| `PRODUCT.md` | Produto, público, objetivo, tom de voz (gerado pelo `/impeccable init`) | pendente — aguarda briefing |
| `DESIGN.md` | Identidade visual: tokens, tipografia, componentes, do's & don'ts | pendente — extrair do Figma |
| `docs/briefing.md` | Briefing completo do cliente | pendente |

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

A definir. Padrão proposto: **Vite + React + Tailwind**, tokens do DESIGN.md mapeados no tema do Tailwind.

## Ambiente (Windows)

Node e Git estão instalados, mas a sessão pode herdar um PATH antigo. Se `node`/`git` não forem reconhecidos, recarregar o PATH no comando:

```powershell
$env:Path=[Environment]::GetEnvironmentVariable('Path','Machine')+';'+[Environment]::GetEnvironmentVariable('Path','User')
```

## Convenções

- Idioma do conteúdo e da comunicação: português (BR).
- Credenciais e chaves só em `.env` (nunca commitadas).
- `.skills-arquivadas/` guarda skills removidas do projeto; não usar.
