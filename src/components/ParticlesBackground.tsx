// 'use client'
// import { useCallback, useEffect, useState } from 'react'
// import Particles from '@tsparticles/react'
// import { initParticlesEngine } from '@tsparticles/react'
// import { loadSlim } from '@tsparticles/slim'
// import type { Engine } from '@tsparticles/engine'

// export default function ParticlesBackground() {
//     const [init, setInit] = useState(false)
//     useEffect(() => {
//         initParticlesEngine(async (engine: Engine) => {
//             await loadSlim(engine)
//         }).then(() => setInit(true))
//     }, [])

//     const particlesLoaded = useCallback(async () => { }, [])

//     if (!init) return null

//     return (
//         <Particles
//             id="tsparticles"
//             particlesLoaded={particlesLoaded}
//             className="absolute inset-0 z-0"
//             options={{
//                 fullScreen: { enable: false },
//                 background: { color: { value: 'transparent' } },
//                 fpsLimit: 60,
//                 particles: {
//                     number: {
//                         value: 60,
//                         density: { enable: true },
//                     },
//                     color: {
//                         value: ['#a855f7', '#22d3ee', '#818cf8'],
//                     },
//                     shape: { type: 'circle' },
//                     opacity: {
//                         value: { min: 0.1, max: 0.4 },
//                         animation: {
//                             enable: true,
//                             speed: 1,
//                             sync: false,
//                         },
//                     },
//                     size: {
//                         value: { min: 1, max: 3 },
//                     },
//                     move: {
//                         enable: true,
//                         speed: 0.6,
//                         direction: 'none',
//                         random: true,
//                         outModes: { default: 'bounce' },
//                     },
//                     links: {
//                         enable: true,
//                         distance: 130,
//                         color: '#a855f7',
//                         opacity: 0.15,
//                         width: 1,
//                     },
//                 },
//                 interactivity: {
//                     events: {
//                         onHover: {
//                             enable: true,
//                             mode: 'grab',
//                         },
//                         onClick: {
//                             enable: true,
//                             mode: 'push',
//                         },
//                     },
//                     modes: {
//                         grab: {
//                             distance: 140,
//                             links: { opacity: 0.4 },
//                         },
//                         push: { quantity: 3 },
//                     },
//                 },
//                 detectRetina: true,
//             }}
//         />
//     )
// }