/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization with WebP/AVIF support
    formats: ['image/avif', 'image/webp'],
    // Allow images from these domains (if using external images)
    remotePatterns: [],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable optimization in development (default is false)
    // Note: In production, optimization is always enabled
    minimumCacheTTL: 60,
  },
}

export default nextConfig
