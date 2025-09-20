"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface CompactProject {
  title: string
  description: string
  images: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

interface CompactModalProps {
  project: CompactProject | null
  isOpen: boolean
  onClose: () => void
}

export default function CompactModal({ project, isOpen, onClose }: CompactModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-7xl w-[90vw] h-[85vh] p-0 bg-transparent border-none shadow-none"
        showCloseButton={false}
      >
        {/* Custom backdrop with gradient */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(180deg, rgba(105, 153, 192, 0.8) 0%, rgba(164, 141, 226, 0.8) 100%)'
          }}
          onClick={onClose}
        />

        {/* Noise overlay */}
        <div
          className="fixed inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            backgroundSize: 'cover'
          }}
        />

        {/* Modal content */}
        <div className="modal-content relative z-50 w-full h-full flex" style={{ cursor: 'auto' }}>
          <div
            className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 w-full h-full flex flex-col"
            style={{ cursor: 'auto' }}
          >
            {/* Header with close button */}
            <div className="relative p-6 pb-3">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
              >
                <X className="w-3 h-3" />
              </button>

              <DialogHeader className="text-left pr-8">
                <DialogTitle className="text-lg font-louis font-bold text-white mb-1">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-white/90 font-louis text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Project Images */}
            <div className="px-6 pb-6 flex-1">
              <div className="grid grid-cols-2 gap-6 h-full">
                {project.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}