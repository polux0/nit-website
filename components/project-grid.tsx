"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import CompactModal from "./compact-modal"

interface GridProject {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category?: string
}

interface ProjectGridProps {
  projects: GridProject[]
  columns?: 1 | 2 | 3 | 4
  showCategories?: boolean
  className?: string
}

export default function ProjectGrid({
  projects,
  columns = 3,
  showCategories = false,
  className = ""
}: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<GridProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Extract unique categories if needed
  const categories = showCategories
    ? Array.from(new Set(projects.map(p => p.category).filter(Boolean)))
    : []

  // Filter projects by category
  const filteredProjects = activeCategory
    ? projects.filter(p => p.category === activeCategory)
    : projects

  const handleProjectClick = (project: GridProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  // Grid column classes
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Category Filter */}
      {showCategories && categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-louis transition-all duration-300 ${
                !activeCategory
                  ? "bg-white/30 text-white border border-white/40"
                  : "bg-white/10 text-white/80 border border-white/20 hover:bg-white/20"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-louis transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-white/30 text-white border border-white/40"
                    : "bg-white/10 text-white/80 border border-white/20 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Project Grid */}
      <div className={`grid ${gridClasses[columns]} gap-4`}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => handleProjectClick(project)}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover overlay content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <button
                        className="px-3 py-1.5 bg-white/20 border border-white/30 rounded text-white text-xs font-louis hover:bg-white/30 transition-all duration-300 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.liveUrl, "_blank")
                        }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </button>
                    )}
                    {project.githubUrl && (
                      <button
                        className="px-3 py-1.5 bg-white/10 border border-white/20 rounded text-white text-xs font-louis hover:bg-white/20 transition-all duration-300 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.githubUrl, "_blank")
                        }}
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <h3 className="text-lg font-louis font-semibold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm font-louis mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-white/10 rounded-full text-white/90 border border-white/20 font-louis"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs text-white/60 font-louis">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 font-louis text-lg">
            No projects found in this category.
          </p>
        </div>
      )}

      {/* Compact Modal */}
      <CompactModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}