# Quick Start Guide

Get the payment flow application running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm, pnpm, or yarn
- Git

## 🚀 Local Development (3 Steps)

### 1. Install Dependencies
```bash
cd payment-flow
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: `http://localhost:4321`

That's it! The application is now running locally.

## ✅ Quick Test

1. Fill the payment form:
   - **Name**: John Doe
   - **Card**: 1234 5678 9012 3456
   - **Expiry**: 12/25
   - **CVV**: 123
   - **Amount**: 99.99

2. Click "Pay Now"

3. Verify receipt page shows:
   - ✅ Masked card number
   - ✅ Transaction ID
   - ✅ Success status

## 🌐 Deploy to Vercel (2 Steps)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

### 2. Deploy on Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"

Done! Your app is live in ~60 seconds.

## 📦 Available Scripts

```bash
npm run dev      # Start dev server (port 4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4321
npx kill-port 4321
npm run dev
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npm run build
```

## 📖 Need More Help?

- **Full Setup**: See README.md
- **Deployment**: See DEPLOYMENT.md
- **Testing**: See TESTING.md
- **Architecture**: See ARCHITECTURE.md

## 🎯 What's Next?

1. ✅ Test locally
2. ✅ Build for production
3. ✅ Push to GitHub
4. ✅ Deploy to Vercel
5. ✅ Share the link!

---

**Total Time**: ~5 minutes from clone to running locally 🚀
