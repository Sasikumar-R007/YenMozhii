# 🎤 Custom Audio Classifier - Usage Guide

## Overview

This custom audio classifier allows you to:
1. **Train a model** from your own audio files
2. **Classify audio input** and get the correct phrase with accuracy
3. **Use it in real-time** for live audio detection

## Quick Start

### 1. Training with Your Audio Files

```typescript
import { trainModel, type AudioSample } from '@/lib/audioClassifier'

// Prepare your audio samples
const samples: AudioSample[] = [
  {
    label: 'thanni venum',
    audioFile: file1, // File, Blob, or URL
    tamilText: 'தண்ணி வேணும்'
  },
  {
    label: 'pasikudhu',
    audioFile: file2,
    tamilText: 'பசிக்குது'
  },
  // Add more samples...
]

// Train the model
const model = await trainModel(samples)
console.log('Model trained with', model.labels.length, 'classes')
```

### 2. Classifying Audio Input

```typescript
import { classifyAudio, type ClassificationResult } from '@/lib/audioClassifier'

// Classify an audio file
const result: ClassificationResult = await classifyAudio(
  audioFile, // File, Blob, or URL
  model,     // Trained model
  0.3        // Threshold (optional, default: 0.3)
)

console.log('Detected:', result.label)
console.log('Confidence:', (result.confidence * 100).toFixed(1) + '%')
console.log('Tamil text:', result.tamilText)
```

### 3. Using the Training UI Component

Add the `AudioTrainer` component to your page:

```tsx
import AudioTrainer from '@/components/demo/AudioTrainer'
import { useState } from 'react'
import type { TrainedModel } from '@/lib/audioClassifier'

export default function MyPage() {
  const [trainedModel, setTrainedModel] = useState<TrainedModel | null>(null)

  return (
    <AudioTrainer
      onModelTrained={setTrainedModel}
      trainedModel={trainedModel}
    />
  )
}
```

## How It Works

### Feature Extraction
- Extracts **MFCC-like features** from audio
- Computes **spectral features** (centroid, rolloff)
- Calculates **zero-crossing rate** and **energy**
- Creates a **feature vector** for each audio sample

### Training
- Processes all training samples
- Extracts features for each sample
- Stores feature vectors grouped by label
- Creates a **TrainedModel** object

### Classification
- Extracts features from input audio
- Compares with all training samples using **cosine similarity**
- Returns the label with highest similarity (confidence)
- Includes all scores for debugging

## API Reference

### `trainModel(samples: AudioSample[]): Promise<TrainedModel>`

Trains a model from audio samples.

**Parameters:**
- `samples`: Array of audio samples with labels

**Returns:**
- `TrainedModel`: Trained model object

**Example:**
```typescript
const model = await trainModel([
  { label: 'thanni venum', audioFile: file1, tamilText: 'தண்ணி வேணும்' },
  { label: 'pasikudhu', audioFile: file2, tamilText: 'பசிக்குது' }
])
```

### `classifyAudio(audioInput, model, threshold?): Promise<ClassificationResult>`

Classifies audio input and returns the best match.

**Parameters:**
- `audioInput`: File, Blob, or URL string
- `model`: Trained model
- `threshold`: Minimum confidence (0-1), default: 0.3

**Returns:**
- `ClassificationResult`: Object with label, confidence, tamilText, and allScores

**Example:**
```typescript
const result = await classifyAudio(audioFile, model, 0.5)
// Returns: { label: 'thanni venum', confidence: 0.85, tamilText: 'தண்ணி வேணும்', ... }
```

### `extractAudioFeatures(audioSource): Promise<Float32Array>`

Extracts features from an audio file/URL.

**Parameters:**
- `audioSource`: File, Blob, or URL string

**Returns:**
- `Float32Array`: Feature vector

**Example:**
```typescript
const features = await extractAudioFeatures('path/to/audio.mp3')
```

## Integration with LiveDemo

To use your custom trained model in the LiveDemo component:

1. **Train your model** using `AudioTrainer` or `trainModel()`
2. **Store the model** in state or localStorage
3. **Replace the Teachable Machine model** with your custom model
4. **Use `classifyStream()`** for real-time classification

Example integration:

```typescript
import { classifyStream, type TrainedModel } from '@/lib/audioClassifier'

// In your component
const [customModel, setCustomModel] = useState<TrainedModel | null>(null)

// When user starts listening
const startCustomListening = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  
  const stop = await classifyStream(
    stream,
    customModel!,
    (result) => {
      console.log('Detected:', result.label, result.confidence)
      // Update UI with result
    },
    1000 // Check every 1 second
  )
  
  // Call stop() when done
}
```

## Tips for Better Accuracy

1. **Multiple samples per label**: Provide 3-5 audio samples per phrase
2. **Consistent audio quality**: Use similar recording conditions
3. **Clear audio**: Avoid background noise in training samples
4. **Similar speakers**: If possible, use the same speaker for training and testing
5. **Adjust threshold**: Lower threshold (0.2-0.3) for more detections, higher (0.5-0.7) for precision

## Troubleshooting

### Low Accuracy
- Add more training samples per label
- Ensure training samples are clear and consistent
- Check that audio format is supported (MP3, WAV, WebM, etc.)

### No Detection
- Lower the threshold parameter
- Check that audio input is being captured correctly
- Verify model was trained successfully

### Browser Compatibility
- Requires modern browser with Web Audio API support
- Chrome, Firefox, Edge, Safari (latest versions)
- May require HTTPS for microphone access

## File Structure

```
lib/
  └── audioClassifier.ts    # Core classification functions

components/demo/
  └── AudioTrainer.tsx       # Training UI component
```

## Next Steps

1. **Train your model** with your audio files
2. **Test it** using the AudioTrainer component
3. **Integrate** into LiveDemo for real-time use
4. **Fine-tune** threshold and add more samples as needed

