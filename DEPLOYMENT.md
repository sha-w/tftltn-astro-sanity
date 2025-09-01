# Cloudflare Pages Deployment Guide

This guide will help you deploy the TFTLTN Astro site to Cloudflare Pages.

## 🚀 Quick Deploy

### 1. Connect GitHub Repository

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Select "Connect to Git"
4. Choose your GitHub account and select the repository: `tftltn-astro-sanity`
5. Choose the `astro-sanity` branch

### 2. Configure Build Settings

Set the following build configuration:

- **Framework preset**: `Astro`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)
- **Node.js version**: `18.x`

### 3. Environment Variables

In the Cloudflare Pages dashboard, add these environment variables:

```
SANITY_PROJECT_ID = df24xwzm
SANITY_DATASET = tftltn-dev-blog
SANITY_API_VERSION = 2024-01-01
SANITY_USE_CDN = true
```

### 4. Deploy

Click "Save and Deploy" - Cloudflare Pages will automatically build and deploy your site.

## 🔄 Automatic Deployments

Once configured, every push to the `astro-sanity` branch will automatically trigger a new deployment.

## 🌍 Custom Domain (Optional)

To use a custom domain:

1. In your Cloudflare Pages project dashboard
2. Go to "Custom domains" tab
3. Click "Set up a custom domain"
4. Follow the instructions to add your domain

## 📊 Build Logs

If the build fails, check the build logs in the Cloudflare Pages dashboard for detailed error messages.

## ⚡ Performance

The deployed site will benefit from:
- Cloudflare's global CDN
- Automatic HTTPS
- Built-in performance optimizations
- Edge caching for static assets

## 🔗 Sanity Integration

The live site will automatically connect to the Sanity backend at:
- **Studio**: https://firstlastnerdom.sanity.studio/
- **API**: Sanity Cloud (managed automatically)

Content changes in Sanity will be reflected on the live site immediately (with CDN cache updates).

## 🚨 Troubleshooting

### Build Fails
- Check Node.js version is set to 18.x
- Ensure all environment variables are set correctly
- Check build logs for specific error messages

### Sanity Connection Issues
- Verify environment variables match the `.env.example`
- Check that the Sanity project ID and dataset are correct
- Ensure CORS settings in Sanity allow your domain

### Images Not Loading
- Check that images are in the `public/` directory
- Verify image paths are correct (relative to public/)
- Check browser console for 404 errors
