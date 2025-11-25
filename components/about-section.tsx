"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { getVideoPoster } from "@/lib/project-images"

export default function AboutSection() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false)
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false)
  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const animationStartedRef = useRef(false)
  
  const firstSentence = `Između tebe i sveta – mi smo ta Nit.`
  const secondSentence = `Pomažemo brendovima da jasno komuniciraju, strateški nastupaju i snažno se povezuju sa zajednicom.`
  const fullText = `${firstSentence} ${secondSentence}`

  // Start animation when video reaches 4 seconds
  useEffect(() => {
    const desktopVideo = videoRef.current
    const mobileVideo = mobileVideoRef.current
    
    const handleTimeUpdate = (video: HTMLVideoElement) => {
      if (video.currentTime >= 4 && !animationStartedRef.current) {
        animationStartedRef.current = true
        setShouldStartAnimation(true)
      }
    }

    const desktopHandler = () => {
      if (desktopVideo && desktopVideo.readyState >= 2) {
        handleTimeUpdate(desktopVideo)
      }
    }
    
    const mobileHandler = () => {
      if (mobileVideo && mobileVideo.readyState >= 2) {
        handleTimeUpdate(mobileVideo)
      }
    }

    if (desktopVideo) {
      desktopVideo.addEventListener('timeupdate', desktopHandler)
      desktopVideo.addEventListener('loadeddata', desktopHandler)
      // Check immediately if video is already past 4 seconds
      if (desktopVideo.currentTime >= 4) {
        handleTimeUpdate(desktopVideo)
      }
    }
    if (mobileVideo) {
      mobileVideo.addEventListener('timeupdate', mobileHandler)
      mobileVideo.addEventListener('loadeddata', mobileHandler)
      // Check immediately if video is already past 4 seconds
      if (mobileVideo.currentTime >= 4) {
        handleTimeUpdate(mobileVideo)
      }
    }
    
    return () => {
      if (desktopVideo) {
        desktopVideo.removeEventListener('timeupdate', desktopHandler)
        desktopVideo.removeEventListener('loadeddata', desktopHandler)
      }
      if (mobileVideo) {
        mobileVideo.removeEventListener('timeupdate', mobileHandler)
        mobileVideo.removeEventListener('loadeddata', mobileHandler)
      }
    }
  }, [])

  // Text animation effect
  useEffect(() => {
    if (!shouldStartAnimation) return
    
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50) // 50ms delay between each character

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText, shouldStartAnimation])

  // Reset animation when component mounts
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
    setShouldStartAnimation(false)
    animationStartedRef.current = false
  }, [])
  return (
    <>
      {/* Video Section - Separate on mobile, merged on large screens */}
      <section className="relative w-full overflow-hidden lg:hidden" style={{
        height: '100vh'
      }}>
        {/* Grain background overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/images/background.grain/pozadine_0006_Layer-5-copy.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Video - Full screen height */}
        <div className="absolute inset-0 w-full h-full z-10" style={{ height: '100vh' }}>
          {/* Poster/Thumbnail - shown while video loads */}
          {!mobileVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#334155] to-[#1a1f2e]">
              <img
                src={getVideoPoster("/videos/hero_section_video_alternative.mp4")}
                alt="Hero video thumbnail"
                className="w-full h-full object-cover opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-3 border-white/40 border-t-white/90 rounded-full animate-spin" />
              </div>
            </div>
          )}
          <video
            ref={mobileVideoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${mobileVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ height: '100vh' }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={getVideoPoster("/videos/hero_section_video_alternative.mp4")}
            onCanPlay={() => setMobileVideoLoaded(true)}
            onLoadedData={() => setMobileVideoLoaded(true)}
          >
            <source src="/videos/hero_section_video_alternative.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Combined Section - 50-50 layout on large screens, text only on mobile */}
      <section className="relative w-full overflow-hidden h-[600px] lg:h-screen" style={{
        backgroundImage: 'url(/images/background-deploy/1.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Logo - Centered on mobile, Top Right on desktop */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:top-8 lg:right-8 z-20">
          <div className="flex flex-col items-center">
            {/* SVG logo - using img tag as Next.js Image doesn't optimize SVGs */}
            <img 
              src="/images/logos/logo simple off white.svg" 
              alt="NIT Logo" 
              className="w-36 md:w-40 lg:w-40 h-auto mb-1"
              loading="eager"
            />
            <p className="text-white/90 text-[10px] md:text-xs lg:text-sm tracking-[0.15em] uppercase text-center" style={{ fontFamily: '"Times New Roman", "Times", serif', letterSpacing: '0.15em' }}>
              digital marketing agency
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col text-center lg:flex-row lg:text-left h-full">
          {/* Video - Hidden on mobile, shown on large screens */}
          <div className="hidden lg:block lg:w-1/2 lg:h-screen relative">
            {/* Poster/Thumbnail - shown while video loads */}
            {!desktopVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#334155] to-[#1a1f2e] z-10">
                <img
                  src={getVideoPoster("/videos/hero_section_video_alternative.mp4")}
                  alt="Hero video thumbnail"
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-3 border-white/40 border-t-white/90 rounded-full animate-spin" />
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-500 ${desktopVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ height: '100vh' }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={getVideoPoster("/videos/hero_section_video_alternative.mp4")}
              onCanPlay={() => setDesktopVideoLoaded(true)}
              onLoadedData={() => setDesktopVideoLoaded(true)}
            >
              <source src="/videos/hero_section_video_alternative.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Text Content */}
          <div className="w-full max-w-4xl mx-auto lg:mx-0 lg:w-1/2 flex flex-col items-center justify-start px-6 pt-20 pb-12 lg:pt-24 lg:px-12 lg:justify-center text-center h-full">
            <h1 className="text-6xl md:text-8xl font-louis font-bold text-white mb-6 tracking-tight mt-40 md:mt-40 lg:mt-0">O nama</h1>

            <div
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed text-center"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {currentIndex <= firstSentence.length ? (
                <>
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </>
              ) : (
                <>
                  {firstSentence}
                  <br />
                  {displayedText.slice(firstSentence.length + 1)}
                  <span className="animate-pulse">|</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
