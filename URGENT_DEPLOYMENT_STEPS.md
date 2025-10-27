# 🔴 URGENT: Upload These Files to Fix CORS

## Why the errors are still happening:
The modified backend files are **NOT uploaded to Hostinger yet**. You need to upload them now.

---

## ✅ Files to Upload to Hostinger:

### 1. Upload to `api.bnbatiment.com` root directory:
- `Back-End/index_for_subdomain.php` (REPLACE existing file)
- `Back-End/.htaccess` (NEW file)
- `Back-End/cors-test.php` (NEW - for testing)

### 2. Upload to `api.bnbatiment.com/app/Http/Middleware/`:
- `Back-End/app/Http/Middleware/CorsMiddleware.php` (REPLACE existing file)

### 3. Upload to `api.bnbatiment.com/public/`:
- `Back-End/public/.htaccess` (REPLACE existing file)
- `Back-End/public/index.php` (REPLACE existing file)

---

## 🧪 Test After Upload:

### Step 1: Test CORS
Visit: `https://api.bnbatiment.com/cors-test.php`

Expected result: JSON response with `"status": "success"`

### Step 2: Test API
Visit: `https://api.bnbatiment.com/api/services`

Expected result: Should return JSON data (not CORS error)

### Step 3: Check website
Visit: `https://www.bnbatiment.com`

Expected result: No more CORS errors in console

---

## 📤 How to Upload (Quick Steps):

1. **Open Hostinger File Manager** or use FTP
2. **Navigate to your API domain** (usually `public_html/api` or `domains/api.bnbatiment.com`)
3. **Upload the files** listed above to their respective folders
4. **Replace existing files** when prompted
5. **Clear cache** if you have caching enabled
6. **Test the website**

---

## ✅ Verification Checklist:

After uploading, check:
- [ ] `https://api.bnbatiment.com/cors-test.php` works
- [ ] `https://api.bnbatiment.com/api/services` returns data
- [ ] `https://www.bnbatiment.com` loads without CORS errors
- [ ] Browser console shows no "Failed to fetch" errors
- [ ] Data loads from API (not mock data)

---

## 🆘 If still not working:

Check the Network tab in browser:
1. Open DevTools (F12)
2. Go to Network tab
3. Try loading the page
4. Find the OPTIONS request to api.bnbatiment.com
5. Check Response Headers - should include `Access-Control-Allow-Origin`

If OPTIONS request returns 200 but headers are missing, the `.htaccess` file might not be working. Try:
- Check if Apache `mod_headers` is enabled on Hostinger
- Check if the `.htaccess` file was uploaded correctly
- Check Hostinger error logs

---

## 📁 File Locations on Your Computer:

```
F:\Couvreur project\Back-End\
├── .htaccess (NEW - upload to api root)
├── index_for_subdomain.php (MODIFIED - upload to api root)
├── cors-test.php (NEW - upload to api root)
├── app/
│   └── Http/
│       └── Middleware/
│           └── CorsMiddleware.php (MODIFIED - upload to api/app/Http/Middleware/)
└── public/
    ├── .htaccess (MODIFIED - upload to api/public/)
    └── index.php (MODIFIED - upload to api/public/)
```

---

**IMPORTANT**: The syntax error in `index.html` is fixed, but you also need to upload the backend files for CORS to work.

