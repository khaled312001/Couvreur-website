# CORS Fix Deployment Guide

## Problem
Your frontend at `www.bnbatiment.com` is getting CORS errors when trying to access the API at `api.bnbatiment.com`.

## Root Cause
The issue was caused by conflicting CORS configurations:
1. Laravel middleware was setting specific CORS headers
2. `.htaccess` file was setting conflicting CORS headers with `*` origin
3. The middleware wasn't being applied correctly

## Files Modified

### 1. Back-End/public/.htaccess
- Added header unset commands to remove conflicting CORS headers
- Let Laravel handle CORS properly

### 2. Back-End/app/Http/Middleware/CorsMiddleware.php
- Updated to include PATCH method
- Added X-XSRF-TOKEN header
- Improved origin handling

### 3. Back-End/config/cors.php
- Added multiple allowed origins including non-www version
- Added localhost for development

### 4. Back-End/public/index.php
- Added CORS headers as a fallback
- Ensures headers are always set even if middleware fails

### 5. Back-End/routes/api.php
- Added `/cors-test` endpoint for testing

## Deployment Steps

1. **Upload the modified files** to your server:
   - `Back-End/public/.htaccess`
   - `Back-End/app/Http/Middleware/CorsMiddleware.php`
   - `Back-End/config/cors.php`
   - `Back-End/public/index.php`
   - `Back-End/routes/api.php`

2. **Clear Laravel cache** (if you have SSH access):
   ```bash
   php artisan config:clear
   php artisan route:clear
   php artisan cache:clear
   ```

3. **Test the CORS fix**:
   - Visit: `https://api.bnbatiment.com/api/cors-test`
   - Should return JSON with CORS headers

4. **Test from frontend**:
   - Open browser console on `www.bnbatiment.com`
   - Try: `fetch('https://api.bnbatiment.com/api/cors-test')`
   - Should work without CORS errors

## Verification

After deployment, test these endpoints:
- `https://api.bnbatiment.com/api/cors-test`
- `https://api.bnbatiment.com/api/services`
- `https://api.bnbatiment.com/api/gallery`
- `https://api.bnbatiment.com/api/blog`
- `https://api.bnbatiment.com/api/testimonials`

All should return proper CORS headers and work from your frontend.

## Environment Variables

Make sure your `.env` file on the server has:
```
CORS_ALLOWED_ORIGINS=https://bnbatiment.com,https://www.bnbatiment.com,https://couvreur-website-4kv5.vercel.app
```

## Troubleshooting

If CORS still doesn't work:

1. Check server logs for errors
2. Verify `.htaccess` is being read (Apache)
3. Test with `curl -H "Origin: https://www.bnbatiment.com" -H "Access-Control-Request-Method: GET" -X OPTIONS https://api.bnbatiment.com/api/cors-test`
4. Check if your hosting provider has additional CORS restrictions 