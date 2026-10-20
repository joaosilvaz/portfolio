'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, menu, mq, stagger } from '@/lib/motion/tokens'
import { useLenis } from '@/components/providers/SmoothScroll'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Magnetic } from '@/components/ui/Magnetic'
import { TransitionLink } from '@/components/providers/PageTransition'
import { requestIntroReplay } from '@/components/site/Loader'

const sections = ['work', 'about', 'stack', 'contact'] as const

function LocaleSwitch() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('common')

  return (
    <div role="group" aria-label={t('switchLanguage')} className="flex items-center font-mono text-xs">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="px-1 text-muted">/</span>}
          <Link
            href={pathname}
            locale={l}
            aria-current={l === locale ? 'true' : undefined}
            lang={l}
            onClick={() => pathname === '/' && l !== locale && requestIntroReplay()}
            className={`px-1 py-2 uppercase ${l === locale ? 'text-fg' : 'text-muted hover:text-fg'}`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  )
}

type SectionLinkProps = { id: string; onHome: boolean } & Omit<React.ComponentProps<'a'>, 'href'>

/** Na home a âncora é local (o Lenis intercepta); nas páginas de case volta para a home com transição. */
function SectionLink({ id, onHome, ...props }: SectionLinkProps) {
  if (onHome) return <a href={`#${id}`} {...props} />
  return <TransitionLink href={`/#${id}`} {...props} />
}

export function Header() {
  const t = useTranslations('nav')
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const pathname = usePathname()
  const onHome = pathname === '/'

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: mq.motion, reduced: mq.reduced }, (ctx) => {
        const { motion } = ctx.conditions as { motion: boolean }
        tl.current = gsap
          .timeline({ paused: true })
          .set(menuRef.current, { autoAlpha: 1 })
          // Foco vai para o primeiro link assim que o menu fica visível (só na abertura).
          .call(() => {
            if (!tl.current?.reversed()) menuRef.current?.querySelector<HTMLElement>('[data-menu-link]')?.focus()
          })
          .fromTo(
            menuRef.current,
            { clipPath: motion ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)', opacity: motion ? 1 : 0 },
            { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: motion ? duration.element : duration.micro, ease: ease.inOut },
          )
          .from('[data-menu-link]', {
            yPercent: motion ? 110 : 0,
            opacity: motion ? 1 : 0,
            stagger: stagger.lines,
            duration: duration.element,
          }, motion ? `-=${menu.linksOverlap}` : 0)
      })
    },
    { scope: menuRef },
  )

  const setMenu = contextSafe((next: boolean) => {
    setOpen(next)
    if (next) {
      lenis?.stop()
      tl.current?.timeScale(1).play()
    } else {
      lenis?.start()
      tl.current?.timeScale(menu.closeSpeed).reverse()
    }
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false)
        toggleRef.current?.focus()
      }
      // Foco preso entre o botão Fechar e os itens do menu enquanto ele cobre a página.
      if (e.key === 'Tab' && menuRef.current && toggleRef.current) {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a[href], button')]
        const first = items[0]
        const last = items[items.length - 1]
        const inside = items.includes(document.activeElement as HTMLElement)
        if (!inside || (e.shiftKey && document.activeElement === first)) {
          e.preventDefault()
          ;(e.shiftKey ? last : first).focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    // Ao passar para o layout desktop o menu some (md:hidden): fecha para liberar o scroll.
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setMenu(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open, setMenu])

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[120] -translate-y-24 bg-fg px-4 py-2 text-sm text-bg focus:translate-y-0"
      >
        {t('skip')}
      </a>

      <header className="fixed inset-x-0 top-3 z-50 md:top-4">
        <div className="shell">
          <div className="glass flex h-14 items-center justify-between rounded-full border border-line pl-5 pr-2 md:pl-6">
            <TransitionLink href="/" aria-label={`JV, ${t('home')}`} className="py-2 text-xl font-semibold leading-none tracking-[-0.07em]">
              <span data-logo className="inline-block">JV</span>
            </TransitionLink>

            <nav aria-label={t('primary')} className="absolute left-1/2 hidden -translate-x-1/2 md:flex md:gap-7">
              {sections.map((id) => (
                <Magnetic key={id}>
                  <SectionLink id={id} onHome={onHome} className="block py-2 text-sm text-muted transition-colors duration-300 hover:text-fg">
                    {t(id)}
                  </SectionLink>
                </Magnetic>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2">
              <div className="hidden md:block">
                <LocaleSwitch />
              </div>
              <ThemeToggle />
              <Magnetic>
                <SectionLink
                  id="contact"
                  onHome={onHome}
                  className="hidden rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-300 hover:opacity-85 lg:block"
                >
                  {t('cta')}
                </SectionLink>
              </Magnetic>
              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setMenu(!open)}
                className="relative z-[60] rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg md:hidden"
              >
                {open ? t('close') : t('menu')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('primary')}
        inert={!open}
        className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-bg px-4 pb-8 pt-24 md:hidden"
      >
        <nav aria-label={t('primary')}>
          <ul>
            {sections.map((id) => (
              <li key={id} className="overflow-hidden border-b border-line">
                <SectionLink
                  data-menu-link
                  id={id}
                  onHome={onHome}
                  onClick={() => setMenu(false)}
                  className="display block py-3 text-[15vw]"
                >
                  {t(id)}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>
        <LocaleSwitch />
      </div>
    </>
  )
}
