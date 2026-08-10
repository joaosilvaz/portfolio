'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    Bot,
    BriefcaseBusiness,
    Code2,
    ExternalLink,
    Github,
    LockKeyhole,
    Sparkles,
} from 'lucide-react'

type FeaturedProject = {
    id: 'dealer' | 'lens' | 'assistant'
    category: string
    status: string
    title: string
    summary: string
    role: string
    impact: string
    stack: string[]
    tags: string[]
    primaryLink?: string
    primaryLabel?: string
    githubLink?: string
    confidential?: boolean
}

type SelectedProject = {
    title: string
    category: string
    description: string
    impact: string
    image: string
    stack: string[]
    tags: string[]
    liveLink?: string
    githubLink?: string
}

function ProjectVisual({ variant }: { variant: FeaturedProject['id'] }) {
    if (variant === 'lens') {
        return (
            <div className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-black via-slate-950 to-blue-950 p-7 text-white lg:min-h-full">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="relative flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-200">
                        <Sparkles size={13} /> AWS BEDROCK
                    </span>
                    <span className="font-mono text-xs text-white/50">GENERATIVE AI</span>
                </div>
                <div className="relative my-10 grid grid-cols-[1fr_auto] items-end gap-6">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Lens Analytics</p>
                        <p className="mt-3 text-4xl font-bold tracking-tight">Hours <span className="text-cyan-300">→</span> seconds</p>
                    </div>
                    <div className="flex h-24 items-end gap-2" aria-hidden="true">
                        {[35, 52, 44, 72, 64, 92].map((height, index) => (
                            <span key={index} className="w-3 rounded-t bg-gradient-to-t from-blue-600 to-cyan-300" style={{ height: `${height}%` }} />
                        ))}
                    </div>
                </div>
                <div className="relative flex items-center gap-2 text-sm text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> AI insights in production
                </div>
            </div>
        )
    }

    if (variant === 'assistant') {
        return (
            <div className="flex min-h-72 flex-col justify-between rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 p-7 text-slate-950 dark:from-slate-900 dark:to-blue-950 dark:text-white lg:min-h-full">
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1.5 text-xs font-bold text-blue-800 dark:text-blue-200">
                        <Bot size={14} /> CLAUDE API
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="my-8 space-y-3">
                    <div className="mr-10 rounded-2xl rounded-bl-sm bg-white p-4 text-sm text-gray-700 shadow-sm dark:bg-white/10 dark:text-gray-200">
                        Como João aplica IA em produtos reais?
                    </div>
                    <div className="ml-10 rounded-2xl rounded-br-sm bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-sm text-white">
                        Posso explicar sua experiência com AWS Bedrock, Claude API e Lens Analytics.
                    </div>
                </div>
                <p className="font-mono text-xs text-gray-500 dark:text-gray-400">SECURE • BILINGUAL • CONTEXT-AWARE</p>
            </div>
        )
    }

    return (
        <div className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-slate-950 to-blue-950 p-7 text-white lg:min-h-full">
            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full border-[32px] border-blue-500/10" />
            <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80">
                    <BriefcaseBusiness size={13} /> ENTERPRISE
                </span>
                <span className="text-sm font-black tracking-[0.28em] text-white/70">GM</span>
            </div>
            <div className="relative my-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Dealer 4.0</p>
                <p className="mt-3 text-4xl font-bold tracking-tight">Blazer EV <span className="text-cyan-300">RS</span></p>
                <p className="mt-2 text-sm text-white/55">Interactive touchscreen configurator</p>
            </div>
            <div className="relative flex gap-2">
                {['TOUCH', '3D', 'REAL-TIME'].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/60">{item}</span>
                ))}
            </div>
        </div>
    )
}

