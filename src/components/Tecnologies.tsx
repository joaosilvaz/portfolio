'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    Blocks,
    Bot,
    Braces,
    CheckCircle2,
    CloudCog,
    Sparkles,
} from 'lucide-react'

type Capability = {
    key: string
    icon: typeof Braces
    title: string
    badge: string
    metric: string
    text: string
    proof: string
    stack: string[]
    featured?: boolean
}

export default function Technologies() {
    const t = useTranslations('technologies')

    const capabilities: Capability[] = [
        {
            key: 'frontend',
            icon: Braces,
            title: t('frontendTitle'),
            badge: t('frontendBadge'),
            metric: t('frontendMetric'),
            text: t('frontendText'),
            proof: t('frontendProof'),
            stack: t.raw('frontendStack') as string[],
        },
        {
            key: 'ai',
            icon: Bot,
            title: t('aiTitle'),
            badge: t('aiBadge'),
            metric: t('aiMetric'),
            text: t('aiText'),
            proof: t('aiProof'),
            stack: t.raw('aiStack') as string[],
            featured: true,
        },
        {
            key: 'backend',
            icon: Blocks,
            title: t('backendTitle'),
            badge: t('backendBadge'),
            metric: t('backendMetric'),
            text: t('backendText'),
            proof: t('backendProof'),
            stack: t.raw('backendStack') as string[],
        },
        {
            key: 'cloud',
            icon: CloudCog,
            title: t('cloudTitle'),
            badge: t('cloudBadge'),
            metric: t('cloudMetric'),
            text: t('cloudText'),
            proof: t('cloudProof'),
            stack: t.raw('cloudStack') as string[],
        },
    ]

    const otherStack = t.raw('otherStack') as string[]

    return (
        <section id="technologies" className="bg-white px-6 pb-24 pt-28 text-black dark:bg-[var(--bg-gradient)] dark:text-white md:px-16 md:pt-36">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65 }}
                    className="max-w-3xl"
                >
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-purple-600 dark:text-purple-300">
                        {t('eyebrow')}
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        {t('description')}
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-5 lg:grid-cols-2">
                    {capabilities.map((capability, index) => {
                        const Icon = capability.icon
                        const isFeatured = capability.featured

                        return (
                            <motion.article
                                key={capability.key}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.12 }}
                                transition={{ duration: 0.55, delay: index * 0.06 }}
                                className={isFeatured
                                    ? 'group relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-7 text-white md:p-8'
                                    : 'group rounded-3xl border border-gray-200 bg-gray-50 p-7 transition hover:-translate-y-1 hover:border-purple-500/35 dark:border-white/10 dark:bg-white/[0.035] md:p-8'
                                }
                            >
                                {isFeatured && (
                                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
                                )}

                                <div className="relative flex items-start justify-between gap-5">
                                    <div className={isFeatured
                                        ? 'flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300'
                                        : 'flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-300'
                                    }>
                                        <Icon size={24} />
                                    </div>
                                    <span className={isFeatured
                                        ? 'inline-flex items-center gap-1.5 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-200'
                                        : 'inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1.5 text-xs font-bold text-purple-700 dark:text-purple-200'
                                    }>
                                        {isFeatured ? <Sparkles size={13} /> : <CheckCircle2 size={13} />}
                                        {capability.badge}
                                    </span>
                                </div>

                                <div className="relative mt-7 flex flex-wrap items-end justify-between gap-3">
                                    <h3 className="text-2xl font-bold">{capability.title}</h3>
                                    <span className={isFeatured
                                        ? 'text-sm font-bold text-cyan-300'
                                        : 'text-sm font-bold text-purple-600 dark:text-purple-300'
                                    }>
                                        {capability.metric}
                                    </span>
                                </div>

                                <p className={isFeatured
                                    ? 'relative mt-4 leading-relaxed text-slate-300'
                                    : 'mt-4 leading-relaxed text-gray-600 dark:text-gray-400'
                                }>
                                    {capability.text}
                                </p>

                                <div className="relative mt-6 flex flex-wrap gap-2">
                                    {capability.stack.map((technology) => (
                                        <span
                                            key={technology}
                                            className={isFeatured
                                                ? 'rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200'
                                                : 'rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200'
                                            }
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>

                                <div className={isFeatured
                                    ? 'relative mt-7 border-t border-white/10 pt-5'
                                    : 'mt-7 border-t border-gray-200 pt-5 dark:border-white/10'
                                }>
                                    <p className={isFeatured
                                        ? 'text-xs font-bold uppercase tracking-[0.16em] text-cyan-300'
                                        : 'text-xs font-bold uppercase tracking-[0.16em] text-purple-600 dark:text-purple-300'
                                    }>
                                        {t('proofLabel')}
                                    </p>
                                    <p className={isFeatured
                                        ? 'mt-2 text-sm leading-relaxed text-slate-300'
                                        : 'mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300'
                                    }>
                                        {capability.proof}
                                    </p>
                                </div>
                            </motion.article>
                        )
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55 }}
                    className="mt-6 rounded-3xl border border-dashed border-gray-300 p-7 dark:border-white/15 md:p-8"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-xl">
                            <h3 className="text-xl font-bold">{t('otherTitle')}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('otherDescription')}</p>
                        </div>
                        <div className="flex max-w-2xl flex-wrap gap-2 lg:justify-end">
                            {otherStack.map((technology) => (
                                <span key={technology} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:bg-white/5 dark:text-gray-300">
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <Link
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 px-6 py-3 text-sm font-bold text-purple-700 transition hover:border-purple-500 hover:bg-purple-500/5 dark:text-purple-200"
                    >
                        {t('cta')} <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
