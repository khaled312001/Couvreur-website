#!/bin/bash
# Deploy Cloudinary Upload Fix to Production
# Run this script on your production server via SSH

echo "==========================================="
echo "Cloudinary Upload Fix - Production Deploy"
echo "==========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "app" ]; then
    echo "Error: This script must be run from the Back-End directory"
    echo "Please run: cd Back-End && bash deploy_to_production.sh"
    exit 1
fi

echo "Step 1: Verifying we're in Back-End directory..."
echo "✓ Current directory: $(pwd)"
echo ""

# Step 2: Backup current controller
echo "Step 2: Creating backup..."
if [ ! -d "backups" ]; then
    mkdir backups
fi

cp app/Http/Controllers/Api/CloudinaryUploadController.php \
   backups/CloudinaryUploadController.php.backup.$(date +%Y%m%d_%H%M%S)

echo "✓ Backup created in backups/"
echo ""

# Step 3: Clear all Laravel caches
echo "Step 3: Clearing Laravel caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
echo "✓ All caches cleared"
echo ""

# Step 4: Restart PHP service (if needed)
echo "Step 4: Checking PHP service..."
if command -v php8.1-fpm &> /dev/null; then
    echo "Restarting PHP 8.1 FPM..."
    sudo systemctl restart php8.1-fpm
    echo "✓ PHP service restarted"
elif command -v php8.2-fpm &> /dev/null; then
    echo "Restarting PHP 8.2 FPM..."
    sudo systemctl restart php8.2-fpm
    echo "✓ PHP service restarted"
else
    echo "Note: PHP-FPM not found, skipping restart"
fi
echo ""

echo "==========================================="
echo "✅ Deployment Complete!"
echo "==========================================="
echo ""
echo "IMPORTANT: Make sure you've uploaded the fixed"
echo "CloudinaryUploadController.php file to:"
echo "Back-End/app/Http/Controllers/Api/"
echo ""
echo "To test:"
echo "1. Go to https://www.bnbatiment.com/admin/services"
echo "2. Edit a service and try uploading an image"
echo ""
echo "If still having issues, check logs:"
echo "tail -f storage/logs/laravel.log"
echo ""

