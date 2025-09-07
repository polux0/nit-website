"use client"

export default function AboutSection() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-louis font-bold text-white mb-8 tracking-tight">O nama</h1>

          <p className="text-xl md:text-2xl font-louis text-white/90 mb-12 leading-relaxed">
            između tebe i sveta – mi smo ta nit. Pomažemo brendovima da jasno komuniciraju, strateški nastupaju i snažno
            se povezuju sa zajednicom.
          </p>
        </div>

      </div>
    </section>
  )
}
