# 🚀 Deploy Cloudinary Upload Fix - Step by Step

## ⚠️ IMPORTANT: Files to Upload to Production

Upload these 3 files to your production server:

### File 1: `Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php`
**Destination:** `/domains/bnbatiment.com/public_html/Back-End/app/Http/Controllers/Api/`

### File 2: `Back-End/config/filesystems.php`
**Destination:** `/domains/bnbatiment.com/public_html/Back-End/config/`

### File 3: `Back-End/routes/api.php`
**Destination:** `/domains/bnbatiment.com/public_html/Back-End/routes/`

---

## 📦 Method 1: Upload via File Manager (Easiest)

1. **Go to Hostinger File Manager:**
   - Visit https://hpanel.hostinger.com/
   - Login
   - Select bnbatiment.com
   - Click "File Manager"

2. **Upload the files:**
   - Navigate to `Back-End/app/Http/Controllers/Api/`
   - Upload `CloudinaryUploadController.php` (replace existing)
   - Navigate to `Back-End/config/`
   - Upload `filesystems.php` (replace existing)
   - Navigate to `Back-End/routes/`
   - Upload `api.php` (replace existing)

3. **After uploading, SSH into server and run these commands:**

```bash
ssh -p 65002 u696043789@212.85.28.110
cd domains/bnbatiment.com/public_html/Back-End

# Install/update dependencies
composer install --no-dev

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
rm -rf bootstrap/cache/*

# Rebuild caches
php artisan config:cache
php artisan route:cache

# Test the route exists
php artisan route:list | grep cloudinary

exit
```

---

## 🔧 Method 2: Upload via SCP (Command Line)

**From your local computer (PowerShell on Windows):**

```powershell
# Navigate to project directory
cd "F:\Couvreur project"

# Upload CloudinaryUploadController.php
scp -P 65002 "Back-End\app\Http\Controllers\Api\CloudinaryUploadController.php" u696043789@212.85.28.110:domains/bnbatiment.com/public_html/Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php

# Upload filesystems.php
scp -P 65002 "Back-End\config\filesystems.php" u696043789@212.85.28.110:domains/bnbatiment.com/public_html/Back-End/config/filesystems.php

# Upload api.php
scp -P 65002 "Back-End\routes\api.php" u696043789@212.85.28.110:domains/bnbatiment.com/public_html/Back-End/routes/api.php
```

**Then SSH and run the same commands as Method 1.**

---

## ✅ Verification

After uploading and running the commands, test the endpoint:

```bash
curl -X POST https://api.bnbatiment.com/api/cloudinary/upload
```

You should get a validation error (not 404 or 500), which means the route is working.

---

## 🧪 Test from Front-End

1. Go to https://www.bnbatiment.com/admin/services
2. Click "Ajouter un service" or edit existing service
3. Click "Upload Image"
4. Select an image file
5. The upload should work without 500 error

---

## 🔍 If You Still Get 500 Error

### Check Laravel Logs:
```bash
ssh -p 65002 u696043789@212.85.28.110
cd domains/bnbatiment.com/public_html/Back-End
tail -f storage/logs/laravel.log
```

Look for Cloudinary-related errors. Common issues:
- CLOUDINARY_URL not set in .env
- Composer dependencies not updated
- Cache not cleared properly

### Check .env Configuration:
```bash
cat .env | grep CLOUDINARY
```

Should show:
```
CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1
```

If not set, add it:
```bash
echo "CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1" >> .env
php artisan config:cache
```

---

## 📝 Summary

**Files Changed:**
- ✓ `CloudinaryUploadController.php` - Uses `uploadFile()` method
- ✓ `filesystems.php` - Added Cloudinary disk config
- ✓ `routes/api.php` - Has the upload route

**What to do:**
1. Upload 3 files to production
2. Run `composer install --no-dev`
3. Clear and rebuild caches
4. Test upload functionality

**If still not working:**
- Check Laravel logs for error details
- Verify CLOUDINARY_URL in .env
- Make sure composer dependencies are installed

