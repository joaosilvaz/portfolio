'use client'

import { useTranslations } from 'next-intl'
import { useLenis } from '@/components/providers/SmoothScroll'
import { contact } from '@/lib/contact'

export function Footer() {
  const t = useTranslations('reach')
  const lenis = useLenis()

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 pb-24 pt-10 text-sm text-muted md:pb-10 lg:pr-48 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="mr-3 font-semibold tracking-[-0.07em] text-fg">JV</span>© {t('copyright')}
        </p>
        <div className="flex gap-6">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            {t('linkedin')}
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            {t('github')}
          </a>
          <a
            href="#main"
            onClick={(e) => {
              if (!lenis) return
              e.preventDefault()
              lenis.scrollTo(0)
            }}
            className="hover:text-fg"
          >
            {t('top')}
          </a>
        </div>
      </div>
    </footer>
  )
}
