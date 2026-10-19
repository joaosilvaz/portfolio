'use client'

import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { PageTransition } from '@/components/providers/PageTransition'
import { Cursor } from '@/components/ui/Cursor'
import { Header } from '@/components/site/Header'

/** Tudo que persiste entre páginas: scroll suave, transição, header e cursor. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <PageTransition>
        <Header />
        {children}
        <Cursor />
      </PageTransition>
    </SmoothScroll>
  )
}
