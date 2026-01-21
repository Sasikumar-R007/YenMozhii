# 🔧 Fix Netlify 404 Error

## ✅ The Issue

Your site is deployed but shows 404. This is a Next.js routing issue on Netlify.

## 🔧 Solution: Update Netlify Settings

### Step 1: Go to Netlify Dashboard

1. Go to: https://app.netlify.com
2. Click on your site: `cool-empanada-8d4e63`
3. Go to: **Site settings** → **Build & deploy**

### Step 2: Update Build Settings

**In "Build settings" section:**

- **Build command**: `npm run build`
- **Publish directory**: `.next` (IMPORTANT!)
- **Node version**: `20` (or leave default)

### Step 3: Enable Next.js Plugin

1. Go to: **Plugins** section
2. Make sure **@netlify/plugin-nextjs** is installed
3. If not, click "Install plugin" → Search "Next.js" → Install

### Step 4: Redeploy

1. Go to: **Deploys** tab
2. Click: **Trigger deploy** → **Clear cache and deploy site**
3. Wait 3-5 minutes
4. Check your site again

---

## ✅ Alternative: Update netlify.toml

I've updated the `netlify.toml` file. Push it:

```bash
git add netlify.toml
git commit -m "Fix Netlify 404 error"
git push origin main
```

Netlify will auto-redeploy.

---

## 🎯 Quick Fix

**In Netlify Dashboard:**
1. Site settings → Build & deploy
2. **Publish directory**: Change to `.next`
3. **Clear cache and redeploy**
4. Done! ✅

---

## ✅ Expected Result

After fixing:
- ✅ Homepage loads
- ✅ All routes work
- ✅ No 404 errors

---

**The issue is the publish directory - set it to `.next`!**

