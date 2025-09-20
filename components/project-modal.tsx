"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { ExternalLink, Github, X } from "lucide-react"
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
  }, [isOpen, isUserInteracting, project]) // Removed carouselApis from dependencies to prevent infinite loop

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
      if (prev[index] === api) return prev // Prevent unnecessary updates
      const newApis = [...prev]
      newApis[index] = api
      return newApis
    })
  }, [])

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[98vw] lg:max-w-[95vw] xl:max-w-[90vw] w-full h-[95vh] p-0 bg-transparent border-none shadow-none"
        showCloseButton={false}
      >
        {/* Custom backdrop with gradient */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          style={{
            background: 'linear-gradient(180deg, #6999c0 0%, #a48de2 100%)'
          }}
          onClick={onClose}
        />
        
        {/* Noise overlay */}
        <div 
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            backgroundSize: 'cover'
          }}
        />
        
        {/* Modal content */}
        <div className="modal-content relative z-50 w-full h-full flex flex-col" style={{ cursor: 'default !important' }}>
          {/* Header */}
          <div className="relative p-4 sm:p-6 pb-2 sm:pb-4">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            <DialogHeader className="text-left pr-12">
              <DialogTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-louis font-bold text-white mb-2">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-white/90 font-louis text-sm sm:text-base lg:text-lg leading-relaxed">
                {project.description}
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Main content area - Multiple carousels */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-2 sm:pt-0 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50">
            <div className="space-y-8 sm:space-y-12">
              {/* Project Gallery - Multiple Image Carousels */}
              <div className="space-y-6 sm:space-y-8">
                {/* Carousel 1 - Desktop Views */}
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-louis font-semibold text-white">Desktop Interface</h3>
                  <div 
                    className="relative h-[32rem] rounded-xl overflow-hidden"
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
                    className="relative h-[32rem] rounded-xl overflow-hidden"
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
                    className="relative h-[32rem] rounded-xl overflow-hidden"
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
      </DialogContent>
    </Dialog>
  )
}
