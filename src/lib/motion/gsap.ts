'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
import { duration, ease } from './tokens'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip)
gsap.defaults({ ease: ease.in, duration: duration.element })

export { Flip, gsap, ScrollTrigger, SplitText, useGSAP }
