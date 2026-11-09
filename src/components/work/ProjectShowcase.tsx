'use client'

import { useLocale } from 'next-intl'

const sites = [
  { name: 'Rodrigo MKT', url: 'https://rodrigo-mkt-two.vercel.app/', category: 'Marketing' },
  { name: 'Dra. Isabela Santana', url: 'https://draisabelasantana.vercel.app/', category: 'Website' },
  { name: 'Graziela Fagotti', url: 'https://grazielafagotti.vercel.app/', category: 'Website' },
  { name: 'Pupo Pilates', url: 'https://pupopilates.vercel.app/', category: 'Website' },
  { name: 'Cibele Pardelli', url: 'https://cibele-pardelli.vercel.app/', category: 'Website' },
  { name: 'Minify HTML', url: 'https://minify-html.vercel.app/', category: 'Developer tool' },
  { name: 'João Silva.tech Links', url: 'https://joaosilvatech-links.vercel.app/', category: 'Link hub' },
]

export function ProjectShowcase() {
  const english = useLocale() === 'en'

  return (
    <section className="shell pb-24 pt-32 md:pb-40 md:pt-44" aria-labelledby="showcase-title">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{english ? 'Selected websites / 01—07' : 'Sites selecionados / 01—07'}</p>
      <h1 id="showcase-title" className="display mt-6 max-w-[12ch] text-[clamp(3.5rem,9vw,9rem)]">{english ? 'Made to be experienced.' : 'Feitos para serem vividos.'}</h1>
      <p className="mt-6 max-w-[45ch] text-lg leading-relaxed text-muted">{english ? 'A selection of websites and digital tools. Explore each project in its original environment.' : 'Uma seleção de sites e ferramentas digitais. Explore cada projeto em seu ambiente original.'}</p>
      <div className="mt-20 space-y-24 md:mt-32 md:space-y-36">
        {sites.map((site, index) => (
          <article key={site.url} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className={`lg:col-span-4 ${index % 2 ? 'lg:order-2' : ''}`}>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">{String(index + 1).padStart(2, '0')} / {site.category}</p>
              <h2 className="display mt-4 text-[clamp(2.5rem,4vw,4rem)]">{site.name}</h2>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg">{english ? 'Visit website' : 'Visitar site'} <span aria-hidden="true">↗</span></a>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.025] motion-safe:focus-within:scale-[1.025] lg:col-span-8">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3"><span aria-hidden="true" className="flex gap-1.5"><i className="size-2 rounded-full bg-muted"/><i className="size-2 rounded-full bg-muted"/><i className="size-2 rounded-full bg-muted"/></span><span className="ml-3 truncate font-mono text-xs text-muted">{site.url.replace('https://', '')}</span></div>
              <div className="relative aspect-[16/10] overflow-hidden bg-white"><iframe title={`${english ? 'Preview' : 'Prévia'}: ${site.name}`} src={site.url} loading="lazy" tabIndex={-1} sandbox="allow-scripts allow-same-origin" className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0" /><a href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`${english ? 'Visit' : 'Visitar'} ${site.name}`} className="absolute inset-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-purple-500" /></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
