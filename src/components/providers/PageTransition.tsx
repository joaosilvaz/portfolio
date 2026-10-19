'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq } from '@/lib/motion/tokens'
import { useLenis } from '@/components/providers/SmoothScroll'

type Navigate = (href: string) => void

const TransitionContext = createContext<Navigate | null>(null)

/**
 * Transição entre páginas: uma cortina sobe cobrindo a tela, a rota troca por baixo
 * e a cortina continua subindo para revelar a página nova. Em reduced-motion, só fade.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()
  const curtain = useRef<HTMLDivElement>(null)
  const pending = useRef<string | null>(null)
  const reduced = useRef(false)

  const { contextSafe } = useGSAP(() => {
    reduced.current = window.matchMedia(mq.reduced).matches
  })

  const navigate = contextSafe((href: string) => {
    if (pending.current) return
    const [path] = href.split('#')
    if (path === pathname) {
      router.push(href)
      return
    }
    pending.current = href
    // O intro do monograma é só para quem chega direto na home.
    document.documentElement.dataset.loader = 'skip'
    lenis?.stop()
    gsap.fromTo(
      curtain.current,
      reduced.current
        ? { autoAlpha: 0, clipPath: 'inset(0% 0% 0% 0%)' }
        : { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
      {
        autoAlpha: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: reduced.current ? duration.micro : duration.element,
        ease: ease.inOut,
        onComplete: () => router.push(href),
      },
    )
  })

  // Rota nova montada: volta ao topo (ou à âncora) e abre a cortina.
  useEffect(() => {
    const href = pending.current
    if (!href) return
    pending.current = null

    const hash = href.split('#')[1]
    const target = hash ? document.getElementById(hash) : null
    lenis?.start()
    if (lenis) lenis.scrollTo(target ?? 0, { immediate: true, force: true })
    else if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    gsap.to(curtain.current, {
      ...(reduced.current ? { autoAlpha: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }),
      duration: reduced.current ? duration.micro : duration.element,
      ease: ease.inOut,
      onComplete: () => gsap.set(curtain.current, { autoAlpha: 0 }),
    })
  }, [pathname, lenis])

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div ref={curtain} aria-hidden="true" className="invisible fixed inset-0 z-[105] bg-fg" />
    </TransitionContext.Provider>
  )
}

/** Link interno que passa pela transição de página (cliques com modificador abrem normalmente). */
export function TransitionLink({ href, onClick, ...props }: React.ComponentProps<typeof Link> & { href: string }) {
  const navigate = useContext(TransitionContext)

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (!navigate || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigate(href)
      }}
      {...props}
    />
  )
}
