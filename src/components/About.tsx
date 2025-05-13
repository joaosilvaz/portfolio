import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function About() {
    const t = useTranslations('about')

    return (
        <div id="about" className="flex flex-col bg-white dark:bg-[var(--bg-gradient)] text-black dark:text-white">
            <main className="flex-grow px-6 pt-30 pb-12 md:px-16 md:pt-40 md:pb-4">
                <div className="max-w-7xl mx-auto md:text-left text-center">
                    <motion.h2
                        className="text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        {t("title")}
                    </motion.h2>

                    <motion.article
                        className="flex flex-col md:flex-row items-center gap-10"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex-shrink-0">
                            <Image
                                src='/images/profile.png'
                                alt="Foto de perfil"
                                width={300}
                                height={300}
                                className="rounded-full shadow-xl shadow-blue-500/50 border-4 border-transparent"
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="text-black dark:text-gray-300 space-y-4 text-justify text-lg">
                            <p>
                                {t.raw("description").split("\n\n").map((paragraph: string, i: string) => (
                                    <span key={i}>
                                        {paragraph}
                                        <br /><br />
                                    </span>
                                ))}
                                <Link href="#tecnologias" className="text-[rgb(99,94,255)] hover:opacity-90 transition-all font-bold duration-200">
                                    {t("seeTechnologies")}
                                </Link>
                            </p>
                        </motion.div>
                    </motion.article>

                    <motion.article
                        className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-black dark:text-gray-300 space-y-4 text-justify pt-10 flex flex-col">
                            <h2 className="font-bold text-2xl flex items-center gap-3">
                                <span className="block size-4 rounded-full bg-gradient-to-r from-[#945dd6] via-[#6978d1] to-[#13adc7] shadow-md shadow-blue-500/50"></span>
                                {t("experienceTitle")}:
                            </h2>
                            <ul>
                                <li className="flex border-b-2 border-b-gray-800 pt-3 pb-3 items-center gap-4">
                                    <div>
                                        <Link href="https://www.mrmbrasil.com.br/" target="blank">
                                            <Image
                                                className="w-14 h-14 object-contain"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRMun7l-k_b6II0SivAMoIkQnX50MXfk-ug&s"
                                                alt="MRM Logo"
                                                width={56}
                                                height={56}
                                            />
                                        </Link>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <p className="text-lg text-black dark:text-white">{t("experienceRole")}</p>
                                        <p className="text-sm text-black dark:text-gray-100"> {t("experienceClient")}</p>
                                        <p className="text-sm text-black dark:text-gray-400">{t("experienceDate")}</p>
                                    </motion.div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-1 text-black dark:text-gray-300 space-y-4 text-justify pt-10 flex flex-col">
                            <h2 className="font-bold text-2xl flex items-center gap-3">
                                <span className="block size-4 rounded-full bg-gradient-to-r from-[#13adc7] via-[#6978d1] to-[#945dd6] shadow-md shadow-cyan-500/50"></span>
                                {t("academicTitle")}:
                            </h2>
                            <ul>
                                <li className="flex border-b-2 border-b-gray-800 pt-3 pb-3 items-center gap-4">
                                    <div>
                                        <Link href="https://www.fiap.com.br/" target="blank">
                                            <Image
                                                className="w-14 h-14 object-contain"
                                                src="/images/logo-fiap.jpg"
                                                alt="FIAP Logo"
                                                width={56}
                                                height={56}
                                            />
                                        </Link>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <p className="text-lg text-black dark:text-white">{t("academicCourse")}</p>
                                        <p className="text-sm text-black dark:text-gray-100">{t("academicInstitution")}</p>
                                        <p className="text-sm text-black dark:text-gray-400">{t("academicDate")}</p>
                                    </motion.div>
                                </li>
                            </ul>
                        </div>
                    </motion.article>

                </div>
            </main>
        </div>
    );
}
