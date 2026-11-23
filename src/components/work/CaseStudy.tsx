'use client'

import { useLocale, useTranslations } from 'next-intl'
import { getProject, projects } from '@/lib/projects'
import { CaseLayout } from './CaseLayout'
import { LivePreview } from './LivePreview'
import { ProjectVisual } from './ProjectVisual'

export function CaseStudy({ slug }: { slug: string }) {
  const t = useTranslations('work')
  const english = useLocale() === 'en'
  const project = getProject(slug)!
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const key = `items.${project.slug}` as const
  const visual = <div className="group relative aspect-[4/3] overflow-hidden md:aspect-[16/9]"><ProjectVisual project={project} sizes="(min-width: 1440px) 1344px, 100vw" /></div>

  return <CaseLayout
    title={t(`${key}.title`)}
    category={t(`${key}.category`)}
    summary={t(`${key}.summary`)}
    challenge={t(`${key}.challenge`)}
    approach={t(`${key}.decision`)}
    details={project.stack}
    visual={visual}
    work={<div className="space-y-10">
      {project.website ? <LivePreview name={t(`${key}.title`)} url={project.website} english={english} /> : visual}
      {project.hasResult && <p className="max-w-[48ch] text-xl leading-relaxed md:text-2xl"><span className="mr-3 font-mono text-xs uppercase tracking-widest text-muted">{t('result')}</span>{t(`${key}.result`)}</p>}
      <div className="flex flex-wrap gap-3">
        {project.code?.map((repo) => <a key={repo.href} href={repo.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong px-6 py-3 text-sm transition-colors hover:bg-fg hover:text-bg">{t(repo.label)} ↗</a>)}
        {project.confidential && <p className="text-sm text-muted">{t('confidential')}</p>}
      </div>
    </div>}
    next={{ slug: next.slug, title: t(`items.${next.slug}.title`) }}
    english={english}
  />
}