export default function Projects() {
    const t = useTranslations('projects')
    const [activeFilter, setActiveFilter] = useState('all')

    const filters = [
        { label: t('filterAll'), value: 'all' },
        { label: t('filterEnterprise'), value: 'enterprise' },
        { label: t('filterAI'), value: 'ai' },
        { label: t('filterBackend'), value: 'backend' },
        { label: t('filterFrontend'), value: 'frontend' },
    ]

    const featuredProjects: FeaturedProject[] = [
        {
            id: 'lens',
            category: t('lensCategory'),
            status: t('lensStatus'),
            title: t('lensTitle'),
            summary: t('lensSummary'),
            role: t('lensRole'),
            impact: t('lensImpact'),
            stack: ['AWS Bedrock', 'Generative AI', 'Full Stack', 'AWS'],
            tags: ['enterprise', 'ai', 'backend'],
            confidential: true,
        },
        {
            id: 'dealer',
            category: t('dealerCategory'),
            status: t('dealerStatus'),
            title: t('dealerTitle'),
            summary: t('dealerSummary'),
            role: t('dealerRole'),
            impact: t('dealerImpact'),
            stack: ['React', 'JavaScript', 'SCSS', 'HTML5'],
            tags: ['enterprise', 'frontend'],
            primaryLink: 'https://dealer-28afe.web.app/menu-intro.html',
            primaryLabel: t('viewProduct'),
        },
        {
            id: 'assistant',
            category: t('assistantCategory'),
            status: t('assistantStatus'),
            title: t('assistantTitle'),
            summary: t('assistantSummary'),
            role: t('assistantRole'),
            impact: t('assistantImpact'),
            stack: ['Next.js', 'Claude API', 'Supabase', 'TypeScript'],
            tags: ['ai', 'backend', 'frontend'],
            primaryLink: '#chatbot',
            primaryLabel: t('openAssistant'),
            githubLink: 'https://github.com/joaosilvaz/portfolio',
        },
    ]

    const selectedProjects: SelectedProject[] = [
        {
            title: t('ecoTitle'),
            category: t('ecoCategory'),
            description: t('ecoDescription'),
            impact: t('ecoImpact'),
            image: '/images/ecosmart.png',
            stack: ['Next.js', 'TypeScript', 'Tailwind'],
            tags: ['frontend', 'backend'],
            liveLink: 'https://global-solution-s2.vercel.app/',
            githubLink: 'https://github.com/joaosilvaz/Global-Solution-S2',
        },
        {
            title: t('bankTitle'),
            category: t('bankCategory'),
            description: t('bankDescription'),
            impact: t('bankImpact'),
            image: '/images/bank-project.jpg',
            stack: ['Java', 'Spring Boot', 'REST API'],
            tags: ['backend'],
            githubLink: 'https://github.com/joaosilvaz/bank-project',
        },
        {
            title: t('oceanTitle'),
            category: t('oceanCategory'),
            description: t('oceanDescription'),
            impact: t('oceanImpact'),
            image: '/images/ocean-guard.png',
            stack: ['JavaScript', 'HTML', 'CSS'],
            tags: ['frontend'],
            liveLink: 'https://ocean-guard-flax.vercel.app/',
            githubLink: 'https://github.com/joaosilvaz/OceanGuard',
        },
    ]

    const archivedProjects = [
        {
            title: t('godTitle'),
            tags: ['frontend'],
            liveLink: 'https://lp-check-point1.vercel.app/',
            githubLink: 'https://github.com/joaosilvaz/LP-CheckPoint1',
        },
        {
            title: t('commerceTitle'),
            tags: ['frontend'],
            liveLink: 'https://e-commerce-two-puce.vercel.app/',
            githubLink: 'https://github.com/joaosilvaz/e-commerce',
        },
    ]

    const matchesFilter = (tags: string[]) => activeFilter === 'all' || tags.includes(activeFilter)
    const visibleFeatured = featuredProjects.filter((project) => matchesFilter(project.tags))
    const visibleSelected = selectedProjects.filter((project) => matchesFilter(project.tags))
    const visibleArchived = archivedProjects.filter((project) => matchesFilter(project.tags))
    const hasResults = visibleFeatured.length + visibleSelected.length + visibleArchived.length > 0

    return (
        <section id="projects" className="bg-white px-6 pb-24 pt-28 text-black dark:bg-[var(--bg-gradient)] dark:text-white md:px-16 md:pt-36">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65 }}
                    className="max-w-3xl"
                >
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">{t('eyebrow')}</p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-gray-400">{t('description')}</p>
                </motion.div>

                <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label={t('title')}>
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() => setActiveFilter(filter.value)}
                            aria-pressed={activeFilter === filter.value}
                            className={activeFilter === filter.value
                                ? 'rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-bold text-white'
                                : 'rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-700 dark:border-white/15 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-300'
                            }
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {!hasResults && (
                    <p className="mt-12 rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-white/15 dark:text-gray-400">{t('emptyFilter')}</p>
                )}

                {visibleFeatured.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold md:text-3xl">{t('featuredTitle')}</h3>
                        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">{t('featuredDescription')}</p>

                        <div className="mt-8 space-y-7">
                            {visibleFeatured.map((project, index) => (
                                <motion.article
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.12 }}
                                    transition={{ duration: 0.6 }}
                                    className="grid overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.035] lg:grid-cols-[0.9fr_1.1fr]"
                                >
                                    <div className={`p-4 md:p-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <ProjectVisual variant={project.id} />
                                    </div>

                                    <div className="flex flex-col p-7 md:p-9 lg:p-10">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">{project.category}</p>
                                            <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">{project.status}</span>
                                        </div>

                                        <h4 className="mt-5 text-3xl font-bold tracking-tight">{project.title}</h4>
                                        <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">{project.summary}</p>

                                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">{t('roleLabel')}</p>
                                                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{project.role}</p>
                                            </div>
                                            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-700 dark:text-cyan-300">{t('impactLabel')}</p>
                                                <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-800 dark:text-gray-100">{project.impact}</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.stack.map((technology) => (
                                                <span key={technology} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">{technology}</span>
                                            ))}
                                        </div>

                                        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                                            {project.primaryLink && project.primaryLabel && (
                                                <Link
                                                    href={project.primaryLink}
                                                    target={project.primaryLink.startsWith('#') ? undefined : '_blank'}
                                                    rel={project.primaryLink.startsWith('#') ? undefined : 'noreferrer'}
                                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                                                >
                                                    {project.primaryLabel} <ArrowUpRight size={16} />
                                                </Link>
                                            )}
                                            {project.githubLink && (
                                                <Link href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold transition hover:border-blue-600 hover:text-blue-700 dark:border-white/20 dark:hover:border-blue-400 dark:hover:text-blue-300">
                                                    <Github size={16} /> {t('viewCode')}
                                                </Link>
                                            )}
                                            {project.confidential && (
                                                <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                    <LockKeyhole size={14} /> {t('confidential')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                )}

                {visibleSelected.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold md:text-3xl">{t('selectedTitle')}</h3>
                        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">{t('selectedDescription')}</p>

                        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {visibleSelected.map((project) => (
                                <motion.article
                                    key={project.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-blue-600/35 dark:border-white/10 dark:bg-white/[0.035] md:flex-col"
                                >
                                    <div className="relative w-32 flex-shrink-0 overflow-hidden bg-gray-100 md:h-48 md:w-full dark:bg-white/5">
                                        <Image src={project.image} alt={project.title} fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 128px, 33vw" />
                                    </div>
                                    <div className="flex flex-1 flex-col p-5 md:p-6">
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">{project.category}</p>
                                        <h4 className="mt-2 text-xl font-bold">{project.title}</h4>
                                        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
                                        <p className="mt-4 border-l-2 border-cyan-400 pl-3 text-xs font-semibold text-gray-700 dark:text-gray-200">{project.impact}</p>
                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {project.stack.map((technology) => (
                                                <span key={technology} className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700 dark:bg-white/5 dark:text-gray-300">{technology}</span>
                                            ))}
                                        </div>
                                        <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm font-bold">
                                            {project.liveLink && (
                                                <Link href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-600 dark:text-blue-300">
                                                    <ExternalLink size={15} /> {t('viewProject')}
                                                </Link>
                                            )}
                                            {project.githubLink && (
                                                <Link href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300">
                                                    <Github size={15} /> {t('viewCode')}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                )}

                {visibleArchived.length > 0 && (
                    <div className="mt-16 rounded-3xl border border-dashed border-gray-300 p-6 dark:border-white/15 md:p-8">
                        <div className="flex items-center gap-3">
                            <Code2 size={20} className="text-gray-500" />
                            <div>
                                <h3 className="font-bold">{t('archiveTitle')}</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('archiveDescription')}</p>
                            </div>
                        </div>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {visibleArchived.map((project) => (
                                <div key={project.title} className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-white/5">
                                    <span className="text-sm font-semibold">{project.title}</span>
                                    <div className="flex gap-3">
                                        <Link href={project.liveLink} target="_blank" rel="noreferrer" aria-label={`${t('viewProject')}: ${project.title}`} className="text-gray-500 transition hover:text-blue-600"><ExternalLink size={17} /></Link>
                                        <Link href={project.githubLink} target="_blank" rel="noreferrer" aria-label={`${t('viewCode')}: ${project.title}`} className="text-gray-500 transition hover:text-blue-600"><Github size={17} /></Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
