'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Code2, GitCommit, Briefcase, GraduationCap } from 'lucide-react'

function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true) },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!started) return
        let startTime: number
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
        }
        requestAnimationFrame(step)
    }, [started, target, duration])

    return <span ref={ref}>{count}</span>
}

export default function Stats() {
    const t = useTranslations('stats')

    const stats = [
        {
            icon: <Briefcase size={28} className="text-blue-600" />,
            value: 6,
            suffix: '+',
            label: t('projects'),
        },
        {
            icon: <Code2 size={28} className="text-cyan-400" />,
            value: 14,
            suffix: '+',
            label: t('technologies'),
        },
        {
            icon: <GitCommit size={28} className="text-blue-600" />,
            value: 300,
            suffix: '+',
            label: t('commits'),
        },
        {
            icon: <GraduationCap size={28} className="text-cyan-400" />,
            value: 2,
            suffix: '+',
            label: t('experience'),
        },
    ]

    return (
        <section className="bg-white dark:bg-[var(--bg-gradient)] py-16 px-6 md:px-16">
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center gap-3 p-6 rounded-xl ring-1 ring-blue-600/20 hover:ring-blue-600/50 bg-white dark:bg-zinc-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/10"
                    >
                        <div className="p-3 rounded-full bg-blue-600/10">
                            {stat.icon}
                        </div>
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                            <CountUp target={stat.value} />{stat.suffix}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}
