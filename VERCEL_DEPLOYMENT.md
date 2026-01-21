# Vercel Deployment Guide - YenMozhi Website

## 🚀 Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - YenMozhi website"
   git branch -M main
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit: https://vercel.com
   - Sign up / Login with your GitHub account

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select your repository
   - Vercel will auto-detect Next.js settings

4. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default - Next.js handles this)
   - **Install Command**: `npm install` (default)
   - **Node.js Version**: 18.x or 20.x (recommended)

5. **Environment Variables** (if any)
   - Currently no environment variables needed
   - Add any future variables in the "Environment Variables" section

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at: `https://your-project-name.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (first time) or **Yes** (updates)
   - What's your project's name? `yenmozhi-website` (or your preferred name)
   - In which directory is your code located? `./`
   - Want to override settings? **No**

---

## 📋 Pre-Deployment Checklist

### ✅ Files and Configuration

- [x] `package.json` - Contains all dependencies
- [x] `next.config.js` - Next.js configuration ready
- [x] `vercel.json` - Vercel-specific settings (optional, created)
- [x] `.gitignore` - Excludes unnecessary files
- [x] All assets in `/public/assests/` folder
- [x] Model files in `/public/model/` folder (if using local models)

### ✅ Build Test

Test the build locally before deploying:
```bash
npm run build
npm run start
```

If build succeeds, you're ready to deploy!

---

## 🔧 Vercel Project Settings (Dashboard)

### General Settings

**Project Name**: `yenmozhi-website` (or your preferred name)

**Framework**: Next.js 14

**Node.js Version**: 18.x or 20.x

### Build & Development Settings

**Build Command**: 
```
npm run build
```

**Output Directory**: 
```
.next
```
(Leave empty - Next.js handles this automatically)

**Install Command**: 
```
npm install
```

**Development Command**: 
```
npm run dev
```

### Root Directory
```
./
```

---

## 📦 Important Files Structure

```
yenmozhi-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── demo/
│   └── globals.css
├── components/             # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── sections/
├── public/                 # Static assets
│   ├── assests/           # Images, logos, PDFs
│   └── model/             # ML model files (if using local)
├── package.json           # Dependencies
├── next.config.js         # Next.js config
├── vercel.json            # Vercel config (optional)
└── tsconfig.json          # TypeScript config
```

---

## 🌐 Custom Domain Setup (Optional)

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `yenmozhi.com`)
   - Follow DNS configuration instructions

2. **DNS Configuration**:
   - Add a CNAME record pointing to: `cname.vercel-dns.com`
   - Or add an A record with Vercel's IP addresses (provided in dashboard)

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your main branch:

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```

2. Vercel automatically:
   - Detects the push
   - Runs build
   - Deploys new version
   - Shows preview URL

---

## 📊 Deployment Settings Summary

### Build Settings:
- **Framework**: Next.js
- **Node Version**: 18.x / 20.x
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto)

### Runtime Settings:
- **Regions**: US East (iad1) or choose closest to your users
- **Edge Network**: Enabled (automatic)

### Environment Variables:
- None currently required
- Add any API keys or secrets in: Settings → Environment Variables

---

## 🐛 Troubleshooting

### Build Fails

1. **Check build logs in Vercel Dashboard**
   - Go to project → Deployments → Click failed deployment
   - Review error messages

2. **Common Issues**:
   - **Module not found**: Ensure all dependencies are in `package.json`
   - **TypeScript errors**: Fix type errors locally first
   - **File not found**: Check file paths (use `/assests/` not `/assets/`)

### Assets Not Loading

- Ensure all files are in `/public/` folder
- Use paths starting with `/` (e.g., `/assests/logo.png`)
- Check file names match exactly (case-sensitive)

### Model Files Too Large

- Vercel has 100MB limit for serverless functions
- If `weights.bin` is too large, use CDN or remote URL
- Current setup uses Teachable Machine (remote) - no issue

---

## 📝 Deployment Commands Reference

### First Time Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Update Deployment
```bash
# Just push to GitHub (auto-deploys)
git add .
git commit -m "Update"
git push origin main

# OR use CLI
vercel --prod
```

### View Deployment Status
```bash
vercel list
```

### View Deployment Logs
```bash
vercel logs [deployment-url]
```

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Test website: Visit your Vercel URL
- [ ] Check all images load correctly
- [ ] Test Live Demo page (`/demo`)
- [ ] Verify model loading (if using remote Teachable Machine)
- [ ] Test PDF download
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test contact email link

---

## 🎯 Quick Start Commands

```bash
# 1. Test build locally
npm run build

# 2. Test production build
npm run start

# 3. Deploy to Vercel (first time)
vercel --prod

# 4. Future deployments (just push)
git push origin main
```

---

## 📞 Vercel Support

- **Documentation**: https://vercel.com/docs
- **Dashboard**: https://vercel.com/dashboard
- **Status**: https://vercel-status.com

---

## 🎉 You're Ready!

Your YenMozhi website is now ready for Vercel deployment. Follow the steps above and your site will be live in minutes!

**Estimated Deployment Time**: 2-3 minutes

**Live URL Format**: `https://yenmozhi-website.vercel.app` (or your custom domain)

