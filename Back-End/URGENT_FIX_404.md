# 🚨 URGENT: Fix 404 Error on Test File

## Current Problem
- ❌ `https://api.bnbatiment.com/test-cors-simple.php` → 404
- ❌ `https://api.bnbatiment.com/test-cors-headers.php` → 404

## Step 1: Run Diagnostic

1. **Upload this file:** `Back-End/diagnose-api-structure.php`
2. **Upload location:** `public_html/api/diagnose-api-structure.php` (same level as `Back-End/` folder)
3. **Access it:** `https://api.bnbatiment.com/diagnose-api-structure.php`

This will show you:
- ✅ Exact document root location
- ✅ Where Laravel files are
- ✅ Where to upload test files

## Step 2: Check Subdomain Configuration

### Option A: In Hostinger hPanel
1. Login to Hostinger hPanel
2. Go to **Domains** → **Subdomains**
3. Find `api.bnbatiment.com`
4. Check **Document Root** field
5. Note the exact path (e.g., `public_html/api` or `public_html/api/Back-End/public`)

### Option B: Check via SSH
```bash
# SSH to your server
cd ~

# Find subdomain configuration
grep -r "api.bnbatiment.com" /etc/apache2/ 2>/dev/null
# Or
grep -r "api.bnbatiment.com" ~/.ssh/ 2>/dev/null

# Check document root
echo $DOCUMENT_ROOT

# List contents of API directory
ls -la ~/public_html/api/
ls -la ~/public_html/api/Back-End/public/ 2>/dev/null
```

## Step 3: Upload Test File to Correct Location

### If Document Root = `public_html/api/`:
```
Upload: Back-End/test-cors-simple.php
To: public_html/api/test-cors-simple.php
Test: https://api.bnbatiment.com/test-cors-simple.php
```

### If Document Root = `public_html/api/Back-End/public/`:
```
Upload: Back-End/test-cors-simple.php  
To: public_html/api/Back-End/public/test-cors-simple.php
Test: https://api.bnbatiment.com/test-cors-simple.php
```

### If Document Root = Something Else:
Use the diagnostic file output to determine correct location.

## Step 4: Check .htaccess Rules

The `.htaccess` file might be blocking PHP files outside Laravel routes.

### Check if there's an .htaccess in API root:
```bash
ls -la ~/public_html/api/.htaccess
cat ~/public_html/api/.htaccess
```

If it exists and has rewrite rules, temporarily rename it:
```bash
mv ~/public_html/api/.htaccess ~/public_html/api/.htaccess.backup
# Test if file works now
# If yes, the .htaccess was blocking it
```

## Step 5: Alternative - Test Laravel Route

Instead of root-level PHP files, test if Laravel routes work:

1. **Access:** `https://api.bnbatiment.com/api/test-cors`
2. **Or:** `https://api.bnbatiment.com/api/services`

If these work, then Laravel is working and you just need to:
- Upload CORS fixes to `Back-End/public/index.php`
- Upload CORS fixes to `Back-End/public/.htaccess`

## Common Issues & Solutions

### Issue 1: .htaccess Rewrite Rules
**Problem:** `.htaccess` redirects all requests to `index.php`

**Solution:** Either:
- Upload test file to a subdirectory not affected by rewrite
- OR test via Laravel route instead

### Issue 2: Wrong Document Root
**Problem:** Subdomain points to wrong directory

**Solution:** 
- Check subdomain settings in hPanel
- Update document root to correct path
- OR move files to match current document root

### Issue 3: File Permissions
**Problem:** File exists but not readable

**Solution:**
```bash
chmod 644 ~/public_html/api/test-cors-simple.php
chown www-data:www-data ~/public_html/api/test-cors-simple.php
```

### Issue 4: PHP Not Processing
**Problem:** File returns as plain text or downloads

**Solution:** Check PHP is enabled for subdomain

## Quick Test Commands (SSH)

```bash
# Navigate to API directory
cd ~/public_html/api

# Check if test file exists
ls -la test-cors-simple.php

# Check file content
head -5 test-cors-simple.php

# Test PHP execution
php test-cors-simple.php

# Check Apache/Nginx config
apache2ctl -S 2>/dev/null | grep api.bnbatiment
# Or for nginx:
nginx -T 2>/dev/null | grep api.bnbatiment
```

## If Still 404 After Diagnostic

1. **Share the diagnostic output** - it will show exact paths
2. **Check Laravel routes work** - test `/api/services`
3. **Skip test file** - just upload main CORS fixes directly:
   - `Back-End/public/index.php` → `Back-End/public/index.php`
   - `Back-End/public/.htaccess` → `Back-End/public/.htaccess`

The CORS fixes in `public/index.php` will work once uploaded, regardless of test file location.

---

**Most Important:** Upload the diagnostic file first - it will tell us exactly where everything needs to go!

