# Quick Vercel Deployment Fix

## Immediate Steps to Fix Production Errors

### 1. Set Environment Variables (5 minutes)

**In Vercel Dashboard:**
1. Go to your project → Settings → Environment Variables
2. Add these variables:

```
Name: VITE_GOOGLE_MAPS_API_KEY
Value: AIzaSyDGmf5T6mFmqsuVbwax8pf0c8isgDiGr1U
Environment: Production, Preview, Development

Name: VITE_API_BASE_URL
Value: https://bnbatiment.com/api
Environment: Production, Preview, Development
```

### 2. Authorize Your Domain (5 minutes)

**In Google Cloud Console:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Edit your API key
4. Add these domains:
   ```
   https://bnbatiment.com/*
   https://*.vercel.app/*
   ```

### 3. Redeploy (2 minutes)

**In Vercel Dashboard:**
1. Go to Deployments tab
2. Click "Redeploy" on latest deployment
3. Wait for build to complete

### 4. Test (3 minutes)

1. Visit your live site
2. Go to `/zones` page
3. Check if map loads
4. If not, check browser console for errors

## If Still Having Issues

### Option A: Use Fallback Content
The code now includes fallback content that shows your service areas as a list if the map fails to load.

### Option B: Test API Key
1. Open `test_google_maps_api.html` in browser
2. Test both API keys
3. Use the working one in Vercel

### Option C: Check Build Logs
1. In Vercel dashboard, check build logs
2. Look for any error messages
3. Fix any build issues

## Expected Result

After these steps:
- ✅ Production errors should disappear from Vercel dashboard
- ✅ Maps should load on `/zones` and `/contact` pages
- ✅ Fallback content shows if API fails
- ✅ No more console errors

## Time Estimate: 15 minutes total 