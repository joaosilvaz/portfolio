import { useState } from 'react';
import { FaLinkedinIn, FaGithub, FaBars, FaTimes, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const t = useTranslations('header')

    const router = useRouter()
    const pathname = usePathname()

    function toggleLanguage() {
        const newLocale = pathname.startsWith('/pt') ? 'en' : 'pt'
        router.push(`/${newLocale}${pathname.replace(/^\/(pt|en)/, '')}`)
    }

    return (
        <header className="fixed bg-back-dark !bg-opacity-80 backdrop-blur-sm transition z-10 shadow-[0px_3px_15px_0px] dark:shadow-[#151725] shadow-[#e0e0e0] w-full px-4 md:px-8 xl:px-28 py-10 flex items-center justify-around text-black dark:text-white">
            <div className="text-2xl font-bold flex items-center gap-2 z-20">
                <span className="text-purple-500">&lt;/&gt;</span>
                <Link href="#home">
                    <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">João Vitor</span>
                </Link>
            </div>
            <nav className="hidden lg:flex gap-14 text-base font-medium">
                {[
                    { label: t('about'), href: '#about' },
                    { label: t('tech'), href: '#technologies' },
                    { label: t('projects'), href: '#projects' },
                    { label: t('contact'), href: '#contact' },
                ].map(({ label, href }) => (
                    <Link key={href} href={href} className="relative group">
                        <span>{label}</span>
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </nav>
            <button className="lg:hidden z-20" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {isMenuOpen && (
                <div className="absolute top-20 right-4 w-56 bg-white text-black dark:bg-black backdrop-blur-md dark:text-white rounded-xl shadow-lg p-6 z-30 flex flex-col gap-4 text-base font-medium">
                    {[
                        { label: t('home'), href: '#home' },
                        { label: t('about'), href: '#about' },
                        { label: t('tech'), href: '#technologies' },
                        { label: t('projects'), href: '#projects' },
                        { label: t('contact'), href: '#contact' },
                    ].map(({ label, href }) => (
                        <Link key={href} href={href} onClick={() => setIsMenuOpen(false)}>
                            {label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-6 pt-3 border-t border-gray-300">
                        <Link href="https://github.com/joaosilvaz" target="_blank">
                            <FaGithub size={18} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/jo%C3%A3o-vitor-da-silva-5677202b1/" target="_blank">
                            <FaLinkedinIn size={18} />
                        </Link>
                        <div className="cursor-pointer transition-all" onClick={toggleLanguage}>
                            <Image
                                src={pathname.startsWith('/pt') ? '/images/bandeira-brasil.png' : '/images/bandeira-eua.png'}
                                alt="Flag"
                                width={24}
                                height={24}
                                className="h-8 w-8"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="hidden lg:flex items-center gap-2 z-20">
                <div className="flex gap-2 cursor-pointer transition-all hover:scale-110 duration-300" onClick={toggleLanguage}>
                    <Image
                        src={pathname.startsWith('/pt') ? '/images/bandeira-brasil.png' : '/images/bandeira-eua.png'}
                        alt="Flag"
                        width={24}
                        height={24}
                        className="h-8 w-8"
                    />
                </div>
                <div className="w-px h-6 bg-gray-400 mx-4" />
                <Link href="https://www.linkedin.com/in/jo%C3%A3o-vitor-da-silva-5677202b1/" target='blank' className="bg-black dark:bg-gray-200 dark:text-black text-white p-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-400 transition-all duration-300">
                    <FaLinkedin size={20} />
                </Link>
                <Link href="https://github.com/joaosilvaz" target='blank' className="bg-black dark:bg-gray-200 dark:text-black text-white p-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-400 transition-all duration-300">
                    <FaGithub size={20} />
                </Link>
            </div>
        </header>
    )
}
