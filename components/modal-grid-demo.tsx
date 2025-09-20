"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import ProjectGrid from "./project-grid"
import CompactModal from "./compact-modal"

// Example of how to use the modal system in different configurations
export default function ModalGridDemo() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sample project data
  const demoProjects = [
    {
      id: "demo-1",
      title: "AI-Powered Analytics",
      description: "Advanced analytics platform using machine learning to provide actionable business insights.",
      image: "/social-media-analytics-dashboard.png",
      technologies: ["Python", "TensorFlow", "React", "D3.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      category: "AI/ML"
    },
    {
      id: "demo-2",
      title: "Sustainable Fashion App",
      description: "Mobile app connecting eco-conscious consumers with sustainable fashion brands.",
      image: "/mobile-fitness-app.png",
      technologies: ["React Native", "Node.js", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      category: "Mobile"
    },
    {
      id: "demo-3",
      title: "Creative Agency Website",
      description: "Modern, interactive website for a creative agency with stunning animations and portfolio showcase.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["Next.js", "GSAP", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      category: "Web"
    },
    {
      id: "demo-4",
      title: "Fintech Dashboard",
      description: "Comprehensive financial dashboard with real-time data visualization and trading features.",
      image: "/placeholder-t5asa.png",
      technologies: ["Vue.js", "Chart.js", "Express.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      category: "Fintech"
    }
  ]

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #6999c0 0%, #a48de2 100%)'
    }}>
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundSize: 'cover'
        }}
      />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Demo Header */}
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-louis font-bold text-white mb-4 tracking-tight">
              Modal Grid System
            </h1>
            <p className="text-xl font-louis text-white/80 max-w-3xl mx-auto leading-relaxed">
              A flexible, responsive grid layout system with compact modals that follow your existing design patterns.
            </p>
          </div>

          {/* Configuration Examples */}
          <div className="space-y-12">
            {/* 3-Column Grid with Categories */}
            <div>
              <h2 className="text-3xl font-louis font-bold text-white mb-6 flex items-center">
                <ChevronRight className="w-6 h-6 mr-2" />
                3-Column Grid with Category Filter
              </h2>
              <ProjectGrid
                projects={demoProjects}
                columns={3}
                showCategories={true}
              />
            </div>

            {/* 2-Column Grid */}
            <div>
              <h2 className="text-3xl font-louis font-bold text-white mb-6 flex items-center">
                <ChevronRight className="w-6 h-6 mr-2" />
                2-Column Layout
              </h2>
              <ProjectGrid
                projects={demoProjects.slice(0, 4)}
                columns={2}
                showCategories={false}
              />
            </div>

            {/* 4-Column Grid */}
            <div>
              <h2 className="text-3xl font-louis font-bold text-white mb-6 flex items-center">
                <ChevronRight className="w-6 h-6 mr-2" />
                4-Column Dense Layout
              </h2>
              <ProjectGrid
                projects={demoProjects}
                columns={4}
                showCategories={false}
              />
            </div>
          </div>

          {/* Manual Modal Trigger */}
          <div className="text-center">
            <div
              className="inline-block p-6 rounded-xl backdrop-blur-lg border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}
            >
              <h3 className="text-xl font-louis font-bold text-white mb-3">
                Test Modal Independently
              </h3>
              <p className="text-white/80 font-louis mb-4">
                Click below to see the compact modal in action
              </p>
              <button
                onClick={() => handleProjectClick(demoProjects[0])}
                className="px-6 py-3 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-300 font-louis"
              >
                Open Sample Modal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Standalone Modal for Demo */}
      <CompactModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}