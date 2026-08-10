'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import {
    ArrowUpRight,
    BrainCircuit,
    Briefcase,
    Building2,
    Calendar,
    ChevronDown,
    Gauge,
    GraduationCap,
    Target,
} from 'lucide-react'

export default function About() {
    const t = useTranslations('about')
    const [expandedEdu, setExpandedEdu] = useState<number | null>(null)

    const highlights = [
        {
            icon: Building2,
            title: t('impactTitle'),
            text: t('impactText'),
            accent: 'text-cyan-600 dark:text-cyan-300',
            background: 'bg-cyan-500/10',
        },
        {
            icon: BrainCircuit,
            title: t('aiTitle'),
            text: t('aiText'),
            accent: 'text-blue-700 dark:text-blue-300',
            background: 'bg-blue-600/10',
        },
        {
            icon: Gauge,
            title: t('deliveryTitle'),
            text: t('deliveryText'),
            accent: 'text-blue-600 dark:text-blue-300',
            background: 'bg-blue-500/10',
        },
    ]

    const experiences = [
        {
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRMun7l-k_b6II0SivAMoIkQnX50MXfk-ug&s',
            role: t('experienceRole'),
            company: t('experienceClient'),
            summary: t('experienceSummary'),
            date: t('experienceDate'),
            link: 'https://www.mrmbrasil.com.br/',
        },
    ]

    const education = [
        {
            logo: '/images/logo-fiap.jpg',
            course: t('academicCourse'),
            institution: t('academicInstitution'),
            date: t('academicDate'),
            link: 'https://www.fiap.com.br/',
            subjects: t.raw('academicSubjects1') as string[],
        },
        {
            logo: '/images/logo-fiap.jpg',
            course: t('academicCourse2'),
            institution: t('academicInstitution2'),
            date: t('academicDate2'),
            link: 'https://www.fiap.com.br/',
            subjects: t.raw('academicSubjects2') as string[],
        },
        {
            logo: '/images/wizard.jpeg',
            course: t('academicCourse3'),
            institution: t('academicInstitution3'),
            date: t('academicDate3'),
            link: 'https://wizard.com',
            subjects: [] as string[],
        },
    ]

    const focusTags = t.raw('focusTags') as string[]
    const paragraphs = (t.raw('description') as string).split('\n\n')

    return (
        <section id="about" className="bg-white px-6 pb-16 pt-28 text-black dark:bg-[var(--bg-gradient)] dark:text-white md:px-16 md:pt-36">
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
                    <p className="mt-5 text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-100 md:text-3xl">
                        {t('headline')}
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.65 }}
                        className="rounded-3xl border border-gray-200 bg-gray-50 p-7 dark:border-white/10 dark:bg-white/[0.035] md:p-9"
                    >
                        <div className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-white/10">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                                <Target size={17} className="text-blue-600" />
                                {t('focusTitle')}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {focusTags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-blue-600/25 bg-blue-600/5 px-3 py-1.5 text-xs font-semibold text-blue-800 dark:text-blue-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="https://www.linkedin.com/in/joaovitorsilva-dev"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                            >
                                {t('linkedinCTA')} <ArrowUpRight size={17} />
                            </Link>
                            <Link
                                href="#technologies"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:border-blue-600 hover:text-blue-700 dark:border-white/20 dark:hover:border-blue-400 dark:hover:text-blue-300"
                            >
                                {t('seeTechnologies')} <ArrowUpRight size={17} />
                            </Link>
                        </div>
                    </motion.article>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                    >
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                            {t('highlightsTitle')}
                        </h3>
                        <div className="grid gap-4">
                            {highlights.map(({ icon: Icon, title, text, accent, background }) => (
                                <div key={title} className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-600/35 dark:border-white/10 dark:bg-white/[0.035]">
                                    <div className="flex items-start gap-4">
                                        <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${background}`}>
                                            <Icon size={21} className={accent} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
                                            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.65 }}
                    className="mt-20"
                >
                    <h3 className="text-2xl font-bold md:text-3xl">{t('journeyTitle')}</h3>

                    <div className="mt-9 grid gap-8 lg:grid-cols-2">
                        <div className="rounded-3xl border border-gray-200 p-6 dark:border-white/10 md:p-8">
                            <div className="mb-7 flex items-center gap-3">
                                <div className="rounded-xl bg-blue-600/10 p-2.5">
                                    <Briefcase size={20} className="text-blue-600" />
                                </div>
                                <h4 className="text-lg font-bold">{t('experienceTitle')}</h4>
                            </div>

                            {experiences.map((experience) => (
                                <div key={experience.role} className="flex gap-4">
                                    <Link href={experience.link} target="_blank" rel="noreferrer" className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                                        <Image src={experience.logo} alt={experience.company} width={38} height={38} className="h-9 w-9 object-contain" />
                                    </Link>
                                    <div>
                                        <p className="font-bold">{experience.role}</p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{experience.company}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{experience.summary}</p>
                                        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                            <Calendar size={13} /> {experience.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-3xl border border-gray-200 p-6 dark:border-white/10 md:p-8">
                            <div className="mb-7 flex items-center gap-3">
                                <div className="rounded-xl bg-cyan-500/10 p-2.5">
                                    <GraduationCap size={20} className="text-cyan-600 dark:text-cyan-300" />
                                </div>
                                <h4 className="text-lg font-bold">{t('academicTitle')}</h4>
                            </div>

                            <div className="space-y-7">
                                {education.map((item, index) => (
                                    <div key={item.course} className="flex gap-4">
                                        <Link href={item.link} target="_blank" rel="noreferrer" className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                                            <Image src={item.logo} alt={item.institution} width={34} height={34} className="h-8 w-8 rounded-lg object-contain" />
                                        </Link>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold">{item.course}</p>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.institution}</p>
                                            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                                                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                                                    <Calendar size={12} /> {item.date}
                                                </p>
                                                {item.subjects.length > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setExpandedEdu(expandedEdu === index ? null : index)}
                                                        aria-expanded={expandedEdu === index}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 transition hover:text-blue-600 dark:text-blue-300"
                                                    >
                                                        {expandedEdu === index ? t('showLess') : t('showMore')}
                                                        <motion.span animate={{ rotate: expandedEdu === index ? 180 : 0 }}>
                                                            <ChevronDown size={14} />
                                                        </motion.span>
                                                    </button>
                                                )}
                                            </div>

                                            <AnimatePresence>
                                                {expandedEdu === index && item.subjects.length > 0 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-3 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
                                                            <p className="mb-2 text-xs font-bold text-gray-700 dark:text-gray-200">{t('subjectsTitle')}</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {item.subjects.map((subject) => (
                                                                    <span key={subject} className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-medium text-blue-800 dark:text-blue-200">
                                                                        {subject}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
