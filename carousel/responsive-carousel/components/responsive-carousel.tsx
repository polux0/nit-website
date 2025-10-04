"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: string
  src: string
  alt: string
  type?: "image" | "svg"
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
}

export function ResponsiveCarousel({
  items,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  aspectRatio = "auto",
  objectFit = "contain",
}: ResponsiveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isHovered, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
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
      className={cn("relative w-full max-w-4xl mx-auto group focus:outline-none", className)}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className={cn("w-full flex-shrink-0 relative", getAspectRatioClass())}>
              {/* Image/SVG container with standardized sizing */}
              {item.type === "svg" || item.src.endsWith(".svg") ? (
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  className={cn("w-full h-full", aspectRatio === "auto" ? "object-contain" : getObjectFitClass())}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ) : (
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  className={cn("w-full h-full", aspectRatio === "auto" ? "object-contain" : getObjectFitClass())}
                  loading={index === 0 ? "eager" : "lazy"}
                />
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
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
