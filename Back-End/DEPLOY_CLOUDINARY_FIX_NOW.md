# 🚨 URGENT: Cloudinary Upload Fix

## Problem
Getting 500 Internal Server Error when uploading images.

## Quick Fix - Files to Upload

### File 1: Upload Controller (with enhanced error logging)
**Local Path:** `Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php`  
**Server Path:** `domains/bnbatiment.com/public_html/Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php`

### File 2: Updated Routes  
**Local Path:** `Back-End/routes/api.php`  
**Server Path:** `domains/bnbatiment.com/public_html/Back-End/routes/api.php`  
**Changes:** Added diagnostic endpoint at `/api/cloudinary/test`

## Deployment Steps

### Option A: Via File Manager (Fastest)
1. Login to: https://hpanel.hostinger.com/
2. Click "File Manager"
3. Navigate to: `domains/bnbatiment.com/public_html/Back-End/`
4. Upload both files to their respective paths

### Option B: Via SSH (Better)
```bash
cd domains/bnbatiment.com/public_html/Back-End

# Backup existing files
cp app/Http/Controllers/Api/CloudinaryUploadController.php app/Http/Controllers/Api/CloudinaryUploadController.php.backup
cp routes/api.php routes/api.php.backup

# Upload your updated files here (using FTP/SFTP or edit directly)

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Remove bootstrap cache
rm -rf bootstrap/cache/*
chmod -R 775 bootstrap/cache
chmod -R 775 storage

# Rebuild caches
php artisan config:cache
php artisan route:cache

# Set permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

## Verify Configuration

### Step 1: Check .env
```bash
cd domains/bnbatiment.com/public_html/Back-End
cat .env | grep CLOUDINARY
```

**Must show:**
```
CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1
```

**If missing, add it:**
```bash
echo "CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1" >> .env
```

### Step 2: Test Configuration
Visit: `https://api.bnbatiment.com/api/cloudinary/test`

Expected response:
```json
{
  "success": true,
  "config": {
    "cloud_url_set": true,
    "cloudinary_configured": true,
    "php_upload_max": "10M",
    "php_post_max": "10M",
    "php_memory": "256M"
  }
}
```

### Step 3: Check Logs
```bash
tail -f storage/logs/laravel.log
```

After uploading, you should see:
- "Cloudinary upload started"
- File information
- Upload result OR error message

## Quick Test

1. Visit: https://www.bnbatiment.com/admin/services
2. Click "Add Service" or edit existing service
3. Upload an image
4. Check browser console for errors

## Common Issues

### Issue: "Cloudinary URL is not configured"
**Fix:**
```bash
# Add to .env
echo "CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1" >> .env
# Clear cache
php artisan config:clear
php artisan config:cache
```

### Issue: "Upload size too large"
**Fix:** Check PHP settings
```bash
php -i | grep -E "upload_max_filesize|post_max_size"
```

If less than 10M, add to `.user.ini` in `public_html/Back-End/`:
```
upload_max_filesize = 10M
post_max_size = 10M
memory_limit = 256M
```

### Issue: "Class Cloudinary not found"
**Fix:** Reinstall package
```bash
cd domains/bnbatiment.com/public_html/Back-End
composer require cloudinary-labs/cloudinary-laravel --no-interaction
php artisan config:cache
```

## Diagnostic Commands

```bash
# Check Cloudinary config
cd domains/bnbatiment.com/public_html/Back-End
php artisan config:show cloudinary

# Check latest errors
tail -50 storage/logs/laravel.log

# Test Cloudinary connection
curl https://api.bnbatiment.com/api/cloudinary/test

# Check if Cloudinary package is installed
composer show | grep cloudinary
```

## What Was Changed

### CloudinaryUploadController.php
- Added detailed logging at each step
- Check if Cloudinary URL is configured
- Better error messages
- File information logging

### api.php routes
- Added `/api/cloudinary/test` diagnostic endpoint
- Shows Cloudinary configuration status
- Shows PHP upload settings

## After Deployment Checklist

- [ ] Files uploaded to server
- [ ] Caches cleared
- [ ] Permissions set correctly
- [ ] CLOUDINARY_URL verified in .env
- [ ] Diagnostic test passed
- [ ] Image upload working in admin panel
- [ ] Checked logs for errors

## Need Help?

Check logs in real-time:
```bash
tail -f storage/logs/laravel.log
```

Test endpoint:
```
https://api.bnbatiment.com/api/cloudinary/test
```

Review Laravel error logs:
```bash
ls -la storage/logs/
```

