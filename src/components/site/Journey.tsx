'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Flip, gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq, reveal, stagger } from '@/lib/motion/tokens'

type Entry = { title: string; when: string; points: string[] }

/**
 * Tudo que fica abaixo de um item e precisa deslizar quando ele abre ou fecha.
 * #chat vai direto (não o wrapper dele): transform no wrapper prenderia o botão fixed do assistente.
 */
const FOLLOWERS = '[data-journey-row], #chat, #about ~ section, footer'

/**
 * Trajetória em acordeão. Sem animar height: o painel entra no layout de uma vez, o Flip
 * desliza (transform) o que está abaixo da posição antiga até a nova e o conteúdo revela por clip.
 */
export function Journey() {
  const t = useTranslations('profile')
  const root = useRef<HTMLOListElement>(null)
  const entries = t.raw('journeyItems') as Entry[]
  const [open, setOpen] = useState<number[]>([])
  const pending = useRef<{ state: Flip.FlipState; opened: number | null } | null>(null)

  // Roda depois do render que abriu/fechou o painel, ainda antes do paint.
  useGSAP(
    () => {
      const flip = pending.current
      if (!flip) return
      pending.current = null

      Flip.from(flip.state, { simple: true, duration: duration.element, ease: ease.inOut, onComplete: () => ScrollTrigger.refresh() })
      if (flip.opened === null) return

      const panel = root.current?.querySelector<HTMLElement>(`#journey-panel-${flip.opened}`)
      if (!panel) return
      gsap.fromTo(
        panel,
        { clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: duration.element, ease: ease.inOut, clearProps: 'clipPath' },
      )
      gsap.from(panel.querySelectorAll('li'), { autoAlpha: 0, y: reveal.fadeY, stagger: stagger.items, delay: duration.micro })
    },
    { scope: root, dependencies: [open] },
  )

  const { contextSafe } = useGSAP({ scope: root })

  const toggle = contextSafe((i: number) => {
    const closing = open.includes(i)
    const motion = window.matchMedia(mq.motion).matches
    const commit = () => {
      if (motion) {
        // A linha clicada só muda de altura: fica fora do Flip para ele não animar height.
        const row = root.current?.children[i]
        // document, não o scope do contextSafe: as seções de baixo ficam fora do componente.
        const targets = [...document.querySelectorAll(FOLLOWERS)].filter((el) => el !== row)
        pending.current = { state: Flip.getState(targets), opened: closing ? null : i }
        // Clique durante um flip: parte da posição visível agora, sem salto.
        Flip.killFlipsOf(targets, true)
      }
      setOpen((o) => (closing ? o.filter((x) => x !== i) : [...o, i]))
      if (!motion) ScrollTrigger.refresh()
    }

    const panel = root.current?.querySelector(`#journey-panel-${i}`)
    if (!closing || !motion || !panel) return commit()
    // Fecha em dois tempos: o conteúdo some e só então as linhas de baixo sobem.
    gsap.to(panel, { autoAlpha: 0, duration: duration.micro, ease: ease.out, overwrite: true, onComplete: commit })
  })

  return (
    <ol ref={root} className="col-span-4 md:col-span-9">
      {entries.map((entry, i) => {
        const isOpen = open.includes(i)
        return (
          <li key={entry.title} data-journey-row className="border-t border-line last:border-b">
            <h4>
              <button
                id={`journey-button-${i}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`journey-panel-${i}`}
                onClick={() => toggle(i)}
                className="group flex w-full items-start gap-6 py-5 text-left md:items-baseline md:gap-8"
              >
                <span className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <span className="text-lg font-medium tracking-tight md:text-xl">{entry.title}</span>
                  <span className="shrink-0 text-sm text-muted">{entry.when}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-2 size-3 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-aria-expanded:rotate-45 md:mt-0"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-fg" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-fg" />
                </span>
              </button>
            </h4>
            <div id={`journey-panel-${i}`} role="region" aria-labelledby={`journey-button-${i}`} hidden={!isOpen}>
              <ul className="max-w-[64ch] space-y-3 pb-8 leading-relaxed text-muted md:pr-12 md:text-lg">
                {entry.points.map((point) => (
                  <li key={point} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-line-strong" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
