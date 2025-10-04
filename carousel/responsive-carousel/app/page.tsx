import { ResponsiveCarousel } from "@/components/responsive-carousel"

const sampleItems = [
  {
    id: "1",
    src: "/vast-mountain-valley.png",
    alt: "Beautiful landscape",
    title: "Mountain Vista",
    description: "A stunning view of snow-capped mountains",
  },
  {
    id: "2",
    src: "/abstract-geometric-pattern.png",
    alt: "Geometric pattern",
    type: "svg" as const,
    title: "Abstract Art",
    description: "Modern geometric design",
  },
  {
    id: "3",
    src: "/sunset-cityscape.png",
    alt: "City skyline",
    title: "Urban Sunset",
    description: "City lights beginning to twinkle",
  },
  {
    id: "4",
    src: "/placeholder-logo.png",
    alt: "Logo design",
    type: "svg" as const,
    title: "Brand Identity",
    description: "Clean and modern logo concept",
  },
]

const brandingItems = [
  {
    id: "1",
    src: "/branding-design.svg",
    alt: "Branding design",
    type: "svg" as const,
    title: "Branding Project",
    description: "Custom branding design",
  },
]

const socialItems = [
  {
    id: "1",
    src: "/social-design.svg",
    alt: "Social media design",
    type: "svg" as const,
    title: "Social Media",
    description: "Social media design concept",
  },
]

const webItems = [
  {
    id: "1",
    src: "/web-design.svg",
    alt: "Web design",
    type: "svg" as const,
    title: "Web Project",
    description: "Termalna Rivijera web design",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Carousel Testing Area</h1>
          <p className="text-muted-foreground text-lg">Testing your SVG designs in responsive carousels</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Test Carousel #1 - Branding Design</h2>
          <ResponsiveCarousel items={brandingItems} aspectRatio="16/9" objectFit="cover" showDots={false} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Test Carousel #2 - Social Design</h2>
          <ResponsiveCarousel items={socialItems} aspectRatio="16/9" objectFit="cover" showDots={false} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Test Carousel #3 - Web Design</h2>
          <ResponsiveCarousel items={webItems} aspectRatio="16/9" objectFit="cover" showDots={false} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Test Carousel #4 - Original Sample</h2>
          <ResponsiveCarousel items={sampleItems} aspectRatio="16/9" objectFit="cover" showDots={false} />
        </section>
      </div>
    </div>
  )
}
