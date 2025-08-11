import React, { useEffect, useRef, useState } from 'react';

const PerformanceOptimizer = ({ children }) => {
  const [isOptimized, setIsOptimized] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const initializePerformanceOptimizations = () => {
    try {
      // Monitor Core Web Vitals
      if ('performance' in window) {
        // Monitor Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
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
        }
      }
      
      // Preload critical images
      preloadCriticalImages();
      
      // Initialize lazy loading
      initializeLazyLoading();
      
      // Set up intersection observer for performance monitoring
      setupPerformanceObserver();
      
      // Optimize images after DOM is ready
      setTimeout(() => {
        optimizeExistingImages();
        setIsOptimized(true);
      }, 100);
      
    } catch (error) {
      console.warn('Performance optimization failed:', error);
    }
  };

  const preloadCriticalImages = () => {
    const criticalImages = [
      '/logo.png',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  };

  const initializeLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  };

  const setupPerformanceObserver = () => {
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Optimize images when they come into view
            optimizeImageInView(entry.target);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });
    }
  };

  const optimizeExistingImages = () => {
    const images = document.querySelectorAll('img:not([data-optimized])');
    images.forEach(img => {
      optimizeImage(img);
    });
  };

  const optimizeImageInView = (element) => {
    if (element.tagName === 'IMG' && !element.dataset.optimized) {
      optimizeImage(element);
    }
  };

  const optimizeImage = (img) => {
    try {
      // Add loading optimization
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Add decoding optimization
      if (!img.decoding) {
        img.decoding = 'async';
      }
      
      // Add fetch priority for above-the-fold images
      if (isAboveTheFold(img)) {
        img.fetchPriority = 'high';
      }
      
      // Convert to WebP if possible
      if (img.src && img.src.includes('api.bnbatiment.com')) {
        const webpSrc = img.src.includes('?') 
          ? `${img.src}&f=webp&q=80`
          : `${img.src}?f=webp&q=80`;
        img.src = webpSrc;
      }
      
      // Add responsive image attributes
      addResponsiveAttributes(img);
      
      // Mark as optimized
      img.dataset.optimized = 'true';
      
      // Observe for further optimizations
      if (observerRef.current) {
        observerRef.current.observe(img);
      }
      
    } catch (error) {
      console.warn('Image optimization failed:', error);
    }
  };

  const isAboveTheFold = (img) => {
    const rect = img.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const addResponsiveAttributes = (img) => {
    // Add responsive sizes if not present
    if (!img.sizes) {
      img.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    
    // Add srcset for responsive images
    if (img.src && !img.srcSet) {
      const baseSrc = img.src.split('?')[0];
      img.srcSet = `${baseSrc}?w=400&f=webp&q=80 400w, ${baseSrc}?w=800&f=webp&q=80 800w, ${baseSrc}?w=1200&f=webp&q=80 1200w`;
    }
  };

  // Performance monitoring
  useEffect(() => {
    if (isOptimized) {
      // Report performance metrics
      reportPerformanceMetrics();
    }
  }, [isOptimized]);

  const reportPerformanceMetrics = () => {
    if ('performance' in window) {
      // Measure page load time
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
        console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
      }
      
      // Measure resource loading
      const resources = performance.getEntriesByType('resource');
      const imageResources = resources.filter(resource => 
        resource.initiatorType === 'img' || resource.name.includes('image')
      );
      
      if (imageResources.length > 0) {
        const avgImageLoadTime = imageResources.reduce((sum, resource) => 
          sum + (resource.responseEnd - resource.startTime), 0
        ) / imageResources.length;
        console.log('Average Image Load Time:', avgImageLoadTime);
      }
    }
  };

  return (
    <>
      {children}
      
      {/* Performance monitoring overlay (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div 
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999
          }}
        >
          Performance: {isOptimized ? '✅ Optimized' : '⏳ Optimizing...'}
        </div>
      )}
    </>
  );
};

export default PerformanceOptimizer; 