/**
 * Mobile Performance Optimization Utilities
 * Detects mobile devices and optimizes performance accordingly
 */

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  
  // Check user agent
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  // Check screen width
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  
  // Check touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return mobileRegex.test(userAgent) || (screenWidth <= 768 && isTouchDevice);
};

/**
 * Lazy load heavy libraries only on desktop
 */
export const shouldLoadHeavyLibraries = () => {
  return !isMobile();
};

/**
 * Optimize images for mobile devices
 */
export const getOptimizedImageSrc = (originalSrc, options = {}) => {
  if (!originalSrc) return '';
  
  const {
    width,
    quality = 80,
    format = 'webp'
  } = options;
  
  // If already has query params, append
  const separator = originalSrc.includes('?') ? '&' : '?';
  
  // Add mobile-specific optimizations
  const mobileWidth = isMobile() ? Math.min(width || 800, 800) : width || 1200;
  
  // Check if image is from API
  if (originalSrc.includes('api.bnbatiment.com')) {
    return `${originalSrc}${separator}w=${mobileWidth}&q=${quality}&f=${format}`;
  }
  
  // For external images, return as-is (they may have their own optimization)
  return originalSrc;
};

/**
 * Get responsive image sizes for mobile
 */
export const getResponsiveSizes = () => {
  if (isMobile()) {
    return '(max-width: 768px) 100vw, 100vw';
  }
  return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

/**
 * Debounce function to reduce forced reflows
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Reduce motion on mobile for better performance
 */
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  
  // Check user preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // On mobile, prefer reduced motion for better performance
  return prefersReducedMotion || isMobile();
};

/**
 * Optimize intersection observer for mobile
 */
export const getMobileObserverOptions = () => {
  return {
    rootMargin: isMobile() ? '50px' : '100px',
    threshold: isMobile() ? 0.1 : 0.2
  };
};

/**
 * Batch DOM reads to reduce forced reflows
 */
export const batchReadDOM = (readCallback) => {
  // Use requestAnimationFrame to batch reads
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const result = readCallback();
      resolve(result);
    });
  });
};

/**
 * Batch DOM writes to reduce forced reflows
 */
export const batchWriteDOM = (writeCallback) => {
  // Use requestAnimationFrame to batch writes
  requestAnimationFrame(() => {
    writeCallback();
  });
};

