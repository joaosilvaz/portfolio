# Skills para o portfólio (Claude Code)

## Onde colocar

- Todos os projetos: `~/.claude/skills/<nome-da-skill>/SKILL.md`
- Só este projeto: `.claude/skills/<nome-da-skill>/SKILL.md` (versionado no Git)
- Plugins: `/plugin` dentro do Claude Code para abrir o gerenciador e instalar.

Confirme nomes de marketplaces e comandos na documentação oficial: https://docs.claude.com

## Skills recomendadas

| Skill | Uso no portfólio |
|---|---|
| `frontend-design` | Direção estética, tipografia, paleta, anti-template. Usar primeiro. |
| `gsap-core` | Tweens, easing, stagger, `gsap.matchMedia()` e reduced-motion. |
| `gsap-timeline` | Sequências coreografadas: loader, hero reveal, transições. |
| `gsap-scrolltrigger` | Scroll storytelling, pin, scrub, parallax, scroll horizontal. |
| `gsap-react` | `useGSAP`, cleanup correto, scope em componentes. |
| `gsap-frameworks` | Integração com Next.js/React sem vazamento de animação. |
| `gsap-plugins` | SplitText, Flip, e outros plugins de texto e layout. |
| `gsap-utils` | Helpers (clamp, mapRange, snap, interpolate). |
| `responsive-design` | Layout e motion funcionando em mobile. |
| `design:ux-copy` | Textos curtos e fortes: CTAs, descrições, microcopy. |
| `design:design-critique` | Revisão visual antes de publicar. |
| `design:accessibility-review` | Contraste, foco, teclado, reduced-motion. |

## Ordem de uso

1. `frontend-design` → conceito, fontes, paleta, grid
2. `responsive-design` → estrutura base responsiva
3. `gsap-core` + `gsap-react` → base de motion no Next.js
4. `gsap-scrolltrigger` + `gsap-timeline` → scroll e sequências
5. `gsap-plugins` → SplitText e transições de layout
6. `design:ux-copy` → textos finais
7. `design:design-critique` + `design:accessibility-review` → revisão final

## Prompts prontos

**1. Direção visual**
> Use a skill frontend-design. Leia o CLAUDE.md. Me proponha 3 direções visuais distintas para o portfólio de um Full-Stack/AI Engineer (conceito, 2 fontes, paleta, referência de layout). Não codar ainda. Depois que eu escolher, detalhe a direção escolhida em tokens.

**2. Base do projeto**
> Use frontend-design e gsap-react. Configure Tailwind com os tokens da direção escolhida, instale GSAP, @gsap/react e Lenis, e crie `lib/motion/tokens.ts` com easing, durações e stagger do CLAUDE.md. Integre Lenis ao ScrollTrigger.

**3. Hero**
> Use gsap-core, gsap-timeline e gsap-plugins. Construa o hero com texto revelando por linha (SplitText com máscara), seguindo a linguagem de motion do CLAUDE.md. Inclua fallback para prefers-reduced-motion via gsap.matchMedia().

**4. Projetos**
> Use gsap-scrolltrigger e responsive-design. Construa a seção de projetos com scroll horizontal pinado no desktop e lista vertical simples no mobile. Hover com preview de imagem. Limpar ScrollTriggers no unmount.

**5. Detalhes de interação**
> Use gsap-core. Implemente cursor customizado (desligado em touch), hover magnético nos botões principais e transição de página suave. Sem esconder o foco nativo do teclado.

**6. Revisão final**
> Use design:design-critique e design:accessibility-review. Revise o site inteiro: hierarquia visual, consistência de motion, contraste, teclado e reduced-motion. Liste problemas por prioridade e corrija os críticos.

## Referências para alimentar o Claude

Escolha 3 sites do Awwwards ou Godly de que você gosta e diga, para cada um, o que chamou atenção (tipografia, transição, ritmo de scroll). Isso orienta a direção melhor que "quero algo moderno".
