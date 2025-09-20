"use client"

import { useState, useEffect, useCallback } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { ExternalLink, Github, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <div className="fixed inset-0 z-50 w-full h-full overflow-hidden">
      {/* Full page background with gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #6999c0 0%, #a48de2 100%)'
        }}
      />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundSize: 'cover'
        }}
      />
      
      {/* Page content */}
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="relative p-4 sm:p-6 pb-2 sm:pb-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
          >
            <X className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
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

        {/* Main content area - Multiple carousels */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-8 sm:pt-12 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50">
          <div className="space-y-8 sm:space-y-12">
            {/* Project Gallery - Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              {/* Carousel 1 - Desktop Views */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-louis font-semibold text-white">Desktop Interface</h3>
                <div 
                  className="relative h-[20rem] sm:h-[24rem] lg:h-[28rem] rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Carousel 
                    className="w-full h-full"
                    setApi={setCarouselApi(0)}
                    onSelect={handleCarouselInteraction}
                  >
                    <CarouselContent className="h-full">
                      {project.images.slice(0, 4).map((image, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div className="h-full w-full">
                            <img
                              src={image}
                              alt={`${project.title} - Desktop ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    
                    {project.images.slice(0, 4).length > 1 && (
                      <>
                        <CarouselPrevious 
                          className="left-2 sm:left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" 
                          onClick={handleCarouselInteraction}
                        />
                        <CarouselNext 
                          className="right-2 sm:right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                          onClick={handleCarouselInteraction}
                        />
                      </>
                    )}
                  </Carousel>
                </div>
              </div>

              {/* Carousel 2 - Mobile Views */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-louis font-semibold text-white">Mobile Experience</h3>
                <div 
                  className="relative h-[20rem] sm:h-[24rem] lg:h-[28rem] rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Carousel 
                    className="w-full h-full"
                    setApi={setCarouselApi(1)}
                    onSelect={handleCarouselInteraction}
                  >
                    <CarouselContent className="h-full">
                      {project.images.slice(4, 8).map((image, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div className="h-full w-full">
                            <img
                              src={image}
                              alt={`${project.title} - Mobile ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    
                    {project.images.slice(4, 8).length > 1 && (
                      <>
                        <CarouselPrevious 
                          className="left-2 sm:left-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                          onClick={handleCarouselInteraction}
                        />
                        <CarouselNext 
                          className="right-2 sm:right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                          onClick={handleCarouselInteraction}
                        />
                      </>
                    )}
                  </Carousel>
                </div>
              </div>

              {/* Carousel 3 - Design Process */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-louis font-semibold text-white">Design Process</h3>
                <div 
                  className="relative h-[20rem] sm:h-[24rem] lg:h-[28rem] rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Carousel 
                    className="w-full h-full"
                    setApi={setCarouselApi(2)}
                    onSelect={handleCarouselInteraction}
                  >
                    <CarouselContent className="h-full">
                      {project.images.slice(8, 12).map((image, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div className="h-full w-full">
                            <img
                              src={image}
                              alt={`${project.title} - Process ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    
                    {project.images.slice(8, 12).length > 1 && (
                      <>
                        <CarouselPrevious 
                          className="left-2 sm:left-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                          onClick={handleCarouselInteraction}
                        />
                        <CarouselNext 
                          className="right-2 sm:right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                          onClick={handleCarouselInteraction}
                        />
                      </>
                    )}
                  </Carousel>
                </div>
              </div>
            </div>

            {/* Compact Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Technologies */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-louis font-semibold text-white">Technologies</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-white/20 rounded-full text-white border border-white/20 font-louis"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Stats */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-louis font-semibold text-white">Project Stats</h3>
                <div className="space-y-2 text-sm text-white/80 font-louis">
                  <div>Duration: 3 months</div>
                  <div>Team: 4 members</div>
                  <div>Images: {project.images.length}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-louis font-semibold text-white">Links</h3>
                <div className="space-y-2">
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all duration-300 font-louis text-xs sm:text-sm"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 font-louis text-xs sm:text-sm"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3 mr-2" />
                      Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
