"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function ServicesSection() {
  const [scrollY, setScrollY] = useState(0)
  const [showServices, setShowServices] = useState(false)
  const [visibleServices, setVisibleServices] = useState<boolean[]>([])
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY)
        // Show services when scrolled past about section
        if (window.scrollY > window.innerHeight * 0.8) {
          setShowServices(true)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const updateServiceVisibility = () => {
      if (!sectionRef.current || !showServices || typeof window === 'undefined') return

      const sectionTop = sectionRef.current.offsetTop
      const threadHeight = Math.min(scrollY * 0.8, window.innerHeight * 1.5)
      const threadBottomPosition = threadHeight

      const newVisibleServices = serviceRefs.current.map((ref, index) => {
        if (!ref) return false

        const serviceTop = ref.offsetTop - sectionTop + sectionRef.current!.offsetTop
        const serviceCenter = serviceTop + ref.offsetHeight / 2

        // Service is visible when thread has reached its center position
        return threadBottomPosition >= serviceCenter - 100
      })

      setVisibleServices(newVisibleServices)
    }

    updateServiceVisibility()
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", updateServiceVisibility)
      window.addEventListener("resize", updateServiceVisibility)

      return () => {
        window.removeEventListener("scroll", updateServiceVisibility)
        window.removeEventListener("resize", updateServiceVisibility)
      }
    }
  }, [scrollY, showServices])

  useEffect(() => {
    setVisibleServices(new Array(services.length).fill(false))
  }, [])

  const handleScrollToServices = () => {
    setShowServices(true)
    const servicesElement = document.getElementById("services")
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: "smooth" })
    }
  }

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
      title: "Web Development & Maintenance",
      description:
        "Pravimo moderne, brze i funkcionalne sajtove koji predstavljaju svaki brend na pravi način. Svaki projekat gradimo uz tehničku preciznost i estetski balans. Nakon lansiranja, tu smo i za redovno održavanje.",
    },
  ]

  return (
    <>
      {/* Thread animation - positioned fixed to follow scroll */}
      <div className="fixed left-1/2 top-0 z-10" style={{ transform: "translateX(-50%)" }}>
        <svg
          width="200"
          height={showServices && typeof window !== 'undefined' ? Math.min(scrollY * 0.8, window.innerHeight * 1.5) : 0}
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
            d={typeof window !== 'undefined' ? `M100 0 C180 ${Math.min(scrollY * 0.1, window.innerHeight * 0.15)} 40 ${Math.min(scrollY * 0.2, window.innerHeight * 0.35)} 20 ${Math.min(scrollY * 0.3, window.innerHeight * 0.5)} C0 ${Math.min(scrollY * 0.4, window.innerHeight * 0.65)} 200 ${Math.min(scrollY * 0.5, window.innerHeight * 0.8)} 180 ${Math.min(scrollY * 0.6, window.innerHeight * 1.0)} C160 ${Math.min(scrollY * 0.7, window.innerHeight * 1.15)} 120 ${Math.min(scrollY * 0.75, window.innerHeight * 1.3)} 100 ${Math.min(scrollY * 0.8, window.innerHeight * 1.5)}` : "M100 0 L100 0"}
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
          marginTop: showServices ? "0" : "100vh",
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
              <h2 className="text-5xl md:text-7xl font-louis font-bold text-white mb-8 tracking-tight">Services</h2>
            </div>

            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  ref={(el) => (serviceRefs.current[index] = el)}
                  className={`transform transition-all duration-700 ease-out ${
                    visibleServices[index] ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"
                  }`}
                >
                  <div className="relative">
                    {/* Thread connection point */}
                    <div
                      className={`absolute -left-8 top-6 w-4 h-4 rounded-full border-2 border-white/30 transition-all duration-500 ${
                        visibleServices[index] ? "bg-white/60 scale-100 shadow-lg" : "bg-white/20 scale-75"
                      }`}
                    />

                    {/* Card */}
                    <div
                      className={`border rounded-lg p-8 transition-all duration-500 ${
                        visibleServices[index]
                          ? "bg-transparent border-white hover:bg-white/10 shadow-xl"
                          : "bg-transparent border-white/50"
                      }`}
                    >
                      <h3 className="text-2xl md:text-3xl font-louis font-bold mb-4 text-white">{service.title}</h3>
                      <p className="text-white/90 font-louis leading-relaxed text-lg">{service.description}</p>
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
