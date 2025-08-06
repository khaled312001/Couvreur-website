import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const AnimatedSection = ({ 
  children, 
  animationType = 'scroll-animate', 
  className = '', 
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px'
}) => {
  const animationRef = useScrollAnimation({
    threshold,
    rootMargin,
    animationClass: 'animate-in'
  });

  const style = delay > 0 ? { transitionDelay: `${delay}s` } : {};

  return (
    <div 
      ref={animationRef}
      className={`${animationType} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 