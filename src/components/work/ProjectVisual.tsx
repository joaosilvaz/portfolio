'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Project } from '@/lib/projects'

/**
 * Prévia de cada projeto. Lens é confidencial e o assistente vive neste site,
 * então os dois ganham prévias tipográficas em vez de screenshots.
 */
export function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  const t = useTranslations('work')
  const chat = useTranslations('chatbot')

  if (project.image) {
    return (
      <Image
        data-project-img
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04]"
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

  return (
    <div data-project-img aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-3 bg-bg p-6 transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04] md:p-10">
      <p className="max-w-[80%] self-start rounded-2xl rounded-bl-sm border border-line px-4 py-3 text-sm md:text-base">{chat('previewMessage1')}</p>
      <p className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-fg px-4 py-3 text-sm text-bg md:text-base">{chat('previewMessage2')}</p>
      <p className="max-w-[80%] self-start rounded-2xl rounded-bl-sm border border-line px-4 py-3 text-sm md:text-base">{chat('previewMessage3')}</p>
    </div>
  )
}
