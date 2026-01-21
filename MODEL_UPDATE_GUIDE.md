# Model Update Guide - Adding 7-8 Classes

## Current Status
The current model in `/public/model/` has only **2 classes**:
- "Background Noise"
- "thanni venum"

## How to Update to 7-8 Classes

### Option 1: Update Model Files (Recommended)

1. **Train or obtain a new model** with 7-8 classes using Teachable Machine or your training setup
2. **Export the model** in TensorFlow.js format (should include):
   - `model.json`
   - `metadata.json`
   - `weights.bin`

3. **Replace files** in `/public/model/`:
   ```
   public/model/
     ├── model.json      (replace)
     ├── metadata.json   (replace)
     └── weights.bin     (replace)
   ```

4. **Verify `metadata.json`** contains all your classes in `wordLabels`:
   ```json
   {
     "wordLabels": [
       "Background Noise",
       "thanni venum",
       "vazhi venum",
       "pasikkudhu",
       "valikkudhu",
       "... add more classes ..."
     ]
   }
   ```

### Option 2: Update Label Mappings

After updating the model files, update the label-to-speech mappings in `components/demo/LiveDemo.tsx`:

```typescript
const labelMap: { [key: string]: string } = {
  'Background Noise': '', // Don't speak background noise
  'thanni venum': 'I need water',
  'vazhi venum': 'I need to go to the bathroom',
  'pasikkudhu': 'I am hungry',
  'valikkudhu': 'I am tired',
  // Add all your 7-8 classes here
  // Format: 'model_label': 'What to say out loud'
}
```

## Expected Classes (Example)

Here are common assistive communication phrases you might want:

1. **"Background Noise"** - (silent, no output)
2. **"I need water"** / "thanni venum"
3. **"I need to use the bathroom"** / "vazhi venum"
4. **"I am hungry"** / "pasikkudhu"
5. **"I am tired"** / "valikkudhu"
6. **"I need help"** / "udhavi venum"
7. **"I am in pain"** / "vali irukku"
8. **"Thank you"** / "nandri"

## How the System Works Now

### ✅ Automatic Features (Already Implemented):

1. **All Classes Detected**: The system automatically loads ALL classes from `metadata.json`
2. **Highest Accuracy Detection**: The class with the highest confidence score is selected
3. **Background Noise Filtering**: "Background Noise" is automatically excluded from speech output
4. **Loud AI Voice Output**: 
   - Volume set to maximum (1.0)
   - Clear pronunciation (rate: 0.9)
   - Language detection (English/Tamil)
5. **Real-time Display**: Shows all class confidences and highlights the top match

### Current Recognition Logic:

- Detects ALL classes from the model
- Finds the class with **highest confidence** (excluding background noise when possible)
- Only speaks when confidence ≥ 75% (threshold = 0.75)
- Prevents duplicate speech with 2-second cooldown
- Maps model labels to human-readable speech text

## Testing After Update

1. **Start the dev server**: `npm run dev`
2. **Navigate to**: `http://localhost:3000/demo`
3. **Click "Start Listening"**
4. **Check console** for: `📝 Model labels loaded: [array of all classes]`
5. **Test each class** by speaking the trained phrases
6. **Verify**:
   - All 7-8 classes appear in the confidence bars
   - Top class is highlighted correctly
   - Speech output matches the detected class
   - Voice is loud and clear

## Troubleshooting

### If model doesn't load:
- Check browser console for errors
- Verify all 3 files (`model.json`, `metadata.json`, `weights.bin`) are in `/public/model/`
- Check file sizes (weights.bin should be several MB)

### If classes don't appear:
- Verify `metadata.json` has correct `wordLabels` array
- Check browser console for the labels array
- Ensure model files are from the same training session

### If speech doesn't work:
- Check browser microphone permissions
- Verify the label mapping in `getSpokenText()` function
- Check browser console for speech synthesis errors
- Try different voice selections in the dropdown

---

**Note**: The code is already set up to handle all classes automatically. You just need to replace the model files with your 7-8 class model!

