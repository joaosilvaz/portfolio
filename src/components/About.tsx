'use client'
import { motion } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

export default function About() {
    const t = useTranslations('about')

    const experiences = [
        {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRMun7l-k_b6II0SivAMoIkQnX50MXfk-ug&s",
            role: t("experienceRole"),
            company: t("experienceClient"),
            date: t("experienceDate"),
            link: "https://www.mrmbrasil.com.br/",
            type: 'experience' as const,
        },
    ]

    const education = [
        {
            logo: "/images/logo-fiap.jpg",
            course: t("academicCourse"),
            institution: t("academicInstitution"),
            date: t("academicDate"),
            link: "https://www.fiap.com.br/",
            type: 'education' as const,
        },
        {
            logo: "/images/logo-fiap.jpg",
            course: t("academicCourse2"),
            institution: t("academicInstitution2"),
            date: t("academicDate2"),
            link: "https://www.fiap.com.br/",
            type: 'education' as const,
        },
    ]

    return (
        <div id="about" className="flex flex-col bg-white dark:bg-[var(--bg-gradient)] text-black dark:text-white">
            <main className="flex-grow px-6 pt-30 pb-12 md:px-16 md:pt-40 md:pb-4">
                <div className="max-w-7xl mx-auto">

                    <motion.h2
                        className="text-4xl font-bold mb-12 md:text-left text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        {t("title")}
                    </motion.h2>

                    {/* foto + bio */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-12 mb-20 items-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* foto com fundo geométrico */}
                        <div className="flex-shrink-0 relative w-64 h-64 mx-auto md:mx-0">
                            {/* foto */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src='/images/profile.png'
                                    alt="Foto de perfil"
                                    width={290}
                                    height={290}
                                    className="rounded-xl object-cover shadow z-10 relative"
                                />
                            </div>
                        </div>

                        {/* bio */}
                        <div className="flex-1">
                            <p className="text-black dark:text-gray-300 text-lg leading-relaxed text-justify mb-6">
                                {t.raw("description").split("\n\n").map((paragraph: string, i: number) => (
                                    <span key={i}>
                                        {paragraph}
                                        <br /><br />
                                    </span>
                                ))}
                            </p>
                            <Link
                                href="#technologies"
                                className="inline-flex items-center gap-2 text-purple-500 hover:opacity-80 transition-all font-semibold duration-200 text-sm"
                            >
                                {t("seeTechnologies")} →
                            </Link>
                        </div>
                    </motion.div>

                    {/* timeline */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* experiência */}
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                    <Briefcase size={18} className="text-purple-500" />
                                </div>
                                <h3 className="font-bold text-xl text-black dark:text-white">{t("experienceTitle")}</h3>
                            </div>

                            <div className="relative">
                                {/* linha vertical */}
                                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-500/50 to-transparent" />

                                <div className="flex flex-col gap-8">
                                    {experiences.map((exp, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="flex gap-6 relative"
                                        >
                                            {/* ponto na timeline */}
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center z-10 shadow-md shadow-purple-500/30">
                                                <Link href={exp.link} target="_blank">
                                                    <Image
                                                        src={exp.logo}
                                                        alt="Logo"
                                                        width={28}
                                                        height={28}
                                                        className="w-7 h-7 object-contain rounded-full"
                                                    />
                                                </Link>
                                            </div>

                                            {/* conteúdo */}
                                            <div className="flex-1 pb-2">
                                                <p className="font-semibold text-black dark:text-white text-sm">{exp.role}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{exp.company}</p>
                                                <div className="flex items-center gap-1 mt-1.5">
                                                    <Calendar size={11} className="text-purple-400" />
                                                    <p className="text-xs text-purple-400 font-medium">{exp.date}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* formação */}
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="p-2 rounded-lg bg-cyan-400/10">
                                    <GraduationCap size={18} className="text-cyan-500" />
                                </div>
                                <h3 className="font-bold text-xl text-black dark:text-white">{t("academicTitle")}</h3>
                            </div>

                            <div className="relative">
                                {/* linha vertical */}
                                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent" />

                                <div className="flex flex-col gap-8">
                                    {education.map((edu, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="flex gap-6 relative"
                                        >
                                            {/* ponto na timeline */}
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center z-10 shadow-md shadow-cyan-400/30">
                                                <Link href={edu.link} target="_blank">
                                                    <Image
                                                        src={edu.logo}
                                                        alt="Logo"
                                                        width={28}
                                                        height={28}
                                                        className="w-7 h-7 object-contain rounded-full"
                                                    />
                                                </Link>
                                            </div>

                                            {/* conteúdo */}
                                            <div className="flex-1 pb-2">
                                                <p className="font-semibold text-black dark:text-white text-sm">{edu.course}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{edu.institution}</p>
                                                <div className="flex items-center gap-1 mt-1.5">
                                                    <Calendar size={11} className="text-cyan-400" />
                                                    <p className="text-xs text-cyan-400 font-medium">{edu.date}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}