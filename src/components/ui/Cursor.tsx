'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from '@/i18n/navigation'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq, pointer } from '@/lib/motion/tokens'

/**
 * Cursor em mix-blend difference: funciona nos dois temas sem trocar cor.
 * Cresce em links/botões e mostra um rótulo em elementos com [data-cursor].
 * Nunca renderiza em touch.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const pathname = usePathname()

  // Depois de trocar de página o ponteiro pode não sair do elemento antigo: volta ao estado neutro.
  useEffect(() => {
    setLabel('')
    if (ref.current) gsap.set(ref.current, { scale: 1 })
  }, [pathname])

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add(mq.finePointer, () => {
      document.documentElement.classList.add('has-cursor')
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 })

      const xTo = gsap.quickTo(el, 'x', { duration: pointer.cursorFollow, ease: ease.in })
      const yTo = gsap.quickTo(el, 'y', { duration: pointer.cursorFollow, ease: ease.in })

      const onMove = (e: PointerEvent) => {
        gsap.to(el, { autoAlpha: 1, duration: duration.micro, overwrite: 'auto' })
        xTo(e.clientX)
        yTo(e.clientY)
      }

      const onOver = (e: PointerEvent) => {
        const target = e.target instanceof Element ? e.target : null
        const labelled = target?.closest<HTMLElement>('[data-cursor]')
        const interactive = target?.closest('a, button, [role="button"], label')
        const scale = labelled ? pointer.cursorScale.project : interactive ? pointer.cursorScale.link : 1
        setLabel(labelled?.dataset.cursor ?? '')
        gsap.to(el, { scale, duration: duration.micro, ease: ease.in, overwrite: 'auto' })
      }

      const onLeaveWindow = () => gsap.to(el, { autoAlpha: 0, duration: duration.micro })

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerover', onOver)
      // pointerleave não borbulha: precisa estar no <html>, não no document.
      document.documentElement.addEventListener('pointerleave', onLeaveWindow)
      return () => {
        document.documentElement.classList.remove('has-cursor')
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerover', onOver)
        document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      }
    })
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden size-4 items-center justify-center rounded-full bg-white mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:flex"
    >
      <span className="whitespace-nowrap font-mono text-[2.4px] font-medium leading-none text-black">{label}</span>
    </div>
  )
}
