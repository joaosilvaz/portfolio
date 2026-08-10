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
    Database,
    GitBranch,
    Hash,
    Layers,
    MessageSquareText,
    Sparkles,
    Users,
    Webhook,
    Workflow,
    type LucideIcon,
} from 'lucide-react'
import {
    SiAdobe,
    SiAmazonwebservices,
    SiAnthropic,
    SiDocker,
    SiDotnet,
    SiGit,
    SiJavascript,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiOpenjdk,
    SiPostgresql,
    SiPython,
    SiReact,
    SiSass,
    SiSpringboot,
    SiStrapi,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si'
import { TbBrandAzure } from 'react-icons/tb'
import type { IconType } from 'react-icons'

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

type TechMeta = {
    icon: LucideIcon | IconType
    // Official brand color. Omitted for generic (non-branded) concept icons.
    color?: string
    // Brand color is near-black; flip to white in dark mode so it stays visible.
    invertOnDark?: boolean
}

function getTechMeta(name: string): TechMeta | null {
    const n = name.toLowerCase()

    if (n === 'react') return { icon: SiReact, color: '#61DAFB' }
    if (n.includes('next')) return { icon: SiNextdotjs, color: '#000000', invertOnDark: true }
    if (n === 'typescript') return { icon: SiTypescript, color: '#3178C6' }
    if (n === 'javascript') return { icon: SiJavascript, color: '#F7DF1E' }
    if (n.includes('tailwind')) return { icon: SiTailwindcss, color: '#06B6D4' }
    if (n === 'scss' || n === 'sass') return { icon: SiSass, color: '#CC6699' }
    if (n === 'aem') return { icon: SiAdobe, color: '#FF0000' }
    if (n.includes('bedrock')) return { icon: SiAmazonwebservices, color: '#FF9900' }
    if (n.includes('claude')) return { icon: SiAnthropic, color: '#191919', invertOnDark: true }
    if (n.includes('generativ')) return { icon: Sparkles }
    if (n.includes('prompt')) return { icon: MessageSquareText }
    if (n === 'apis' || n.includes('rest')) return { icon: Webhook }
    if (n.includes('spring')) return { icon: SiSpringboot, color: '#6DB33F' }
    if (n === 'java') return { icon: SiOpenjdk, color: '#000000', invertOnDark: true }
    if (n.includes('postgresql')) return { icon: SiPostgresql, color: '#4169E1' }
    if (n.includes('mysql')) return { icon: SiMysql, color: '#4479A1' }
    if (n.includes('mongodb')) return { icon: SiMongodb, color: '#47A248' }
    if (n === 'sql') return { icon: Database }
    if (n.includes('docker')) return { icon: SiDocker, color: '#2496ED' }
    if (n.includes('design pattern')) return { icon: Layers }
    if (n === 'aws') return { icon: SiAmazonwebservices, color: '#FF9900' }
    if (n.includes('azure')) return { icon: TbBrandAzure, color: '#0078D4' }
    if (n.includes('gitflow')) return { icon: GitBranch }
    if (n === 'git') return { icon: SiGit, color: '#F05032' }
    if (n.includes('ci/cd') || n.includes('cicd')) return { icon: Workflow }
    if (n.includes('scrum')) return { icon: Users }
    if (n.includes('node')) return { icon: SiNodedotjs, color: '#5FA04E' }
    if (n === 'python') return { icon: SiPython, color: '#3776AB' }
    if (n === 'c#') return { icon: Hash }
    if (n.includes('.net') || n === 'dotnet') return { icon: SiDotnet, color: '#512BD4' }
    if (n.includes('strapi')) return { icon: SiStrapi, color: '#4945FF' }

    return null
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
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
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
                                    ? 'group relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-black via-slate-950 to-blue-950 p-7 text-white md:p-8'
                                    : 'group rounded-3xl border border-gray-200 bg-gray-50 p-7 transition hover:-translate-y-1 hover:border-blue-600/35 dark:border-white/10 dark:bg-white/[0.035] md:p-8'
                                }
                            >
                                {isFeatured && (
                                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
                                )}

                                <div className="relative flex items-start justify-between gap-5">
                                    <div className={isFeatured
                                        ? 'flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300'
                                        : 'flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-700 dark:text-blue-300'
                                    }>
                                        <Icon size={24} />
                                    </div>
                                    <span className={isFeatured
                                        ? 'inline-flex items-center gap-1.5 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-200'
                                        : 'inline-flex items-center gap-1.5 rounded-full border border-blue-600/20 bg-blue-600/5 px-3 py-1.5 text-xs font-bold text-blue-800 dark:text-blue-200'
                                    }>
                                        {isFeatured ? <Sparkles size={13} /> : <CheckCircle2 size={13} />}
                                        {capability.badge}
                                    </span>
                                </div>

                                <div className="relative mt-7 flex flex-wrap items-end justify-between gap-3">
                                    <h3 className="text-2xl font-bold">{capability.title}</h3>
                                    <span className={isFeatured
                                        ? 'text-sm font-bold text-cyan-300'
                                        : 'text-sm font-bold text-blue-700 dark:text-blue-300'
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
                                    {capability.stack.map((technology) => {
                                        const meta = getTechMeta(technology)
                                        const TechIcon = meta?.icon

                                        return (
                                            <span
                                                key={technology}
                                                className={isFeatured
                                                    ? 'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200'
                                                    : 'inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200'
                                                }
                                            >
                                                {TechIcon && (
                                                    <TechIcon
                                                        size={13}
                                                        className={meta?.color
                                                            ? (meta.invertOnDark ? 'dark:invert' : undefined)
                                                            : (isFeatured ? 'text-cyan-300' : 'text-blue-700 dark:text-blue-300')
                                                        }
                                                        style={meta?.color ? { color: meta.color } : undefined}
                                                    />
                                                )}
                                                {technology}
                                            </span>
                                        )
                                    })}
                                </div>

                                <div className={isFeatured
                                    ? 'relative mt-7 border-t border-white/10 pt-5'
                                    : 'mt-7 border-t border-gray-200 pt-5 dark:border-white/10'
                                }>
                                    <p className={isFeatured
                                        ? 'text-xs font-bold uppercase tracking-[0.16em] text-cyan-300'
                                        : 'text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300'
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
                            {otherStack.map((technology) => {
                                const meta = getTechMeta(technology)
                                const TechIcon = meta?.icon

                                return (
                                    <span key={technology} className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:bg-white/5 dark:text-gray-300">
                                        {TechIcon && (
                                            <TechIcon
                                                size={13}
                                                className={meta?.color
                                                    ? (meta.invertOnDark ? 'dark:invert' : undefined)
                                                    : 'text-blue-700 dark:text-blue-300'
                                                }
                                                style={meta?.color ? { color: meta.color } : undefined}
                                            />
                                        )}
                                        {technology}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <Link
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-full border border-blue-600/30 px-6 py-3 text-sm font-bold text-blue-800 transition hover:border-blue-600 hover:bg-blue-600/5 dark:text-blue-200"
                    >
                        {t('cta')} <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
