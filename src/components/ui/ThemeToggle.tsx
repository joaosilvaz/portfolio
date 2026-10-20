'use client'

import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { cssEase, duration, mq } from '@/lib/motion/tokens'

/**
 * Inverte o "negativo": o novo tema se expande num círculo a partir do botão.
 * Sem View Transitions (ou com reduced-motion) a troca é imediata.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const t = useTranslations('common')
  const ref = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  function toggle() {
    const next = isDark ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(next)
      flushSync(() => setTheme(next))
    }

    const reduced = window.matchMedia(mq.reduced).matches
    if (!document.startViewTransition || reduced || !ref.current) {
      apply()
      return
    }

    const r = ref.current.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    document
      .startViewTransition(apply)
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: duration.section * 1000, easing: cssEase.inOut, pseudoElement: '::view-transition-new(root)' },
        )
      })
      // Clique duplo rápido aborta a transição anterior; o tema já foi aplicado, nada a fazer.
      .catch(() => {})
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={isDark ? t('lightTheme') : t('darkTheme')}
      className="group grid size-10 place-items-center rounded-full"
    >
      <span
        aria-hidden="true"
        className="relative block size-4 overflow-hidden rounded-full border border-fg transition-transform duration-300 group-hover:rotate-180"
      >
        <span className="absolute inset-y-0 right-0 w-1/2 bg-fg" />
      </span>
    </button>
  )
}
