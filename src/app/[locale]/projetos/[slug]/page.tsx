import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getProject, projects } from '@/lib/projects'
import { CaseStudy } from '@/components/work/CaseStudy'
import { getSiteProject, siteProjects } from '@/lib/siteProjects'
import { SiteCaseStudy } from '@/components/work/SiteCaseStudy'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [...new Set([...projects.map((p) => p.slug), ...siteProjects.map((p) => p.slug)])].map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const site = getSiteProject(slug)
  if (site && slug !== 'pupo-pilates') return {
    title: site.name,
    description: site.summary[locale === 'en' ? 'en' : 'pt'],
    alternates: { canonical: `/${locale}/projetos/${slug}` },
  }
  if (!getProject(slug)) return {}
  const t = await getTranslations({ locale, namespace: 'work' })
  return {
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.summary`),
    alternates: { canonical: `/${locale}/projetos/${slug}` },
  }
}

export default async function CasePage({ params }: Props) {
  const { slug, locale } = await params
  const site = getSiteProject(slug)
  if (site && slug !== 'pupo-pilates') return <SiteCaseStudy project={site} locale={locale === 'en' ? 'en' : 'pt'} />
  if (!getProject(slug)) notFound()
  return <CaseStudy slug={slug} />
}
