import { Airplay } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from "next/image";
import { useTheme } from 'next-themes';

export default function Projects() {
    const t = useTranslations('projects');
    const [showAll, setShowAll] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const projects = [
        {
            title: t('titleProject1'),
            description: t('descriptionProject1'),
            image: "/images/ecosmart.png",
            techs: ["/nextjs-dark.svg", "/typescript.svg", "/tailwind.svg", "/react.svg"],
            liveLink: "https://global-solution-s2.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/Global-Solution-S2",
        },
        {
            title: t('titleProject2'),
            description: t('descriptionProject2'),
            image: "/images/god-of-war.png",
            techs: ["/vite.svg", "/typescript.svg", "/tailwind.svg", "/react.svg"],
            liveLink: "https://lp-check-point1.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/LP-CheckPoint1",
        },
        {
            title: t('titleProject3'),
            description: t('descriptionProject3'),
            image: "/images/ocean-guard.png",
            techs: ["/javascript.svg", "/html.svg", "/css.svg"],
            liveLink: "https://ocean-guard-flax.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/OceanGuard",
        },
        {
            title: t('titleProject4'),
            description: t('descriptionProject4'),
            image: "/images/e-commerce.png",
            techs: ["/html.svg", "/css.svg", "/javascript.svg"],
            liveLink: "https://e-commerce-two-puce.vercel.app/",
            githubLink: "https://github.com/joaosilvaz/e-commerce",
        },
        {
            title: t('titleProject5'),
            description: t('descriptionProject5'),
            image: "/images/bank-project.jpg",
            techs: ["/java.svg", "/spring-boot.svg"],
            liveLink: "",
            githubLink: "https://github.com/joaosilvaz/bank-project",
        },
    ];

    const visibleProjects = showAll ? projects : projects.slice(0, 3);

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

                <div className="grid gap-10 grid-cols-1 min-[900px]:grid-cols-2 min-[1218px]:grid-cols-3">
                    {visibleProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="h-auto border border-cyan-400 rounded-xl px-8 py-8 bg-white dark:bg-[var(--bg-gradient)] shadow-md flex flex-col justify-between"
                        >
                            <div className="relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-md hover:opacity-50 cursor-pointer transition-all duration-200"
                                    width={500}
                                    height={300}
                                />
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-60 transition-opacity duration-300"
                                >
                                    <Airplay className="text-white" size={32} />
                                </a>
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
                                    className="border px-2 py-3 rounded-full font-semibold md:px-4 lg:px-3 text-sm text-black dark:text-white border-black dark:border-white
                                    hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black
                                    transition-all ease-in duration-200 text-center w-full min-[370px]:w-auto"
                                >
                                    {t('github')}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

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
            </div>
        </section>
    );
}
