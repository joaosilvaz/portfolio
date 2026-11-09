'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'

const posts = [
  { id: 'Dfcx_d8BwMK', kind: 'reel' },
  { id: 'DfZ_IT0lTqn', kind: 'p' },
  { id: 'DfLZrEflRa5', kind: 'p' },
  { id: 'De28OWLM2jg', kind: 'reel' },
  { id: 'DesqW0wlfFV', kind: 'p' },
]

export function Instagram() {
  const english = useLocale() === 'en'
  return (
    <section className="shell pb-24 md:pb-40" aria-labelledby="instagram-title">
      <div className="rounded-[2rem] border border-line bg-surface p-6 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_180px] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{english ? 'Beyond code' : 'Além do código'}</p>
            <h2 id="instagram-title" className="display mt-4 max-w-[16ch] text-[clamp(2.5rem,5vw,5rem)]">{english ? 'Learning is better shared.' : 'Aprender é melhor quando se compartilha.'}</h2>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-muted">{english ? 'On @joaosilva.tech I share practical AI tips, ways to use it in everyday work and a look at my life as a developer.' : 'No @joaosilva.tech compartilho dicas práticas de IA, formas de usar essas ferramentas no dia a dia e um pouco da minha rotina como desenvolvedor.'}</p>
            <a href="https://www.instagram.com/joaosilva.tech/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg hover:opacity-80">@joaosilva.tech ↗</a>
          </div>
          <div className="w-36 rounded-2xl bg-white p-2 md:w-full"><Image src="/images/instagram-qr.png" alt={english ? 'Instagram profile QR code' : 'QR code do perfil no Instagram'} width={235} height={270} className="h-auto w-full" /></div>
        </div>
        <div className="mt-12 border-t border-line pt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">@joaosilva.tech / 01—05</p>
              <h3 className="mt-3 text-xl font-semibold">{english ? 'Explore my posts' : 'Explore minhas publicações'}</h3>
            </div>
            <p className="text-sm text-muted">{english ? 'AI, tips and developer life' : 'IA, dicas e rotina de dev'}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const url = `https://www.instagram.com/${post.kind}/${post.id}/`
              return (
                <article key={post.id} className="group overflow-hidden rounded-[1.5rem] border border-line bg-bg motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <div className="absolute inset-0 flex flex-col justify-between p-5 text-muted" aria-hidden="true">
                      <span className="font-mono text-xs uppercase">@joaosilva.tech</span>
                      <span className="display text-5xl">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <iframe title={`${post.kind === 'reel' ? 'Reel' : english ? 'Post' : 'Publicação'} ${index + 1} — @joaosilva.tech`} src={`${url}embed/`} loading="lazy" scrolling="no" className="absolute inset-0 h-full w-full border-0 bg-transparent" />
                  </div>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 border-t border-line px-5 py-4 text-sm font-medium transition-colors hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg">
                    <span>{post.kind === 'reel' ? 'Reel' : english ? 'Post' : 'Publicação'} / {String(index + 1).padStart(2, '0')}</span>
                    <span>{english ? 'View on Instagram' : 'Ver no Instagram'} ↗</span>
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
