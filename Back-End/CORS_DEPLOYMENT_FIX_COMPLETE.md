# CORS Fix - Complete Deployment Guide

## Problem
CORS errors when accessing `https://api.bnbatiment.com` from `https://www.bnbatiment.com`:
- "No 'Access-Control-Allow-Origin' header is present"
- 404 errors on API endpoints

## Root Cause
1. `.htaccess` was hardcoding `Access-Control-Allow-Origin: *` which conflicts with dynamic origin checking
2. Entry points (`index_for_subdomain.php`, `api_index.php`) weren't properly handling CORS for allowed origins
3. Credentials require specific origin (not wildcard), but the code was using `*`

## Files Fixed

### 1. `public/.htaccess`
- ✅ Removed hardcoded `Access-Control-Allow-Origin: *` 
- ✅ Removed hardcoded `Access-Control-Allow-Credentials: false`
- ✅ Kept static headers (methods, headers, max-age)
- ✅ Added comments explaining dynamic handling

### 2. `public/index.php`
- ✅ Enhanced origin detection (multiple fallback methods)
- ✅ Proper preflight OPTIONS handling with credentials support
- ✅ Dynamic origin validation against allowed list
- ✅ Proper credentials header only when origin is allowed

### 3. `app/Http/Middleware/CorsMiddleware.php`
- ✅ Consistent origin checking logic
- ✅ Proper credentials handling
- ✅ Fallback for unknown origins

### 4. `routes/api.php`
- ✅ Updated OPTIONS route handler
- ✅ Updated `/upload` OPTIONS handler
- ✅ Consistent CORS logic across all handlers

### 5. `index_for_subdomain.php`
- ✅ Enhanced origin detection
- ✅ Proper preflight handling
- ✅ Dynamic response headers

### 6. `api_index.php`
- ✅ Enhanced origin detection
- ✅ Proper preflight handling
- ✅ Fixed path to `public/index.php`

## Deployment Steps

### Step 1: Upload Files
Upload these files to your production server:

```
Back-End/public/index.php              → public/index.php
Back-End/public/.htaccess              → public/.htaccess
Back-End/app/Http/Middleware/CorsMiddleware.php → app/Http/Middleware/CorsMiddleware.php
Back-End/routes/api.php                → routes/api.php
Back-End/index_for_subdomain.php      → index_for_subdomain.php (if used)
Back-End/api_index.php                 → api_index.php (if used)
```

### Step 2: SSH to Server
```bash
ssh your_server
cd /path/to/your/api/directory
```

### Step 3: Clear All Caches
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

# Remove bootstrap cache
rm -rf bootstrap/cache/*
```

### Step 4: Rebuild Caches
```bash
php artisan config:cache
php artisan route:cache
```

### Step 5: Set Permissions
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Step 6: Test CORS
```bash
# Test preflight OPTIONS request
curl -X OPTIONS \
  -H "Origin: https://www.bnbatiment.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v https://api.bnbatiment.com/api/auth/login

# Should return:
# Access-Control-Allow-Origin: https://www.bnbatiment.com
# Access-Control-Allow-Credentials: true
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
# HTTP/1.1 200 OK

# Test actual login endpoint
curl -X POST \
  -H "Origin: https://www.bnbatiment.com" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' \
  -v https://api.bnbatiment.com/api/auth/login

# Should return JSON response with CORS headers
```

### Step 7: Browser Test
1. Open `https://www.bnbatiment.com/admin/login`
2. Open Browser DevTools (F12)
3. Try to login
4. Check Network tab - should see:
   - OPTIONS preflight request returns 200
   - POST request succeeds with CORS headers
   - No CORS errors in console

## Allowed Origins
The following origins are configured to work with credentials:
- `https://www.bnbatiment.com` ✅
- `https://bnbatiment.com` ✅
- `http://localhost:3000` (development)
- `http://localhost:5173` (development)
- `http://127.0.0.1:3000` (development)
- `http://127.0.0.1:5173` (development)

## Expected Behavior

### For Allowed Origins (e.g., https://www.bnbatiment.com):
```
Access-Control-Allow-Origin: https://www.bnbatiment.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN
```

### For Unknown Origins:
```
Access-Control-Allow-Origin: <echo-back-origin-or-wildcard>
(no credentials header)
```

## Troubleshooting

### If still getting CORS errors:

1. **Verify files are uploaded correctly:**
   ```bash
   cat public/index.php | grep "bnbatiment.com"
   cat public/.htaccess | grep "Access-Control"
   ```

2. **Check Apache mod_headers is enabled:**
   ```bash
   apache2ctl -M | grep headers
   # Should show: headers_module (shared)
   ```

3. **Check Laravel logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

4. **Verify routes are registered:**
   ```bash
   php artisan route:list | grep auth/login
   ```

### If getting 404 errors:

1. **Check .htaccess exists:**
   ```bash
   ls -la public/.htaccess
   ```

2. **Check mod_rewrite is enabled:**
   ```bash
   apache2ctl -M | grep rewrite
   ```

3. **Test simple endpoint:**
   ```
   https://api.bnbatiment.com/api/test-cors
   ```
   Should return: `{"message": "CORS is working!", ...}`

4. **Check API subdomain configuration:**
   - Verify `api.bnbatiment.com` points to `public` directory
   - Or verify it uses the correct entry point file

### If credentials still not working:

1. **Verify frontend sends credentials:**
   ```javascript
   fetch('https://api.bnbatiment.com/api/auth/login', {
     method: 'POST',
     credentials: 'include',  // ← Must be set
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ email, password })
   })
   ```

2. **Check response headers in Network tab:**
   - Must see: `Access-Control-Allow-Credentials: true`
   - Must NOT see: `Access-Control-Allow-Origin: *`

## Quick Verification Checklist

- [ ] All files uploaded to server
- [ ] Laravel cache cleared
- [ ] Route cache rebuilt
- [ ] Permissions set correctly
- [ ] OPTIONS preflight returns 200 with correct headers
- [ ] POST requests include CORS headers
- [ ] Browser console shows no CORS errors
- [ ] Login functionality works

## Contact Points

If issues persist:
1. Check server error logs
2. Check Laravel logs (`storage/logs/laravel.log`)
3. Verify `.env` file has correct `APP_URL`
4. Test with curl commands above
5. Verify Apache/nginx configuration

---

**Last Updated:** $(date)
**Status:** Ready for Production Deployment

