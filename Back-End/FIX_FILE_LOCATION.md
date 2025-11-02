# 🔧 Fix File Location for Test File

## Current Problem

Your file is at:
```
public_html/api/Back-End/public/test-cors-headers.php
```

But you're trying to access it at:
- ❌ `https://api.bnbatiment.com/test-cors-headers.php` → 404
- ❌ `https://www.bnbatiment.com/test-cors-headers.php` → 404 (wrong domain)

## Solution

The `api.bnbatiment.com` subdomain document root needs to be configured correctly. Here are your options:

### Option 1: Upload to API Subdomain Root (RECOMMENDED)

**Upload the test file to:**
```
public_html/api/test-cors-simple.php
```

**Access it at:**
```
https://api.bnbatiment.com/test-cors-simple.php
```

### Option 2: If API Points to Back-End/public/

If `api.bnbatiment.com` is configured to point to `Back-End/public/`:

**Keep the file at:**
```
public_html/api/Back-End/public/test-cors-headers.php
```

**Access it at:**
```
https://api.bnbatiment.com/test-cors-headers.php
```

### Option 3: Check Subdomain Configuration

1. **Login to Hostinger hPanel**
2. **Go to Domains → Subdomains**
3. **Check where `api.bnbatiment.com` points to:**
   - Document Root: `public_html/api/` → Upload file there
   - Document Root: `public_html/api/Back-End/public/` → File is in correct place

## Quick Fix Steps

### Step 1: Determine Your Structure

SSH to your server and check:

```bash
# Find where the API subdomain document root is
cd ~
find . -name "index.php" -path "*/api/*" -path "*/public/*" 2>/dev/null | head -5

# Or check cPanel/hPanel subdomain settings
```

### Step 2: Upload Test File to Correct Location

Based on your structure `public_html/api/Back-End/...`, try these locations:

**Location A (API root):**
```
Upload: Back-End/test-cors-simple.php
To: public_html/api/test-cors-simple.php
Access: https://api.bnbatiment.com/test-cors-simple.php
```

**Location B (If API points to Back-End/public/):**
```
Keep: public_html/api/Back-End/public/test-cors-headers.php
Access: https://api.bnbatiment.com/test-cors-headers.php
```

**Location C (If nested structure):**
```
Upload: Back-End/test-cors-simple.php  
To: public_html/api/Back-End/test-cors-simple.php
Access: https://api.bnbatiment.com/test-cors-simple.php
```

### Step 3: Test

After uploading, test each URL:
- `https://api.bnbatiment.com/test-cors-simple.php`
- `https://api.bnbatiment.com/test-cors-headers.php`
- `https://api.bnbatiment.com/Back-End/public/test-cors-headers.php`

Whichever one returns JSON (not 404) is the correct path!

## Understanding Your Structure

Based on your path `public_html/api/Back-End/public/`, it seems:

```
public_html/
└── api/                          ← api.bnbatiment.com document root?
    └── Back-End/                 ← Laravel application
        └── public/               ← Laravel public folder
            └── index.php         ← Laravel entry point
            └── test-cors-headers.php ← Your test file
```

If this is the case, then:
- `api.bnbatiment.com` should point to `public_html/api/Back-End/public/`
- Files in `Back-End/public/` should be accessible directly
- URL: `https://api.bnbatiment.com/test-cors-headers.php` should work

## If Still Getting 404

### Check 1: Verify File Exists
```bash
ssh to server
cd ~/public_html/api/Back-End/public/
ls -la test-cors-headers.php
# Should exist and be readable
```

### Check 2: Check Subdomain Configuration
In Hostinger hPanel:
1. Go to **Domains** → **Subdomains**
2. Find `api.bnbatiment.com`
3. Check **Document Root** field
4. It should be: `public_html/api/Back-End/public/`

If it's different, either:
- Change it to point to `Back-End/public/`
- OR move files to match current configuration

### Check 3: Test Direct Access
Try accessing the Laravel entry point:
```
https://api.bnbatiment.com/
https://api.bnbatiment.com/index.php
```

If these work, then test file should work too when in same directory.

## Next Steps

1. ✅ Upload `Back-End/test-cors-simple.php` to `public_html/api/` (root level)
2. ✅ Test: `https://api.bnbatiment.com/test-cors-simple.php`
3. ✅ If that works, you know the document root location
4. ✅ Upload main CORS fixes to same relative location structure

---

**Important Note:** `https://www.bnbatiment.com/test-cors-headers.php` will **ALWAYS** give 404 because:
- `www.bnbatiment.com` is the **frontend** domain
- `api.bnbatiment.com` is the **backend** domain
- Test files should only be on the API domain

