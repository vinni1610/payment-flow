# Deployment Guide

## Quick Deployment to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Payment Flow UI"
   git branch -M main
   git remote add origin [your-github-repo-url]
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel auto-detects Astro settings:
     - Framework Preset: Astro
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)
   - Your site is live! 🎉

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd payment-flow
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: `Yes`
   - Which scope: Select your account
   - Link to existing project: `No`
   - Project name: `payment-flow` (or your choice)
   - In which directory: `./`
   - Override settings: `No`

5. **Production deployment**
   ```bash
   vercel --prod
   ```

## Post-Deployment Checklist

- [ ] Verify payment form loads correctly
- [ ] Test form validation
- [ ] Submit a test payment
- [ ] Verify receipt page displays correctly
- [ ] Test "New Payment" button
- [ ] Check mobile responsiveness
- [ ] Test print functionality
- [ ] Verify all animations work smoothly

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

## Environment Variables

This project doesn't require environment variables for the demo. For production with real payment processing, you would add:

```env
PAYMENT_API_KEY=your_api_key
PAYMENT_API_URL=your_api_url
```

Add these in Vercel Dashboard → Settings → Environment Variables

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Verify all dependencies are in package.json
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Page Not Found (404)
- Ensure dist folder is being generated
- Check vercel.json configuration
- Verify framework preset is set to "Astro"

### Styling Issues
- Check Tailwind configuration
- Verify font imports in Layout.astro
- Clear browser cache

## Monitoring

- View deployment logs in Vercel Dashboard
- Set up error tracking with Vercel Analytics (optional)
- Enable Web Vitals monitoring (optional)

## Rollback

If you need to rollback to a previous deployment:
1. Go to Vercel Dashboard → Deployments
2. Find the working deployment
3. Click "..." → "Promote to Production"
