'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { gsap, SplitText, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, intro, mq, reveal, stagger } from '@/lib/motion/tokens'
import { getProject, projects } from '@/lib/projects'
import { TransitionLink } from '@/components/providers/PageTransition'
import { ProjectVisual } from '@/components/work/ProjectVisual'
import { Footer } from '@/components/site/Footer'

/** Página de case: contexto, decisão técnica e resultado, nessa ordem. */
export function CaseStudy({ slug }: { slug: string }) {
  const t = useTranslations('work')
  const root = useRef<HTMLElement>(null)
  const project = getProject(slug)!
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const key = `items.${project.slug}` as const

  const rows = [
    { label: t('context'), text: t(`${key}.summary`) },
    { label: t('decision'), text: t(`${key}.decision`) },
    ...(project.hasResult ? [{ label: t('result'), text: t(`${key}.result`) }] : []),
  ]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(mq.motion, () => {
        const title = SplitText.create('[data-case-title]', { type: 'lines', mask: 'lines' })
        gsap
          .timeline({ delay: duration.micro })
          // Desfaz o split no fim: a quebra de linha volta a ser do navegador (fonte, resize).
          .from(title.lines, { yPercent: 100, stagger: stagger.lines, onComplete: () => title.revert() })
          .fromTo(
            '[data-case-visual]',
            { clipPath: 'inset(12% 6% 12% 6% round 1.75rem)' },
            { clipPath: 'inset(0% 0% 0% 0% round 1.75rem)', duration: duration.section, ease: ease.inOut },
            intro.caseVisual,
          )

        gsap.utils.toArray<HTMLElement>('[data-case-row]').forEach((row) => {
          gsap.from(row, { autoAlpha: 0, y: reveal.y, scrollTrigger: { trigger: row, start: 'top 85%' } })
        })
      })
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true },
  )

  return (
    <>
      <main id="main" ref={root} className="pt-32 md:pt-40">
        <article className="shell">
          <TransitionLink href="/#work" className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline">
            {t('back')}
          </TransitionLink>

          <header className="grid-12 mt-10 items-end gap-y-6">
            <div className="col-span-4 md:col-span-8">
              <p className="text-sm text-muted">{t(`${key}.category`)}</p>
              <h1 data-case-title className="display mt-4 text-[clamp(3rem,8vw,8rem)]">
                {t(`${key}.title`)}
              </h1>
            </div>
            <dl className="col-span-4 text-sm md:col-span-4 md:text-right">
              <dt className="text-muted">{t('stack')}</dt>
              <dd className="mt-1 font-mono text-xs">{project.stack.join(', ')}</dd>
            </dl>
          </header>

          <div data-case-visual className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line md:aspect-[16/9]">
            <ProjectVisual project={project} sizes="(min-width: 1440px) 1344px, 100vw" />
          </div>

          <div className="mt-20 md:mt-28">
            {rows.map((row) => (
              <section key={row.label} data-case-row className="grid-12 gap-y-4 border-t border-line py-10 md:py-14">
                <h2 className="col-span-4 text-sm text-muted md:col-span-3">{row.label}</h2>
                <p className="col-span-4 max-w-[38ch] text-2xl font-medium leading-snug tracking-tight md:col-span-8 md:col-start-5 md:text-3xl">
                  {row.text}
                </p>
              </section>
            ))}
          </div>

          {(project.website || project.code || project.confidential) && (
            <div className="grid-12 border-t border-line py-10">
              <div className="col-span-4 flex flex-wrap gap-4 md:col-span-8 md:col-start-5">
                {project.website && (<a href={project.website} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:bg-fg hover:text-bg">{t('visitSite')}</a>)}
                {project.code?.map((repo) => (
                  <a
                    key={repo.href}
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:bg-fg hover:text-bg"
                  >
                    {t(repo.label)}
                  </a>
                ))}
                {project.confidential && <p className="py-3 text-sm text-muted">{t('confidential')}</p>}
              </div>
            </div>
          )}
        </article>

        <TransitionLink
          href={`/projetos/${next.slug}`}
          data-cursor={t('viewCase')}
          className="group mt-16 block border-t border-line py-20 md:py-28"
        >
          <div className="shell">
            <p className="text-sm text-muted">{t('next')}</p>
            <p className="display text-outline mt-4 text-[clamp(3rem,9vw,9rem)] transition-colors duration-500 group-hover:text-fg">
              {t(`items.${next.slug}.title`)}
            </p>
          </div>
        </TransitionLink>
      </main>
      <Footer />
    </>
  )
}
