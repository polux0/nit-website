"use client"

import { useState, useEffect, useRef } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

export default function ProjectsSection() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const [currentProject, setCurrentProject] = useState(0)
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
      title: "E-commerce Platform",
      description: "Moderna platforma za online prodaju sa integrisanim sistemom plaćanja i upravljanjem inventarom.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Brand Identity System",
      description: "Kompletna vizuelna identitet za tech startup, uključujući logo, tipografiju i brand guidelines.",
      image: "/placeholder-t5asa.png",
      technologies: ["Figma", "Adobe Creative Suite", "Brand Strategy"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media Dashboard",
      description: "Analitička platforma za praćenje performansi na društvenim mrežama sa real-time reporting.",
      image: "/social-media-analytics-dashboard.png",
      technologies: ["Vue.js", "Python", "MongoDB", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Mobile App Design",
      description: "UX/UI dizajn za fitness aplikaciju sa fokusom na korisničko iskustvo i engagement.",
      image: "/mobile-fitness-app.png",
      technologies: ["Figma", "Prototyping", "User Research"],
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

  return (
    <>
      {/* Projects Section */}
      <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
        {/* Background image matching other sections */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/nit-gradient.png')",
          }}
        />

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-louis font-bold text-white mb-4 tracking-tight leading-tight">Projekti</h2>
              <p className="text-xl font-louis text-white/80 max-w-2xl mx-auto leading-relaxed">
                Evo nekih od naših najnovijih radova – svaki projekat je priča o saradnji, kreativnosti i rezultatima.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  ref={(el) => (projectRefs.current[index] = el)}
                  className={`transform transition-all duration-700 ease-out ${
                    visibleProjects[index] ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"
                  }`}
                >
                  <div className="relative group cursor-pointer">
                    {/* Project Card - Image Background */}
                    <div className="relative h-[32rem] rounded-2xl overflow-hidden">
                      {/* Background Image with zoom effect */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${project.image || "/placeholder.svg"})`,
                        }}
                      />

                      {/* Overlay that appears on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content that appears on hover */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-2xl md:text-3xl font-louis font-bold mb-3 text-white">{project.title}</h3>
                        <p className="text-white/90 font-louis leading-relaxed text-base mb-4 line-clamp-3">
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

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <a
                            href={project.liveUrl}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-300 text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-3 h-3" />
                            Code
                          </a>
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
    </>
  )
}
