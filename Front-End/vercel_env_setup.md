# Vercel Environment Variables Setup

## Setting Environment Variables in Vercel

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to "Settings" tab
   - Click on "Environment Variables"

3. **Add the Google Maps API Key**
   - **Name**: `VITE_GOOGLE_MAPS_API_KEY`
   - **Value**: Your working Google Maps API key
   - **Environment**: Production, Preview, Development (select all)

4. **Add API Base URL**
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://bnbatiment.com/api`
   - **Environment**: Production, Preview, Development (select all)

5. **Save and Redeploy**
   - Click "Save"
   - Go to "Deployments" tab
   - Click "Redeploy" on your latest deployment

## Testing Your API Key

Before setting the environment variable, test your API key:

1. Open `Front-End/test_google_maps_api.html` in your browser
2. Test both API keys to find the working one
3. Use the working key in your Vercel environment variables

## Common Vercel Issues

### Issue: Environment Variables Not Loading
- Make sure you've selected all environments (Production, Preview, Development)
- Redeploy after adding environment variables
- Check that variable names start with `VITE_` for Vite projects

### Issue: API Key Still Not Working
- Verify the API key is valid in Google Cloud Console
- Check that your domain is authorized in the API key restrictions
- Add `https://your-vercel-domain.vercel.app/*` to authorized domains

### Issue: Build Errors
- Check the build logs in Vercel dashboard
- Ensure all dependencies are properly installed
- Verify that the environment variables are accessible during build 