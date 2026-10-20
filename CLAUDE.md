# CLAUDE.md — Portfólio João Vitor da Silva

Portfólio pessoal de Full-Stack / AI Engineer. Meta: nível Awwwards (Site of the Month): clean, moderno, interativo e com motion de qualidade. Um conceito forte e coerente vale mais que muitos efeitos.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (tokens em variáveis CSS)
- GSAP (core, ScrollTrigger, SplitText) via `@gsap/react` (`useGSAP`)
- Lenis para smooth scroll (integrado ao ScrollTrigger)
- Deploy: Vercel

## Direção visual (ajustar após a fase de direção)

- Estética: editorial, clean, muito espaço negativo, tipografia grande.
- Tema: escuro por padrão, com suporte a `prefers-color-scheme` se fizer sentido.
- Paleta restrita: 1 fundo, 1 texto, 1 cor de destaque única. Nada de gradientes aleatórios.
- Fontes: 1 display + 1 mono (para detalhes técnicos). Nunca mais que 2 famílias.
- Grid de 12 colunas, espaçamento em escala fixa (4/8/16/24/32/48/64/96).
- Evitar cara de template: sem cards genéricos com sombra, sem ícones decorativos soltos.

## Linguagem de motion (regra única para o site inteiro)

- Easing padrão de entrada: `power3.out`. Saída: `power2.in`. Nunca misturar easings sem motivo.
- Durações: micro 0.2–0.3s, entrada de elemento 0.6–0.9s, transição de seção 1–1.2s.
- Stagger padrão: 0.06–0.1s entre linhas/itens.
- Texto revela por linha (SplitText com máscara), não por letra solta, salvo no hero.
- Animar somente `transform` e `opacity`. Nunca animar `width`, `height`, `top`, `left`.
- Usar `will-change` apenas durante a animação.
- Todo ScrollTrigger e timeline deve ser limpo no unmount (`useGSAP` com `scope` e `revertOnUpdate`).
- Usar `gsap.matchMedia()` para separar desktop, mobile e `prefers-reduced-motion`.

## Acessibilidade e performance (inegociável)

- Respeitar `prefers-reduced-motion: reduce`: sem parallax, sem pin, sem scrub; apenas fade simples.
- Contraste mínimo WCAG AA. Foco visível em todos os elementos interativos.
- Navegação 100% por teclado. Cursor customizado não pode esconder o foco nativo.
- HTML semântico (`header`, `main`, `section`, `nav`, `footer`), um único `h1`.
- Imagens com `next/image`, formatos modernos, dimensões definidas (sem layout shift).
- Vídeos curtos, comprimidos, `muted playsInline`, carregamento lazy.
- Meta Lighthouse: Performance ≥ 90, Acessibilidade ≥ 95, CLS ≈ 0.
- Testar em mobile real; motion pesado deve ser simplificado em telas pequenas.

## Estrutura do site

1. **Loader curto** (≤ 1.5s, pulável, só na primeira visita).
2. **Hero**: nome, função, frase de posicionamento, texto revelando por linha.
3. **Projetos**: 3 a 5 cases com imagem/vídeo, scroll horizontal pinado ou lista com hover preview.
4. **Case study** (página própria): problema, decisão técnica, resultado.
5. **Sobre**: curto, com personalidade.
6. **Stack**: enxuta, agrupada por área.
7. **Contato**: CTA claro, e-mail, LinkedIn, GitHub.

## Detalhes de interação desejados

- Cursor customizado que reage a links e projetos (desligado em touch).
- Hover magnético em botões e links principais.
- Transições de página suaves (fade/clip), sem recarregar a sensação de site.
- Smooth scroll com Lenis, sincronizado com ScrollTrigger.
- Marquee ou detalhe tipográfico sutil, no máximo um.

## Convenções de código

- Componentes em `components/`, animações reutilizáveis em `hooks/` e `lib/motion/`.
- Constantes de motion (easing, durações, stagger) centralizadas em `lib/motion/tokens.ts`.
- Nada de valor mágico de animação espalhado pelos componentes.
- Tipagem estrita; sem `any`.
- Commits pequenos e descritivos, uma seção por vez.

## Fluxo de trabalho com o Claude

1. Antes de codar uma seção nova: propor a ideia, confirmar, depois implementar.
2. Rodar `npm run dev` e validar visualmente antes de dar a seção como pronta.
3. Ao final de cada seção: checar reduced-motion, mobile e performance.
4. Antes de publicar: revisão com `design:design-critique` e `design:accessibility-review`.
5. Se uma animação ficar pesada ou confusa, simplificar. Menos é mais.

## O que NÃO fazer

- Não adicionar bibliotecas de animação além de GSAP/Lenis sem perguntar.
- Não usar mais de uma cor de destaque.
- Não criar animação sem propósito (cada movimento deve guiar o olhar ou dar feedback).
- Não ignorar `prefers-reduced-motion`.
- Não deixar texto de placeholder (lorem ipsum) em nenhuma versão commitada.
