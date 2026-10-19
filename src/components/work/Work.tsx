'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, SplitText, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq, scroll, stagger } from '@/lib/motion/tokens'
import { projects } from '@/lib/projects'
import { TransitionLink } from '@/components/providers/PageTransition'
import { ProjectVisual } from '@/components/work/ProjectVisual'

/**
 * Cards empilhados: cada projeto gruda no topo e o anterior recua (escala + escurece)
 * quando o próximo chega. No mobile vira lista simples; em reduced-motion, sem sticky.
 */
export function Work() {
  const t = useTranslations('work')
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.motion, () => {
        const split = SplitText.create('[data-work-title]', { type: 'lines', mask: 'lines' })
        gsap.from(split.lines, {
          yPercent: 100,
          stagger: stagger.lines,
          scrollTrigger: { trigger: '[data-work-title]', start: 'top 85%' },
        })
      })

      mm.add(mq.desktop, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
        cards.slice(0, -1).forEach((card, i) => {
          const scrollTrigger = { trigger: cards[i + 1], start: 'top bottom', end: 'top 6rem', scrub: true }
          gsap.to(card.firstElementChild, { scale: scroll.stackScale, ease: ease.none, scrollTrigger })
          // Escurece com uma camada opaca por cima: o card continua sólido e não vaza por trás do próximo.
          gsap.to(card.querySelector('[data-card-shade]'), { opacity: 0.6, ease: ease.none, scrollTrigger })
        })
      })

      mm.add(mq.reduced, () => {
        gsap.from('[data-card]', { autoAlpha: 0, duration: duration.element, stagger: stagger.items, scrollTrigger: { trigger: root.current, start: 'top 70%' } })
      })
    },
    { scope: root },
  )

  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="shell">
        <div className="grid-12 items-end gap-y-6">
          <h2 id="work-title" data-work-title className="display col-span-4 text-[clamp(2.75rem,6vw,6rem)] md:col-span-7">
            {t('title')}
          </h2>
          <p className="col-span-4 max-w-[40ch] text-muted md:col-span-4 md:col-start-9 md:text-lg">{t('intro')}</p>
        </div>

        <ul className="mt-14 md:mt-20">
          {projects.map((project, i) => (
            <li
              key={project.slug}
              data-card
              style={{ '--i': i } as React.CSSProperties}
              className="mb-6 lg:top-[calc(6rem+var(--i)*1.25rem)] lg:mb-[12vh] lg:last:mb-0 motion-safe:lg:sticky"
            >
              <article className="relative origin-top">
                <div data-card-shade aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[1.75rem] bg-bg opacity-0" />
                <TransitionLink
                  href={`/projetos/${project.slug}`}
                  data-cursor={t('viewCase')}
                  className="group grid-12 gap-y-8 rounded-[1.75rem] border border-line bg-surface p-4 md:p-6 lg:h-[min(76svh,44rem)] lg:p-8"
                >
                  <div className="col-span-4 flex flex-col justify-between gap-8 md:col-span-12 lg:col-span-5 lg:py-2">
                    <div>
                      <p className="text-sm text-muted">{t(`items.${project.slug}.category`)}</p>
                      <h3 className="display mt-4 text-[clamp(2rem,3.6vw,3.5rem)]">{t(`items.${project.slug}.title`)}</h3>
                      <p className="mt-5 max-w-[42ch] leading-relaxed text-muted">{t(`items.${project.slug}.summary`)}</p>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <p className="font-mono text-xs text-muted">{project.stack.join(', ')}</p>
                      <span className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors duration-300 group-hover:bg-fg group-hover:text-bg">
                        {t('viewCase')}
                      </span>
                    </div>
                  </div>
                  <div className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-line md:col-span-12 lg:col-span-7 lg:aspect-auto">
                    <ProjectVisual project={project} sizes="(min-width: 1024px) 55vw, 92vw" />
                  </div>
                </TransitionLink>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
