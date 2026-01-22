# 🎤 Custom Audio Classifier - Complete Solution

## ✅ What I've Created

I've built a **complete custom audio classification system** that allows you to:

1. **Train a model** from your own audio files
2. **Classify audio input** and get the correct phrase with accuracy
3. **Use it in real-time** for live detection

## 📁 Files Created

### 1. `lib/audioClassifier.ts`
Core classification library with:
- **Feature extraction** (MFCC-like features, spectral analysis)
- **Training function** (`trainModel()`)
- **Classification function** (`classifyAudio()`)
- **Real-time stream classification** (`classifyStream()`)

### 2. `components/demo/AudioTrainer.tsx`
React component with UI for:
- Uploading audio files
- Recording audio samples
- Training the model
- Testing the model

### 3. `lib/audioClassifier.example.ts`
Example code showing how to use the classifier

### 4. `USAGE_GUIDE.md`
Complete documentation and API reference

## 🚀 Quick Start

### Step 1: Train with Your Audio Files

```typescript
import { trainModel, type AudioSample } from '@/lib/audioClassifier'

const samples: AudioSample[] = [
  {
    label: 'thanni venum',
    audioFile: yourAudioFile1, // File, Blob, or URL
    tamilText: 'தண்ணி வேணும்'
  },
  {
    label: 'thanni venum',
    audioFile: yourAudioFile2, // Multiple samples per label
    tamilText: 'தண்ணி வேணும்'
  },
  {
    label: 'pasikudhu',
    audioFile: yourAudioFile3,
    tamilText: 'பசிக்குது'
  },
  // Add more...
]

const model = await trainModel(samples)
```

### Step 2: Classify Audio Input

```typescript
import { classifyAudio } from '@/lib/audioClassifier'

const result = await classifyAudio(
  audioFile,  // Your audio input
  model,      // Trained model
  0.3         // Threshold (30% minimum confidence)
)

console.log('Detected:', result.label)
console.log('Confidence:', (result.confidence * 100).toFixed(1) + '%')
console.log('Tamil:', result.tamilText)
```

### Step 3: Main Function (What You Asked For)

```typescript
import { detectPhrase } from '@/lib/audioClassifier.example'

// This function takes audio input, checks accuracy, returns correct phrase
const detection = await detectPhrase(audioFile, trainedModel, 0.5)

if (detection.isConfident) {
  console.log(`✅ Detected: ${detection.phrase}`)
  console.log(`   Confidence: ${(detection.confidence * 100).toFixed(1)}%`)
  console.log(`   Tamil: ${detection.tamilText}`)
}
```

## 🎯 Using the Training UI

Add the `AudioTrainer` component to any page:

```tsx
import AudioTrainer from '@/components/demo/AudioTrainer'
import { useState } from 'react'
import type { TrainedModel } from '@/lib/audioClassifier'

export default function TrainingPage() {
  const [trainedModel, setTrainedModel] = useState<TrainedModel | null>(null)

  return (
    <div>
      <h1>Train Your Audio Classifier</h1>
      <AudioTrainer
        onModelTrained={setTrainedModel}
        trainedModel={trainedModel}
      />
    </div>
  )
}
```

## 📊 How It Works

1. **Feature Extraction**:
   - Extracts MFCC-like features from audio
   - Computes spectral features (centroid, rolloff)
   - Calculates zero-crossing rate and energy
   - Creates a feature vector for each audio sample

2. **Training**:
   - Processes all training samples
   - Extracts features for each sample
   - Stores feature vectors grouped by label
   - Creates a `TrainedModel` object

3. **Classification**:
   - Extracts features from input audio
   - Compares with all training samples using **cosine similarity**
   - Returns the label with highest similarity (confidence)
   - Includes all scores for debugging

## 🔧 Integration Options

### Option 1: Use AudioTrainer Component
- Easiest: Just add the component to your page
- Upload files or record audio
- Train and test in the UI

### Option 2: Use Functions Directly
- More control: Use `trainModel()` and `classifyAudio()` directly
- Integrate into your own UI
- Customize the workflow

### Option 3: Replace Teachable Machine
- Train your custom model
- Replace the Teachable Machine model in `LiveDemo.tsx`
- Use `classifyStream()` for real-time detection

## 💡 Tips for Best Results

1. **Multiple samples**: Provide 3-5 audio samples per phrase
2. **Consistent quality**: Use similar recording conditions
3. **Clear audio**: Avoid background noise in training samples
4. **Adjust threshold**: 
   - Lower (0.2-0.3) for more detections
   - Higher (0.5-0.7) for precision

## 📝 Example: Complete Workflow

```typescript
// 1. Prepare your audio files
const audioFiles = [
  { file: file1, label: 'thanni venum', tamil: 'தண்ணி வேணும்' },
  { file: file2, label: 'thanni venum', tamil: 'தண்ணி வேணும்' },
  { file: file3, label: 'pasikudhu', tamil: 'பசிக்குது' },
  // ... more samples
]

// 2. Convert to AudioSample format
const samples: AudioSample[] = audioFiles.map(a => ({
  label: a.label,
  audioFile: a.file,
  tamilText: a.tamil
}))

// 3. Train the model
const model = await trainModel(samples)

// 4. Classify new audio
const testAudio = // ... your test audio file
const result = await classifyAudio(testAudio, model, 0.3)

// 5. Use the result
console.log(`Detected: ${result.label} (${result.confidence * 100}%)`)
if (result.tamilText) {
  console.log(`Tamil: ${result.tamilText}`)
}
```

## 🎯 Main Function (As Requested)

The function you asked for is in `lib/audioClassifier.example.ts`:

```typescript
export async function detectPhrase(
  audioInput: File | Blob | string,
  model: TrainedModel,
  minConfidence: number = 0.3
): Promise<{
  phrase: string
  confidence: number
  tamilText?: string
  isConfident: boolean
}>
```

**Usage:**
```typescript
const detection = await detectPhrase(audioFile, trainedModel, 0.5)

if (detection.isConfident) {
  // Use detection.phrase, detection.confidence, detection.tamilText
}
```

## 📚 Next Steps

1. **Add AudioTrainer to a page** (e.g., `/demo/train`)
2. **Upload your audio files** and train the model
3. **Test it** with the built-in test function
4. **Integrate** into LiveDemo or use directly in your code

## 🔍 Files to Check

- `lib/audioClassifier.ts` - Core functions
- `components/demo/AudioTrainer.tsx` - Training UI
- `lib/audioClassifier.example.ts` - Usage examples
- `USAGE_GUIDE.md` - Full documentation

---

**Ready to use!** Just provide your audio files and start training! 🚀

