"use client"

import { useState, useEffect } from "react"

export default function GlobalCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseleave', handleMouseLeave)
      document.addEventListener('mouseenter', handleMouseEnter)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseleave', handleMouseLeave)
        document.removeEventListener('mouseenter', handleMouseEnter)
      }
    }
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-50 ease-out"
      style={{
        left: cursorPosition.x - 10,
        top: cursorPosition.y - 10,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.5)'
      }}
    >
      <div className="w-5 h-5 bg-white/80 rounded-full shadow-lg" />
    </div>
  )
}
