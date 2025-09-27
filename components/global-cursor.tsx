"use client"

import { useEffect, useRef } from "react"

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursorRef.current) return

    const cursor = cursorRef.current
    let isVisible = false
    let rafId: number

    const updateCursor = (x: number, y: number, visible: boolean) => {
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`
        if (visible !== isVisible) {
          isVisible = visible
          cursor.style.opacity = visible ? '1' : '0'
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY, true)
    }

    const handleMouseLeave = () => {
      updateCursor(0, 0, false)
    }

    const handleMouseEnter = () => {
      updateCursor(0, 0, true)
    }

    // Set initial styles
    cursor.style.position = 'fixed'
    cursor.style.pointerEvents = 'none'
    cursor.style.zIndex = '50'
    cursor.style.left = '0'
    cursor.style.top = '0'
    cursor.style.opacity = '0'
    cursor.style.transform = 'translate3d(0, 0, 0)'
    cursor.style.willChange = 'transform, opacity'
    cursor.style.transition = 'opacity 0.1s ease-out'

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
    >
      <div className="w-5 h-5 bg-white/80 rounded-full shadow-lg" />
    </div>
  )
}
