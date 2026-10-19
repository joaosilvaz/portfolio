# Redesign "Exposição" — design

Aprovado por João em 2026-10-19.

## Intenção
Refazer o portfólio com nível Awwwards: editorial, preto e branco, motion de qualidade. Conceito: laboratório fotográfico. "Revelar" é o verbo do site: foto revelada como cópia, títulos em contorno que preenchem como filme exposto, troca de tema = inverter o negativo.

## Decisões
- Paleta só P&B (sobrepõe a regra de 1 cor de destaque do CLAUDE.md por pedido do João). Tokens: `--bg`, `--fg`, `--fg-muted` (#A3A3A3 / #525252), `--line` (12%), `--glass` (55–60% + blur 16px).
- Tema: next-themes (system na 1ª visita, persistido, sem flash) + View Transitions API com círculo de clip-path a partir do toggle; fallback instantâneo.
- Fontes: Archivo (variável, eixo wdth) para display e corpo; Martian Mono só para informação técnica.
- Grid 12 colunas visível ao fundo em `--line`.
- Hero: foto `public/images/perfil.jpeg`, grayscale + contraste, retângulo vertical (~4 col), revelado com clip-path do centro. Camadas: "JOÃO VITOR" contorno atrás, foto, "DA SILVA" sólido à frente com mix-blend difference. Parallax de scroll e mouse (desktop).
- Loader: 1ª visita, ≤1.4s, pulável (clique/Esc), contador 000→100; o quadro vira a foto do hero.
- Projetos: pin + scroll horizontal no desktop, lista vertical no mobile. Case study em `/[locale]/projetos/[slug]` (problema, decisão técnica, resultado).
- Sobre: opacidade palavra a palavra com scrub. Stack: 4 grupos + 1 marquee (único do site). Contato: CTA grande, copiar e-mail `joaosilvatech@gmail.com`, LinkedIn, GitHub, CV.
- Manter: i18n PT/EN (next-intl) e chatbot Claude API (redesenhado).
- Remover: framer-motion, tsparticles, vanilla-tilt, react-icons, Stats, partículas.
- Motion: tokens em `lib/motion/tokens.ts`; matchMedia separa desktop / mobile / reduced-motion (reduced = só fade).

## Pendências de conteúdo
- Projetos novos: João envia depois. Hoje: Lens Analytics (confidencial), Assistente de IA, Bank System API. Previews de Lens/Assistente são tipográficos até haver imagens.
