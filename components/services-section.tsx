"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function ServicesSection() {
  const [scrollY, setScrollY] = useState(0)
  const [showServices, setShowServices] = useState(false)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [threadProgress, setThreadProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      title: "Branding",
      description:
        "Gradimo identitet koji se pamti. Od logotipa i palete boja do verbalnog identiteta, stvaramo brend koji komunicira suštinu.",
    },
    {
      title: "Strategy",
      description:
        "Bez jasno definisane strategije, digitalni nastup je samo šum. Analiziramo tržište, definišemo ciljeve i pravimo jasan plan kuda tvoj brend želi da ide i zašto. Postavljamo temelje za rast koji ima jasno definisan pravac.",
    },
    {
      title: "Social Media",
      description:
        "Stvaramo zajednicu. Kreirao strategiju i sadržaj koji angažuje, informiše i povezuje. Vaš nastup na mrežama biće jedinstven, dinamčan i u skladu sa vrednostima brenda.",
    },
    {
      title: "Paid Ads",
      description:
        "Investicija u pažnju – isporučena precizno i efikasno. Kampanje koje donose realne rezultate. Optimizujemo budžet i plasiramo oglase tamo gde je vaša publika – na Meta i Google platformama.",
    },
    {
      title: "Content Creation",
      description:
        "Proizvodimo visokokvalitetan sadržaj koji privlači, edukuje i konvertuje vašu publiku.",
    },
    {
      title: "Web Development & Maintenance",
      description:
        "Pravimo moderne, brze i funkcionalne sajtove koji predstavljaju svaki brend na pravi način. Svaki projekat gradimo uz tehničku preciznost i estetski balans. Nakon lansiranja, tu smo i za redovno održavanje.",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY)
        // Show services when scrolled past about section
        if (window.scrollY > window.innerHeight * 0.8) {
          setShowServices(true)
          setSectionVisible(true)
          
          // Calculate thread progress (0 to 1)
          const servicesStart = window.innerHeight * 0.8
          const servicesEnd = servicesStart + window.innerHeight * 1.5
          const currentProgress = Math.min(Math.max((window.scrollY - servicesStart) / (servicesEnd - servicesStart), 0), 1)
          setThreadProgress(currentProgress)
        } else {
          setShowServices(false)
          setThreadProgress(0)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  // Set section as visible on mount to prevent white screen
  useEffect(() => {
    setSectionVisible(true)
  }, [])

  // Function to determine if a service should be revealed based on thread progress
  const isServiceRevealed = (index: number) => {
    if (!showServices) return false
    
    // Each service reveals when thread reaches a certain progress point
    const revealThreshold = (index + 1) / services.length
    return threadProgress >= revealThreshold - 0.05 // Reveal just before thread reaches it
  }

  // Set client-side flag after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleScrollToServices = () => {
    setShowServices(true)
    const servicesElement = document.getElementById("services")
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Thread animation - positioned fixed to follow scroll */}
      <div className="fixed left-1/2 top-0 z-10" style={{ transform: "translateX(-50%)" }}>
        <svg
          width="200"
          height={isClient && showServices ? Math.min((scrollY - window.innerHeight * 0.8) * 0.4, window.innerHeight * 1.5) : 0}
          className="transition-all duration-1000 ease-out"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
            </linearGradient>
          </defs>
          <path
            d={isClient && showServices ? `M100 0 C180 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.05, window.innerHeight * 0.15)} 40 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.1, window.innerHeight * 0.35)} 20 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.15, window.innerHeight * 0.5)} C0 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.2, window.innerHeight * 0.65)} 200 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.25, window.innerHeight * 0.8)} 180 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.3, window.innerHeight * 1.0)} C160 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.35, window.innerHeight * 1.15)} 120 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.375, window.innerHeight * 1.3)} 100 ${Math.min((scrollY - window.innerHeight * 0.8) * 0.4, window.innerHeight * 1.5)}` : "M100 0 L100 0"}
            stroke="url(#threadGradient)"
            strokeWidth="2"
            fill="none"
            className="drop-shadow-sm"
          />
        </svg>
      </div>

      {/* Scroll button at bottom center */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Button
          onClick={handleScrollToServices}
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </Button>
      </div>

      {/* Services Section */}
      <section
        id="services"
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, #a48de2 0%, #6999c0 100%)'
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
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl font-louis font-bold text-white mb-8 tracking-tight">Services</h2>
            </div>

            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  ref={(el) => { serviceRefs.current[index] = el }}
                  className={`transform transition-all duration-1000 ease-out ${
                    isServiceRevealed(index) 
                      ? "translate-y-0 opacity-100 scale-100 rotate-0" 
                      : "translate-y-16 opacity-0 scale-90 rotate-2"
                  }`}
                  style={{ 
                    transitionDelay: isServiceRevealed(index) ? `${index * 150}ms` : '0ms',
                    filter: isServiceRevealed(index) ? 'blur(0px)' : 'blur(2px)'
                  }}
                >
                  <div className="relative group">
                    {/* Thread connection point - minimalistic dot */}
                    <div
                      className={`absolute -left-6 top-8 w-2 h-2 rounded-full transition-all duration-700 ease-out ${
                        isServiceRevealed(index) ? "bg-white scale-100 shadow-lg" : "bg-white/40 scale-75"
                      }`}
                      style={{
                        boxShadow: isServiceRevealed(index) ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
                      }}
                    />

                    {/* Minimalistic Card */}
                    <div
                      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                        isServiceRevealed(index)
                          ? "bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-white/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                      style={{
                        backdropFilter: isServiceRevealed(index) ? 'blur(10px)' : 'blur(0px)'
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Content */}
                      <div className="relative p-8">
                        {/* Service number */}
                        <div className="text-white/40 font-louis text-lg mb-3 tracking-wider">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-louis font-light mb-6 text-white group-hover:text-white/90 transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-white/70 font-louis leading-relaxed text-2xl group-hover:text-white/80 transition-colors duration-300">
                          {service.description}
                        </p>
                        
                        {/* Subtle underline on hover */}
                        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
