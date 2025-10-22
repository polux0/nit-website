"use client"

import { useState, useEffect } from "react"

export default function AboutSection() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const fullText = "između tebe i sveta – mi smo ta nit. Pomažemo brendovima da jasno komuniciraju, strateški nastupaju i snažno se povezuju sa zajednicom."

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50) // 50ms delay between each character

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  // Reset animation when component mounts
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [])
  return (
    <section className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(180deg, #6999c0 0%, #a48de2 100%)'
    }}>
      {/* Top curve */}
      <div className="absolute top-0 left-0 w-full z-20">
        <svg viewBox="0 0 1200 120" className="w-full h-20" preserveAspectRatio="none">
          <path 
            d="M0,120 C300,80 600,40 900,60 C1050,70 1200,100 1200,120 L1200,0 L0,0 Z" 
            fill="#6999c0"
            stroke="white"
            strokeWidth="2"
            className="drop-shadow-lg"
          />
        </svg>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <svg viewBox="0 0 1200 120" className="w-full h-20" preserveAspectRatio="none">
          <path 
            d="M0,0 C300,40 600,80 900,60 C1050,50 1200,20 1200,0 L1200,120 L0,120 Z" 
            fill="#a48de2"
            stroke="white"
            strokeWidth="2"
            className="drop-shadow-lg"
          />
        </svg>
      </div>

      {/* Noise overlay */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center lg:flex-row lg:items-center lg:gap-16 lg:text-left">
        <div className="w-full max-w-3xl mx-auto lg:mx-0 lg:w-1/2">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23334155'/%3E%3C/svg%3E"
            >
              <source src="/videos/hero_section_video.mp4" type="video/mp4" />
              <source src="/your-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="max-w-4xl mx-auto lg:mx-0 lg:w-1/2">
          <h1 className="text-6xl md:text-8xl font-louis font-bold text-white mb-8 tracking-tight">O nama</h1>

          <p className="text-3xl md:text-4xl font-louis text-white/90 mb-12 leading-relaxed min-h-[120px]">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </div>
      </div>
    </section>
  )
}
