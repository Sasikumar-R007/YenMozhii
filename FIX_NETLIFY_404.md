# 🔧 Fix Netlify 404 Error - Quick Solution

## ✅ The Problem

Site is deployed but shows 404. This is a Next.js routing configuration issue on Netlify.

---

## 🚀 SOLUTION: Update Netlify Settings

### Step 1: Go to Netlify Dashboard

1. Visit: https://app.netlify.com
2. Click on your site (cool-empanada-8d4e63)

### Step 2: Fix Build Settings

1. Go to: **Site settings** (gear icon or from menu)
2. Click: **Build & deploy**
3. Find: **Build settings** section
4. Click: **Edit settings**

**Update these:**
- **Build command**: `npm run build`
- **Publish directory**: `.next` ⚠️ **IMPORTANT - This must be `.next`**
- Click **Save**

### Step 3: Install Next.js Plugin

1. Still in **Site settings**
2. Click: **Plugins** (left sidebar)
3. Look for: **@netlify/plugin-nextjs**
4. If NOT installed:
   - Click **Install plugin**
   - Search "Next.js"
   - Install **@netlify/plugin-nextjs**

### Step 4: Redeploy

1. Go to: **Deploys** tab (top menu)
2. Click: **Trigger deploy** → **Clear cache and deploy site**
3. Wait 3-5 minutes
4. Visit your site again

---

## ✅ Quick Alternative: Update via netlify.toml

I've already created `netlify.toml`. Just push it:

```bash
git add netlify.toml
git commit -m "Fix Netlify 404 - add proper config"
git push origin main
```

Netlify will auto-redeploy with correct settings!

---

## 🎯 What's Wrong

**The issue:** Netlify doesn't know how to handle Next.js routing by default.

**The fix:** 
- Publish directory must be `.next`
- Next.js plugin must be installed
- Proper configuration in netlify.toml

---

## ✅ After Fix

Your site should:
- ✅ Load homepage correctly
- ✅ All routes work
- ✅ No 404 errors

---

## 📝 Summary

**Quick Fix:**
1. Netlify Dashboard → Site settings → Build & deploy
2. Set **Publish directory** to `.next`
3. Install **@netlify/plugin-nextjs** plugin
4. Redeploy
5. Done! ✅

**Or:** Push the `netlify.toml` file I created - it will auto-fix!

---

**This will fix your 404 error!** 🚀

