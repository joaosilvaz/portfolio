'use client'

import { useRef } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

/** Wrapper que aplica o hover magnético ao filho. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useMagnetic(ref)
  return (
    <span ref={ref} className={`inline-block ${className ?? ''}`}>
      {children}
    </span>
  )
}
