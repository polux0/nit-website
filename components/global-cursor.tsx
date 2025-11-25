"use client"

import { useEffect, useRef } from "react"

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursorRef.current) return

    const cursor = cursorRef.current
    let isVisible = false
    let rafId: number
    let lastX = 0
    let lastY = 0
    let ticking = false

    const updateCursor = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${lastX - 10}px, ${lastY - 10}px, 0)`
      }
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateCursor)
        ticking = true
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      
      if (!isVisible) {
        isVisible = true
        cursor.style.opacity = "1"
      }
      
      requestTick()
    }

    const handleMouseLeave = () => {
      isVisible = false
      cursor.style.opacity = "0"
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
      ticking = false
    }

    const handleMouseEnter = () => {
      isVisible = true
      cursor.style.opacity = "1"
    }

    // Set initial styles with GPU acceleration - removed transition for better performance
    cursor.style.position = "fixed"
    cursor.style.pointerEvents = "none"
    cursor.style.zIndex = "2147483647" // Max z-index to stay on top of everything
    cursor.style.left = "0"
    cursor.style.top = "0"
    cursor.style.opacity = "0"
    cursor.style.transform = "translate3d(0, 0, 0)"
    cursor.style.willChange = "transform"
    cursor.style.transition = "none"
    cursor.style.backfaceVisibility = "hidden"
    cursor.style.perspective = "1000px"

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    >
      <div className="w-5 h-5 bg-white/80 rounded-full shadow-lg" />
    </div>
  )
}
