'use client'

import { createContext, useCallback, useContext, useState } from 'react'

type IntroPhase = 'loading' | 'revealing'

type IntroState = {
  phase: IntroPhase
  reveal: () => void
}

const IntroContext = createContext<IntroState>({ phase: 'revealing', reveal: () => {} })

export function useIntro() {
  return useContext(IntroContext)
}

/** Coordena o loader com a entrada do hero: o hero só anima quando o loader libera. */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>('loading')
  const reveal = useCallback(() => setPhase('revealing'), [])

  return <IntroContext.Provider value={{ phase, reveal }}>{children}</IntroContext.Provider>
}
