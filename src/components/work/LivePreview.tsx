'use client'

import { useState } from 'react'

export function LivePreview({ name, url, english }: { name: string; url: string; english: boolean }) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-line-strong p-1 text-sm" role="group" aria-label={english ? 'Preview size' : 'Tamanho da prévia'}>
          {(['desktop', 'mobile'] as const).map((option) => (
            <button key={option} type="button" onClick={() => setDevice(option)} aria-pressed={device === option} className={`rounded-full px-4 py-2 transition-colors ${device === option ? 'bg-fg text-bg' : 'text-muted hover:text-fg'}`}>
              {option === 'desktop' ? 'Desktop' : 'Mobile'}
            </button>
          ))}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-strong px-5 py-2 text-sm transition-colors hover:bg-fg hover:text-bg">{english ? 'Visit live site' : 'Visitar site'} ↗</a>
      </div>
      <div className={`mx-auto overflow-hidden rounded-[1.5rem] border border-line bg-surface transition-[max-width] duration-500 ${device === 'mobile' ? 'max-w-[390px]' : 'max-w-full'}`}>
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span aria-hidden="true" className="flex gap-1.5"><i className="size-2 rounded-full bg-muted"/><i className="size-2 rounded-full bg-muted"/><i className="size-2 rounded-full bg-muted"/></span>
          <span className="mx-auto max-w-[70%] truncate rounded-full border border-line px-4 py-1 font-mono text-[10px] text-muted">{url.replace('https://', '')}</span>
        </div>
        <iframe key={device} title={`${english ? 'Live preview' : 'Prévia ao vivo'}: ${name}`} src={url} loading="lazy" sandbox="allow-scripts allow-same-origin" className={`block w-full border-0 bg-white ${device === 'mobile' ? 'h-[680px]' : 'h-[620px] md:h-[760px]'}`} />
      </div>
      <p className="mt-4 text-center text-xs text-muted">{english ? 'Scroll inside the preview or open the live website.' : 'Role dentro da prévia ou abra o site publicado.'}</p>
    </div>
  )
}
