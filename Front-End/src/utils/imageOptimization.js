/**
 * Image Optimization Utility
 * Converts images to WebP format and optimizes loading
 */

/**
 * Convert image URL to WebP format
 * @param {string} url - Original image URL
 * @returns {string} - WebP optimized URL
 */
export const convertToWebP = (url) => {
  if (!url) return '';
  
  // If it's already a full URL (like Unsplash), convert to WebP
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // For Unsplash images, add format=webp
    if (url.includes('unsplash.com')) {
      return url.includes('?') 
        ? `${url}&fm=webp&q=80`
        : `${url}?fm=webp&q=80`;
    }
    
    // For API images, add webp parameter
    if (url.includes('api.bnbatiment.com')) {
      return url.includes('?') 
        ? `${url}&f=webp&q=80`
        : `${url}?f=webp&q=80`;
    }
  }
  
  return url;
};

/**
 * Generate responsive image srcset
 * @param {string} baseUrl - Base image URL
 * @param {Array} widths - Array of widths
 * @returns {string} - Srcset string
 */
export const generateSrcSet = (baseUrl, widths = [400, 800, 1200]) => {
  if (!baseUrl) return '';
  
  const webpUrl = convertToWebP(baseUrl);
  const baseSrc = webpUrl.split('?')[0];
  
  return widths.map(width => {
    return `${baseSrc}?w=${width}&q=80  ${width}w`;
  }).join(', ');
};

/**
 * Check if image is above the fold
 * @param {HTMLElement} element - Image element
 * @returns {boolean}
 */
export const isAboveTheFold = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/**
 * Optimize image element
 * @param {HTMLImageElement} img - Image element
 */
export const optimizeImageElement = (img) => {
  if (!img) return;
  
  // Add loading attribute
  if (!img.loading) {
    img.loading = isAboveTheFold(img) ? 'eager' : 'lazy';
  }
  
  // Add decoding attribute
  if (!img.decoding) {
    img.decoding = 'async';
  }
  
  // Add fetch priority
  if (!img.fetchPriority && isAboveTheFold(img)) {
    img.fetchPriority = 'high';
  }
  
  // Convert to WebP if not already WebP
  if (img.src && !img.dataset.optimized) {
    const webpSrc = convertToWebP(img.src);
    if (webpSrc !== img.src) {
      img.src = webpSrc;
    }
    img.dataset.optimized = 'true';
  }
};

/**
 * Lazy load image
 * @param {HTMLElement} element - Element to observe
 * @param {Function} callback - Callback when element is in view
 */
export const lazyLoadImage = (element, callback) => {
  if (!element || !('IntersectionObserver' in window)) {
    // Fallback: load immediately
    callback();
    return null;
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.01
    }
  );
  
  observer.observe(element);
  return observer;
};

/**
 * Preload critical images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};
