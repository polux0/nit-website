"use client"

import { useState, useEffect, useRef } from "react"
import ProjectGrid from "./project-grid"

export default function CompactProjectsSection() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateVisibility = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight

      const isInView = scrollY + viewportHeight > sectionTop + 200

      setIsVisible(isInView)
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility)
    window.addEventListener("resize", updateVisibility)

    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [scrollY])

  // Sample projects data
  const compactProjects = [
    {
      id: "1",
      title: "Task Manager Pro",
      description: "A modern task management app with real-time collaboration features and intuitive design.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["React", "TypeScript", "Tailwind", "Firebase"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Web App"
    },
    {
      id: "2",
      title: "Portfolio Website",
      description: "Clean and responsive portfolio website built with modern web technologies.",
      image: "/placeholder-t5asa.png",
      technologies: ["Next.js", "Tailwind", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Website"
    },
    {
      id: "3",
      title: "E-commerce Dashboard",
      description: "Analytics dashboard for e-commerce platforms with detailed reporting and insights.",
      image: "/social-media-analytics-dashboard.png",
      technologies: ["Vue.js", "Chart.js", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Dashboard"
    },
    {
      id: "4",
      title: "Mobile Banking App",
      description: "Secure mobile banking application with modern UI and seamless user experience.",
      image: "/mobile-fitness-app.png",
      technologies: ["React Native", "TypeScript", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Mobile App"
    },
    {
      id: "5",
      title: "Social Media Platform",
      description: "Full-featured social media platform with real-time messaging and content sharing.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Web App"
    },
    {
      id: "6",
      title: "Brand Identity Kit",
      description: "Complete brand identity design including logos, typography, and style guides.",
      image: "/placeholder-t5asa.png",
      technologies: ["Figma", "Adobe Creative Suite", "Brand Strategy"],
      liveUrl: "#",
      category: "Design"
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #6999c0 0%, #a48de2 100%)'
      }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundSize: 'cover'
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-louis font-bold text-white mb-4 tracking-tight leading-tight">
              Latest Work
            </h2>
            <p className="text-xl font-louis text-white/80 max-w-2xl mx-auto leading-relaxed">
              Explore our recent projects showcasing creativity, innovation, and technical excellence.
            </p>
          </div>

          {/* Project Grid */}
          <div
            className={`transform transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <ProjectGrid
              projects={compactProjects}
              columns={3}
              showCategories={true}
              className="animate-fade-in"
            />
          </div>

          {/* Call to Action */}
          <div
            className={`text-center mt-16 transform transition-all duration-1000 ease-out delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div
              className="inline-block px-8 py-4 rounded-lg backdrop-blur-lg border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}
            >
              <p className="text-white font-louis text-lg mb-3">
                Like what you see? Let&apos;s work together!
              </p>
              <button className="px-6 py-3 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-300 font-louis">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}