/**
 * Example: How to use the Custom Audio Classifier
 * 
 * This file shows practical examples of using the audio classifier
 */

import { trainModel, classifyAudio, type AudioSample, type ClassificationResult } from './audioClassifier'

// ============================================
// Example 1: Train with Audio Files
// ============================================

async function exampleTrain() {
  // Your audio files (can be File objects from input, Blobs, or URLs)
  const samples: AudioSample[] = [
    {
      label: 'thanni venum',
      audioFile: '/path/to/thanni-venum-1.mp3', // or File object
      tamilText: 'தண்ணி வேணும்'
    },
    {
      label: 'thanni venum',
      audioFile: '/path/to/thanni-venum-2.mp3', // Multiple samples per label
      tamilText: 'தண்ணி வேணும்'
    },
    {
      label: 'pasikudhu',
      audioFile: '/path/to/pasikudhu-1.mp3',
      tamilText: 'பசிக்குது'
    },
    {
      label: 'pasikudhu',
      audioFile: '/path/to/pasikudhu-2.mp3',
      tamilText: 'பசிக்குது'
    },
    // Add more samples...
  ]

  // Train the model
  const model = await trainModel(samples)
  
  console.log('✅ Model trained!')
  console.log('Classes:', model.labels)
  
  return model
}

// ============================================
// Example 2: Classify Audio Input
// ============================================

async function exampleClassify(model: any, audioFile: File) {
  // Classify the audio
  const result: ClassificationResult = await classifyAudio(
    audioFile,  // Input audio
    model,      // Trained model
    0.3         // Threshold (30% minimum confidence)
  )

  console.log('🎯 Detection Result:')
  console.log('  Label:', result.label)
  console.log('  Confidence:', (result.confidence * 100).toFixed(1) + '%')
  console.log('  Tamil:', result.tamilText)
  
  if (result.allScores) {
    console.log('  All scores:')
    result.allScores.forEach(score => {
      console.log(`    ${score.label}: ${(score.confidence * 100).toFixed(1)}%`)
    })
  }

  return result
}

// ============================================
// Example 3: Complete Workflow
// ============================================

async function completeExample() {
  // Step 1: Prepare your audio samples
  // (In real app, these would come from file inputs or recordings)
  const trainingSamples: AudioSample[] = [
    // Add your training samples here
  ]

  // Step 2: Train the model
  const model = await trainModel(trainingSamples)

  // Step 3: Test with new audio
  const testFile = new File([], 'test.mp3') // Your test audio file
  const result = await classifyAudio(testFile, model, 0.3)

  // Step 4: Use the result
  if (result.confidence > 0.5) {
    console.log(`High confidence detection: ${result.label}`)
    // Speak the result, update UI, etc.
  } else {
    console.log('Low confidence, might be noise or unknown')
  }

  return { model, result }
}

// ============================================
// Example 4: Using with File Input
// ============================================

function setupFileInput() {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'audio/*'
  fileInput.multiple = true

  fileInput.addEventListener('change', async (e) => {
    const files = (e.target as HTMLInputElement).files
    if (!files) return

    // Convert files to AudioSample format
    const samples: AudioSample[] = Array.from(files).map(file => ({
      label: prompt('Enter label for ' + file.name) || 'unknown',
      audioFile: file,
      tamilText: prompt('Enter Tamil text (optional)') || undefined
    }))

    // Train model
    const model = await trainModel(samples)
    console.log('Model trained:', model)
  })

  return fileInput
}

// ============================================
// Example 5: Function that takes audio and returns phrase
// ============================================

/**
 * Main function: Takes audio input, checks accuracy, returns correct phrase
 * 
 * @param audioInput - Audio file, blob, or URL
 * @param model - Trained model
 * @param minConfidence - Minimum confidence threshold (0-1)
 * @returns Object with detected phrase, confidence, and Tamil text
 */
export async function detectPhrase(
  audioInput: File | Blob | string,
  model: any,
  minConfidence: number = 0.3
): Promise<{
  phrase: string
  confidence: number
  tamilText?: string
  isConfident: boolean
}> {
  const result = await classifyAudio(audioInput, model, minConfidence)

  return {
    phrase: result.label,
    confidence: result.confidence,
    tamilText: result.tamilText,
    isConfident: result.confidence >= minConfidence
  }
}

// Usage:
// const detection = await detectPhrase(audioFile, trainedModel, 0.5)
// if (detection.isConfident) {
//   console.log(`Detected: ${detection.phrase} (${detection.confidence * 100}%)`)
//   console.log(`Tamil: ${detection.tamilText}`)
// }

