# Vercel Build Commands Reference

## 📋 Exact Commands for Vercel Dashboard

When deploying on Vercel Dashboard, use these **exact** settings:

---

## 🔧 Build & Install Settings

### **Build Command**
```
npm run build
```

**OR** (automatically detected, but you can verify):
```
next build
```

### **Output Directory**
```
.next
```

**IMPORTANT**: 
- For Next.js App Router, you can **leave this EMPTY** or use `.next`
- Vercel automatically detects Next.js and handles the output directory
- Next.js App Router outputs to `.next` folder automatically

### **Install Command**
```
npm install
```

**OR** (if using yarn):
```
yarn install
```

**OR** (if using pnpm):
```
pnpm install
```

### **Development Command** (for preview deployments)
```
npm run dev
```

---

## 🎯 Vercel Dashboard Settings (Step-by-Step)

When importing your project in Vercel Dashboard:

1. **Framework Preset**: 
   - Select: `Next.js`
   - OR leave as "Other" and Vercel will auto-detect

2. **Root Directory**: 
   - Leave as: `./` (default)
   - Only change if your Next.js app is in a subfolder

3. **Build Command**: 
   - Enter: `npm run build`
   - OR leave empty (Vercel auto-detects for Next.js)

4. **Output Directory**: 
   - **LEAVE EMPTY** for Next.js App Router
   - OR enter: `.next` (but not needed)
   - Vercel automatically knows Next.js outputs to `.next`

5. **Install Command**: 
   - Enter: `npm install`
   - OR leave empty (Vercel uses `npm install` by default)

6. **Development Command**: 
   - Enter: `npm run dev`
   - Used for preview deployments only

---

## ✅ Recommended Settings (Minimal)

For Next.js projects, Vercel auto-detects everything. You can use:

**Build Command**: *(Leave empty - auto-detected)*
**Output Directory**: *(Leave empty - auto-detected)*
**Install Command**: *(Leave empty - auto-detected)*

Vercel will automatically use:
- `npm install` (install)
- `npm run build` (build)
- `.next` (output directory)

---

## 🔍 What Each Command Does

### `npm install`
- Installs all dependencies from `package.json`
- Creates `node_modules` folder
- Vercel runs this automatically before build

### `npm run build`
- Runs the build script from `package.json`
- For Next.js: Executes `next build`
- Creates optimized production build in `.next` folder
- Generates static pages and server components

### Output Directory: `.next`
- Next.js stores build output here
- Contains:
  - `.next/server` - Server-side code
  - `.next/static` - Static assets
  - `.next/BUILD_ID` - Build identifier
- Vercel automatically serves from `.next` for Next.js

---

## 🚀 Your Project's Configuration

Based on your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### **Vercel Will Use**:
- **Install**: `npm install` ✅
- **Build**: `npm run build` (which runs `next build`) ✅
- **Output**: `.next` (auto-detected) ✅

---

## 📝 Quick Reference

| Setting | Value | Notes |
|---------|-------|-------|
| Framework | Next.js | Auto-detected |
| Build Command | `npm run build` | Or leave empty |
| Output Directory | *(empty)* or `.next` | Auto-detected for Next.js |
| Install Command | `npm install` | Or leave empty |
| Root Directory | `./` | Default |
| Node Version | 18.x or 20.x | Recommended |

---

## ⚠️ Common Mistakes

### ❌ DON'T use:
- Output Directory: `out` (only for static exports)
- Build Command: `next build` directly (use `npm run build`)
- Install Command: `npm ci` (unless you want locked versions)

### ✅ DO use:
- Output Directory: Leave empty (Vercel handles it)
- Build Command: `npm run build` (standard)
- Install Command: `npm install` (standard)

---

## 🧪 Test Locally Before Deploying

Before deploying to Vercel, test the build locally:

```bash
# Install dependencies
npm install

# Run build
npm run build

# Test production build
npm run start
```

If this works locally, Vercel deployment will work too!

---

## 📞 Summary

**For Vercel Dashboard**:

1. **Framework Preset**: `Next.js` (auto-detected)
2. **Build Command**: `npm run build` ✅
3. **Output Directory**: *(Leave empty)* ✅
4. **Install Command**: `npm install` ✅
5. **Root Directory**: `./` ✅

**That's it!** Vercel handles the rest automatically.

