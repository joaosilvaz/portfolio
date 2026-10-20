/**
 * Linguagem de motion do site inteiro. Nenhum componente define easing,
 * duração ou stagger por conta própria: tudo vem daqui.
 */

export const ease = {
  in: 'power3.out',
  out: 'power2.in',
  inOut: 'power3.inOut',
  none: 'none',
} as const

/** Equivalentes CSS/WAAPI dos easings do GSAP (para View Transitions e CSS). */
export const cssEase = {
  in: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  out: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  inOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
} as const

export const duration = {
  micro: 0.25,
  element: 0.8,
  section: 1.1,
} as const

export const stagger = {
  lines: 0.08,
  chars: 0.03,
  items: 0.06,
} as const

/** Intro "JV": entrada + pausa + voo até o header somam ~1.4s; o hero começa junto com o voo. */
export const loader = {
  mark: 0.6,
  hold: 0.1,
  exit: 0.75,
} as const

/** Parallax e interações de ponteiro (em px ou fração). */
export const pointer = {
  cursorFollow: 0.35,
  cursorScale: { link: 2.2, project: 5 },
  magnetStrength: 0.3,
  heroParallax: 12,
} as const

export const scroll = {
  lenisLerp: 0.1,
  heroParallax: { photo: 10, text: -12 },
  stackScale: 0.92,
} as const

/** Media queries usadas no gsap.matchMedia() do site inteiro. */
export const mq = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const

/** Único marquee do site (Stack): uma volta completa e a desaceleração no hover. */
export const marquee = {
  duration: 40,
  hoverSpeed: 0.25,
} as const

/** Deslocamentos e opacidades das entradas (px ou fração). */
export const reveal = {
  y: 32,
  fadeY: 16,
  panelY: 24,
  imgScale: 1.2,
  /** Palavras do "Sobre" antes do scroll as acender (0.45 ainda passa 3:1 em texto grande). */
  dimOpacity: 0.45,
  /** Camada que escurece o card de projeto que fica por trás. */
  shadeOpacity: 0.6,
} as const

/** Posições (s) na timeline de entrada do hero e da página de case. */
export const intro = {
  heroNames: 0.25,
  heroLines: 0.45,
  heroFades: 0.6,
  heroImg: 1.55,
  caseVisual: 0.1,
} as const

/** Menu mobile: quanto os links sobrepõem a cortina e quão mais rápido ele fecha. */
export const menu = {
  linksOverlap: 0.35,
  closeSpeed: 1.6,
} as const

/** Rede de segurança: se a rota não trocar após a cortina fechar, ela reabre (s). */
export const transition = {
  fallback: 3,
} as const
