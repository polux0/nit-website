"use client"

import { useState, useEffect } from "react"
import { ResponsiveCarousel } from "@/components/responsive-carousel"
import { X, ArrowLeft } from "lucide-react"
import { getProjectImages } from "@/lib/project-images"
import { cn } from "@/lib/utils"

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

  // Preload first video when modal opens
  useEffect(() => {
    if (isOpen && project && project.images.length > 0) {
      const firstMedia = project.images[0]
      if (typeof firstMedia === 'object' && firstMedia.type === 'video') {
        const video = document.createElement('video')
        video.src = firstMedia.src
        video.preload = 'auto'
        video.muted = true
        // Preload the video in the background
        video.load()
      }
    }
  }, [isOpen, project])

  const handleUserInteraction = () => {
    setIsUserInteracting(true)
    // Reset after 5 seconds
    setTimeout(() => {
      setIsUserInteracting(false)
    }, 5000)
  }

  if (!project || !isOpen) return null

  return (
    <div className="modal-content fixed inset-0 z-[9999] w-full h-full overflow-y-auto" style={{
      backgroundImage: 'url(/images/background-deploy/3.png)',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      minHeight: '100vh',
      cursor: 'none !important'
    }}>
      <style jsx>{`
        .modal-content * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Page content */}
      <div className="relative w-full h-screen flex flex-col" style={{ cursor: 'none' }}>
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
          
          <div className="text-center pr-12 pl-12 mt-8 sm:mt-0">
            <h1 className="text-6xl md:text-8xl font-louis font-bold text-white mb-4 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-2xl font-louis text-white/80 max-w-2xl mx-auto leading-relaxed mb-2 md:mb-24">
              {project.description}
            </p>
          </div>
        </div>

        {/* Main content area - Dynamic carousel based on project category */}
        <div className="flex-1 flex items-center justify-center pb-24 px-4 sm:px-6 min-h-[100vh]" style={{ cursor: 'none' }}>
          <div className="w-full max-w-7xl">
            {/* Dynamic carousel based on project category */}
            <div className="flex flex-col items-center space-y-8">
              <h3 className="text-2xl sm:text-3xl font-louis font-semibold text-white text-center">
                {project.title === 'Branding' ? 'Papazjanija' :
                 project.title === 'Social Media' ? 'Termalna Rivijera' :
                 project.title === 'Web' ? 'Termalna rivijera' :
                 `${project.title} Gallery`}
              </h3>
              <div className="relative w-full max-w-3xl mx-auto">
                <ResponsiveCarousel
                  items={project.images.map((media, index) => ({
                    id: `${project.title}-${index}`,
                    src: typeof media === 'object' ? media.src : media,
                    alt: typeof media === 'object' ? media.alt : `${project.title} - Media ${index + 1}`,
                    type: typeof media === 'object' && media.type === 'video' ? 'video' :
                          (typeof media === 'object' ? media.src : media).endsWith('.svg') ? 'svg' : 'image'
                  }))}
                  autoPlay={!isUserInteracting}
                  autoPlayInterval={4000}
                  showDots={true}
                  showArrows={true}
                  aspectRatio="square"
                  objectFit="contain"
                  onUserInteraction={handleUserInteraction}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
