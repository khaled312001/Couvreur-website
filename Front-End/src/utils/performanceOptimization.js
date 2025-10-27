// Performance Optimization Utilities for SEO

/**
 * Preload critical resources for better performance
 */
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/logo.png',
    '/src/styles/main.css',
    '/src/styles/tailwind.css'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.endsWith('.css') ? 'style' : 'image';
    link.href = resource;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load non-critical images and components
 * @param {string} selector - CSS selector for elements to lazy load
 */
export const lazyLoadElements = (selector = '[data-lazy]') => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const src = element.dataset.src;
        
        if (src) {
          if (element.tagName === 'IMG') {
            element.src = src;
          } else if (element.tagName === 'IFRAME') {
            element.src = src;
          }
          
          element.removeAttribute('data-src');
          element.classList.remove('lazy');
          observer.unobserve(element);
        }
      }
    });
  });

  document.querySelectorAll(selector).forEach(element => {
    observer.observe(element);
  });
};

/**
 * Optimize CSS delivery by inlining critical CSS
 * @param {string} criticalCSS - Critical CSS to inline
 */
export const inlineCriticalCSS = (criticalCSS) => {
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

/**
 * Defer non-critical JavaScript
 * @param {string} scriptSrc - Script source to defer
 */
export const deferScript = (scriptSrc) => {
  const script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  document.body.appendChild(script);
};

/**
 * Optimize font loading
 * @param {string} fontFamily - Font family to optimize
 */
export const optimizeFontLoading = (fontFamily) => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';
  document.head.appendChild(link);

  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(fontLink);
};

/**
 * Compress and cache static assets
 * @param {string} assetPath - Path to asset
 * @returns {string} Compressed asset URL
 */
export const getCompressedAsset = (assetPath) => {
  // Add compression parameters to asset URLs
  const compressedPath = assetPath.includes('?') 
    ? `${assetPath}&compressed=true`
    : `${assetPath}?compressed=true`;
  
  return compressedPath;
};

/**
 * Monitor Core Web Vitals (only in development)
 */
export const monitorWebVitals = () => {
  // Only monitor in development mode to reduce console noise
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  
  if (!isDevelopment) return;

  // Monitor Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Monitor First Input Delay (FID)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });

  // Monitor Cumulative Layout Shift (CLS)
  new PerformanceObserver((list) => {
    let clsValue = 0;
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};

/**
 * Optimize images for different screen sizes
 * @param {string} imageSrc - Original image source
 * @param {Object} sizes - Responsive sizes object
 * @returns {Object} Optimized image attributes
 */
export const optimizeImageForPerformance = (imageSrc, sizes = {}) => {
  const defaultSizes = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw'
  };

  const responsiveSizes = {
    ...defaultSizes,
    ...sizes
  };

  return {
    src: imageSrc,
    sizes: `(max-width: 768px) ${responsiveSizes.mobile}, (max-width: 1024px) ${responsiveSizes.tablet}, ${responsiveSizes.desktop}`,
    loading: 'lazy',
    decoding: 'async'
  };
};

/**
 * Cache API responses for better performance
 * @param {string} url - API URL
 * @param {Object} options - Fetch options
 * @returns {Promise} Cached response
 */
export const cachedFetch = async (url, options = {}) => {
  const cacheKey = `cache_${url}`;
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    const cacheAge = 5 * 60 * 1000; // 5 minutes
    
    if (now - timestamp < cacheAge) {
      return data;
    }
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    sessionStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    return data;
  } catch (error) {
    // Only log in development to reduce console noise
    if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
      console.error('Fetch error:', error);
    }
    throw error;
  }
};

/**
 * Initialize performance optimizations
 */
export const initializePerformanceOptimizations = () => {
  // Preload critical resources
  preloadCriticalResources();
  
  // Monitor web vitals
  monitorWebVitals();
  
  // Optimize font loading
  optimizeFontLoading('Inter');
  
  // Lazy load elements
  setTimeout(() => {
    lazyLoadElements();
  }, 100);
};

export default {
  preloadCriticalResources,
  lazyLoadElements,
  inlineCriticalCSS,
  deferScript,
  optimizeFontLoading,
  getCompressedAsset,
  monitorWebVitals,
  optimizeImageForPerformance,
  cachedFetch,
  initializePerformanceOptimizations
}; 