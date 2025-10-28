# 🔧 Cloudinary Configuration Fix - Production Server

## ⚠️ Problem
Image upload failing with **500 Internal Server Error** on production:
```
POST https://api.bnbatiment.com/api/cloudinary/upload 500 (Internal Server Error)
Upload error details: {message: 'Server Error'}
```

## 🎯 Root Cause
**Cloudinary credentials are NOT configured in the production `.env` file**

The controller is checking for `CLOUDINARY_URL` but it's missing from the production environment configuration.

---

## ✅ Solution: Add Cloudinary Credentials to Production

### Step 1: Get Your Cloudinary Credentials

1. **Login to Cloudinary Dashboard:**
   - Go to: https://cloudinary.com/console
   - Login with your account

2. **Copy the CLOUDINARY_URL:**
   - You'll see a section called "Product Environment Credentials"
   - Copy the **entire** `CLOUDINARY_URL` 
   - It looks like: `cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

   Example format:
   ```
   cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz@your-cloud-name
   ```

### Step 2: Add Credentials to Production .env File

#### Option A: Via Hostinger File Manager (EASIEST)

1. Login to **Hostinger Control Panel**
2. Go to **File Manager**
3. Navigate to: `public_html/Back-End/`
4. Find the `.env` file (you may need to show hidden files)
5. Click **Edit**
6. Add these lines at the end of the file:

```env
# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://YOUR_API_KEY:YOUR_API_SECRET@YOUR_CLOUD_NAME
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

7. **Replace** the values with your actual Cloudinary credentials
8. Click **Save**

#### Option B: Via SSH

```bash
# SSH into your server
ssh your-server

# Navigate to Back-End directory
cd public_html/Back-End

# Edit .env file
nano .env

# Add the Cloudinary configuration at the end:
CLOUDINARY_URL=cloudinary://YOUR_API_KEY:YOUR_API_SECRET@YOUR_CLOUD_NAME
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Save: Ctrl+X, then Y, then Enter
```

### Step 3: Clear Laravel Cache

**IMPORTANT:** After modifying `.env`, you MUST clear the cache!

Via SSH:
```bash
cd public_html/Back-End

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
```

Or via Hostinger Terminal (if SSH not available):
- Go to Hostinger Control Panel → **Advanced** → **Terminal**
- Run the commands above

### Step 4: Verify Configuration

Test if Cloudinary is configured:
```bash
# Via browser, visit:
https://api.bnbatiment.com/api/cloudinary/test
```

You should see:
```json
{
  "success": true,
  "cloudinary_configured": true,
  "message": "Cloudinary is properly configured"
}
```

---

## 🧪 Testing the Upload

1. Go to: https://www.bnbatiment.com/admin/services
2. Click **Edit** on any service
3. In the modal, you'll see the **ImageUpload component**
4. Click to upload an image
5. Select an image file (JPEG, PNG, GIF, or WebP)
6. It should upload successfully and show the image preview
7. Click **Save** to update the service

---

## 📋 Complete Production .env Template

Your production `.env` file should include:

```env
APP_NAME="BN Bâtiment"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://api.bnbatiment.com

LOG_CHANNEL=stack
LOG_LEVEL=error

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u696043789_bnbatiment
DB_USERNAME=u696043789_bnbatiment
DB_PASSWORD=support@Passord123

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=mail.bnbatiment.com
MAIL_PORT=587
MAIL_USERNAME=support@bnbatiment.com
MAIL_PASSWORD=support@Passord123
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="support@bnbatiment.com"
MAIL_FROM_NAME="BN Bâtiment"

# Cloudinary Configuration ⭐ ADD THIS
CLOUDINARY_URL=cloudinary://YOUR_API_KEY:YOUR_API_SECRET@YOUR_CLOUD_NAME
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Session & Cache
SESSION_DRIVER=file
SESSION_LIFETIME=120
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

---

## 🔍 Troubleshooting

### 1. Still Getting 500 Error After Adding Credentials?

Check the Laravel logs:
```bash
cd public_html/Back-End
tail -f storage/logs/laravel.log
```

Then try uploading again and watch for error messages.

### 2. Can't Find .env File?

If `.env` doesn't exist on production:
1. Copy from `.env.example`
2. Or create a new one with the template above

```bash
cd public_html/Back-End
cp .env.example .env
nano .env
# Add all configurations including Cloudinary
```

### 3. "Cloudinary not configured" Error?

This means the `CLOUDINARY_URL` is not set or invalid:
- Double-check you copied the entire URL from Cloudinary dashboard
- Make sure there are NO spaces in the URL
- Verify format: `cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

### 4. Upload Works But Image Not Showing?

The image is uploaded to Cloudinary successfully, but ensure:
- The service is saved properly
- The Home page and Services page are displaying images
- Clear your browser cache (Ctrl+F5)

---

## ✨ What Was Fixed in the Code

### 1. **ServicesAdmin.jsx** - Admin Panel
- ✅ Replaced URL input with `ImageUpload` component
- ✅ Properly handles Cloudinary URLs
- ✅ Shows image preview in Edit modal
- ✅ Works in both Add and Edit modals

### 2. **services.js** - API Client
- ✅ Keeps Cloudinary URLs when updating services
- ✅ Properly sends image data to backend

### 3. **CloudinaryUploadController.php** - Backend
- ✅ Already properly configured
- ✅ Just needs credentials in .env

### 4. **Home.jsx & Services.jsx** - Frontend Pages
- ✅ Already displaying Cloudinary images correctly
- ✅ Fallback to default images if needed

---

## 📸 Expected Behavior After Fix

1. **Admin Panel:**
   - Edit service → Upload image → See preview instantly
   - Save → Image URL stored in database
   - Image displays in service card

2. **Frontend:**
   - Home page shows service images from Cloudinary
   - Services page shows service images from Cloudinary
   - Service detail page shows images correctly

3. **All Pages:**
   - Images load fast from Cloudinary CDN
   - Automatic image optimization
   - Responsive images

---

## 🎯 Quick Checklist

- [ ] Get Cloudinary credentials from dashboard
- [ ] Add `CLOUDINARY_URL` to production `.env`
- [ ] Clear Laravel caches (`php artisan config:clear`)
- [ ] Test: Visit https://api.bnbatiment.com/api/cloudinary/test
- [ ] Test: Upload image in admin panel
- [ ] Verify: Image shows on frontend pages

---

## 🆘 Need Help?

If you're still having issues:
1. Share the error from `storage/logs/laravel.log`
2. Verify Cloudinary test endpoint response
3. Check browser console for any JavaScript errors

---

**Once Cloudinary is configured, the entire image upload system will work perfectly! 🎉**

