import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_uonw5gs";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_f3vo2wr";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YGpnzkHesMHXx-AYn";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const t = useTranslations('contact');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current || sending) return;

    setSending(true);
    setStatus("");

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus(t('success'));
        form.current?.reset();
      })
      .catch(() => {
        setStatus(t('error'));
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section id="contact" className="py-50 flex flex-col items-center justify-center bg-white dark:bg-[var(--bg-gradient)] text-black dark:text-white px-4">
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
              className="w-full p-3 bg-[#f3f3f3] dark:bg-[#1c2536] text-black dark:text-white rounded-md dark:border-none placeholder-gray-500"
            />
            <input
              type="text"
              name="joao"
              placeholder={t('placeholderName')}
              required
              className="w-full p-3 bg-[#f3f3f3] dark:bg-[#1c2536] text-black dark:text-white rounded-md dark:border-none placeholder-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder={t('placeholderEmail')}
              required
              className="w-full p-3 bg-[#f3f3f3] dark:bg-[#1c2536] text-black dark:text-white rounded-md dark:border-none placeholder-gray-500"
            />
            <textarea
              name="message"
              placeholder={t('placeholderMessage')}
              rows={5}
              required
              className="w-full p-3 bg-[#f3f3f3] dark:bg-[#1c2536] text-black dark:text-white rounded-md dark:border-none placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-fit px-6 py-2 font-medium text-white rounded-md bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg hover:opacity-90 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t('button')}
            </button>

            {status && <p role="status" aria-live="polite" className="text-sm text-gray-600 dark:text-gray-300 mt-2">{status}</p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
}
