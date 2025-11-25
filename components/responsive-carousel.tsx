"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { getVideoPoster } from "@/lib/project-images"

interface CarouselItem {
  id: string
  src: string
  alt: string
  type?: "image" | "svg" | "video"
  title?: string
  description?: string
}

interface ResponsiveCarouselProps {
  items: CarouselItem[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  aspectRatio?: "auto" | "square" | "16/9" | "4/3" | "3/2"
  objectFit?: "contain" | "cover" | "fill"
  onUserInteraction?: () => void
}

export function ResponsiveCarousel({
  items,
  className,
  autoPlay = false,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  aspectRatio = "auto",
  objectFit = "contain",
  onUserInteraction,
}: ResponsiveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoadingStates, setVideoLoadingStates] = useState<Record<string, boolean>>({})
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isHovered, items.length])

  // Pause videos that are not currently visible
  useEffect(() => {
    const videoElements = containerRef.current?.querySelectorAll('video')
    videoElements?.forEach((video, index) => {
      if (index === currentIndex) {
        video.play().catch(() => {
          // Ignore autoplay errors
        })
      } else {
        video.pause()
      }
    })
  }, [currentIndex])

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      // Preload current, next, and previous images
      const indicesToPreload = [
        currentIndex, // Current image
        (currentIndex + 1) % items.length, // Next image
        (currentIndex - 1 + items.length) % items.length, // Previous image
        (currentIndex + 2) % items.length, // Next+1 image
        (currentIndex - 2 + items.length) % items.length, // Previous-1 image
      ]

      indicesToPreload.forEach((index) => {
        const item = items[index]
        if (item && item.type !== 'video' && !item.src.endsWith('.svg') && item.src) {
          // Preload using Image object for better control
          const img = new window.Image()
          img.src = item.src
          
          // Also add link preload for browser optimization
          const existingLink = document.querySelector(`link[href="${item.src}"]`)
          if (!existingLink) {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.as = 'image'
            link.href = item.src
            document.head.appendChild(link)
          }
        }
      })
    }

    preloadImages()
  }, [currentIndex, items])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    onUserInteraction?.()
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    onUserInteraction?.()
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    onUserInteraction?.()
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious()
      } else if (event.key === "ArrowRight") {
        goToNext()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("keydown", handleKeyDown)
      return () => container.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (!items.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p className="text-muted-foreground">No items to display</p>
      </div>
    )
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "16/9":
        return "aspect-video"
      case "4/3":
        return "aspect-[4/3]"
      case "3/2":
        return "aspect-[3/2]"
      default:
        return ""
    }
  }

  const getObjectFitClass = () => {
    switch (objectFit) {
      case "cover":
        return "object-cover"
      case "fill":
        return "object-fill"
      default:
        return "object-contain"
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full group focus:outline-none", className)}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main carousel container */}
      <div className={cn("relative overflow-hidden rounded-xl", aspectRatio !== "auto" ? getAspectRatioClass() : "h-full")}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            height: aspectRatio === "auto" ? "100%" : "auto"
          }}
        >
          {items.map((item, index) => (
            <div key={item.id} className={cn("w-full flex-shrink-0 relative", aspectRatio !== "auto" ? getAspectRatioClass() : "h-full")}>
              {/* Video container */}
              {item.type === "video" ? (
                <div className="relative w-full h-full" style={{ transform: 'scale(0.85)' }}>
                  {/* Poster/Thumbnail - shown while video loads */}
                  {videoLoadingStates[item.id] !== false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#334155] to-[#1a1f2e]">
                      <img
                        src={getVideoPoster(item.src)}
                        alt={item.alt}
                        className="w-full h-full object-contain opacity-80"
                        onError={(e) => {
                          // Fallback if poster fails to load
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Loading indicator */}
                      {videoLoadingStates[item.id] === true && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  )}
                  <video
                    src={item.src || "/placeholder.svg"}
                    className={cn("w-full h-full", aspectRatio === "auto" ? "object-contain" : getObjectFitClass(), videoLoadingStates[item.id] === false ? "opacity-100" : "opacity-0")}
                    autoPlay={index === currentIndex}
                    loop
                    muted
                    playsInline
                    preload={index === currentIndex ? "auto" : "metadata"}
                    poster={getVideoPoster(item.src)}
                    onLoadStart={() => {
                      setVideoLoadingStates(prev => ({ ...prev, [item.id]: true }))
                    }}
                    onCanPlay={() => {
                      setVideoLoadingStates(prev => ({ ...prev, [item.id]: false }))
                    }}
                    onError={() => {
                      setVideoLoadingStates(prev => ({ ...prev, [item.id]: false }))
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  />
                </div>
              ) : item.type === "svg" || item.src.endsWith(".svg") ? (
                // SVG files - use regular img tag (Next.js Image doesn't optimize SVGs)
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                  loading={index === 0 ? "eager" : "lazy"}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: 'scale(0.85)'
                  }}
                />
              ) : (
                // Regular images - use Next.js Image for optimization (WebP/AVIF)
                <div className="relative w-full h-full" style={{ transform: 'scale(0.85)' }}>
                  {/* Loading placeholder */}
                  {imageLoadingStates[item.id] !== false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#334155] to-[#1a1f2e]">
                      {imageLoadingStates[item.id] === true && (
                        <div className="w-12 h-12 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                      )}
                    </div>
                  )}
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    className={cn(
                      "object-contain transition-opacity duration-300",
                      aspectRatio === "auto" ? "object-contain" : getObjectFitClass(),
                      imageLoadingStates[item.id] === false ? "opacity-100" : "opacity-0"
                    )}
                    priority={index === 0 || index === 1 || index === items.length - 1}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    onLoadStart={() => {
                      setImageLoadingStates(prev => ({ ...prev, [item.id]: true }))
                    }}
                    onLoadingComplete={() => {
                      setImageLoadingStates(prev => ({ ...prev, [item.id]: false }))
                    }}
                    onError={() => {
                      setImageLoadingStates(prev => ({ ...prev, [item.id]: false }))
                    }}
                    quality={90}
                    loading={index <= 2 ? "eager" : "lazy"}
                  />
                </div>
              )}

              {/* Optional overlay with title and description */}
              {(item.title || item.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  {item.title && <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>}
                  {item.description && <p className="text-white/90 text-sm">{item.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && items.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="carousel-arrow absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="carousel-arrow absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "carousel-dot w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex ? "bg-white w-8" : "bg-white/30 hover:bg-white/50",
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {items.length}
        {items[currentIndex]?.title && `: ${items[currentIndex].title}`}
      </div>
    </div>
  )
}
