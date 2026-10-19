import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getProject, projects } from '@/lib/projects'
import { CaseStudy } from '@/components/work/CaseStudy'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!getProject(slug)) return {}
  const t = await getTranslations({ locale, namespace: 'work' })
  return {
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.summary`),
    alternates: { canonical: `/${locale}/projetos/${slug}` },
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  if (!getProject(slug)) notFound()
  return <CaseStudy slug={slug} />
}
