import React from 'react';

/**
 * OptimizedImage Component
 * Provides proper SEO-friendly alt text in French
 * @param {string} src - Image source URL
 * @param {string} alt - Descriptive alt text in French
 * @param {string} title - Image title
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles
 * @param {boolean} loading - Lazy loading (default: true)
 * @param {string} decoding - Decoding strategy (default: async)
 * @param {string} fetchPriority - Loading priority (default: auto)
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  title, 
  className = '', 
  style = {},
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  ...props 
}) => {
  // Generate comprehensive alt text in French if not provided
  const generateAltText = (imgSrc, providedAlt) => {
    if (providedAlt) return providedAlt;
    
    // Extract image information from URL
    const url = imgSrc || '';
    
    // Service-specific alt text based on context
    if (url.includes('installation') || url.includes('installation')) {
      return 'Installation de toiture professionnelle par BN BÂTIMENT - Expert couvreur Lyon';
    }
    
    if (url.includes('repair') || url.includes('reparation') || url.includes('réparation')) {
      return 'Réparation de fuite de toiture par BN BÂTIMENT - Urgence 24h/24';
    }
    
    if (url.includes('maintenance') || url.includes('entretien')) {
      return 'Entretien de toiture professionnel par BN BÂTIMENT - Démoussage et nettoyage';
    }
    
    if (url.includes('cleaning') || url.includes('nettoyage') || url.includes('demoussage')) {
      return 'Nettoyage et démoussage de toiture par BN BÂTIMENT - Traitement hydrofuge';
    }
    
    if (url.includes('zinguerie')) {
      return 'Travaux de zinguerie par BN BÂTIMENT - Expert zingueur Lyon';
    }
    
    if (url.includes('charpente')) {
      return 'Charpente traditionnelle et moderne par BN BÂTIMENT - Charpentier Lyon';
    }
    
    if (url.includes('gouttiere') || url.includes('gouttières')) {
      return 'Installation de gouttières par BN BÂTIMENT - Étanchéité toiture';
    }
    
    if (url.includes('galerie') || url.includes('realisation')) {
      return 'Réalisation toiture par BN BÂTIMENT - Galerie travaux couverture';
    }
    
    if (url.includes('blog')) {
      return 'Article blog BN BÂTIMENT - Conseils toiture et couverture';
    }
    
    // Default alt text
    return 'BN BÂTIMENT - Expert couvreur Lyon, installation, réparation et entretien de toiture';
  };
  
  const altText = generateAltText(src, alt);
  const imageTitle = title || altText;
  
  return (
    <img
      src={src}
      alt={altText}
      title={imageTitle}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};

export default OptimizedImage;