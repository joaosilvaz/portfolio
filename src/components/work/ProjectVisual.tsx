'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Project } from '@/lib/projects'

/**
 * Prévia de cada projeto. Sem screenshot (Lens é confidencial; Requalify e Mottu
 * ainda sem imagem), o projeto ganha uma prévia tipográfica feita do próprio conteúdo.
 */
export function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  const t = useTranslations('work')

  if (project.image) {
    return (
      <Image
        data-project-img
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        className={project.slug === 'pupo-pilates' ? 'object-contain bg-[#ece9e2] grayscale' : 'object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04]'}
      />
    )
  }

  if (project.slug === 'lens') {
    return (
      <div data-project-img className="absolute inset-0 flex flex-col justify-between bg-fg p-6 text-bg transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04] md:p-10">
        <p className="font-mono text-xs opacity-70">AWS Bedrock</p>
        <p className="display text-[clamp(2.5rem,6vw,5.5rem)]">{t('items.lens.metric')}</p>
        <p className="text-sm opacity-70">{t('confidential')}</p>
      </div>
    )
  }

  if (project.slug === 'requalify') {
    const steps = t.raw('items.requalify.steps') as string[]
    return (
      <div data-project-img aria-hidden="true" className={`${panel} justify-center bg-bg`}>
        <ol className="flex flex-col">
          {steps.map((step, i) => (
            <li key={step} className="relative flex items-center gap-4 pb-5 last:pb-0 md:pb-8">
              {i < steps.length - 1 && <span className="absolute left-[0.4375rem] top-4 h-full w-px bg-line-strong" />}
              <span className={`relative size-3.5 shrink-0 rounded-full border border-fg ${i === steps.length - 1 ? 'bg-fg' : 'bg-bg'}`} />
              <span className={i === steps.length - 1 ? 'display text-[clamp(1.375rem,3.5vw,3rem)]' : 'text-sm text-muted md:text-lg'}>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  if (project.slug === 'mottu') {
    const statuses = t.raw('items.mottu.statuses') as string[]
    return (
      <div data-project-img aria-hidden="true" className={`${panel} justify-between bg-fg text-bg`}>
        <p className="font-mono text-xs opacity-70">ASP.NET Core • Oracle</p>
        <p className="display text-[clamp(2.5rem,6vw,5.5rem)]">REST + HATEOAS</p>
        <ul className="flex flex-wrap gap-2">
          {statuses.map((status, i) => (
            <li key={status} className={`rounded-full border border-bg/40 px-3 py-1.5 text-xs ${i === 1 ? 'bg-bg text-fg' : ''}`}>
              {status}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}

const panel =
  'absolute inset-0 flex flex-col p-6 transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04] md:p-10'
