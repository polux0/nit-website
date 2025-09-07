import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
