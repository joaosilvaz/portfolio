import type { SiteProject } from '@/lib/siteProjects'
import { siteProjects } from '@/lib/siteProjects'
import { CaseLayout } from './CaseLayout'
import { LivePreview } from './LivePreview'

export function SiteCaseStudy({ project, locale }: { project: SiteProject; locale: 'pt' | 'en' }) {
  const next = siteProjects[(siteProjects.indexOf(project) + 1) % siteProjects.length]
  const english = locale === 'en'

  return <CaseLayout
    title={project.name}
    category={project.category}
    summary={project.summary[locale]}
    challenge={project.challenge[locale]}
    approach={project.approach[locale]}
    details={[project.category]}
    visual={<div className="relative aspect-[4/3] overflow-hidden bg-white md:aspect-[16/9]"><iframe title={`${english ? 'Preview' : 'Prévia'}: ${project.name}`} src={project.url} loading="lazy" tabIndex={-1} sandbox="allow-scripts allow-same-origin" className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0" /></div>}
    work={<LivePreview name={project.name} url={project.url} english={english} />}
    next={{ slug: next.slug, title: next.name }}
    english={english}
  />
}
