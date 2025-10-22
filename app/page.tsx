import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen relative" style={{
      background: 'linear-gradient(135deg, #7dd3fc 0%, #a78bfa 50%, #8b5cf6 100%)'
    }}>
      <div className="relative z-10">
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  )
}
