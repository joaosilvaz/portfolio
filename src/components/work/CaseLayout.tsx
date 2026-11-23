import type { ReactNode } from 'react'
import { TransitionLink } from '@/components/providers/PageTransition'
import { Footer } from '@/components/site/Footer'

type Props = {
  title: string
  category: string
  summary: string
  challenge: string
  outcome?: string
  approach: string
  details: string[]
  visual: ReactNode
  work: ReactNode
  next: { slug: string; title: string }
  english: boolean
}

export function CaseLayout({ title, category, summary, challenge, outcome, approach, details, visual, work, next, english }: Props) {
  return (
    <>
      <main id="main" className="pt-32 md:pt-40">
        <article className="shell">
          <TransitionLink href="/projetos" className="inline-flex items-center gap-2 text-sm text-muted underline-offset-4 hover:text-fg hover:underline">← {english ? 'Back to projects' : 'Voltar aos projetos'}</TransitionLink>
          <header className="mx-auto max-w-4xl pb-16 pt-14 text-center md:pb-24 md:pt-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{category}</p>
            <h1 className="display mt-6 text-[clamp(3.5rem,9vw,8rem)]">{title}</h1>
            <p className="mx-auto mt-8 max-w-[58ch] text-lg leading-relaxed text-muted md:text-xl">{summary}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-2">{details.map((detail) => <span key={detail} className="rounded-full border border-line-strong px-4 py-1.5 font-mono text-xs">{detail}</span>)}</div>
          </header>

          <div className="relative mb-10 overflow-hidden rounded-[1.75rem] border border-line md:mb-20">{visual}</div>

          <div className="grid gap-0 overflow-hidden rounded-[1.5rem] border border-line md:grid-cols-3">
            <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-8"><p className="font-mono text-xs uppercase tracking-widest text-muted">{english ? 'Project' : 'Projeto'}</p><p className="mt-3 font-medium">{title}</p></div>
            <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-8"><p className="font-mono text-xs uppercase tracking-widest text-muted">{english ? 'Area' : 'Área'}</p><p className="mt-3 font-medium">{category}</p></div>
            <div className="p-6 md:p-8"><p className="font-mono text-xs uppercase tracking-widest text-muted">{english ? 'Focus' : 'Foco'}</p><p className="mt-3 font-medium">{details.join(' · ')}</p></div>
          </div>

          <section className="py-24 md:py-36" aria-labelledby="case-challenge">
            <h2 id="case-challenge" className="display text-[clamp(3rem,7vw,6.5rem)]">{english ? 'The challenge.' : 'O desafio.'}</h2>
            <div className={`mt-10 grid gap-4 md:mt-16 ${outcome ? 'md:grid-cols-2' : ''}`}>
              <div className="flex min-h-56 flex-col justify-between rounded-[1.25rem] border border-line bg-surface p-7 md:min-h-72 md:p-9"><span className="display text-6xl text-muted">01</span><p className="max-w-[45ch] text-lg leading-relaxed">{challenge}</p></div>
              {outcome && <div className="flex min-h-56 flex-col justify-between rounded-[1.25rem] border border-line bg-surface p-7 md:min-h-72 md:p-9"><span className="display text-6xl text-muted">02</span><p className="max-w-[45ch] text-lg leading-relaxed">{outcome}</p></div>}
            </div>
          </section>

          <section className="border-t border-line py-24 md:py-36" aria-labelledby="case-approach">
            <h2 id="case-approach" className="display text-[clamp(3rem,7vw,6.5rem)]">{english ? 'The approach.' : 'A abordagem.'}</h2>
            <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12"><span className="display text-7xl text-muted md:col-span-4 md:text-9xl">01</span><p className="max-w-[48ch] rounded-[1.25rem] border border-line bg-surface p-7 text-xl leading-relaxed md:col-span-8 md:p-10 md:text-2xl">{approach}</p></div>
          </section>

          <section className="border-t border-line py-24 md:py-36" aria-labelledby="case-work">
            <h2 id="case-work" className="display mb-10 text-[clamp(3rem,7vw,6.5rem)] md:mb-16">{english ? 'The work.' : 'O projeto.'}</h2>
            {work}
          </section>
        </article>
        <TransitionLink href={`/projetos/${next.slug}`} className="group block border-t border-line py-20 md:py-28"><div className="shell"><p className="text-sm text-muted">{english ? 'Next project' : 'Próximo projeto'}</p><p className="display mt-4 text-[clamp(3rem,8vw,8rem)] transition-opacity group-hover:opacity-60">{next.title} ↗</p></div></TransitionLink>
      </main>
      <Footer />
    </>
  )
}
