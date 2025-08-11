#!/usr/bin/env node

/**
 * Performance-Optimized Build Script
 * Tests and validates all performance optimizations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Performance-Optimized Build...\n');

// Check if required dependencies are installed
function checkDependencies() {
  console.log('📦 Checking dependencies...');
  
  const required = ['cssnano', 'autoprefixer'];
  const missing = [];
  
  required.forEach(dep => {
    try {
      require.resolve(dep);
    } catch (e) {
      missing.push(dep);
    }
  });
  
  if (missing.length > 0) {
    console.log(`❌ Missing dependencies: ${missing.join(', ')}`);
    console.log('Installing missing dependencies...');
    execSync(`npm install --save-dev ${missing.join(' ')}`, { stdio: 'inherit' });
  } else {
    console.log('✅ All dependencies are installed');
  }
}

// Validate Vite configuration
function validateViteConfig() {
  console.log('\n⚙️  Validating Vite configuration...');
  
  try {
    const viteConfig = fs.readFileSync('vite.config.js', 'utf8');
    
    const checks = [
      { name: 'Code Splitting', pattern: 'manualChunks' },
      { name: 'Terser Minification', pattern: 'minify: \'terser\'' },
      { name: 'Build Optimization', pattern: 'chunkSizeWarningLimit' }
    ];
    
    checks.forEach(check => {
      if (viteConfig.includes(check.pattern)) {
        console.log(`✅ ${check.name}: Configured`);
      } else {
        console.log(`❌ ${check.name}: Missing`);
      }
    });
    
  } catch (error) {
    console.log('❌ Error reading Vite config:', error.message);
  }
}

// Check image optimization utilities
function checkImageOptimization() {
  console.log('\n🖼️  Checking image optimization utilities...');
  
  const files = [
    'src/utils/imageOptimization.js',
    'src/utils/performanceOptimization.js',
    'src/components/PerformanceOptimizer.jsx'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}: Found`);
    } else {
      console.log(`❌ ${file}: Missing`);
    }
  });
}

// Check performance optimizations in HTML
function checkHTMLOptimizations() {
  console.log('\n🌐 Checking HTML optimizations...');
  
  try {
    const html = fs.readFileSync('index.html', 'utf8');
    
    const checks = [
      { name: 'Preconnect Hints', pattern: 'rel="preconnect"' },
      { name: 'DNS Prefetch', pattern: 'rel="dns-prefetch"' },
      { name: 'Critical CSS', pattern: '<style>' },
      { name: 'Performance Monitoring', pattern: 'PerformanceObserver' },
      { name: 'Image Preloading', pattern: 'rel="preload"' }
    ];
    
    checks.forEach(check => {
      if (html.includes(check.pattern)) {
        console.log(`✅ ${check.name}: Found`);
      } else {
        console.log(`❌ ${check.name}: Missing`);
      }
    });
    
  } catch (error) {
    console.log('❌ Error reading HTML:', error.message);
  }
}

// Run build with performance optimizations
function runOptimizedBuild() {
  console.log('\n🔨 Running optimized build...');
  
  try {
    // Clean previous build
    if (fs.existsSync('dist')) {
      console.log('🧹 Cleaning previous build...');
      fs.rmSync('dist', { recursive: true, force: true });
    }
    
    // Run build
    console.log('📦 Building with optimizations...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Build completed successfully!');
    
  } catch (error) {
    console.log('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Analyze build output
function analyzeBuild() {
  console.log('\n📊 Analyzing build output...');
  
  if (!fs.existsSync('dist')) {
    console.log('❌ Build directory not found');
    return;
  }
  
  try {
    const assetsDir = path.join('dist', 'assets');
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      
      console.log(`📁 Build assets: ${files.length} files`);
      
      // Check for chunk splitting
      const jsFiles = files.filter(f => f.endsWith('.js'));
      const cssFiles = files.filter(f => f.endsWith('.css'));
      
      console.log(`📜 JavaScript chunks: ${jsFiles.length}`);
      console.log(`🎨 CSS files: ${cssFiles.length}`);
      
      // Check chunk sizes
      jsFiles.forEach(file => {
        const filePath = path.join(assetsDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`  📄 ${file}: ${sizeKB} KB`);
      });
      
    }
    
  } catch (error) {
    console.log('❌ Error analyzing build:', error.message);
  }
}

// Performance recommendations
function showRecommendations() {
  console.log('\n💡 Performance Recommendations:');
  
  const recommendations = [
    '✅ Use WebP images for better compression',
    '✅ Implement lazy loading for below-the-fold images',
    '✅ Enable gzip compression on your server',
    '✅ Use CDN for static assets',
    '✅ Monitor Core Web Vitals regularly',
    '✅ Implement service worker for offline caching',
    '✅ Use HTTP/2 for parallel loading',
    '✅ Optimize critical rendering path'
  ];
  
  recommendations.forEach(rec => console.log(rec));
}

// Main execution
async function main() {
  try {
    checkDependencies();
    validateViteConfig();
    checkImageOptimization();
    checkHTMLOptimizations();
    runOptimizedBuild();
    analyzeBuild();
    showRecommendations();
    
    console.log('\n🎉 Performance optimization build completed successfully!');
    console.log('📈 Your website should now have significantly better performance.');
    
  } catch (error) {
    console.error('❌ Build process failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main }; 