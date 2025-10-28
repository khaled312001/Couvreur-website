# Deploy Cloudinary Integration to Production

## Files Updated for Cloudinary Integration

### Backend Files:
1. ✅ `Back-End/composer.json` - Added Cloudinary package
2. ✅ `Back-End/composer.lock` - Updated dependencies
3. ✅ `Back-End/config/cloudinary.php` - Cloudinary configuration
4. ✅ `Back-End/app/Http/Controllers/Api/CloudinaryUploadController.php` - Upload controller
5. ✅ `Back-End/routes/api.php` - Added upload routes

### Frontend Files:
1. ✅ `Front-End/src/components/ImageUpload.jsx` - Upload component
2. ✅ `Front-End/src/pages/Admin/ServicesAdmin.jsx` - Updated to use Cloudinary
3. ✅ `Front-End/src/pages/Services/Services.jsx` - Support Cloudinary URLs

### Cloudinary Credentials:
- Cloud Name: `dxyczvtd1`
- API Key: `667964626244861`
- API Secret: `Q-W2KrzSH4wMSTxYlvgSmBAG77s`
- URL: `cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1`

## Deployment Steps for Production Server:

### 1. SSH into Your Production Server
```bash
ssh username@your-server-ip
cd /path/to/your/project
```

### 2. Pull the Latest Code
```bash
git pull origin main
```

### 3. Install Backend Dependencies
```bash
cd Back-End
composer install
composer require cloudinary-labs/cloudinary-laravel
```

### 4. Publish Cloudinary Configuration
```bash
php artisan vendor:publish --provider="CloudinaryLabs\CloudinaryLaravel\CloudinaryServiceProvider"
```

### 5. Update Environment Variables (if needed)
Add to your `.env` file:
```env
CLOUDINARY_URL=cloudinary://667964626244861:Q-W2KrzSH4wMSTxYlvgSmBAG77s@dxyczvtd1
CLOUDINARY_UPLOAD_PRESET=bnbatiment_services
```

### 6. Clear Laravel Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### 7. Rebuild Frontend
```bash
cd ../Front-End
npm install
npm run build
```

### 8. Upload Frontend Build
Copy the `Front-End/dist` folder contents to your web server's public directory (www.bnbatiment.com)

### 9. Restart PHP Service (if using PHP-FPM)
```bash
sudo systemctl restart php8.2-fpm
# or
sudo service php-fpm restart
```

## Verify Deployment:

### Test the Upload Endpoint:
```bash
curl -X POST https://api.bnbatiment.com/api/cloudinary/upload \
  -F "image=@test-image.jpg"
```

### Test in Admin Panel:
1. Go to https://www.bnbatiment.com/admin/services
2. Click "Add Service" or edit an existing service
3. Click "Upload Image" under the Cloudinary upload section
4. Select an image
5. Image should upload and display successfully

## Routes Added:
- ✅ `POST /api/cloudinary/upload` - Upload image to Cloudinary
- ✅ `DELETE /api/cloudinary/upload` - Delete image from Cloudinary
- ✅ `OPTIONS /api/cloudinary/upload` - CORS preflight

## Troubleshooting:

If you get a 404 error:
1. Check routes are registered: `php artisan route:list | grep cloudinary`
2. Clear route cache: `php artisan route:clear`
3. Check composer dependencies: `composer show cloudinary-labs/cloudinary-laravel`

If upload fails:
1. Check Cloudinary credentials in `config/cloudinary.php`
2. Check logs: `tail -f storage/logs/laravel.log`
3. Verify internet connectivity from server
4. Check Cloudinary dashboard for uploaded images

## Production Checklist:
- [ ] Backend deployed with new routes
- [ ] Composer dependencies installed
- [ ] Cloudinary configuration published
- [ ] Frontend built and deployed
- [ ] Routes cleared and refreshed
- [ ] PHP service restarted
- [ ] Upload endpoint tested
- [ ] Admin panel tested
- [ ] Images displaying correctly

