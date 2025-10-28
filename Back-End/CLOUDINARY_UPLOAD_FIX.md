# Cloudinary Upload Fix - Deployment Guide

## Problem
Getting 500 Internal Server Error when uploading images to Cloudinary

## Root Causes (Most Likely)
1. Cloudinary credentials not configured in production .env file
2. PHP file upload settings not properly configured
3. Cloudinary package not properly installed

## Quick Fix Steps

### STEP 1: Update the Upload Controller
The file `Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php` has been updated with better error handling.

### STEP 2: Upload to Server

**Via File Manager:**
1. Go to: https://hpanel.hostinger.com/
2. Select "bnbatiment.com"
3. File Manager
4. Navigate to: `domains/bnbatiment.com/public_html/Back-End/app/Http/Controllers/Api/`
5. Upload: `CloudinaryUploadController.php`

**OR via SSH:**
```bash
cd domains/bnbatiment.com/public_html/Back-End
# Copy the updated file here
```

### STEP 3: Check .env Configuration

**Connect via SSH:**
```bash
cd domains/bnbatiment.com/public_html/Back-End
cat .env | grep CLOUDINARY
```

**Expected output:**
```
CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1
```

**If missing, add it:**
```bash
echo "CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1" >> .env
```

### STEP 4: Check PHP Upload Settings

**Connect via SSH:**
```bash
cd domains/bnbatiment.com/public_html/Back-End
php -i | grep -E "upload_max_filesize|post_max_size|memory_limit"
```

**Expected (or better):**
- upload_max_filesize: 10M or higher
- post_max_size: 10M or higher
- memory_limit: 256M or higher

**If not, contact support or modify php.ini**

### STEP 5: Clear Cache

```bash
cd domains/bnbatiment.com/public_html/Back-End

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Remove bootstrap cache
rm -rf bootstrap/cache/*
chmod -R 775 bootstrap/cache
chmod -R 775 storage

# Re-cache
php artisan config:cache
php artisan route:cache
```

### STEP 6: Test the Upload

1. Visit: https://www.bnbatiment.com/admin/services
2. Try uploading an image
3. Check the browser console for detailed error messages

### STEP 7: Check Server Logs

**If still failing, check logs:**
```bash
cd domains/bnbatiment.com/public_html/Back-End
tail -n 50 storage/logs/laravel.log
```

Look for:
- "Cloudinary upload started" - shows the upload attempt
- "Cloudinary upload error" - shows the specific error
- Check if CLOUDINARY_URL is set

## Common Issues & Solutions

### Issue 1: "Cloudinary URL is not configured"
**Solution:** Add CLOUDINARY_URL to .env file (see STEP 3)

### Issue 2: "File not readable"
**Solution:** Check PHP upload settings (see STEP 4)

### Issue 3: "Class Cloudinary not found"
**Solution:** Reinstall Cloudinary package
```bash
cd domains/bnbatiment.com/public_html/Back-End
composer require cloudinary-labs/cloudinary-laravel
php artisan config:cache
```

### Issue 4: Upload size too large
**Solution:** Increase PHP limits
Create `.user.ini` file in public_html/Back-End:
```
upload_max_filesize = 10M
post_max_size = 10M
memory_limit = 256M
```

## Testing Endpoint

After deployment, test with curl:
```bash
curl -X POST https://api.bnbatiment.com/api/cloudinary/upload \
  -F "image=@path/to/test-image.jpg" \
  -v
```

## Need More Help?

1. Check Laravel logs: `tail -f storage/logs/laravel.log`
2. Check PHP error logs
3. Verify Cloudinary account is active: https://cloudinary.com/
4. Test Cloudinary credentials work

## Deployment Checklist

- [ ] Upload updated CloudinaryUploadController.php
- [ ] Verify CLOUDINARY_URL in .env
- [ ] Clear all caches
- [ ] Set proper permissions on bootstrap/cache and storage
- [ ] Test upload functionality
- [ ] Check logs if errors occur

