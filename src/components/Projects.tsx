import { Airplay } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from "next/image";
import { useTheme } from 'next-themes';
import { FaGithub } from 'react-icons/fa'

export default function Projects() {
    const t = useTranslations('projects');
    const [showAll, setShowAll] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all')

    const filters = [
        { label: 'All', value: 'all' },
        { label: 'React', value: 'react' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Java', value: 'java' },
    ]

    useEffect(() => {
        setMounted(true);
    }, []);

    const projects = [
        {
            title: t('titleProject1'),
            description: t('descriptionProject1'),
            image: "/images/ecosmart.png",
            techs: ["/nextjs-dark.svg", "/typescript.svg", "/tailwind.svg", "/react.svg"],
            tags: ['react', 'typescript'],
            liveLink: "https://global-solution-s2.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/Global-Solution-S2",
        },
        {
            title: t('titleProject2'),
            description: t('descriptionProject2'),
            image: "/images/god-of-war.png",
            techs: ["/vite.svg", "/typescript.svg", "/tailwind.svg", "/react.svg"],
            tags: ['react', 'typescript'],
            liveLink: "https://lp-check-point1.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/LP-CheckPoint1",
        },
        {
            title: t('titleProject3'),
            description: t('descriptionProject3'),
            image: "/images/ocean-guard.png",
            techs: ["/javascript.svg", "/html.svg", "/css.svg"],
            tags: ['javascript'],
            liveLink: "https://ocean-guard-flax.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/OceanGuard",
        },
        {
            title: t('titleProject4'),
            description: t('descriptionProject4'),
            image: "/images/e-commerce.png",
            techs: ["/html.svg", "/css.svg", "/javascript.svg"],
            tags: ['javascript'],
            liveLink: "https://e-commerce-two-puce.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/e-commerce",
        },
        {
            title: t('titleProject5'),
            description: t('descriptionProject5'),
            image: "/images/bank-project.jpg",
            techs: ["/java.svg", "/spring-boot.svg"],
            tags: ['java'],
            liveLink: "",
            githubLink: "https://github.com/joaosilvaz/bank-project",
        },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.tags.includes(activeFilter))

    const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3)

    return (
        <section id="projects" className="bg-white dark:bg-[var(--bg-gradient)] text-black dark:text-white pt-50 pb-20 px-6 md:px-16">
            <div className="max-w-7xl mx-auto md:text-left text-center">
                <motion.h2
                    className="text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    {t('title')}
                </motion.h2>
                <p className="text-black dark:text-gray-300 mb-12 max-w-xl">
                    {t('description')}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                    {filters.map(filter => (
                        <button
                            key={filter.value}
                            onClick={() => {
                                setActiveFilter(filter.value)
                                setShowAll(false)
                            }}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                                ${activeFilter === filter.value
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                                    : 'border border-purple-500/40 text-black dark:text-white hover:border-purple-500 hover:bg-purple-500/10'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="grid gap-10 grid-cols-1 min-[900px]:grid-cols-2 min-[1218px]:grid-cols-3">
                    {visibleProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="h-auto rounded-xl px-8 py-8 bg-white dark:bg-[var(--bg-gradient)] shadow-md flex flex-col justify-between ring-1 ring-purple-500/30 hover:ring-purple-500/60 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                        >
                            <div className="relative overflow-hidden rounded-md group/img">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover/img:scale-110"
                                    width={500}
                                    height={300}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                    <div className="flex gap-2 translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                onClick={e => e.stopPropagation()}
                                                className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full hover:bg-white/30 transition-all"
                                            >
                                                <Airplay size={12} />
                                                Demo
                                            </a>
                                        )}
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            onClick={e => e.stopPropagation()}
                                            className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full hover:bg-white/30 transition-all"
                                        >
                                            <FaGithub size={12} />
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <h3 className="md:text-2xl text-xl font-bold mb-4 mt-4">{project.title}</h3>
                            <p className="text-[rgb(95,95,95)] dark:text-[rgb(146,158,176)] mb-6 md:text-sm text-sm">{project.description}</p>

                            <div className="flex flex-wrap gap-4 mb-4 md:justify-start justify-center">
                                {mounted && project.techs.map((tech, idx) => {
                                    const isNextJs = tech.includes('nextjs');
                                    return (
                                        <Image
                                            key={idx}
                                            src={
                                                isNextJs
                                                    ? (theme === 'dark' ? '/nextjs-light.svg' : '/nextjs-dark.svg')
                                                    : tech
                                            }
                                            alt={`Tecnologia ${idx}`}
                                            className="w-7 h-7 cursor-pointer hover:scale-115 transition-all duration-300"
                                            width={28}
                                            height={28}
                                        />
                                    );
                                })}
                            </div>

                            <div className="flex flex-col min-[370px]:flex-row justify-between gap-3 mt-auto pt-3">
                                {project.liveLink && (
                                    <Link
                                        href={project.liveLink}
                                        target="_blank"
                                        className="bg-gradient-to-l from-purple-500 to-cyan-400 text-white px-3 py-3 md:px-3 rounded-full font-semibold text-sm transition-all ease-in duration-100 hover:shadow-[0_6px_20px_rgba(139,92,246,0.4),_0_3px_10px_rgba(34,211,238,0.3)] dark:hover:shadow-[0px_4px_15px_rgba(255,255,255,0.4)] text-center w-full min-[370px]:w-auto"
                                    >
                                        {t('deploy')}
                                    </Link>
                                )}
                                <Link
                                    href={project.githubLink}
                                    target="_blank"
                                    className="border px-2 py-3 rounded-full font-semibold md:px-4 lg:px-3 text-sm text-black dark:text-white border-black dark:border-white hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all ease-in duration-200 text-center w-full min-[370px]:w-auto"
                                >
                                    {t('github')}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProjects.length > 3 && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:opacity-90 text-white px-5 py-2 rounded-lg font-semibold transition duration-200 cursor-pointer"
                        >
                            {showAll ? (
                                <>
                                    {t('seeLess')} <ChevronUp className="inline-block ml-2" size={16} />
                                </>
                            ) : (
                                <>
                                    {t('seeMore')} <ChevronDown className="inline-block ml-2" size={16} />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}