// Utility function to add cache-busting to image URLs
export const getImageUrl = (imagePath, fallbackUrl = null) => {
  // If no image path is provided, return fallback or null
  if (!imagePath || imagePath === '' || imagePath === null) {
    return fallbackUrl;
  }
  
  // If the image path is already a full URL, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Force HTTPS for mixed content issues
    const secureUrl = imagePath.replace('http://', 'https://');
    const cacheBuster = Math.floor(Math.random() * 1000000);
    const separator = secureUrl.includes('?') ? '&' : '?';
    return `${secureUrl}${separator}cb=${cacheBuster}`;
  }
  
  // If it's a relative path, prepend the production API URL
  // Use the production URL instead of localhost
  const productionBaseUrl = 'https://api.bnbatiment.com';
  const fullImagePath = `${productionBaseUrl}${imagePath}`;
  
  // Add a cache-busting parameter to prevent browser caching
  const cacheBuster = Math.floor(Math.random() * 1000000);
  const separator = fullImagePath.includes('?') ? '&' : '?';
  return `${fullImagePath}${separator}cb=${cacheBuster}`;
};

// Alternative approach using a stable cache-busting parameter
export const getImageUrlWithCacheBust = (imagePath, fallbackUrl = null) => {
  // If no image path is provided, return fallback or null
  if (!imagePath || imagePath === '' || imagePath === null) {
    return fallbackUrl;
  }
  
  // If the image path is already a full URL, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Force HTTPS for mixed content issues
    const secureUrl = imagePath.replace('http://', 'https://');
    const cacheBuster = Math.floor(Math.random() * 1000000);
    const separator = secureUrl.includes('?') ? '&' : '?';
    return `${secureUrl}${separator}cb=${cacheBuster}`;
  }
  
  // If it's a relative path, prepend the production API URL
  const productionBaseUrl = 'https://api.bnbatiment.com';
  const fullImagePath = `${productionBaseUrl}${imagePath}`;
  
  // Use a more stable cache-busting approach
  const cacheBuster = Math.floor(Math.random() * 1000000);
  const separator = fullImagePath.includes('?') ? '&' : '?';
  return `${fullImagePath}${separator}cb=${cacheBuster}`;
};

// Function to force refresh an image by adding a timestamp
export const getImageUrlWithTimestamp = (imagePath, fallbackUrl = null) => {
  // If no image path is provided, return fallback or null
  if (!imagePath || imagePath === '' || imagePath === null) {
    return fallbackUrl;
  }
  
  // If the image path is already a full URL, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Force HTTPS for mixed content issues
    const secureUrl = imagePath.replace('http://', 'https://');
    const separator = secureUrl.includes('?') ? '&' : '?';
    return `${secureUrl}${separator}t=${Date.now()}`;
  }
  
  // If it's a relative path, prepend the production API URL
  const productionBaseUrl = 'https://api.bnbatiment.com';
  const fullImagePath = `${productionBaseUrl}${imagePath}`;
  
  // Add a timestamp to force refresh
  const separator = fullImagePath.includes('?') ? '&' : '?';
  return `${fullImagePath}${separator}t=${Date.now()}`;
};

// Helper function to get service image based on title with professional French roofing images
export const getServiceImage = (serviceTitle) => {
  const title = serviceTitle.toLowerCase();
  
  // Use local service images from API
  if (title.includes('installation') || title.includes('pose')) {
    return 'https://api.bnbatiment.com/api/uploads/services/1754239886_installation toiture.jpg';
  } else if (title.includes('réparation') || title.includes('reparation') || title.includes('fuite')) {
    return 'https://api.bnbatiment.com/api/uploads/services/1754240415_réparation de fuite.jpg';
  } else if (title.includes('entretien')) {
    return 'https://api.bnbatiment.com/api/uploads/services/1754240526_entretien.webp';
  } else if (title.includes('démoussage') || title.includes('demoussage')) {
    return 'https://api.bnbatiment.com/api/uploads/services/1754240626_démousage.jpg';
  } else if (title.includes('nettoyage')) {
    return 'https://api.bnbatiment.com/api/uploads/services/1754240785_nettoyage.webp';
  } else if (title.includes('charpente') || title.includes('structure')) {
    return 'https://api.bnbatiment.com/api/uploads/services/1754237525_images.jpg';
  } else if (title.includes('zinguerie') || title.includes('zinc')) {
    return 'https://api.bnbatiment.com/api/uploads/services/1754237525_images.jpg';
  } else {
    // Default professional French roofing image
    return 'https://api.bnbatiment.com/api/uploads/services/1754237525_images.jpg';
  }
}; 