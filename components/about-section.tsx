"use client"

export default function AboutSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/nit-gradient.png')",
        }}
      />

      {/* Optional: Add subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10" />

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
