'use client'
import { useEffect, useState } from 'react'
import { FaLinkedinIn, FaGithub, FaBars, FaTimes, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const t = useTranslations('header')
    const tc = useTranslations('common')
    const router = useRouter()
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    function toggleLanguage() {
        const newLocale = pathname.startsWith('/pt') ? 'en' : 'pt'
        router.push(`/${newLocale}${pathname.replace(/^\/(pt|en)/, '')}`)
    }

    const isDark = theme === 'dark'

    const navLinks = [
        { label: t('about'), href: '#about' },
        { label: t('tech'), href: '#technologies' },
        { label: t('projects'), href: '#projects' },
        { label: t('chat'), href: '#chatbot' },
        { label: t('contact'), href: '#contact' },
    ]

    const mobileLinks = [{ label: t('home'), href: '#home' }, ...navLinks]

    return (
        <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-6"
        >
            <header
                className={`relative flex w-full max-w-6xl items-center justify-between rounded-full text-black backdrop-blur-xl transition-all duration-300 dark:text-white ${scrolled
                        ? 'border border-black/5 bg-white/80 px-5 py-2.5 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-black/60'
                        : 'border border-transparent bg-white/60 px-6 py-3.5 dark:bg-black/30'
                    }`}
            >
                <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="text-blue-600">&lt;/&gt;</span>
                    <Link href="#home">
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">João Vitor</span>
                    </Link>
                </div>

                <nav className="relative hidden items-center gap-1 text-sm font-medium lg:flex" onMouseLeave={() => setHoveredLink(null)}>
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            onMouseEnter={() => setHoveredLink(href)}
                            className="relative rounded-full px-4 py-2"
                        >
                            {hoveredLink === href && (
                                <motion.span
                                    layoutId="nav-hover"
                                    className="absolute inset-0 rounded-full bg-blue-600/10 dark:bg-white/10"
                                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10">{label}</span>
                        </Link>
                    ))}
                </nav>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="z-20 lg:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={isMenuOpen ? tc('closeMenu') : tc('openMenu')}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </motion.button>

                <div className="hidden items-center gap-1 lg:flex">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        className="cursor-pointer p-1.5"
                        onClick={toggleLanguage}
                        aria-label={tc('switchLanguage')}
                    >
                        <Image
                            src={pathname.startsWith('/pt') ? '/images/bandeira-brasil.png' : '/images/bandeira-eua.png'}
                            alt=""
                            width={22}
                            height={22}
                            className="h-6 w-6 rounded-full object-cover"
                        />
                    </motion.button>

                    {mounted && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            aria-label={isDark ? tc('lightTheme') : tc('darkTheme')}
                            className="overflow-hidden p-1.5 text-black dark:text-white"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isDark ? 'sun' : 'moon'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex"
                                >
                                    {isDark ? <SunIcon size={19} /> : <MoonIcon size={19} />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    )}

                    <div className="mx-3 h-5 w-px bg-gray-400/40" />

                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                        <Link
                            href="https://www.linkedin.com/in/joaovitorsilva-dev"
                            target="_blank"
                            aria-label={tc('linkedin')}
                            className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 p-2 text-white transition-colors dark:bg-none dark:bg-white dark:text-black"
                        >
                            <FaLinkedin size={18} />
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                        <Link
                            href="https://github.com/joaosilvaz"
                            target="_blank"
                            aria-label={tc('github')}
                            className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 p-2 text-white transition-colors dark:bg-none dark:bg-white dark:text-black"
                        >
                            <FaGithub size={18} />
                        </Link>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-2 top-full mt-3 w-56 rounded-2xl border border-black/5 bg-white/95 p-5 text-black shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/90 dark:text-white lg:hidden"
                        >
                            <div className="flex flex-col gap-3 text-base font-medium">
                                {mobileLinks.map(({ label, href }, index) => (
                                    <motion.div
                                        key={href}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.04 }}
                                    >
                                        <Link href={href} onClick={() => setIsMenuOpen(false)}>
                                            {label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center gap-5 border-t border-gray-300/50 pt-4 dark:border-white/10">
                                <Link href="https://github.com/joaosilvaz" target="_blank" aria-label={tc('github')}>
                                    <FaGithub size={18} />
                                </Link>
                                <Link href="https://www.linkedin.com/in/joaovitorsilva-dev" target="_blank" aria-label={tc('linkedin')}>
                                    <FaLinkedinIn size={18} />
                                </Link>
                                <button type="button" className="cursor-pointer" onClick={toggleLanguage} aria-label={tc('switchLanguage')}>
                                    <Image
                                        src={pathname.startsWith('/pt') ? '/images/bandeira-brasil.png' : '/images/bandeira-eua.png'}
                                        alt=""
                                        width={22}
                                        height={22}
                                        className="h-6 w-6 rounded-full object-cover"
                                    />
                                </button>
                                {mounted && (
                                    <button
                                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                                        aria-label={isDark ? tc('lightTheme') : tc('darkTheme')}
                                        className="cursor-pointer"
                                    >
                                        {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </motion.div>
    )
}
