'use client'

import { IntroProvider } from '@/components/providers/Intro'
import { Loader } from '@/components/site/Loader'
import { Hero } from '@/components/site/Hero'
import { Work } from '@/components/work/Work'
import { About } from '@/components/site/About'
import { Assistant } from '@/components/site/Assistant'
import { Stack } from '@/components/site/Stack'
import { Contact } from '@/components/site/Contact'
import { Footer } from '@/components/site/Footer'

export default function Main() {
  return (
    <IntroProvider>
      <Loader />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Assistant />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </IntroProvider>
  )
}
