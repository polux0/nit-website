export default function BackgroundSections() {
  const backgroundImages = [
    '/images/background.grain/pozadine_0000_Layer-5-copy-7.png',
    '/images/background.grain/pozadine_0001_Layer-5-copy-6.png',
    '/images/background.grain/pozadine_0002_Layer-5-copy-5.png',
    '/images/background.grain/pozadine_0003_Layer-5-copy-4.png',
    '/images/background.grain/pozadine_0004_Layer-5-copy-3.png',
    '/images/background.grain/pozadine_0005_Layer-5-copy-2.png',
    '/images/background.grain/pozadine_0006_Layer-5-copy.png',
    '/images/background.grain/pozadine_0007_Layer-5.png',
  ]

  return (
    <main className="min-h-screen">
      {backgroundImages.map((image, index) => (
        <section
          key={index}
          className="min-h-screen w-full relative flex items-center justify-center"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Content overlay */}
          <div className="relative z-10 text-center px-4">
            <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Section {index + 1}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">
              This section uses background image {index + 1}
            </p>
          </div>
        </section>
      ))}
    </main>
  )
}
