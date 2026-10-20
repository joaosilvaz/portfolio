'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, marquee, mq, reveal, stagger } from '@/lib/motion/tokens'

type Group = [string, string[]]

/** Stack agrupada por área + o único marquee do site, com as ferramentas em contorno. */
export function Stack() {
  const t = useTranslations('build')
  const root = useRef<HTMLElement>(null)
  const groups = t.raw('groups') as Group[]
  const tools = groups.flatMap(([, items]) => items)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.motion, () => {
        // Duas cópias da faixa: andar -50% e repetir fecha o loop sem emenda.
        const loop = gsap.to('[data-marquee-track]', { xPercent: -50, duration: marquee.duration, ease: ease.none, repeat: -1 })
        const pause = () => loop.timeScale(marquee.hoverSpeed)
        const resume = () => loop.timeScale(1)
        const strip = root.current?.querySelector('[data-marquee]')
        strip?.addEventListener('pointerenter', pause)
        strip?.addEventListener('pointerleave', resume)

        gsap.from('[data-stack-group]', {
          autoAlpha: 0,
          y: reveal.y,
          stagger: stagger.items,
          duration: duration.element,
          scrollTrigger: { trigger: '[data-stack-groups]', start: 'top 85%' },
        })

        return () => {
          strip?.removeEventListener('pointerenter', pause)
          strip?.removeEventListener('pointerleave', resume)
        }
      })
    },
    { scope: root },
  )

  return (
    <section id="stack" ref={root} aria-labelledby="stack-title" className="overflow-hidden py-24 md:py-32">
      <div className="shell grid-12 items-end gap-y-6">
        <h2 id="stack-title" className="display col-span-4 text-[clamp(2.75rem,6vw,6rem)] md:col-span-7">
          {t('title')}
        </h2>
        <p className="col-span-4 max-w-[44ch] text-muted md:col-span-4 md:col-start-9 md:text-lg">{t('intro')}</p>
      </div>

      <div data-marquee aria-hidden="true" className="mt-16 md:mt-24">
        <div data-marquee-track className="flex w-max">
          {[0, 1].map((copy) => (
            <p key={copy} className="display flex shrink-0 text-[clamp(3rem,8vw,8rem)]">
              {tools.map((tool) => (
                <span key={tool} className="text-outline px-[0.3em] transition-colors duration-300 hover:text-fg">
                  {tool}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div data-stack-groups className="shell grid-12 mt-16 gap-y-4 md:mt-24">
        {groups.map(([title, items]) => (
          <div key={title} data-stack-group className="col-span-2 rounded-[1.5rem] border border-line bg-surface p-5 md:col-span-6 md:p-6 lg:col-span-3">
            <h3 className="font-medium">{title}</h3>
            <ul className="mt-6 space-y-2 text-muted">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
