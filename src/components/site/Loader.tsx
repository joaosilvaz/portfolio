'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { ease, loader, stagger } from '@/lib/motion/tokens'
import { useIntro } from '@/components/providers/Intro'
import { useLenis } from '@/components/providers/SmoothScroll'

const SEEN_KEY = 'jv-loader-seen'

/**
 * Intro com o monograma: "J" e "V" sobem da máscara no centro da tela, depois o
 * monograma voa e encolhe até o logo do header enquanto a cortina sobe e o hero entra.
 * Só na primeira visita, pulável por clique ou Esc.
 */
export function Loader() {
  const t = useTranslations('loader')
  const { reveal } = useIntro()
  const lenis = useLenis()
  const root = useRef<HTMLDivElement>(null)
  const curtain = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLParagraphElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (document.documentElement.dataset.loader === 'skip') {
      reveal()
      setDone(true)
    }
  }, [reveal])

  useEffect(() => {
    if (done) return
    lenis?.stop()
    return () => lenis?.start()
  }, [lenis, done])

  useGSAP(
    () => {
      if (done || !mark.current || !curtain.current) return
      // Visita repetida ou reduced-motion: o efeito abaixo encerra o loader sem animar nada.
      if (document.documentElement.dataset.loader === 'skip') return

      const logo = document.querySelector<HTMLElement>('[data-logo]')
      const finish = () => {
        try {
          localStorage.setItem(SEEN_KEY, '1')
        } catch {}
        setDone(true)
      }

      // Destino do voo: centro e largura do logo no header.
      const m = mark.current.getBoundingClientRect()
      const r = logo?.getBoundingClientRect()
      const flight = r
        ? {
            x: r.left + r.width / 2 - (m.left + m.width / 2),
            y: r.top + r.height / 2 - (m.top + m.height / 2),
            scale: r.width / m.width,
          }
        : { autoAlpha: 0 }

      if (logo) gsap.set(logo, { autoAlpha: 0 })

      tl.current = gsap
        .timeline({ onComplete: finish })
        .from('[data-mark-char]', { yPercent: 110, stagger: stagger.items * 2, duration: loader.mark })
        .add(reveal, `+=${loader.hold}`)
        .to(mark.current, { ...flight, duration: loader.exit, ease: ease.inOut }, '<')
        .to(curtain.current, { yPercent: -100, duration: loader.exit, ease: ease.inOut }, '<')
        .set(logo ?? {}, { autoAlpha: 1 })
    },
    { scope: root, dependencies: [done] },
  )

  useEffect(() => {
    if (done) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') tl.current?.progress(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done])

  if (done) return null

  return (
    <div
      ref={root}
      data-loader-root
      role="status"
      aria-label={t('label')}
      onClick={() => tl.current?.progress(1)}
      className="fixed inset-0 z-[110]"
    >
      <div ref={curtain} aria-hidden="true" className="absolute inset-0 bg-bg" />
      <p
        ref={mark}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 text-[clamp(7rem,28vw,20rem)] font-semibold leading-none tracking-[-0.07em]"
      >
        {['J', 'V'].map((c) => (
          <span key={c} className="line-mask overflow-hidden">
            <span data-mark-char className="block">
              {c}
            </span>
          </span>
        ))}
      </p>
      <button
        type="button"
        onClick={() => tl.current?.progress(1)}
        className="absolute bottom-4 right-4 py-2 text-sm text-muted hover:text-fg md:bottom-6 md:right-8"
      >
        {t('skip')}
      </button>
    </div>
  )
}
