# Deployment Instructions for CORS Fix

## Problem
The CORS errors are happening because the modified backend files haven't been uploaded to Hostinger yet.

## Step 1: Upload Backend Files to Hostinger

You need to upload these files to your Hostinger server:

### Backend Files to Upload:
1. `Back-End/.htaccess` (NEW FILE) - Place in the API subdomain root
2. `Back-End/index_for_subdomain.php` (MODIFIED) - Already in the API subdomain root
3. `Back-End/public/index.php` (MODIFIED) - In the API subdomain's public folder
4. `Back-End/app/Http/Middleware/CorsMiddleware.php` (MODIFIED) - In the app/Http/Middleware folder
5. `Back-End/public/.htaccess` (MODIFIED) - Already in the public folder

### Where to Place Files on Hostinger:

```
api.bnbatiment.com root:
├── .htaccess (NEW - upload this)
├── index_for_subdomain.php (MODIFIED - replace existing)
├── app/
│   └── Http/
│       └── Middleware/
│           └── CorsMiddleware.php (MODIFIED - replace existing)
└── public/
    ├── .htaccess (MODIFIED - replace existing)
    └── index.php (MODIFIED - replace existing)
```

## Step 2: Upload Frontend Files to Vercel

Upload the files from `Front-End/dist/` directory to Vercel:

1. Go to your Vercel project
2. Upload all files from `Front-End/dist/` directory
3. Deploy

**Important Files:**
- `index.html` (MODIFIED - already fixed syntax error)

## Step 3: Test the API

After uploading, test the API endpoint:

1. Open browser developer tools (F12)
2. Go to Network tab
3. Navigate to: https://www.bnbatiment.com
4. Check if OPTIONS requests to `https://api.bnbatiment.com/api/*` return 200 status
5. Verify CORS headers are present in the response

## If CORS Still Fails

### Option 1: Test the Backend Directly

Create a file `test-cors.php` in your API root:

```php
<?php
header('Access-Control-Allow-Origin: https://www.bnbatiment.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

echo json_encode(['message' => 'CORS test successful']);
```

Test it at: `https://api.bnbatiment.com/test-cors.php`

### Option 2: Check Hostinger Configuration

1. Go to Hostinger File Manager
2. Navigate to `public_html/api` (or wherever your API subdomain points)
3. Check if there's a `.htaccess` file overriding CORS headers
4. Make sure PHP is enabled
5. Check error logs at `storage/logs/laravel.log`

## Quick Fix: Alternative CORS Configuration

If the above doesn't work, try adding this at the very top of `index_for_subdomain.php`:

```php
<?php
// CORS Headers - Place at the very top
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'https://www.bnbatiment.com',
    'https://bnbatiment.com',
    'http://localhost:3000',
    'http://localhost:5173'
];

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Rest of the file...
```

## Verification Checklist

After uploading, verify:
- [ ] No syntax errors in browser console
- [ ] OPTIONS requests return 200 status
- [ ] API responses include CORS headers
- [ ] Data loads from API (not mock data)
- [ ] No "Failed to fetch" errors in console

## Contact Support

If issues persist after following these steps, share:
1. Browser Network tab screenshot showing OPTIONS request
2. Response headers from API requests
3. Hostinger error logs

