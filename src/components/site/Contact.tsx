'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, SplitText, useGSAP } from '@/lib/motion/gsap'
import { mq, stagger } from '@/lib/motion/tokens'
import { Magnetic } from '@/components/ui/Magnetic'
import { contact } from '@/lib/contact'

/** CTA final: o e-mail é o protagonista e copia com um clique. */
export function Contact() {
  const t = useTranslations('reach')
  const hero = useTranslations('hero')
  const root = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(mq.motion, () => {
        const split = SplitText.create('[data-contact-title]', { type: 'lines', mask: 'lines' })
        gsap.from(split.lines, { yPercent: 100, stagger: stagger.lines, scrollTrigger: { trigger: '[data-contact-title]', start: 'top 85%' } })
      })
    },
    { scope: root },
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-40">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      <div className="shell relative">
        <h2 id="contact-title" data-contact-title className="display text-gradient text-[clamp(3.5rem,11vw,11rem)]">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-[40ch] text-lg text-muted md:text-xl">{t('text')}</p>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <a href={`mailto:${contact.email}`} className="text-[clamp(1.5rem,4vw,3rem)] font-medium tracking-[-0.03em] underline decoration-line-strong decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-fg">
            {contact.email}
          </a>
          <Magnetic>
            <button
              type="button"
              onClick={copy}
              className="rounded-full bg-fg px-7 py-3.5 text-sm font-medium text-bg transition-opacity duration-300 hover:opacity-85"
            >
              {status === 'copied' ? t('copied') : t('copy')}
            </button>
          </Magnetic>
        </div>
        <p role="status" className="mt-3 min-h-6 text-sm text-muted">
          {status === 'failed' ? t('copyFail') : status === 'copied' ? t('copied') : ''}
        </p>

        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="block rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:bg-fg hover:text-bg">
              {t('linkedin')}
            </a>
          </li>
          <li>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="block rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:bg-fg hover:text-bg">
              {t('github')}
            </a>
          </li>
          <li>
            <a href={hero('cvFile')} download className="block rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:bg-fg hover:text-bg">
              {t('cv')}
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
