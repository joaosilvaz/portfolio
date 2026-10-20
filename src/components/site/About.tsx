'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, SplitText, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq, reveal, stagger } from '@/lib/motion/tokens'
import { Journey } from '@/components/site/Journey'

type Pair = [string, string]

/** Frase de apresentação que "acende" palavra por palavra no scroll, seguida de números e da trajetória em acordeão. */
export function About() {
  const t = useTranslations('profile')
  const root = useRef<HTMLElement>(null)
  const stats = t.raw('stats') as Pair[]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.motion, () => {
        const split = SplitText.create('[data-about-lead]', { type: 'words', tag: 'span', aria: 'none' })
        gsap.fromTo(
          split.words,
          { opacity: reveal.dimOpacity },
          {
            opacity: 1,
            stagger: stagger.items,
            ease: ease.none,
            scrollTrigger: { trigger: '[data-about-lead]', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
        gsap.from('[data-about-stat]', {
          autoAlpha: 0,
          y: reveal.y,
          stagger: stagger.items,
          scrollTrigger: { trigger: '[data-about-stats]', start: 'top 85%' },
        })
      })

      mm.add(mq.reduced, () => {
        gsap.from('[data-about-stats]', { autoAlpha: 0, duration: duration.element, scrollTrigger: { trigger: '[data-about-stats]', start: 'top 85%' } })
      })
    },
    { scope: root },
  )

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="py-24 md:py-40">
      <div className="shell">
        <div className="grid-12 gap-y-6">
          <h2 id="about-title" className="col-span-4 text-sm text-muted md:col-span-3">
            {t('title')}
          </h2>
          <p data-about-lead className="col-span-4 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.03em] md:col-span-9">
            {t('lead')}
          </p>
          <p className="col-span-4 max-w-[52ch] leading-relaxed text-muted md:col-span-6 md:col-start-4 md:text-lg">{t('body')}</p>
        </div>

        <dl data-about-stats className="grid-12 mt-20 gap-y-4 md:mt-28">
          {stats.map(([value, label]) => (
            <div key={value} data-about-stat className="col-span-4 flex flex-col-reverse justify-end gap-3 rounded-[1.5rem] border border-line bg-surface p-6 md:col-span-4 md:p-8">
              <dt className="max-w-[24ch] text-muted">{label}</dt>
              <dd className="display text-[clamp(2.5rem,4.5vw,4.5rem)]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid-12 mt-20 gap-y-6 md:mt-28">
          <h3 className="col-span-4 text-sm text-muted md:col-span-3">{t('journey')}</h3>
          <Journey />
        </div>
      </div>
    </section>
  )
}
