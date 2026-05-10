'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setProgress(percent)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-50">
            <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}