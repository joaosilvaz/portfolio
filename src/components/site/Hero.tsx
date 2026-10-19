'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq, pointer, scroll, stagger } from '@/lib/motion/tokens'
import { useIntro } from '@/components/providers/Intro'
import { Magnetic } from '@/components/ui/Magnetic'

/** Texto à esquerda, retrato grande à direita. O retrato entra por clip-path junto com o voo do monograma. */
export function Hero() {
  const t = useTranslations('hero')
  const { phase } = useIntro()
  const root = useRef<HTMLElement>(null)

  // Entrada: só quando o loader libera.
  useGSAP(
    () => {
      if (phase !== 'revealing') return

      const mm = gsap.matchMedia()

      mm.add(mq.motion, () => {
        const lines = SplitText.create('[data-hero-lines]', { type: 'lines', mask: 'lines' })

        gsap
          .timeline()
          .set('[data-reveal]:not([data-hero-fade])', { autoAlpha: 1 })
          .fromTo(
            '[data-hero-clip]',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: duration.section, ease: ease.inOut },
          )
          .from('[data-hero-img]', { scale: 1.2, duration: duration.section * 1.4 }, '<')
          .from('[data-hero-name]', { yPercent: 110, stagger: stagger.lines, duration: duration.element }, 0.25)
          .from(lines.lines, { yPercent: 100, stagger: stagger.lines, duration: duration.element }, 0.45)
          .from('[data-hero-fade]', { autoAlpha: 0, y: 16, stagger: stagger.items, duration: duration.element }, 0.6)
      })

      mm.add(mq.reduced, () => {
        gsap.fromTo('[data-reveal]', { autoAlpha: 0 }, { autoAlpha: 1, duration: duration.element })
      })
    },
    { scope: root, dependencies: [phase], revertOnUpdate: true },
  )

  // Parallax de scroll e de mouse, independentes da entrada.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add({ desktop: mq.desktop, mobile: mq.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean }
        const trigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }

        gsap.to('[data-hero-img-wrap]', { yPercent: scroll.heroParallax.photo, ease: ease.none, scrollTrigger: trigger })
        if (desktop) gsap.to('[data-hero-text]', { yPercent: scroll.heroParallax.text, ease: ease.none, scrollTrigger: trigger })

        if (!desktop || !window.matchMedia(mq.finePointer).matches) return

        const target = root.current?.querySelector('[data-pointer]') ?? {}
        const xTo = gsap.quickTo(target, 'x', { duration: duration.section, ease: ease.in })
        const yTo = gsap.quickTo(target, 'y', { duration: duration.section, ease: ease.in })

        const onMove = (e: PointerEvent) => {
          xTo(((e.clientX / window.innerWidth) * 2 - 1) * pointer.heroParallax)
          yTo(((e.clientY / window.innerHeight) * 2 - 1) * pointer.heroParallax)
        }

        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })

      return () => ScrollTrigger.refresh()
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />

      <div className="shell grid-12 relative min-h-svh items-center gap-y-12 pb-12 pt-28 md:pt-32 lg:pb-16">
        <div data-hero-text className="col-span-4 md:col-span-12 lg:col-span-6">
          <p data-reveal data-hero-fade className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-fg" />
            {t('currently')}
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(3.25rem,7.4vw,7.75rem)]">
            {['João Vitor', 'da Silva'].map((line) => (
              <span key={line} className="line-mask block overflow-hidden">
                <span data-reveal data-hero-name className="text-gradient block pr-[0.05em]">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-reveal data-hero-lines className="mt-6 text-xl font-medium tracking-tight md:text-2xl">
            {t('role')}
          </p>
          <p data-reveal data-hero-lines className="mt-3 max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
            {t('statement')}
          </p>

          <div data-reveal data-hero-fade className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <a href="#work" className="block rounded-full bg-fg px-7 py-3.5 text-sm font-medium text-bg transition-opacity duration-300 hover:opacity-85">
                {t('cta')}
              </a>
            </Magnetic>
            <a
              href={t('cvFile')}
              download
              className="py-2 text-sm font-medium underline decoration-line-strong underline-offset-[6px] transition-colors duration-300 hover:decoration-fg"
            >
              {t('cv')}
            </a>
          </div>

          <p data-reveal data-hero-fade className="mt-10 text-sm text-muted">
            {t('location')}
          </p>
        </div>

        <div className="col-span-4 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-7">
          <div data-pointer>
            <div
              data-hero-photo
              data-hero-clip
              data-reveal
              className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-line bg-black lg:mr-0 lg:w-[min(100%,calc((100svh-10rem)*0.8))]"
            >
              <div data-hero-img-wrap className="absolute inset-[-8%_0]">
                <Image
                  data-hero-img
                  src="/images/perfil.jpeg"
                  alt={t('photoAlt')}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, (min-width: 768px) 66vw, 92vw"
                  className="object-cover object-[50%_35%] grayscale contrast-[1.1]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
