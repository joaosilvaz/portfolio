'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { duration, ease } from './tokens'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
gsap.defaults({ ease: ease.in, duration: duration.element })

export { gsap, ScrollTrigger, SplitText, useGSAP }
