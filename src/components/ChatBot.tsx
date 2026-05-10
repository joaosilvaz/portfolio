'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Send, Bot, User, X, MessageCircle, Sparkles } from 'lucide-react'

type Message = {
    role: 'user' | 'assistant'
    content: string
}

const SUGGESTED_QUESTIONS_PT = [
    'Quais são suas principais tecnologias?',
    'Me fala sobre seus projetos',
    'Qual sua experiência profissional?',
    'Como entrar em contato?',
]

const SUGGESTED_QUESTIONS_EN = [
    'What are your main technologies?',
    'Tell me about your projects',
    'What is your professional experience?',
    'How can I contact you?',
]

interface ChatWindowProps {
    open: boolean
    setOpen: (v: boolean) => void
    messages: Message[]
    input: string
    setInput: (v: string) => void
    loading: boolean
    started: boolean
    sendMessage: (text?: string) => void
    bottomRef: React.RefObject<HTMLDivElement | null>
    inputRef: React.RefObject<HTMLInputElement | null>
    suggestedQuestions: string[]
    t: (key: string) => string
}


function ChatWindow({
    open, setOpen, messages, input, setInput,
    loading, started, sendMessage, bottomRef, inputRef,
    suggestedQuestions, t
}: ChatWindowProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm rounded-2xl shadow-2xl shadow-purple-500/20 ring-1 ring-purple-500/30 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col"
                    style={{ height: '520px' }}
                >
                    <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-500">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{t('welcomeTitle')}</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <p className="text-white/70 text-xs">Online</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors cursor-pointer">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                        {!started && (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t('welcomeSubtitle')}</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {suggestedQuestions.map((q: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(q)}
                                            className="text-xs px-3 py-2 rounded-full border border-purple-500/40 text-black dark:text-white hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-200 cursor-pointer text-left"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((msg: Message, i: number) => (
                            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-purple-500 to-cyan-400'}`}>
                                    {msg.role === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-white" />}
                                </div>
                                <div className={`max-w-[78%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-tr-sm' : 'bg-gray-100 dark:bg-zinc-800 text-black dark:text-gray-200 rounded-tl-sm'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                                    <Bot size={12} className="text-white" />
                                </div>
                                <div className="bg-gray-100 dark:bg-zinc-800 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="border-t border-gray-100 dark:border-zinc-800 p-3 flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder={t('placeholder')}
                            className="flex-1 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-full px-4 py-2 text-sm outline-none placeholder-gray-400 focus:ring-1 focus:ring-purple-500/50 transition-all"
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || loading}
                            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function ChatBot() {
    const t = useTranslations('chatbot')
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [started, setStarted] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300)
    }, [open])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    const sendMessage = async (text?: string) => {
        const content = text || input.trim()
        if (!content || loading) return
        if (!started) setStarted(true)

        const userMessage: Message = { role: 'user', content }
        const updatedMessages = [...messages, userMessage]

        setMessages(updatedMessages)
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            })
            const data = await res.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: t('error') }])
        } finally {
            setLoading(false)
            inputRef.current?.focus()
        }
    }

    const suggestedQuestions = t('lang') === 'pt' ? SUGGESTED_QUESTIONS_PT : SUGGESTED_QUESTIONS_EN

    return (
        <>
            {/* seção de destaque */}
            <section id="chatbot" className="bg-white dark:bg-[var(--bg-gradient)] text-black dark:text-white py-32 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="rounded-2xl ring-1 ring-purple-500/30 bg-gradient-to-br from-purple-500/5 to-cyan-400/5 dark:from-purple-500/10 dark:to-cyan-400/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-10"
                    >
                        {/* texto */}
                        <div className="flex-1 md:text-left text-center">
                            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                                <Sparkles size={14} />
                                {t('badge')}
                            </div>
                            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
                                {t('sectionTitle')}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
                                {t('sectionDescription')}
                            </p>
                            <button
                                onClick={() => setOpen(true)}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer"
                            >
                                <MessageCircle size={20} />
                                {t('sectionButton')}
                            </button>
                        </div>

                        {/* preview decorativo */}
                        <div className="flex-shrink-0 w-full md:w-80 rounded-2xl ring-1 ring-purple-500/20 bg-white dark:bg-zinc-900 overflow-hidden shadow-xl shadow-purple-500/10">
                            <div className="px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot size={13} className="text-white" />
                                </div>
                                <p className="text-white text-xs font-semibold">{t('welcomeTitle')}</p>
                                <div className="flex items-center gap-1 ml-auto">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <p className="text-white/70 text-xs">Online</p>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col gap-3">
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                                        <Bot size={11} className="text-white" />
                                    </div>
                                    <div className="bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-2xl rounded-tl-sm text-xs text-black dark:text-gray-200 max-w-[85%]">
                                        {t('previewMessage1')}
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-row-reverse">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                        <User size={11} className="text-white" />
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 rounded-2xl rounded-tr-sm text-xs text-white max-w-[85%]">
                                        {t('previewMessage2')}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                                        <Bot size={11} className="text-white" />
                                    </div>
                                    <div className="bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-2xl rounded-tl-sm text-xs text-black dark:text-gray-200 max-w-[85%]">
                                        {t('previewMessage3')}
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center mt-1 ml-8">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* janela flutuante */}
            <ChatWindow
                open={open}
                setOpen={setOpen}
                messages={messages}
                input={input}
                setInput={setInput}
                loading={loading}
                started={started}
                sendMessage={sendMessage}
                bottomRef={bottomRef}
                inputRef={inputRef}
                suggestedQuestions={suggestedQuestions}
                t={t}
            />

            {/* botão flutuante */}
            <motion.button
                onClick={() => setOpen(prev => !prev)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/40 flex items-center justify-center hover:opacity-90 transition-all cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <X size={22} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <MessageCircle size={22} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    )
}