# 🚨 URGENT: Deploy CORS Fixes to Production

## Status
✅ **Files are fixed locally** but **NOT deployed to production yet**  
❌ **Production server still has old code** - that's why you're seeing errors

---

## Files to Upload RIGHT NOW

### 1. Upload to `api.bnbatiment.com/public/` directory:

**CRITICAL FILES:**
- ✅ `Back-End/public/index.php` → **REPLACE** existing file
- ✅ `Back-End/public/.htaccess` → **REPLACE** existing file
- ✅ `Back-End/public/test-cors-headers.php` → **NEW** file (for testing)

### 2. Upload to `api.bnbatiment.com/app/Http/Middleware/`:

- ✅ `Back-End/app/Http/Middleware/CorsMiddleware.php` → **REPLACE** existing file

### 3. Upload to `api.bnbatiment.com/routes/`:

- ✅ `Back-End/routes/api.php` → **REPLACE** existing file

### 4. Upload to `api.bnbatiment.com/` root (if your subdomain points here):

- ✅ `Back-End/index_for_subdomain.php` → **REPLACE** if it exists
- ✅ `Back-End/api_index.php` → **REPLACE** if it exists

---

## Quick Upload Steps (cPanel/File Manager)

1. **Open Hostinger File Manager**
2. **Navigate to your API subdomain directory**:
   - Usually: `domains/api.bnbatiment.com/public_html/`
   - Or: `public_html/api/`
3. **Upload files** (replace when prompted):
   - `public/index.php`
   - `public/.htaccess`
   - `app/Http/Middleware/CorsMiddleware.php`
   - `routes/api.php`
4. **After upload, SSH to server** (or use terminal in cPanel)

---

## After Upload: SSH Commands

```bash
# 1. Navigate to API directory
cd /path/to/api/bnbatiment.com
# Usually: cd ~/domains/api.bnbatiment.com/public_html/
# Or: cd ~/public_html/api/

# 2. Verify files uploaded
ls -la public/index.php
ls -la public/.htaccess
ls -la app/Http/Middleware/CorsMiddleware.php

# 3. Clear ALL Laravel caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

# 4. Remove bootstrap cache manually
rm -rf bootstrap/cache/*
chmod -R 775 bootstrap/cache storage

# 5. Rebuild caches
php artisan config:cache
php artisan route:cache

# 6. Set permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

## Immediate Test After Upload

### Test 1: Simple CORS Test
Open in browser:
```
https://api.bnbatiment.com/test-cors-headers.php
```

**Expected:** JSON response with `"status": "success"`

### Test 2: API Endpoint Test
Open in browser:
```
https://api.bnbatiment.com/api/services
```

**Expected:** JSON data (not CORS error, not 404)

### Test 3: OPTIONS Preflight Test
```bash
curl -X OPTIONS \
  -H "Origin: https://www.bnbatiment.com" \
  -H "Access-Control-Request-Method: GET" \
  -v https://api.bnbatiment.com/api/services
```

**Expected:** HTTP 200 with CORS headers:
```
Access-Control-Allow-Origin: https://www.bnbatiment.com
Access-Control-Allow-Credentials: true
```

### Test 4: Frontend Test
1. Open `https://www.bnbatiment.com`
2. Open Browser DevTools (F12)
3. Check Console - should see NO CORS errors
4. Check Network tab - API requests should return data

---

## What Was Fixed

### Problem 1: `.htaccess` Hardcoded Headers
**Before:** `Header always set Access-Control-Allow-Origin "*"`  
**After:** Removed - PHP handles it dynamically

### Problem 2: Missing CORS Headers on Responses
**Before:** Headers only set sometimes  
**After:** Headers ALWAYS set, with proper origin checking

### Problem 3: Credentials Not Working
**Before:** Using `*` origin with credentials (browser rejects)  
**After:** Specific origin when credentials needed

### Problem 4: Preflight OPTIONS Not Handled
**Before:** Some OPTIONS requests failed  
**After:** All OPTIONS requests handled before Laravel loads

---

## If Still Getting Errors After Upload

### Check 1: Verify Files Are Uploaded
```bash
# SSH to server
cat public/index.php | grep "bnbatiment.com"
# Should show: 'https://www.bnbatiment.com' in allowed origins

cat public/.htaccess | grep "Access-Control-Allow-Origin"
# Should NOT show: "Header always set Access-Control-Allow-Origin"
```

### Check 2: Verify Routes Work
```bash
php artisan route:list | grep services
# Should show: GET|HEAD  api/services
```

### Check 3: Check Laravel Logs
```bash
tail -f storage/logs/laravel.log
# Watch for errors when making requests
```

### Check 4: Test Direct PHP File
Visit: `https://api.bnbatiment.com/test-cors-headers.php`  
If this works but `/api/*` doesn't, then routes aren't loading.

---

## Emergency: If Routes Still 404

### Option A: Check .htaccess is in public/
```bash
ls -la public/.htaccess
# Must exist and be readable
```

### Option B: Verify mod_rewrite is enabled
```bash
apache2ctl -M | grep rewrite
# Should show: rewrite_module (shared)
```

### Option C: Test Laravel is loading
Create `public/test-laravel.php`:
```php
<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
echo json_encode(['status' => 'Laravel loaded', 'app' => get_class($app)]);
```

Visit: `https://api.bnbatiment.com/test-laravel.php`

---

## Success Indicators

✅ `https://api.bnbatiment.com/test-cors-headers.php` returns JSON  
✅ `https://api.bnbatiment.com/api/services` returns data  
✅ `https://www.bnbatiment.com` has no CORS errors in console  
✅ Login works at `https://www.bnbatiment.com/admin/login`  
✅ Network tab shows CORS headers on API responses

---

## Need Help?

1. Check file permissions: `ls -la public/`
2. Check PHP error logs: Check hosting panel for error logs
3. Test individual files: Upload `test-cors-headers.php` and verify it works
4. Check Apache/Nginx config: Verify document root is set to `public/`

---

**REMEMBER:** The fixes are done locally. You MUST upload these files to production for them to work!

