"use client"

import { useState, useEffect, useRef } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import ProjectModal from "./project-modal"
import { getProjectMainImage, getProjectAllImages, getPortfolioCardImages } from "@/lib/project-images"

export default function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const [currentProject, setCurrentProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.findIndex(ref => ref === entry.target)
          if (index !== -1) {
            setVisibleProjects(prev => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
            // Stop observing once visible to avoid unnecessary updates
            observer.unobserve(entry.target)
          }
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px" // Trigger slightly before element leaves view or enters
    })

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const brandingImages = getPortfolioCardImages("Branding")
  const socialImages = getPortfolioCardImages("Social Media")
  const webImages = getPortfolioCardImages("Web")
  const photoVideoImages = getPortfolioCardImages("Photo & Video")

  const projects = [
    {
      title: "Branding",
      description: "Brendovi koje smo gradili - od ideje do prepoznatljivog identiteta",
      coverImage: brandingImages.black,
      coverImageHover: brandingImages.white,
      coverImageMobile: brandingImages.mobile,
      images: getProjectAllImages("Branding"),
      technologies: ["Figma", "Adobe Creative Suite", "Brand Strategy", "Illustrator", "Photoshop"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media",
      description: "Kampanje koje angažuju, povezuju i grade zajednice",
      coverImage: socialImages.black,
      coverImageHover: socialImages.white,
      coverImageMobile: socialImages.mobile,
      images: getProjectAllImages("Social Media"),
      technologies: ["Chart.js", "D3.js", "Express"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Web",
      description: "Sajtovi koji spajaju brzinu, funkcionalnost i estetiku",
      coverImage: webImages.black,
      coverImageHover: webImages.white,
      coverImageMobile: webImages.mobile,
      images: getProjectAllImages("Web"),
      technologies: ["Stripe", "TypeScript", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Photo & Video",
      description: "Vizuelni sadržaji koji osnažuju i izdvajaju brend",
      coverImage: photoVideoImages.black,
      coverImageHover: photoVideoImages.white,
      coverImageMobile: photoVideoImages.mobile,
      images: getProjectAllImages("Photo & Video"),
      technologies: ["Figma", "Prototyping", "User Research", "Principle", "Sketch", "InVision"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  useEffect(() => {
    setVisibleProjects(new Array(projects.length).fill(false))
  }, [])

  // Preload hover images for smoother transitions
  useEffect(() => {
    projects.forEach((project) => {
      if (project.coverImageHover) {
        const img = new window.Image()
        img.src = project.coverImageHover
      }
      if (project.coverImage) {
        const img = new window.Image()
        img.src = project.coverImage
      }
    })
  }, [projects])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      {/* Projects Section */}
      <section ref={sectionRef} className="relative w-full overflow-hidden" style={{
        backgroundImage: 'url(/images/background-deploy/3.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}>

        {/* Content */}
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl font-louis font-bold text-white mb-4 tracking-tight leading-tight">Portfolio</h2>
              <p className="text-2xl font-louis text-white/80 max-w-2xl mx-auto leading-relaxed">
              Prikaz projekata i rezultata koje smo ostvarili
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  ref={(el) => { projectRefs.current[index] = el }}
                  className={`transform transition-all duration-700 ease-out ${
                    visibleProjects[index] ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"
                  }`}
                >
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                    style={{
                      contain: 'layout style paint',
                    }}
                  >
                    {/* Project Card - Image Background */}
                    <div 
                      className="relative h-[32rem] rounded-lg md:rounded-2xl overflow-hidden"
                      style={{
                        contain: 'layout style paint',
                      }}
                    >
                      {/* Mobile Image (visible on mobile only - already contains text) */}
                      <div
                        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${project.coverImageMobile || project.coverImage || "/placeholder.svg"})`,
                        }}
                      />

                      {/* Black Image (default, fully visible on desktop) */}
                      <div
                        data-image="black"
                        className="absolute inset-0 hidden md:block bg-contain bg-center bg-no-repeat transition-opacity duration-200 ease-out opacity-100 group-hover:opacity-0"
                        style={{
                          backgroundImage: `url(${project.coverImage || "/placeholder.svg"})`,
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                          isolation: 'isolate',
                        }}
                      />

                      {/* White Image (hover, desktop only) */}
                      <div
                        data-image="white"
                        className="absolute inset-0 hidden md:block bg-contain bg-center bg-no-repeat transition-opacity duration-200 ease-out opacity-0 group-hover:opacity-100"
                        style={{
                          backgroundImage: `url(${project.coverImageHover || project.coverImage || "/placeholder.svg"})`,
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                          isolation: 'isolate',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-12 justify-center">
              <button
                onClick={prevProject}
                className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal - Full Page Experience */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}