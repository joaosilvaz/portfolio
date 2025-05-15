import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
    const t = useTranslations('footer');

    return (
        <footer className="bg-white dark:bg-[var(--bg-gradient)] text-black dark:text-white transition-all py-[50px] overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-30 mb-12 w-full">
                    <Link href="#home">
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">
                            &lt;/&gt; João Vitor
                        </span>
                    </Link>
                    <ul className="flex flex-wrap justify-center md:gap-10 gap-6 text-sm text-black dark:text-slate-300 mt-2 md:mt-0">
                        <li><Link href="#home" className="hover:text-blue-300 transition-all">{t('home')}</Link></li>
                        <li><Link href="#about" className="hover:text-blue-300 transition-all">{t('about')}</Link></li>
                        <li><Link href="#technologies" className="hover:text-blue-300 transition-all">{t('techs')}</Link></li>
                        <li><Link href="#projects" className="hover:text-blue-300 transition-all">{t('projects')}</Link></li>
                        <li><Link href="#contact" className="hover:text-blue-300 transition-all">{t('contact')}</Link></li>
                    </ul>
                </div>

                <hr className="w-full border-gray-800 mb-10" />

                <div className="flex items-center gap-2 mb-4">
                    <Link href="https://www.linkedin.com/in/jo%C3%A3o-vitor-da-silva-5677202b1/" target='blank' className="bg-black dark:bg-gray-200 dark:text-black text-white p-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-400 transition-all duration-300">
                        <FaLinkedin size={20} />
                    </Link>
                    <Link href="https://github.com/joaosilvaz" target='blank' className="bg-black dark:bg-gray-200 dark:text-black text-white p-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-400 transition-all duration-300">
                        <FaGithub size={20} />
                    </Link>
                </div>

                <p className="text-sm text-black dark:text-slate-400 text-center">&copy; {t('textFooter')}</p>
            </div>
        </footer>
    );
}
