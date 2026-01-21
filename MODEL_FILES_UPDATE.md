# How to Fix: Model Mismatch Error

## The Problem

**Error**: `Mismatch between the last dimension of model's output shape (2) and number of words (8)`

This means:
- Your `model.json` and `weights.bin` files are trained for **2 classes only**
- But `metadata.json` says there are **8 classes**
- **These must match!**

## Solution: Update Model Files

You need to copy your **8-class trained model files** to `/public/model/`:

### Step 1: Find Your 8-Class Model Files

The 8-class model files should include:
- `model.json` (architecture file)
- `metadata.json` (with all 8 classes listed)
- `weights.bin` (trained weights file - usually several MB)

**All 3 files must come from the same training session!**

### Step 2: Copy Files to Project

Replace these files in `/public/model/`:
```
public/model/
  ├── model.json      ← Replace with 8-class model
  ├── metadata.json   ← Replace with 8-class metadata (has all 8 labels)
  └── weights.bin     ← Replace with 8-class weights
```

### Step 3: Verify metadata.json Has All 8 Classes

The `metadata.json` should look like this:
```json
{
  "wordLabels": [
    "Background Noise",
    "thanni venum",
    "bathroom varuthu",
    "pasikudhu",
    "kai valikuthu",
    "amma va kooputunga",
    "maathara thaanga",
    "thirupi paduka vainga"
  ]
}
```

### Step 4: Check File Sizes

- `weights.bin` should be **several MB** (3-10 MB typically)
- If it's very small (< 1 MB), it's probably the 2-class model

## If You Don't Have 8-Class Model Files

You'll need to:

1. **Train a new model** with all 8 classes using Teachable Machine or your training setup
2. **Export** the TensorFlow.js format (should give you all 3 files)
3. **Copy all 3 files** to `/public/model/`

## Current Status

- ✅ Code is ready to handle all 8 classes
- ✅ Label mappings are set up for all 8 phrases
- ❌ Model files need to be updated (currently only 2 classes)
- ✅ Once model files match metadata, everything will work automatically!

---

**Important**: All 3 model files (`model.json`, `metadata.json`, `weights.bin`) must come from the **same training session** with the **same 8 classes**.

