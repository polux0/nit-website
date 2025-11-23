"use client"

import { useState, useEffect, useRef } from "react"

export default function AboutSection() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false)
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
        <video
          ref={mobileVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
          style={{ height: '100vh' }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23334155'/%3E%3C/svg%3E"
        >
          <source src="/videos/hero_section_video_alternative.mp4" type="video/mp4" />
          <source src="/videos/hero_section_video_alternative.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Combined Section - 50-50 layout on large screens, text only on mobile */}
      <section className="relative w-full overflow-hidden h-[600px] lg:h-screen" style={{
        backgroundImage: 'url(/images/background-deploy/1.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>

        {/* Content */}
        <div className="relative z-10 flex flex-col text-center lg:flex-row lg:text-left h-full">
          {/* Video - Hidden on mobile, shown on large screens */}
          <div className="hidden lg:block lg:w-1/2 lg:h-screen">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              style={{ height: '100vh' }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23334155'/%3E%3C/svg%3E"
            >
              <source src="/videos/hero_section_video_alternative.mp4" type="video/mp4" />
              <source src="/videos/hero_section_video_alternative.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Text Content */}
          <div className="w-full max-w-4xl mx-auto lg:mx-0 lg:w-1/2 flex flex-col items-center justify-start px-6 pt-20 pb-12 lg:pt-24 lg:px-12 lg:justify-center text-center h-full">
            <h1 className="text-6xl md:text-8xl font-louis font-bold text-white mb-6 tracking-tight">O nama</h1>

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
