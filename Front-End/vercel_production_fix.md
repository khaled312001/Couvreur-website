# Vercel Production Error Fix Guide

## Current Issues
Based on your Vercel dashboard showing production errors, here's how to fix them:

## Step 1: Set Environment Variables in Vercel

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GOOGLE_MAPS_API_KEY` | `AIzaSyDGmf5T6mFmqsuVbwax8pf0c8isgDiGr1U` | All |
| `VITE_API_BASE_URL` | `https://bnbatiment.com/api` | All |

## Step 2: Test Your API Key

1. **Download the test file**: `Front-End/test_google_maps_api.html`
2. **Open it in your browser**
3. **Test both API keys**:
   - Current: `AIzaSyDGmf5T6mFmqsuVbwax8pf0c8isgDiGr1U`
   - Original: `AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg`
4. **Use the working key** in your Vercel environment variables

## Step 3: Authorize Your Vercel Domain

### In Google Cloud Console:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Find your API key and click to edit
4. Under "Application restrictions", select "HTTP referrers (web sites)"
5. Add these domains:
   ```
   https://bnbatiment.com/*
   https://*.vercel.app/*
   https://your-project-name.vercel.app/*
   ```

## Step 4: Redeploy

1. **In Vercel Dashboard**:
   - Go to "Deployments" tab
   - Click "Redeploy" on your latest deployment
   - Or push a new commit to trigger automatic deployment

2. **Monitor the deployment**:
   - Check build logs for any errors
   - Verify environment variables are loaded

## Step 5: Verify the Fix

1. **Check your live site**: Visit your Vercel deployment URL
2. **Test the maps**: Go to `/zones` and `/contact` pages
3. **Check console**: Open browser dev tools and look for errors
4. **Monitor Vercel dashboard**: Ensure no more production errors

## Troubleshooting Common Vercel Issues

### Issue: Environment Variables Not Loading
```bash
# Check in your code
console.log('API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
```

### Issue: Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Issue: Maps Still Not Loading
- Check browser console for specific errors
- Verify API key is valid and domain is authorized
- Test with the fallback content we implemented

### Issue: CORS Errors
- The `vercel.json` already has CORS headers configured
- If still having issues, check your backend CORS settings

## Fallback Solution

If the Google Maps API continues to fail, the code now includes fallback content that will display your service areas as a list instead of a map. This ensures your site remains functional even if the API is down.

## Monitoring

After deployment:
1. Monitor Vercel dashboard for new errors
2. Check Google Cloud Console for API usage
3. Set up alerts for API quota limits
4. Monitor your site's performance

## Next Steps

1. **Immediate**: Set environment variables and redeploy
2. **Short-term**: Test and verify the fix
3. **Long-term**: Monitor and optimize performance 