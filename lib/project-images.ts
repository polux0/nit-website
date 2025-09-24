// Utility functions for loading project images dynamically

export interface ProjectImage {
  src: string
  alt: string
  category: string
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
  if (category === 'Web') {
    return [
      {
        src: '/projects/Web/termalna-rivijera/1.png',
        alt: 'Termalna rivijera - Image 1',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/2.png',
        alt: 'Termalna rivijera - Image 2',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/3.png',
        alt: 'Termalna rivijera - Image 3',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/4.png',
        alt: 'Termalna rivijera - Image 4',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/5.svg',
        alt: 'Termalna rivijera - Image 5',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/6.svg',
        alt: 'Termalna rivijera - Image 6',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/7.png',
        alt: 'Termalna rivijera - Image 7',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/8.png',
        alt: 'Termalna rivijera - Image 8',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/9.svg',
        alt: 'Termalna rivijera - Image 9',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/10.png',
        alt: 'Termalna rivijera - Image 10',
        category: 'Web'
      },
      {
        src: '/projects/Web/termalna-rivijera/11.svg',
        alt: 'Termalna rivijera - Image 11',
        category: 'Web'
      }
    ]
  }

  // For Branding category
  if (category === 'Branding') {
    return [
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

// Get all images for a project (used in the modal carousel)
export function getProjectAllImages(category: string): string[] {
  return getProjectImages(category).map(img => img.src)
}
