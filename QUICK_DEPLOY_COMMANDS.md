# ⚡ Quick Deployment Commands - Copy & Paste

## 🎯 Quick Start: Dashboard Deployment (Recommended)

### Step 1: Prepare & Push Code

```bash
cd "C:\Users\sasir\OneDrive\Documents\Sasikumar R\YenMozhii\YenMozhii"
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy via Dashboard

1. Go to: **https://vercel.com**
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import: `Sasikumar-R007/YenMozhii`
5. Click "Deploy"
6. Done! ✅

---

## 🛠️ CLI Deployment Commands

### One-Time Setup:

```bash
npm install -g vercel
vercel login
```

### Deploy Commands:

```bash
# Navigate to project
cd "C:\Users\sasir\OneDrive\Documents\Sasikumar R\YenMozhii\YenMozhii"

# Preview deployment
vercel

# Production deployment
vercel --prod
```

---

## 📋 All Commands in Order

```bash
# 1. Navigate to project
cd "C:\Users\sasir\OneDrive\Documents\Sasikumar R\YenMozhii\YenMozhii"

# 2. Check status
git status

# 3. Add all changes
git add .

# 4. Commit
git commit -m "Ready for Vercel deployment"

# 5. Push to GitHub
git push origin main

# 6. Install Vercel CLI (one time)
npm install -g vercel

# 7. Login (one time)
vercel login

# 8. Deploy to production
vercel --prod
```

---

## ⚡ Ultra-Quick (Dashboard Method)

**Just 2 commands:**

```bash
git add . && git commit -m "Deploy" && git push origin main
```

Then:
1. Go to vercel.com
2. Click "Add New Project"
3. Import your repo
4. Click "Deploy"

**Done!** ✅

