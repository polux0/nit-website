// Utility functions for loading project images dynamically

export interface ProjectImage {
  src: string
  alt: string
  category: string
  type?: 'video' | 'image' | 'svg'
}

// Map project categories to their corresponding folder paths
const categoryFolderMap: Record<string, string> = {
  'Branding': 'Branding',
  'Social Media': 'Social', 
  'Web': 'Web',
  'Photo & Video': 'Social' // Using Social folder for Photo & Video as placeholder
}

// Get images for a specific project category
export function getProjectImages(category: string): ProjectImage[] {
  const folderName = categoryFolderMap[category]
  if (!folderName) return []

  // For Web category, we have a specific subfolder structure
  // Using square 1080x1080 PNG versions (same aspect ratio as Branding)
  if (category === 'Web') {
    return [
      {
        src: '/projects/Web/termalna-rivijera/square/1.png',
        alt: 'Termalna rivijera - Image 1',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/square/2.png',
        alt: 'Termalna rivijera - Image 2',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/square/3.png',
        alt: 'Termalna rivijera - Image 3',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/square/4.png',
        alt: 'Termalna rivijera - Image 4',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/square/7.png',
        alt: 'Termalna rivijera - Image 7',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/square/8.png',
        alt: 'Termalna rivijera - Image 8',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/square/10.png',
        alt: 'Termalna rivijera - Image 10',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/square/12.png',
        alt: 'Termalna rivijera - Image 12',
        category: 'Web'
      }
    ]
  }

  // For Branding category
  if (category === 'Branding') {
    return [
      {
        src: '/projects/Branding/papazjanija.mp4',
        alt: 'Branding - Video 1',
        category: 'Branding',
        type: 'video'
      },
      {
        src: '/projects/Branding/2.svg',
        alt: 'Branding - Design 1',
        category: 'Branding'
      },
      {
        src: '/projects/Branding/3.svg',
        alt: 'Branding - Design 2',
        category: 'Branding'
      },
      {
        src: '/projects/Branding/4.svg',
        alt: 'Branding - Design 3',
        category: 'Branding'
      },
      {
        src: '/projects/Branding/5.svg',
        alt: 'Branding - Design 4',
        category: 'Branding'
      },
      {
        src: '/projects/Branding/6.svg',
        alt: 'Branding - Design 5',
        category: 'Branding'
      },
      {
        src: '/projects/Branding/7.svg',
        alt: 'Branding - Design 6',
        category: 'Branding'
      },
      {
        src: '/projects/Branding/8.svg',
        alt: 'Branding - Design 7',
        category: 'Branding'
      }
    ]
  }

  // For Social Media category
  if (category === 'Social Media') {
    return [
      {
        src: '/projects/Social/termalna-rivijera.mp4',
        alt: 'Social Media - Video 1',
        category: 'Social Media',
        type: 'video'
      },
      {
        src: '/projects/Social/1.svg',
        alt: 'Social Media - Post 1',
        category: 'Social Media'
      },
      {
        src: '/projects/Social/2.svg',
        alt: 'Social Media - Post 2',
        category: 'Social Media'
      },
      {
        src: '/projects/Social/3.svg',
        alt: 'Social Media - Post 3',
        category: 'Social Media'
      }
    ]
  }

  // For Photo & Video category (using Social images as placeholder)
  if (category === 'Photo & Video') {
    return [
      {
        src: '/projects/Social/1.svg',
        alt: 'Photo & Video - Content 1',
        category: 'Photo & Video'
      },
      {
        src: '/projects/Social/2.svg',
        alt: 'Photo & Video - Content 2',
        category: 'Photo & Video'
      },
      {
        src: '/projects/Social/3.svg',
        alt: 'Photo & Video - Content 3',
        category: 'Photo & Video'
      }
    ]
  }

  return []
}

// Get the first image for a project (used as the main display image)
export function getProjectMainImage(category: string): string {
  const images = getProjectImages(category)
  return images.length > 0 ? images[0].src : '/placeholder.svg'
}

// Get portfolio card images (black and white versions, with mobile support)
export function getPortfolioCardImages(category: string): { black: string; white: string; mobile: string } {
  const portfolioMap: Record<string, { black: string; white: string; mobile: string }> = {
    'Branding': {
      black: '/portfolio/portfolio/portfolio_0000_Group%206.jpg',
      white: '/portfolio/portfolio/portfolio_0001_Group%207.jpg',
      mobile: '/portfolio/portfolio.mobile/examples/branding-example-1200x1500.png'
    },
    'Social Media': {
      black: '/portfolio/portfolio/portfolio_0002_Group%208.jpg',
      white: '/portfolio/portfolio/portfolio_0003_Group%209.jpg',
      mobile: '/portfolio/portfolio.mobile/examples/social-media-example-1200x1500.png'
    },
    'Web': {
      black: '/portfolio/portfolio/portfolio_0004_Group%2010.jpg',
      white: '/portfolio/portfolio/portfolio_0005_Group%2011.jpg',
      mobile: '/portfolio/portfolio.mobile/examples/web-example-1200x1500.png'
    },
    'Photo & Video': {
      black: '/portfolio/portfolio/portfolio_0006_Group%2012.jpg',
      white: '/portfolio/portfolio/portfolio_0007_Group%2013.jpg',
      mobile: '/portfolio/portfolio.mobile/examples/photo-video-example-1200x1500.png'
    }
  }

  return portfolioMap[category] || { black: '/placeholder.svg', white: '/placeholder.svg', mobile: '/placeholder.svg' }
}

// Get all images for a project (used in the modal carousel)
export function getProjectAllImages(category: string): any[] {
  return getProjectImages(category)
}
