# Deploy Cloudinary Upload Fix to Production

## Problem
The Cloudinary upload was failing with a 500 error because the controller was using incorrect API methods:
- `Cloudinary::uploadFile()` - doesn't exist
- `Cloudinary::destroy()` - incorrect usage

## Solution
Updated the controller to use the correct Cloudinary API methods:
- `Cloudinary::uploadApi()->upload()` - correct upload method
- `Cloudinary::adminApi()->deleteAssets()` - correct delete method
- Response is an array, not an object with getter methods

## Files Changed
- ✅ `Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php`

## Deployment Steps

### 1. SSH into Your Production Server
```bash
ssh username@your-server-ip
```

### 2. Navigate to Backend Directory
```bash
cd /path/to/Couvreur\ project/Back-End
```

### 3. Pull Latest Code (if using git)
```bash
git pull origin main
```

### 4. OR Upload the Fixed File
If not using git, upload `CloudinaryUploadController.php` to:
```
Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php
```

### 5. Clear Laravel Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
```

### 6. Restart PHP Service (if applicable)
```bash
# For Apache
sudo systemctl restart apache2

# OR for PHP-FPM
sudo systemctl restart php8.1-fpm  # or php8.2-fpm
```

### 7. Test the Upload Endpoint
Test the upload endpoint to verify it's working:
```bash
curl -X POST https://api.bnbatiment.com/api/cloudinary/upload \
  -F "image=@/path/to/test-image.jpg"
```

## What Was Fixed

### Before (Broken):
```php
$uploadResult = Cloudinary::uploadFile($path, [
    'folder' => 'bnbatiment/services',
    'resource_type' => 'image',
]);

$secureUrl = $uploadResult->getSecurePath(); // Error: array has no getter methods
```

### After (Fixed):
```php
$uploadResult = Cloudinary::uploadApi()->upload($path, [
    'folder' => 'bnbatiment/services',
    'resource_type' => 'image',
]);

$secureUrl = $uploadResult['secure_url'] ?? $uploadResult['url'] ?? null; // Correct array access
```

## Testing
After deployment, test the image upload in the admin panel:
1. Go to https://www.bnbatiment.com/admin/services
2. Click "Edit" on any service
3. Try uploading a new image
4. Verify the image uploads successfully to Cloudinary

## Rollback (if needed)
If something goes wrong, you can rollback by:
1. Restoring the previous version of CloudinaryUploadController.php from backup
2. Running `php artisan cache:clear`
3. Restarting the PHP service

## Notes
- The Cloudinary credentials are already configured in production
- No environment variables need to be changed
- The frontend doesn't need to be updated
- The fix only affects the backend upload functionality

