import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const t = useTranslations('contact');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_b8ki7z8",           // ID do serviço
        "template_z4i5biq",          // ID do template
        form.current,                // formulário
        "37BPOmmry-S_0f_GY"     // substitua pela sua chave pública do EmailJS
      )
      .then(() => {
        setStatus(t('success'));
        form.current?.reset();
      })
      .catch(() => {
        setStatus(t('error'));
      });
  };

  return (
    <section className="py-50 flex flex-col items-center justify-center bg-white dark:bg-[var(--bg-gradient)] text-black dark:text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >

        <div className="max-w-lg w-full space-y-6 md:text-left text-center">
          <div>
            <h2 className="text-4xl font-bold text-black dark:text-white">{t('title')}</h2>
            <p className="text-black dark:text-gray-400 mt-2">
              {t('description')}
            </p>
          </div>

          <form ref={form} onSubmit={sendEmail} className="space-y-4 text-center">
            <input
              type="text"
              name="title"
              placeholder={t('placeholderTitle')}
              required
              className="w-full p-3 bg-[#ffffff] dark:bg-[#1c2536] text-black dark:text-white rounded-md outline-none border dark:border-none placeholder-gray-500"
            />
            <input
              type="text"
              name="joao"
              placeholder={t('placeholderName')}
              required
              className="w-full p-3 bg-[#ffffff] dark:bg-[#1c2536] text-black dark:text-white rounded-md outline-none border dark:border-none placeholder-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder={t('placeholderEmail')}
              required
              className="w-full p-3 bg-[#ffffff] dark:bg-[#1c2536] text-black dark:text-white rounded-md outline-none border dark:border-none placeholder-gray-500"
            />
            <textarea
              name="message"
              placeholder={t('placeholderMessage')}
              rows={5}
              required
              className="w-full p-3 bg-[#ffffff] dark:bg-[#1c2536] text-black dark:text-white rounded-md outline-none border dark:border-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-fit px-6 py-2 font-medium text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:opacity-90 transition cursor-pointer"
            >
              {t('button')}
            </button>

            {status && <p className="text-sm text-gray-300 mt-2">{status}</p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
}
