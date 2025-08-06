// Image Optimization Utilities for SEO

/**
 * Generate optimized alt text for images based on context
 * @param {string} imageName - Original image name
 * @param {string} context - Page or section context
 * @param {string} service - Service type if applicable
 * @returns {string} Optimized alt text
 */
export const generateAltText = (imageName, context = '', service = '') => {
  const baseAlt = imageName
    .replace(/[_-]/g, ' ')
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .toLowerCase();

  const contextMap = {
    'services': 'service de toiture',
    'gallery': 'travaux de toiture',
    'testimonials': 'témoignage client',
    'about': 'équipe BN BÂTIMENT',
    'contact': 'contact BN BÂTIMENT'
  };

  const serviceMap = {
    'installation': 'installation de toiture',
    'repair': 'réparation de toiture',
    'maintenance': 'entretien de toiture',
    'cleaning': 'nettoyage de toiture',
    'demoussage': 'démoussage de toiture',
    'zinguerie': 'travaux de zinguerie',
    'charpente': 'travaux de charpente'
  };

  let altText = baseAlt;
  
  if (context && contextMap[context]) {
    altText = `${contextMap[context]} - ${altText}`;
  }
  
  if (service && serviceMap[service]) {
    altText = `${serviceMap[service]} - ${altText}`;
  }

  // Add location if not present
  if (!altText.includes('lyon') && !altText.includes('rhône')) {
    altText += ' Lyon';
  }

  return altText.charAt(0).toUpperCase() + altText.slice(1);
};

/**
 * Optimize image loading with lazy loading and proper attributes
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {string} className - CSS classes
 * @returns {Object} Optimized image props
 */
export const optimizeImageProps = (src, alt, className = '') => {
  return {
    src,
    alt,
    className,
    loading: 'lazy',
    decoding: 'async',
    onError: (e) => {
      // Fallback to placeholder if image fails to load
      e.target.src = '/placeholder-image.jpg';
    }
  };
};

/**
 * Generate structured data for images
 * @param {string} imageUrl - Image URL
 * @param {string} altText - Alt text
 * @param {string} caption - Image caption
 * @returns {Object} Structured data object
 */
export const generateImageStructuredData = (imageUrl, altText, caption = '') => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": imageUrl,
    "description": altText,
    "caption": caption || altText,
    "representativeOfPage": false
  };
};

/**
 * Compress image filename for better SEO
 * @param {string} filename - Original filename
 * @returns {string} Compressed filename
 */
export const compressImageFilename = (filename) => {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Generate image dimensions for responsive images
 * @param {number} originalWidth - Original image width
 * @param {number} originalHeight - Original image height
 * @returns {Object} Responsive image sizes
 */
export const generateResponsiveSizes = (originalWidth, originalHeight) => {
  const aspectRatio = originalWidth / originalHeight;
  
  return {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    srcSet: [
      `${originalWidth * 0.5}w`,
      `${originalWidth * 0.75}w`,
      `${originalWidth}w`
    ].join(', '),
    aspectRatio: aspectRatio.toFixed(2)
  };
};

/**
 * Add image optimization attributes to existing image elements
 * @param {HTMLImageElement} img - Image element
 * @param {string} context - Page context
 */
export const optimizeExistingImages = (img, context = '') => {
  if (!img.alt || img.alt.trim() === '') {
    const imageName = img.src.split('/').pop();
    img.alt = generateAltText(imageName, context);
  }
  
  img.loading = 'lazy';
  img.decoding = 'async';
  
  // Add error handling
  img.onerror = function() {
    this.src = '/placeholder-image.jpg';
  };
};

export default {
  generateAltText,
  optimizeImageProps,
  generateImageStructuredData,
  compressImageFilename,
  generateResponsiveSizes,
  optimizeExistingImages
}; 