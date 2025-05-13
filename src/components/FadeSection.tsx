'use client';

import { motion } from 'framer-motion'

export default function FadeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center"
    >
      {/* <h1 className="text-5xl font-bold">Scrolla pra ver!</h1> */}
    </motion.div>
  )
}
