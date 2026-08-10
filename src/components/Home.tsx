'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowDownToLine, ArrowUpRight, Building2, CheckCircle2, Languages } from 'lucide-react'

export default function Home() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(110)
  const t = useTranslations('home')
  const locale = useLocale()
  const texts = t.raw('texts') as string[]
  const cvFile = locale === 'en' ? '/CURRICULO-JV-2026-EN.pdf' : '/CURRICULO-JV-2026-PT.pdf'

  useEffect(() => {
    const fullText = texts[textIndex]
    const timeout = setTimeout(() => {
      setDisplayedText((previous) =>
        isDeleting
          ? fullText.substring(0, previous.length - 1)
          : fullText.substring(0, previous.length + 1)
      )
      setSpeed(isDeleting ? 35 : 90)

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1600)
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false)
        setTextIndex((previous) => (previous + 1) % texts.length)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, speed, textIndex, texts])

  const proofPoints = [
    { icon: CheckCircle2, label: t('proofExperience') },
    { icon: Building2, label: t('proofCompany') },
    { icon: Languages, label: t('proofLanguage') },
  ]

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white px-6 pb-24 pt-40 text-black dark:bg-[var(--bg-gradient)] dark:text-white md:px-16 md:pb-32 md:pt-52"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
            {t('badge')}
          </span>

          <p className="mt-7 text-lg text-gray-600 dark:text-gray-400">{t('welcome')}</p>
          <h1 className="mt-1 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            João Vitor
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              da Silva
            </span>
          </h1>

          <h2 className="mt-6 min-h-10 text-xl font-semibold text-gray-800 dark:text-gray-200 md:text-2xl">
            {displayedText}<span className="animate-blink text-blue-600">|</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:mx-0 md:text-lg">
            {t('description')}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
            >
              {t('portfolio')} <ArrowUpRight size={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/joaovitorsilva-dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-semibold transition hover:border-blue-600 hover:text-blue-700 dark:border-white/20 dark:hover:border-blue-400 dark:hover:text-blue-300"
            >
              {t('linkedin')} <ArrowUpRight size={18} />
            </Link>
            <a
              href={cvFile}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-gray-600 transition hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300"
            >
              <ArrowDownToLine size={18} /> {t('downloadCV')}
            </a>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400 lg:justify-start">
            {proofPoints.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon size={17} className="text-blue-600" /> {label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto hidden w-full max-w-md lg:block"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-600/20 bg-gradient-to-br from-blue-100 to-cyan-50 p-5 shadow-xl dark:from-zinc-900 dark:to-slate-900">
            <Image
              src="/images/joao software engineer api java docker AI.png"
              alt="João Vitor da Silva"
              width={520}
              height={520}
              priority
              className="aspect-square w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/30 bg-black/65 p-4 text-white backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">MRM Brasil</p>
              <p className="mt-1 font-semibold">Software Engineer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
