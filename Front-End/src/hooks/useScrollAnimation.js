import { useEffect, useRef } from 'react';

const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const { threshold = 0.1, rootMargin = '0px', animationClass = 'animate-in' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            // Once animation is triggered, we can stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, animationClass]);

  return elementRef;
};

export default useScrollAnimation; 