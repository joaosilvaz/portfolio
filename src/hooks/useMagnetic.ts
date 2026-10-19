'use client'

import { type RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq, pointer } from '@/lib/motion/tokens'

/** Atrai o elemento em direção ao ponteiro. Só em desktop com ponteiro fino e motion liberado. */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength: number = pointer.magnetStrength) {
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add(`${mq.finePointer} and ${mq.motion}`, () => {
        const xTo = gsap.quickTo(el, 'x', { duration: duration.element, ease: ease.in })
        const yTo = gsap.quickTo(el, 'y', { duration: duration.element, ease: ease.in })

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * strength)
          yTo((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const onLeave = () => {
          xTo(0)
          yTo(0)
        }

        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        }
      })
    },
    { scope: ref },
  )
}
