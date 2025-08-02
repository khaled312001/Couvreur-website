// Utility function to add cache-busting to image URLs
export const getImageUrl = (imagePath, fallbackUrl = null) => {
  if (!imagePath) {
    return fallbackUrl;
  }
  
  // If the image path is already a full URL, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    const cacheBuster = Math.floor(Math.random() * 1000000);
    const separator = imagePath.includes('?') ? '&' : '?';
    return `${imagePath}${separator}cb=${cacheBuster}`;
  }
  
  // If it's a relative path, prepend the Laravel backend URL
  const laravelBaseUrl = 'http://localhost:8000';
  const fullImagePath = `${laravelBaseUrl}${imagePath}`;
  
  // Add a cache-busting parameter to prevent browser caching
  const cacheBuster = Math.floor(Math.random() * 1000000);
  const separator = fullImagePath.includes('?') ? '&' : '?';
  return `${fullImagePath}${separator}cb=${cacheBuster}`;
};

// Alternative approach using a stable cache-busting parameter
export const getImageUrlWithCacheBust = (imagePath, fallbackUrl = null) => {
  if (!imagePath) {
    return fallbackUrl;
  }
  
  // If the image path is already a full URL, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    const cacheBuster = Math.floor(Math.random() * 1000000);
    const separator = imagePath.includes('?') ? '&' : '?';
    return `${imagePath}${separator}cb=${cacheBuster}`;
  }
  
  // If it's a relative path, prepend the Laravel backend URL
  const laravelBaseUrl = 'http://localhost:8000';
  const fullImagePath = `${laravelBaseUrl}${imagePath}`;
  
  // Use a more stable cache-busting approach
  const cacheBuster = Math.floor(Math.random() * 1000000);
  const separator = fullImagePath.includes('?') ? '&' : '?';
  return `${fullImagePath}${separator}cb=${cacheBuster}`;
};

// Function to force refresh an image by adding a timestamp
export const getImageUrlWithTimestamp = (imagePath, fallbackUrl = null) => {
  if (!imagePath) {
    return fallbackUrl;
  }
  
  // If the image path is already a full URL, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    const separator = imagePath.includes('?') ? '&' : '?';
    return `${imagePath}${separator}t=${Date.now()}`;
  }
  
  // If it's a relative path, prepend the Laravel backend URL
  const laravelBaseUrl = 'http://localhost:8000';
  const fullImagePath = `${laravelBaseUrl}${imagePath}`;
  
  // Add a timestamp to force refresh
  const separator = fullImagePath.includes('?') ? '&' : '?';
  return `${fullImagePath}${separator}t=${Date.now()}`;
}; 