'use client'

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslations } from 'next-intl'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { duration, ease, mq } from '@/lib/motion/tokens'
import { Magnetic } from '@/components/ui/Magnetic'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = {
  pt: ['Quais são suas principais tecnologias?', 'Me fala sobre seus projetos', 'Qual sua experiência profissional?', 'Como entrar em contato?'],
  en: ['What are your main technologies?', 'Tell me about your projects', 'What is your professional experience?', 'How can I contact you?'],
} as const

/**
 * Faixa de chamada para o assistente (Claude API) + janela de chat flutuante.
 * A janela é um diálogo: Esc fecha e o foco volta para quem abriu.
 */
export function Assistant() {
  const t = useTranslations('chatbot')
  const tc = useTranslations('common')
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const suggested = SUGGESTED[t('lang') === 'en' ? 'en' : 'pt']

  useGSAP(
    () => {
      if (!panel.current) return
      const reduced = window.matchMedia(mq.reduced).matches
      if (open) {
        gsap.fromTo(
          panel.current,
          { autoAlpha: 0, y: reduced ? 0 : 24 },
          { autoAlpha: 1, y: 0, duration: duration.micro * 2, ease: ease.in, onComplete: () => inputRef.current?.focus() },
        )
      } else {
        gsap.to(panel.current, { autoAlpha: 0, y: reduced ? 0 : 24, duration: duration.micro, ease: ease.out })
      }
    },
    { scope: root, dependencies: [open] },
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, loading])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggle(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const toggle = (next: boolean) => {
    if (next) opener.current = document.activeElement as HTMLElement | null
    else opener.current?.focus()
    setOpen(next)
  }

  const send = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const updated: Message[] = [...messages, { role: 'user', content }]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data: { message?: string } = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message ?? t('error') }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('error') }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div ref={root}>
      <section id="chat" aria-labelledby="chat-title" className="py-12 md:py-16">
        <div className="shell">
          <div className="grid-12 items-end gap-y-8 rounded-[1.75rem] bg-fg p-6 text-bg md:p-12 lg:p-16">
            <div className="col-span-4 md:col-span-8">
              <p className="text-sm opacity-70">{t('badge')}</p>
              <h2 id="chat-title" className="display mt-4 text-[clamp(2.25rem,5vw,4.5rem)]">
                {t('sectionTitle')}
              </h2>
              <p className="mt-5 max-w-[48ch] opacity-70 md:text-lg">{t('sectionDescription')}</p>
            </div>
            <div className="col-span-4 md:col-span-4 md:justify-self-end">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => toggle(true)}
                  aria-haspopup="dialog"
                  className="rounded-full bg-bg px-7 py-3.5 text-sm font-medium text-fg transition-opacity duration-300 hover:opacity-85"
                >
                  {t('sectionButton')}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? tc('closeChat') : tc('openChat')}
        className="glass fixed bottom-4 right-4 z-30 rounded-full border border-line px-5 py-3 text-sm font-medium md:bottom-6 md:right-6"
      >
        {open ? tc('closeChat') : t('fab')}
      </button>

      <div
        ref={panel}
        id="assistant-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="assistant-title"
        inert={!open}
        className="invisible fixed inset-x-4 bottom-20 z-30 flex h-[min(32rem,calc(100svh-7rem))] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-bg md:inset-x-auto md:bottom-24 md:right-6 md:w-[24rem]"
      >
        <div className="border-b border-line px-5 py-4">
          <p id="assistant-title" className="font-medium">
            {t('welcomeTitle')}
          </p>
          <p className="text-xs text-muted">{t('badge')}</p>
        </div>

        <div data-lenis-prevent aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="flex h-full flex-col justify-center gap-4">
              <p className="text-sm text-muted">{t('welcomeSubtitle')}</p>
              <div className="flex flex-wrap gap-2">
                {suggested.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-line-strong px-3 py-2 text-left text-xs transition-colors hover:bg-fg hover:text-bg"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user' ? 'self-end rounded-br-sm bg-fg text-bg' : 'self-start rounded-bl-sm bg-surface'
              }`}
            >
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          ))}

          {loading && <p className="self-start rounded-2xl rounded-bl-sm bg-surface px-4 py-2.5 text-sm text-muted">{t('thinking')}</p>}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
          className="flex gap-2 border-t border-line p-3"
        >
          <label htmlFor="assistant-input" className="sr-only">
            {t('placeholder')}
          </label>
          <input
            id="assistant-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            autoComplete="off"
            className="min-w-0 flex-1 rounded-full bg-surface px-4 py-2.5 text-sm placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-opacity disabled:opacity-40"
          >
            {t('send')}
          </button>
        </form>
      </div>
    </div>
  )
}
