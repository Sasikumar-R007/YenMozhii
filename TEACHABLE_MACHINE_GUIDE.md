# 🎯 Teachable Machine Model - Troubleshooting Guide

## 🔍 Problem: Model Stuck on "Bathroom Varuthu"

If your model is always detecting "Bathroom Varuthu" regardless of input, here's how to diagnose and fix it:

---

## 📊 Step 1: Check What Model Is Actually Detecting

### Open Browser Console (F12)

When you click "Start Listening", you should see logs like:

```
📋 Model Labels Loaded: ["Background Noise", "thanni venum", "bathroom varuthu", ...]
🎯 Model Output (Top 3): bathroom varuthu: 95.2% | thanni venum: 3.1% | Background Noise: 1.7%
```

### What to Look For:

1. **Are all your classes loaded?**
   - Check the `📋 Model Labels Loaded` log
   - Should show all 8 classes you trained
   - If missing classes, model URL might be wrong

2. **What are the actual confidence scores?**
   - Check `🎯 Model Output (Top 3)` logs
   - If "bathroom varuthu" always has >90% even for other sounds → **Model is biased**

3. **Do scores change when you speak different phrases?**
   - If scores stay the same → Model not detecting audio properly
   - If scores change but "bathroom varuthu" always wins → Model needs retraining

---

## 🔧 Step 2: Verify Your Model URL

### Current Model URL:
```
https://teachablemachine.withgoogle.com/models/GmzaS6iNB/
```

### To Use Your Own Model:

1. **Export from Teachable Machine:**
   - Go to your Teachable Machine project
   - Click "Export Model"
   - Choose "TensorFlow.js" → "Upload (shareable link)"
   - Copy the shareable URL

2. **Update in Code:**
   - Open `components/demo/LiveDemo.tsx`
   - Find line: `const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/GmzaS6iNB/'`
   - Replace with your model URL

3. **Format:**
   - Should end with `/`
   - Example: `https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/`

---

## 🎤 Step 3: Check Audio Input

### Microphone Issues:

1. **Browser Permissions:**
   - Check if microphone permission is granted
   - Browser should ask for permission on first use
   - If denied, allow in browser settings

2. **Audio Quality:**
   - Speak clearly and close to microphone
   - Reduce background noise
   - Check microphone is working (test in other apps)

3. **Browser Compatibility:**
   - Chrome/Edge work best
   - Firefox/Safari may have issues
   - Try different browser if problems persist

---

## 🧠 Step 4: Model Training Issues

### If Model Is Biased (Always Detects Same Class):

**Common Causes:**

1. **Imbalanced Training Data:**
   - One class has many more samples than others
   - Solution: Add more samples to underrepresented classes

2. **Similar Audio Samples:**
   - All training samples sound similar
   - Solution: Record more diverse samples for each class

3. **Background Noise in Training:**
   - Too much noise in training data
   - Solution: Record in quiet environment, add noise samples to "Background Noise" class

4. **Insufficient Training:**
   - Model not trained long enough
   - Solution: Train for more epochs in Teachable Machine

### How to Retrain:

1. **In Teachable Machine:**
   - Add more samples to each class (aim for 50+ per class)
   - Ensure samples are diverse (different speakers, volumes, environments)
   - Train for longer (more epochs)
   - Test in Teachable Machine preview before exporting

2. **Test Before Exporting:**
   - Use Teachable Machine's preview feature
   - Try all your phrases
   - If preview works but exported model doesn't → Check export settings

---

## 🔄 Step 5: Reset and Debug

### Use the Reset Button:

1. Click "Start Listening"
2. If stuck on one output, click "Reset" button (yellow)
3. This clears detection state
4. Try speaking again

### Check Console Logs:

Look for these patterns:

**✅ Good (Model Working):**
```
🔄 Detection changed: "bathroom varuthu" → "thanni venum" (87.3%)
🎯 Model Output (Top 3): thanni venum: 87.3% | bathroom varuthu: 8.2% | Background Noise: 4.5%
```

**❌ Bad (Model Stuck):**
```
🎯 Model Output (Top 3): bathroom varuthu: 95.2% | bathroom varuthu: 95.2% | bathroom varuthu: 95.2%
(No changes when speaking different phrases)
```

---

## 🛠️ Step 6: Alternative Solutions

### Option 1: Lower Threshold

If model is working but threshold too high:

- Current threshold: 70% (0.70)
- Can lower to 60% in code if needed
- File: `components/demo/LiveDemo.tsx` line 62

### Option 2: Use Local Model Files

Instead of remote URL, use local files:

1. Download model from Teachable Machine:
   - Export → TensorFlow.js → Download
   - Extract ZIP file

2. Place files in `public/model/`:
   - `model.json`
   - `metadata.json`
   - `weights.bin`

3. Update MODEL_URL:
   ```javascript
   const MODEL_URL = '/model/'  // Local files
   ```

### Option 3: Check Model Format

Ensure model is:
- ✅ Audio Project (not Image or Pose)
- ✅ Trained with enough samples (50+ per class recommended)
- ✅ Exported as TensorFlow.js format
- ✅ All classes properly labeled

---

## 📝 Summary Checklist

- [ ] Check browser console for model output logs
- [ ] Verify all 8 classes are loaded
- [ ] Check if confidence scores change with different inputs
- [ ] Verify microphone permissions
- [ ] Test in Teachable Machine preview first
- [ ] Ensure model URL is correct
- [ ] Try Reset button if stuck
- [ ] Consider retraining if model is biased

---

## 🎯 Expected Behavior

**When Working Correctly:**

1. Model loads all 8 classes
2. Different audio inputs produce different top predictions
3. Confidence scores change based on what you say
4. After 0.7s of consistent detection + 3.5s cooldown → Speaks output
5. UI shows current highest confidence prediction

**If Not Working:**

- Check console logs to see what model is actually detecting
- Verify model URL points to correct model
- Test model in Teachable Machine preview
- Consider retraining with better data

---

**The console logs will tell you exactly what's happening!** Check `🎯 Model Output` to see if the model is genuinely biased or if there's another issue.

