#!/bin/bash

# Cloudinary Upload Fix - Deployment Script
# Run this on your production server via SSH

echo "========================================="
echo "Cloudinary Upload Fix - Deployment"
echo "========================================="

# Backup existing files
echo "Backing up existing files..."
cp app/Http/Controllers/Api/CloudinaryUploadController.php app/Http/Controllers/Api/CloudinaryUploadController.php.backup.$(date +%Y%m%d_%H%M%S)
cp routes/api.php routes/api.php.backup.$(date +%Y%m%d_%H%M%S)

echo "✓ Backups created"

# Check .env for CLOUDINARY_URL
echo ""
echo "Checking .env configuration..."
if ! grep -q "CLOUDINARY_URL" .env; then
    echo "CLOUDINARY_URL not found in .env, adding it..."
    echo "CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1" >> .env
    echo "✓ CLOUDINARY_URL added to .env"
else
    echo "✓ CLOUDINARY_URL exists in .env"
    cat .env | grep CLOUDINARY
fi

# Set permissions
echo ""
echo "Setting permissions..."
chmod -R 775 storage
chmod -R 775 bootstrap/cache
echo "✓ Permissions set"

# Clear all caches
echo ""
echo "Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
echo "✓ Caches cleared"

# Remove bootstrap cache
echo ""
echo "Removing bootstrap cache..."
rm -rf bootstrap/cache/*
echo "✓ Bootstrap cache removed"

# Rebuild caches
echo ""
echo "Rebuilding caches..."
php artisan config:cache
php artisan route:cache
echo "✓ Caches rebuilt"

# Check PHP upload settings
echo ""
echo "Checking PHP upload settings..."
php -r "echo 'upload_max_filesize: ' . ini_get('upload_max_filesize') . PHP_EOL;"
php -r "echo 'post_max_size: ' . ini_get('post_max_size') . PHP_EOL;"
php -r "echo 'memory_limit: ' . ini_get('memory_limit') . PHP_EOL;"

# Final message
echo ""
echo "========================================="
echo "✓ Deployment complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Test: https://api.bnbatiment.com/api/cloudinary/test"
echo "2. Upload an image in admin panel"
echo "3. Check logs: tail -f storage/logs/laravel.log"
echo ""

