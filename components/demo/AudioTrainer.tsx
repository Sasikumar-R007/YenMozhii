'use client'

import { useState, useRef } from 'react'
import { trainModel, classifyAudio, type AudioSample, type TrainedModel, type ClassificationResult } from '@/lib/audioClassifier'

interface AudioTrainerProps {
  onModelTrained: (model: TrainedModel) => void
  trainedModel: TrainedModel | null
}

export default function AudioTrainer({ onModelTrained, trainedModel }: AudioTrainerProps) {
  const [samples, setSamples] = useState<AudioSample[]>([])
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState('')
  const [currentLabel, setCurrentLabel] = useState('')
  const [currentTamilText, setCurrentTamilText] = useState('')
  const [testFile, setTestFile] = useState<File | null>(null)
  const [testResult, setTestResult] = useState<ClassificationResult | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recordButtonRef = useRef<HTMLButtonElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  // Add audio sample
  const handleAddSample = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0 || !currentLabel.trim()) {
      alert('Please enter a label and select audio files')
      return
    }

    const newSamples: AudioSample[] = []
    for (let i = 0; i < files.length; i++) {
      newSamples.push({
        label: currentLabel.trim(),
        audioFile: files[i],
        tamilText: currentTamilText.trim() || undefined
      })
    }

    setSamples([...samples, ...newSamples])
    setCurrentLabel('')
    setCurrentTamilText('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Record audio
  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
        setIsRecording(false)
      }
      return
    }

    if (!currentLabel.trim()) {
      alert('Please enter a label first')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        const audioFile = new File([blob], `${currentLabel}-${Date.now()}.webm`, { type: 'audio/webm' })
        
        setSamples([...samples, {
          label: currentLabel.trim(),
          audioFile,
          tamilText: currentTamilText.trim() || undefined
        }])

        stream.getTracks().forEach(track => track.stop())
        setCurrentLabel('')
        setCurrentTamilText('')
      }

      mediaRecorder.start()
      mediaRecorderRef.current = mediaRecorder
      setIsRecording(true)
    } catch (error) {
      console.error('Recording error:', error)
      alert('Error accessing microphone. Please check permissions.')
    }
  }

  // Train model
  const handleTrain = async () => {
    if (samples.length === 0) {
      alert('Please add at least one audio sample')
      return
    }

    setIsTraining(true)
    setTrainingProgress('Training model...')

    try {
      const model = await trainModel(samples)
      onModelTrained(model)
      setTrainingProgress('✅ Training complete!')
    } catch (error) {
      console.error('Training error:', error)
      setTrainingProgress(`❌ Training failed: ${error}`)
      alert('Training failed. Check console for details.')
    } finally {
      setIsTraining(false)
    }
  }

  // Test model
  const handleTest = async () => {
    if (!testFile || !trainedModel) {
      alert('Please select a test audio file and train a model first')
      return
    }

    setIsTesting(true)
    try {
      const result = await classifyAudio(testFile, trainedModel, 0.3)
      setTestResult(result)
    } catch (error) {
      console.error('Test error:', error)
      alert('Testing failed. Check console for details.')
    } finally {
      setIsTesting(false)
    }
  }

  // Remove sample
  const removeSample = (index: number) => {
    setSamples(samples.filter((_, i) => i !== index))
  }

  // Group samples by label
  const samplesByLabel = samples.reduce((acc, sample, index) => {
    if (!acc[sample.label]) {
      acc[sample.label] = []
    }
    acc[sample.label].push({ sample, index })
    return acc
  }, {} as Record<string, Array<{ sample: AudioSample; index: number }>>)

  return (
    <div className="space-y-6 p-6 bg-neutral-50 rounded-lg">
      <h2 className="text-2xl font-bold text-neutral-900">🎓 Custom Audio Classifier Training</h2>

      {/* Add Samples Section */}
      <div className="space-y-4 p-4 bg-white rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold">Add Training Samples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Label (English) *
            </label>
            <input
              type="text"
              value={currentLabel}
              onChange={(e) => setCurrentLabel(e.target.value)}
              placeholder="e.g., thanni venum, pasikudhu"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Tamil Text (Optional)
            </label>
            <input
              type="text"
              value={currentTamilText}
              onChange={(e) => setCurrentTamilText(e.target.value)}
              placeholder="e.g., தண்ணி வேணும்"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={handleAddSample}
            className="hidden"
            id="audio-file-input"
          />
          <label
            htmlFor="audio-file-input"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 cursor-pointer transition-colors"
          >
            📁 Upload Audio Files
          </label>

          <button
            ref={recordButtonRef}
            onClick={handleRecord}
            className={`px-4 py-2 rounded-md transition-colors ${
              isRecording
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
          >
            {isRecording ? '⏹️ Stop Recording' : '🎤 Record Audio'}
          </button>
        </div>
      </div>

      {/* Samples List */}
      {samples.length > 0 && (
        <div className="space-y-4 p-4 bg-white rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold">
            Training Samples ({samples.length} total)
          </h3>
          
          <div className="space-y-3">
            {Object.entries(samplesByLabel).map(([label, items]) => (
              <div key={label} className="border-b border-neutral-200 pb-3 last:border-0">
                <div className="font-medium text-neutral-900 mb-2">
                  {label} ({items.length} samples)
                  {items[0].sample.tamilText && (
                    <span className="text-sm text-neutral-500 ml-2">
                      ({items[0].sample.tamilText})
                    </span>
                  )}
                </div>
                <div className="text-sm text-neutral-600">
                  {items.map(({ index }) => (
                    <span key={index} className="inline-block mr-2">
                      Sample {index + 1}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleTrain}
            disabled={isTraining}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTraining ? '⏳ Training...' : '🚀 Train Model'}
          </button>

          {trainingProgress && (
            <div className="text-sm text-neutral-600">{trainingProgress}</div>
          )}
        </div>
      )}

      {/* Test Section */}
      {trainedModel && (
        <div className="space-y-4 p-4 bg-white rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold">Test Model</h3>
          
          <div className="flex gap-2">
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setTestFile(e.target.files?.[0] || null)}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleTest}
              disabled={!testFile || isTesting}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isTesting ? '⏳ Testing...' : '🔍 Test'}
            </button>
          </div>

          {testResult && (
            <div className="mt-4 p-4 bg-neutral-50 rounded-md">
              <div className="font-semibold text-neutral-900 mb-2">Result:</div>
              <div className="space-y-1">
                <div>
                  <span className="font-medium">Label:</span> {testResult.label}
                </div>
                <div>
                  <span className="font-medium">Confidence:</span>{' '}
                  {(testResult.confidence * 100).toFixed(1)}%
                </div>
                {testResult.tamilText && (
                  <div>
                    <span className="font-medium">Tamil:</span> {testResult.tamilText}
                  </div>
                )}
                {testResult.allScores && testResult.allScores.length > 1 && (
                  <div className="mt-2">
                    <div className="font-medium mb-1">All Scores:</div>
                    <div className="space-y-1 text-sm">
                      {testResult.allScores.slice(0, 5).map((score, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{score.label}:</span>
                          <span>{(score.confidence * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Model Status */}
      {trainedModel && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="font-semibold text-green-900 mb-1">
            ✅ Model Trained Successfully
          </div>
          <div className="text-sm text-green-700">
            {trainedModel.labels.length} classes: {trainedModel.labels.join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}

