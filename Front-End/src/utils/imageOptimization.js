// Comprehensive Image Optimization Utility
// Fixes: Image delivery, responsive images, WebP format, proper sizing

/**
 * Generate responsive image sources for different screen sizes
 * @param {string} imagePath - Original image path
 * @param {Object} options - Configuration options
 * @returns {Object} Responsive image attributes
 */
export const generateResponsiveImage = (imagePath, options = {}) => {
  const {
    sizes = {
      mobile: '100vw',
      tablet: '50vw',
      desktop: '33vw'
    },
    quality = 80,
    formats = ['webp', 'jpg'],
    lazy = true
  } = options;

  if (!imagePath) return null;

  // Base URL for API
  const baseUrl = 'https://api.bnbatiment.com';
  
  // Generate different sizes for responsive images
  const responsiveSizes = {
    mobile: { width: 400, height: 300 },
    tablet: { width: 800, height: 600 },
    desktop: { width: 1200, height: 900 }
  };

  // Generate srcset for different formats and sizes
  const generateSrcSet = (format) => {
    return Object.entries(responsiveSizes)
      .map(([size, dimensions]) => {
        const url = `${baseUrl}${imagePath}?w=${dimensions.width}&h=${dimensions.height}&f=${format}&q=${quality}`;
        return `${url} ${dimensions.width}w`;
      })
      .join(', ');
  };

  // Generate picture element sources
  const sources = formats.map(format => ({
    type: `image/${format}`,
    srcSet: generateSrcSet(format),
    sizes: `(max-width: 768px) ${sizes.mobile}, (max-width: 1024px) ${sizes.tablet}, ${sizes.desktop}`
  }));

  return {
    src: `${baseUrl}${imagePath}?w=800&h=600&f=webp&q=${quality}`,
    srcSet: generateSrcSet('webp'),
    sizes: `(max-width: 768px) ${sizes.mobile}, (max-width: 1024px) ${sizes.tablet}, ${sizes.desktop}`,
    loading: lazy ? 'lazy' : 'eager',
    decoding: 'async',
    fetchPriority: options.priority || 'auto',
    sources
  };
};

/**
 * Optimize service images with proper sizing and format
 * @param {string} serviceTitle - Service title for fallback image
 * @param {string} customImagePath - Custom image path if available
 * @returns {Object} Optimized image configuration
 */
export const optimizeServiceImage = (serviceTitle, customImagePath = null) => {
  if (customImagePath) {
    return generateResponsiveImage(customImagePath, {
      sizes: { mobile: '100vw', tablet: '50vw', desktop: '33vw' },
      quality: 85,
      formats: ['webp', 'jpg'],
      lazy: true
    });
  }

  // Fallback to optimized Unsplash images with proper sizing
  const title = serviceTitle.toLowerCase();
  let imageUrl = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp';
  
  if (title.includes('installation') || title.includes('pose')) {
    imageUrl = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp';
  } else if (title.includes('réparation') || title.includes('reparation') || title.includes('fuite')) {
    imageUrl = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp';
  } else if (title.includes('entretien') || title.includes('nettoyage')) {
    imageUrl = 'https://images.unsplash.com/photo-1581578731548-7f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp';
  } else if (title.includes('démoussage') || title.includes('demoussage')) {
    imageUrl = 'https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp';
  }

  return {
    src: imageUrl,
    srcSet: `${imageUrl}&w=400 400w, ${imageUrl}&w=800 800w, ${imageUrl}&w=1200 1200w`,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    loading: 'lazy',
    decoding: 'async',
    fetchPriority: 'auto'
  };
};

/**
 * Create optimized image component with proper attributes
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {Object} options - Additional options
 * @returns {Object} Image component props
 */
export const createOptimizedImage = (src, alt, options = {}) => {
  const {
    className = '',
    style = {},
    priority = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
  } = options;

  // Convert to WebP if possible and optimize
  const optimizedSrc = src.includes('unsplash.com') 
    ? `${src}&fm=webp&q=80&w=800`
    : src;

  return {
    src: optimizedSrc,
    alt,
    className,
    style,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    fetchPriority: priority ? 'high' : 'auto',
    sizes,
    onLoad: (e) => {
      // Add fade-in effect
      e.target.style.opacity = '1';
      e.target.style.transform = 'scale(1)';
    },
    onError: (e) => {
      // Fallback to default image
      e.target.src = '/logo.png';
    }
  };
};

/**
 * Preload critical images for LCP optimization
 * @param {Array} imageUrls - Array of critical image URLs
 */
export const preloadCriticalImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with intersection observer
 * @param {string} selector - CSS selector for lazy images
 */
export const initializeLazyLoading = (selector = '[data-src]') => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Convert image to WebP format if supported
 * @param {string} originalSrc - Original image source
 * @returns {string} WebP image source or fallback
 */
export const getWebPImage = (originalSrc) => {
  if (!originalSrc) return '/logo.png';
  
  // Check if WebP is supported
  const webpSupported = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;

  if (webpSupported && originalSrc.includes('api.bnbatiment.com')) {
    return `${originalSrc}${originalSrc.includes('?') ? '&' : '?'}f=webp&q=80`;
  }
  
  return originalSrc;
};

/**
 * Optimize gallery images for better performance
 * @param {Array} galleryItems - Array of gallery items
 * @returns {Array} Optimized gallery items
 */
export const optimizeGalleryImages = (galleryItems) => {
  return galleryItems.map(item => ({
    ...item,
    image: getWebPImage(item.image),
    thumbnail: getWebPImage(item.thumbnail || item.image),
    optimized: true
  }));
};

export default {
  generateResponsiveImage,
  optimizeServiceImage,
  createOptimizedImage,
  preloadCriticalImages,
  initializeLazyLoading,
  getWebPImage,
  optimizeGalleryImages
}; 