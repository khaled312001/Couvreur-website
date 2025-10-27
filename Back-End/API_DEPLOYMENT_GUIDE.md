# API Deployment Guide - Fixing CORS Issues

## Problem
The API at `https://api.bnbatiment.com` is not responding properly due to CORS configuration issues.

## Changes Made

### 1. Updated `public/index.php`
- Added CORS header handling before Laravel loads
- Added preflight OPTIONS request handling
- Added CORS headers to all responses

### 2. Updated `public/.htaccess`
- Removed conflicting CORS header rules
- Simplified to let PHP handle CORS dynamically

### 3. Updated `index_for_subdomain.php`
- Added proper CORS header handling
- Fixed response header injection

## Deployment Steps

### On Your Server (Hostinger/cPanel)

1. **Upload all modified files:**
   - `Back-End/public/index.php`
   - `Back-End/public/.htaccess`
   - `Back-End/index_for_subdomain.php`
   - `Back-End/.htaccess`

2. **Clear Laravel cache:**
   ```bash
   cd /path/to/Back-End
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   ```

3. **Test the API:**
   ```bash
   # Test from command line
   curl -H "Origin: https://www.bnbatiment.com" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://api.bnbatiment.com/api/test-cors
   
   # Test actual GET request
   curl -H "Origin: https://www.bnbatiment.com" \
        https://api.bnbatiment.com/api/blog
   ```

4. **Check in browser:**
   - Open `https://www.bnbatiment.com`
   - Open browser console
   - Try to access API endpoints
   - Verify no CORS errors

## Alternative: If API Subdomain Points to Public Directory

If your hosting setup makes `api.bnbatiment.com` point to the `public` directory (which is standard), then:

1. The `public/index.php` file should handle everything
2. No need for `index_for_subdomain.php`
3. Just ensure the `public/.htaccess` is correct (already fixed)

## Troubleshooting

### If still getting CORS errors:

1. **Check server configuration:**
   - Ensure the API subdomain document root is set to `public` directory
   - Verify mod_headers is enabled in Apache

2. **Test CORS headers:**
   ```bash
   curl -I -H "Origin: https://www.bnbatiment.com" \
        https://api.bnbatiment.com/api/test-cors
   ```
   
   Should return headers:
   ```
   Access-Control-Allow-Origin: https://www.bnbatiment.com
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
   Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN
   Access-Control-Allow-Credentials: true
   ```

3. **Check Laravel log:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

### If the API returns 404:

1. **Check .htaccess:**
   - Ensure the `public/.htaccess` file exists
   - Verify mod_rewrite is enabled

2. **Check routes:**
   ```bash
   php artisan route:list | grep api
   ```

3. **Test with simple endpoint:**
   Visit: `https://api.bnbatiment.com/api/test-cors`
   Should return JSON: `{"message": "CORS is working!", ...}`

## Files Modified

1. `public/index.php` - Main entry point with CORS handling
2. `public/.htaccess` - Simplified Apache configuration
3. `index_for_subdomain.php` - Alternative entry point if subdomain points to root
4. `.htaccess` - Root level htaccess

## Next Steps

After deployment, test these endpoints:
- `https://api.bnbatiment.com/api/test-cors`
- `https://api.bnbatiment.com/api/blog`
- `https://api.bnbatiment.com/api/services`
- `https://api.bnbatiment.com/api/testimonials`

All should return proper JSON responses with CORS headers.
