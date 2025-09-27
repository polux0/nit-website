"use client"

import { useState, useEffect, useRef } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import ProjectModal from "./project-modal"
import { getProjectMainImage, getProjectAllImages } from "@/lib/project-images"

export default function ProjectsSection() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const [currentProject, setCurrentProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateProjectVisibility = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop + viewportHeight * 0.5) / sectionHeight))

      const newVisibleProjects = projectRefs.current.map((ref, index) => {
        if (!ref) return false

        const projectTop = ref.offsetTop - sectionTop
        const projectCenter = projectTop + ref.offsetHeight / 2

        return scrollProgress >= projectCenter / sectionHeight
      })

      setVisibleProjects(newVisibleProjects)
    }

    updateProjectVisibility()
    window.addEventListener("scroll", updateProjectVisibility)
    window.addEventListener("resize", updateProjectVisibility)

    return () => {
      window.removeEventListener("scroll", updateProjectVisibility)
      window.removeEventListener("resize", updateProjectVisibility)
    }
  }, [scrollY])

  useEffect(() => {
    setVisibleProjects(new Array(projects.length).fill(false))
  }, [])

  const projects = [
    {
      title: "Branding",
      description: "Brendovi koje smo gradili - od ideje do prepoznatljivog identiteta",
      coverImage: "/placeholder-t5asa.png",
      images: getProjectAllImages("Branding"),
      technologies: ["Figma", "Adobe Creative Suite", "Brand Strategy", "Illustrator", "Photoshop"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media",
      description: "Kampanje koje angažuju, povezuju i grade zajednice",
      coverImage: "/social-media-analytics-dashboard.png",
      images: getProjectAllImages("Social Media"),
      technologies: ["Chart.js", "D3.js", "Express"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Web",
      description: "Sajtovi koji spajaju brzinu, funkcionalnost i estetiku",
      coverImage: "/modern-ecommerce-interface.png",
      images: getProjectAllImages("Web"),
      technologies: ["Stripe", "TypeScript", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Photo & Video",
      description: "Vizuelni sadržaji koji osnažuju i izdvajaju brend",
      coverImage: "/mobile-fitness-app.png",
      images: getProjectAllImages("Photo & Video"),
      technologies: ["Figma", "Prototyping", "User Research", "Principle", "Sketch", "InVision"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

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
      <section ref={sectionRef} className="relative min-h-screen overflow-hidden" style={{
        background: 'linear-gradient(180deg, #6999c0 0%, #a48de2 100%)'
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
                  >
                    {/* Project Card - Image Background */}
                    <div className="relative h-[32rem] rounded-2xl overflow-hidden">
                      {/* Background Image with zoom effect */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${project.coverImage || "/placeholder.svg"})`,
                        }}
                      />

                      {/* Overlay that appears on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content that appears on hover */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-3xl md:text-4xl font-louis font-bold mb-3 text-white">{project.title}</h3>
                        <p className="text-white/90 font-medium leading-relaxed text-lg mb-4 line-clamp-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-white/20 rounded-full text-white border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                      </div>
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
