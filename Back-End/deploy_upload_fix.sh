#!/bin/bash
# Quick deployment script for Cloudinary Upload Fix
# Run this on your production server

echo "Deploying Cloudinary Upload Fix..."
echo "=================================="

# Navigate to backend directory
cd Back-End

# Clear all Laravel caches
echo "Clearing Laravel caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

echo ""
echo "✅ Cache cleared!"
echo ""
echo "The upload functionality should now work."
echo "Test it at: https://www.bnbatiment.com/admin/services"

