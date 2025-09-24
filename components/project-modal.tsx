"use client"

import { useState, useEffect, useCallback } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { ExternalLink, Github, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectImages } from "@/lib/project-images"

interface Project {
  title: string
  description: string
  images: string[]
  technologies: string[]
  liveUrl: string
  githubUrl: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [carouselApis, setCarouselApis] = useState<CarouselApi[]>([])
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Debug logging
  console.log('ProjectModal rendered:', { project, isOpen })

  // Handle browser back button
  useEffect(() => {
    if (!isOpen) return

    const handlePopState = () => {
      onClose()
    }

    // Push a new state to history when modal opens
    window.history.pushState({ modal: true }, '', window.location.href)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isOpen, onClose])

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to ensure scrolling is re-enabled
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Auto-scroll functionality
  useEffect(() => {
    if (!isOpen || isUserInteracting || !project) return

    const interval = setInterval(() => {
      carouselApis.forEach((api) => {
        if (api) {
          const currentIndex = api.selectedScrollSnap()
          const totalSlides = api.scrollSnapList().length
          
          if (totalSlides > 1) {
            const nextIndex = (currentIndex + 1) % totalSlides
            api.scrollTo(nextIndex)
          }
        }
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isOpen, isUserInteracting, project])

  // Reset user interaction flag after 5 seconds of no interaction
  useEffect(() => {
    if (!isUserInteracting) return

    const timeout = setTimeout(() => {
      setIsUserInteracting(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [isUserInteracting])

  const handleCarouselInteraction = useCallback(() => {
    setIsUserInteracting(true)
  }, [])

  const setCarouselApi = useCallback((index: number) => (api: CarouselApi) => {
    setCarouselApis(prev => {
      if (prev[index] === api) return prev
      const newApis = [...prev]
      newApis[index] = api
      return newApis
    })
  }, [])

  if (!project || !isOpen) return null

  return (
    <div className="modal-content fixed inset-0 z-[9999] w-full h-full overflow-y-auto bg-gradient-to-b from-[#6999c0] to-[#a48de2]">
      {/* Full page background with gradient - covers entire scrollable area */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #6999c0 0%, #a48de2 100%)',
          minHeight: '100vh',
          height: 'auto'
        }}
      />
      
      
      {/* Page content */}
      <div className="relative w-full h-screen flex flex-col">
        {/* Header */}
        <div className="relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
          <button
            onClick={onClose}
            className="absolute top-8 right-4 sm:top-12 sm:right-6 w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
          >
            <X className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="absolute top-8 left-4 sm:top-12 sm:left-6 w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="text-center pr-12 pl-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-louis font-bold text-white mb-4 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-louis text-white/80 max-w-2xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Main content area - Dynamic carousel based on project category */}
        <div className="flex-1 flex items-start justify-center pt-8 pb-4 px-4 sm:px-6 min-h-[60vh]">
          <div className="w-full max-w-7xl">
            {/* Dynamic carousel based on project category */}
            <div className="flex flex-col items-center space-y-6">
              <h3 className="text-2xl sm:text-3xl font-louis font-semibold text-white text-center">
                {project.title} Gallery
              </h3>
              <div 
                className="relative w-full max-w-2xl rounded-xl overflow-hidden"
                style={{
                  height: '24rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Carousel 
                  className="w-full h-full"
                  onMouseEnter={handleCarouselInteraction}
                  onTouchStart={handleCarouselInteraction}
                >
                  <CarouselContent className="h-full">
                    {project.images.map((image, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="h-full">
                          <img
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full object-contain"
                            style={{ 
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                  <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
