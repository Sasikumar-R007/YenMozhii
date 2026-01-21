'use client'

/* 
 * OLD CODE COMMENTED OUT - Can be used later if needed
 * The old hardware connection interface is preserved below for reference
 */

// import { useState, useCallback } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'demo'
// type DemoMode = 'hardware' | 'simulation'

// interface SoundSample {
//   id: string
//   name: string
//   description: string
//   outputText: string
// }

// ... OLD CODE CONTINUES ...

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Script from 'next/script'

declare global {
  interface Window {
    speechCommands: any
    tf: any
  }
}

interface ClassLabel {
  name: string
  confidence: number
}

export default function LiveDemo() {
  const [isListening, setIsListening] = useState(false)
  const [classLabels, setClassLabels] = useState<string[]>([])
  const [confidences, setConfidences] = useState<number[]>([])
  const [topLabel, setTopLabel] = useState('Waiting for input...')
  const [topConfidence, setTopConfidence] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speakText, setSpeakText] = useState('')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isLoadingModel, setIsLoadingModel] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [tfLoaded, setTfLoaded] = useState(false)
  const [speechCommandsLoaded, setSpeechCommandsLoaded] = useState(false)

  const recognizerRef = useRef<any>(null)
  const lastSpokenRef = useRef('')
  const lastSpokenTimeRef = useRef(0)
  // Lower threshold for better detection (0.75 = 75% confidence)
  const threshold = 0.75
  // Cooldown to prevent duplicate speech (in milliseconds) - increased for clearer output
  const cooldown = 2000
  // Use remote Teachable Machine model (same as old project) - has all 8 classes
  const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/GmzaS6iNB/'

  // Check if scripts are loaded and ready (only when both are marked as loaded)
  useEffect(() => {
    if (!tfLoaded || !speechCommandsLoaded) {
      return
    }

    const checkScripts = async () => {
      if (window.tf && window.speechCommands) {
        // Ensure TensorFlow.js backend is ready
        try {
          if (window.tf.ready) {
            await window.tf.ready()
          }
          // Verify tf.util exists (indicates full initialization)
          if (window.tf.util && typeof window.speechCommands.create === 'function') {
            console.log('✅ TensorFlow.js and Speech Commands fully loaded and ready')
            setScriptsLoaded(true)
            setErrorMessage('')
          } else {
            console.log('⏳ TensorFlow.js loading but not fully initialized...')
            setScriptsLoaded(false)
          }
        } catch (error) {
          console.error('Error checking TensorFlow.js readiness:', error)
          setScriptsLoaded(false)
        }
      } else {
        console.log('⏳ Waiting for scripts to load...', {
          tf: !!window.tf,
          speechCommands: !!window.speechCommands
        })
        setScriptsLoaded(false)
      }
    }

    // Check immediately
    checkScripts()

    // Check periodically until loaded
    const interval = setInterval(() => {
      checkScripts()
      if (window.tf?.util && window.speechCommands && typeof window.speechCommands.create === 'function') {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [tfLoaded, speechCommandsLoaded])

  // Load voices
  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = speechSynthesis.getVoices()
      const filteredVoices = availableVoices.filter(
        (v) =>
          v.lang.toLowerCase().includes('en') ||
          v.lang.toLowerCase().includes('ta') ||
          v.lang.toLowerCase().includes('ml')
      )
      setVoices(filteredVoices)
      if (filteredVoices.length > 0 && !selectedVoice) {
        setSelectedVoice('0')
      }
    }

    populateVoices()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = populateVoices
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [selectedVoice])

  // Initialize model
  const createModel = async () => {
    if (!window.speechCommands || !window.tf) {
      const error = 'TensorFlow.js or Speech Commands not loaded. Please wait for scripts to load and refresh the page.'
      setErrorMessage(error)
      throw new Error(error)
    }

    try {
      // Build model URLs (works for both remote Teachable Machine and local files)
      let checkpointURL: string
      let metadataURL: string
      
      if (MODEL_URL.startsWith('http')) {
        // Remote Teachable Machine URL
        checkpointURL = MODEL_URL + 'model.json'
        metadataURL = MODEL_URL + 'metadata.json'
      } else {
        // Local files - convert to absolute URLs
        const baseURL = typeof window !== 'undefined' ? window.location.origin : ''
        checkpointURL = baseURL + MODEL_URL + 'model.json'
        metadataURL = baseURL + MODEL_URL + 'metadata.json'
      }
      
      console.log('📦 Loading model from:', checkpointURL)
      console.log('📋 Metadata URL:', metadataURL)
      
      // Verify files exist first (skip for remote models as they're always accessible)
      if (!MODEL_URL.startsWith('http')) {
        try {
          console.log('🔍 Verifying local model files...')
          const modelResponse = await fetch(checkpointURL)
          console.log('Model file response:', modelResponse.status, modelResponse.statusText)
          if (!modelResponse.ok) {
            throw new Error(`Model file not found (${modelResponse.status}). Check if model.json exists in /public/model/`)
          }
          
          const metadataResponse = await fetch(metadataURL)
          console.log('Metadata file response:', metadataResponse.status, metadataResponse.statusText)
          if (!metadataResponse.ok) {
            throw new Error(`Metadata file not found (${metadataResponse.status}). Check if metadata.json exists in /public/model/`)
          }
          
          // Check weights.bin for local models
          const baseURL = typeof window !== 'undefined' ? window.location.origin : ''
          const weightsResponse = await fetch(baseURL + MODEL_URL + 'weights.bin', { method: 'HEAD' })
          console.log('Weights file response:', weightsResponse.status, weightsResponse.statusText)
          if (!weightsResponse.ok) {
            console.warn('⚠️ weights.bin might not be accessible:', weightsResponse.status)
          }
          
          console.log('✅ Model files found and accessible')
        } catch (fetchError) {
          console.error('❌ Error fetching model files:', fetchError)
          throw fetchError
        }
      } else {
        console.log('✅ Using remote Teachable Machine model')
      }
      
      console.log('🔨 Creating recognizer...')
      console.log('TensorFlow.js available:', !!window.tf)
      console.log('Speech Commands available:', !!window.speechCommands)
      console.log('speechCommands.create function:', typeof window.speechCommands?.create)
      
      if (!window.speechCommands || typeof window.speechCommands.create !== 'function') {
        throw new Error('Speech Commands API not fully loaded. Please refresh the page.')
      }
      
      // Verify TensorFlow.js is loaded
      if (!window.tf) {
        throw new Error('TensorFlow.js not loaded. Please wait for scripts to load.')
      }
      
      // CRITICAL: Ensure TensorFlow.js backend is ready FIRST
      console.log('⏳ Ensuring TensorFlow.js backend is ready...')
      if (window.tf.ready) {
        await window.tf.ready()
      }
      // Additional wait to ensure backend is fully initialized
      await new Promise(resolve => setTimeout(resolve, 100))
      console.log('✅ TensorFlow.js backend ready')
      
      // CRITICAL: Verify tf.util exists after ready() (Speech Commands needs this)
      if (!window.tf || !window.tf.util) {
        console.error('❌ TensorFlow.js state:', {
          tf: !!window.tf,
          tfUtil: !!window.tf?.util,
          tfReady: typeof window.tf?.ready,
          tfBackend: window.tf?.getBackend?.()
        })
        throw new Error('TensorFlow.js util not available after initialization. Please refresh the page.')
      }
      
      // CRITICAL: Verify Speech Commands can access TensorFlow.js
      if (!window.speechCommands || typeof window.speechCommands.create !== 'function') {
        throw new Error('Speech Commands API not available. Please refresh the page.')
      }
      
      let rec
      try {
        // Final verification that tf.util is accessible (required by Speech Commands)
        const tfUtilCheck = window.tf?.util
        if (!tfUtilCheck) {
          throw new Error('tf.util is undefined. TensorFlow.js may not be fully initialized.')
        }
        
        console.log('Creating recognizer with:', {
          checkpointURL,
          metadataURL,
          tfUtilExists: !!window.tf.util,
          tfBackend: window.tf.getBackend?.() || 'unknown',
          speechCommandsCreateExists: typeof window.speechCommands?.create === 'function',
          tfVersion: window.tf?.version?.tfjs || 'unknown'
        })
        
        // Create recognizer - Speech Commands will internally access tf.util
        rec = window.speechCommands.create(
          'BROWSER_FFT',
          undefined,
          checkpointURL,
          metadataURL
        )
        console.log('✅ Recognizer created successfully')
      } catch (createError) {
        console.error('❌ Error creating recognizer:', createError)
        console.error('Error details:', {
          message: createError instanceof Error ? createError.message : 'No message',
          name: createError instanceof Error ? createError.name : 'No name',
          stack: createError instanceof Error ? createError.stack : 'No stack',
          error: createError,
          tfAvailable: !!window.tf,
          tfUtilAvailable: !!window.tf?.util,
          speechCommandsAvailable: !!window.speechCommands,
          speechCommandsCreateAvailable: typeof window.speechCommands?.create === 'function'
        })
        const createErrorMsg = createError instanceof Error ? createError.message : String(createError) || 'Unknown error creating recognizer'
        throw new Error(`Failed to create recognizer: ${createErrorMsg}. TensorFlow.js may not be fully initialized. Try refreshing the page.`)
      }
      
      console.log('⏳ Loading model weights (this may take a moment)...')
      try {
        await rec.ensureModelLoaded()
        console.log('✅ Model loaded successfully!')
      } catch (loadError) {
        console.error('❌ Error during model.load():', loadError)
        console.error('Load error details:', {
          message: loadError instanceof Error ? loadError.message : 'No message',
          name: loadError instanceof Error ? loadError.name : 'No name',
          stack: loadError instanceof Error ? loadError.stack : 'No stack',
          fullError: loadError,
          toString: String(loadError)
        })
        const loadErrorMsg = loadError instanceof Error ? loadError.message : String(loadError) || 'Unknown error loading model'
        throw new Error(`Model weights failed to load: ${loadErrorMsg}. Check if weights.bin is accessible at ${MODEL_URL}weights.bin`)
      }
      
      setErrorMessage('')
      return rec
    } catch (error) {
      console.error('❌ Error loading model:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'No message',
        name: error instanceof Error ? error.name : 'No name',
        stack: error instanceof Error ? error.stack : 'No stack',
        error: error,
        toString: String(error),
        type: typeof error
      })
      const errorMsg = error instanceof Error ? (error.message || String(error) || 'Unknown error') : (String(error) || 'Unknown error occurred')
      setErrorMessage(`Model loading failed: ${errorMsg}. Please check browser console for details.`)
      throw error
    }
  }

  // Map model labels to spoken text (Tamil phrases to English)
  const getSpokenText = (label: string): string => {
    // Map all Tamil labels to human-readable English speech text
    const labelMap: { [key: string]: string } = {
      'Background Noise': '', // Don't speak background noise
      'thanni venum': 'I need water',
      'bathroom varuthu': 'I need to go to the bathroom',
      'pasikudhu': 'I am hungry',
      'kai valikuthu': 'My hand is paining',
      'amma va kooputunga': 'Mom please come',
      'maathara thaanga': 'Please wait a minute',
      'thirupi paduka vainga': 'Please turn around',
      // Alternative spellings (if model has variations)
      'pasikkudhu': 'I am hungry',
      'kai valikkudhu': 'My hand is paining',
    }
    
    // If no mapping exists, use the label directly
    const mappedText = labelMap[label]
    if (mappedText === '') return '' // Explicitly skip if mapped to empty string
    if (mappedText) return mappedText // Use mapped text if available
    
    // Default: use label as-is (will speak the Tamil phrase if no mapping)
    return label
  }

  // Speak function with enhanced AI voice
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.error('❌ Speech synthesis not available in this browser')
      return
    }
    
    // Skip background noise and empty text
    if (!text || text.trim() === '' || text === 'Background Noise') {
      console.warn(`⚠️ Skipping speech: invalid label "${text}"`)
      return
    }
    
    const now = Date.now()
    if (now - lastSpokenTimeRef.current < cooldown && text === lastSpokenRef.current) {
      console.log('⏸️ Speech skipped: cooldown active')
      return
    }

    // Get the spoken text (may be different from label)
    const spokenText = getSpokenText(text)
    console.log(`🗣️ Speech preparation: label="${text}" → spoken="${spokenText}"`)
    
    if (!spokenText || spokenText.trim() === '') {
      console.error(`❌ No spoken text for label: "${text}" - check label mapping in getSpokenText()`)
      return
    }

    console.log(`🔊 Speaking now: "${spokenText}"`)
    const utterance = new SpeechSynthesisUtterance(spokenText)
    
    // Set voice if available
    if (voices.length && selectedVoice) {
      utterance.voice = voices[parseInt(selectedVoice)]
    }
    
    // Enhanced voice settings for clear, loud output
    utterance.pitch = 1.0 // Normal pitch
    utterance.rate = 0.9  // Slightly slower for clarity
    utterance.volume = 1.0 // Maximum volume
    
    // Set language for better pronunciation
    if (spokenText.includes('water') || spokenText.toLowerCase().includes('i need')) {
      utterance.lang = 'en-US' // English
    } else {
      utterance.lang = 'ta-IN' // Tamil (if Tamil text detected)
    }

    setIsSpeaking(true)
    setSpeakText(spokenText)

    utterance.onend = () => {
      setIsSpeaking(false)
      setTimeout(() => {
        if (speakText === spokenText) setSpeakText('')
      }, 400)
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      setIsSpeaking(false)
      setSpeakText('')
    }

    // Cancel any ongoing speech and speak immediately
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)

    lastSpokenRef.current = text
    lastSpokenTimeRef.current = now
  }

  // Start listening
  const startListening = async () => {
    try {
      setIsLoadingModel(true)
      
      // Check if TensorFlow.js and Speech Commands are loaded
      if (!window.tf) {
        throw new Error('TensorFlow.js not loaded. Please wait for scripts to load and try again.')
      }
      
      if (!window.speechCommands || typeof window.speechCommands.create !== 'function') {
        throw new Error('Speech Commands library not fully loaded. Please wait a moment and try again, or refresh the page.')
      }
      
      // Ensure TensorFlow.js backend is ready
      if (window.tf.ready) {
        console.log('⏳ Waiting for TensorFlow.js backend to be ready...')
        await window.tf.ready()
        console.log('✅ TensorFlow.js backend ready')
      }
      
      if (!recognizerRef.current) {
        console.log('🔨 Creating model...')
        recognizerRef.current = await createModel()
        const labels = recognizerRef.current.wordLabels()
        console.log('📝 Model labels loaded:', labels)
        setClassLabels(labels)
        setConfidences(new Array(labels.length).fill(0))
        setIsModelLoaded(true)
      }

      recognizerRef.current.listen(
        (result: any) => {
          const scores = result.scores
          
          // Get labels directly from recognizer to ensure they're current (fixes empty label issue)
          const currentLabels = recognizerRef.current?.wordLabels() || classLabels || []
          
          // Update classLabels state if it's different
          if (currentLabels.length > 0 && JSON.stringify(currentLabels) !== JSON.stringify(classLabels)) {
            setClassLabels(currentLabels)
          }
          
          let maxIdx = 0
          let maxVal = -1

          // Find the highest confidence score (excluding background noise if possible)
          const newConfidences = scores.map((val: number, i: number) => {
            const label = currentLabels[i] || ''
            // Prioritize non-background noise classes
            if (label !== 'Background Noise' && val > maxVal) {
              maxVal = val
              maxIdx = i
            }
            return Math.max(0, Math.min(100, val * 100))
          })

          // If no non-background class found with high confidence, use the absolute max
          if (maxVal < threshold) {
            maxVal = -1
            maxIdx = 0
            scores.forEach((val: number, i: number) => {
              if (val > maxVal) {
                maxVal = val
                maxIdx = i
              }
            })
          }

          setConfidences(newConfidences)
          
          // Get top label from current labels array (fixes empty label issue)
          const topLabel = (currentLabels[maxIdx] || '').trim()
          setTopLabel(topLabel)
          setTopConfidence(maxVal * 100)

          // Debug: Log all labels and scores
          if (maxVal >= threshold) {
            console.log('🔍 Detection details:', {
              topLabel: `"${topLabel}"`,
              maxIdx,
              maxVal: (maxVal * 100).toFixed(1) + '%',
              currentLabelsCount: currentLabels.length,
              allLabels: currentLabels,
              allScores: scores.map((s: number, i: number) => ({
                label: currentLabels[i] || `[${i}]`,
                score: (s * 100).toFixed(1) + '%'
              }))
            })
          }

          // Speak only if threshold is met, label is valid, and it's not background noise
          if (maxVal >= threshold && topLabel && topLabel !== 'Background Noise') {
            // Only speak if it's a new phrase or cooldown has passed
            if (
              topLabel !== lastSpokenRef.current ||
              Date.now() - lastSpokenTimeRef.current > cooldown
            ) {
              console.log(`🎤 Detected: "${topLabel}" (confidence: ${(maxVal * 100).toFixed(1)}%)`)
              const spokenText = getSpokenText(topLabel)
              console.log(`🔊 Will speak: "${spokenText}"`)
              speak(topLabel)
            }
          } else if (maxVal >= threshold && (!topLabel || topLabel === '')) {
            console.error('❌ ERROR: High confidence but empty label!', {
              maxIdx,
              currentLabels,
              scoresLength: scores.length,
              scores: scores.map((s: number, i: number) => ({
                index: i,
                score: (s * 100).toFixed(1) + '%',
                label: currentLabels[i] || 'MISSING'
              }))
            })
            console.warn('⚠️ High confidence detected but label is empty!', {
              maxIdx,
              classLabels,
              scores: scores.map((s: number) => (s * 100).toFixed(1) + '%')
            })
          }
        },
        {
          includeSpectrogram: true,
          probabilityThreshold: 0.01,
          overlapFactor: 0.5,
          invokeCallbackOnNoiseAndUnknown: true,
        }
      )

      setIsListening(true)
      setIsLoadingModel(false)
      setErrorMessage('')
      console.log('✅ Model loaded and listening started successfully!')
    } catch (err) {
      console.error('❌ Model error in startListening:', err)
      setIsLoadingModel(false)
      setIsListening(false)
      // Error message is already set by createModel function
      if (!errorMessage) {
        const errorMsg = err instanceof Error ? err.message : String(err) || 'Unknown error occurred'
        setErrorMessage(`Failed to start listening: ${errorMsg}. Please check browser console for details.`)
      }
    }
  }

  // Stop listening
  const stopListening = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopListening()
    }
    setIsListening(false)
    setIsSpeaking(false)
    setSpeakText('')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        try {
          recognizerRef.current.stopListening()
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <>
      {/* Load TensorFlow.js FIRST - wait for it to be fully ready before loading Speech Commands */}
      <Script
        id="tfjs-script"
        src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"
        strategy="lazyOnload"
        onLoad={async () => {
          console.log('✅ TensorFlow.js script loaded')
          // Wait for TensorFlow.js to be fully initialized
          try {
            if (window.tf?.ready) {
              await window.tf.ready()
            }
            // Wait a bit more to ensure tf.util is available
            await new Promise(resolve => setTimeout(resolve, 200))
            
            if (window.tf && window.tf.util) {
              console.log('✅ TensorFlow.js fully initialized (tf.util available)')
              setTfLoaded(true)
            } else {
              console.error('❌ TensorFlow.js loaded but tf.util not available')
              setErrorMessage('TensorFlow.js did not initialize properly. Please refresh the page.')
            }
          } catch (error) {
            console.error('❌ Error initializing TensorFlow.js:', error)
            setErrorMessage('Failed to initialize TensorFlow.js. Please refresh the page.')
          }
        }}
        onError={(e) => {
          console.error('❌ Failed to load TensorFlow.js:', e)
          setErrorMessage('Failed to load TensorFlow.js library. Please check your internet connection.')
        }}
      />
      {/* Load Speech Commands ONLY after TensorFlow.js is ready */}
      {tfLoaded && (
        <Script
          id="speech-commands-script"
          src="https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js"
          strategy="lazyOnload"
          onLoad={async () => {
            console.log('✅ Speech Commands script loaded')
            // Wait a moment for Speech Commands to initialize
            await new Promise(resolve => setTimeout(resolve, 300))
            
            // Verify both are available and properly initialized
            if (window.tf && window.tf.util && window.speechCommands && typeof window.speechCommands.create === 'function') {
              console.log('✅ Speech Commands library ready and functional')
              // Double-check tf.util is still available (Speech Commands might have accessed it)
              if (window.tf.util) {
                setSpeechCommandsLoaded(true)
              } else {
                console.error('❌ tf.util became unavailable after Speech Commands loaded')
                setErrorMessage('Speech Commands failed to initialize correctly. Please refresh the page.')
              }
            } else {
              console.error('❌ Speech Commands loaded but not properly initialized', {
                tf: !!window.tf,
                tfUtil: !!window.tf?.util,
                speechCommands: !!window.speechCommands,
                createFunction: typeof window.speechCommands?.create
              })
              setErrorMessage('Speech Commands loaded but TensorFlow.js integration failed. Please refresh the page.')
            }
          }}
          onError={(e) => {
            console.error('❌ Failed to load Speech Commands:', e)
            setErrorMessage('Failed to load Speech Commands library. Please check your internet connection.')
          }}
        />
      )}

      <div className="min-h-screen bg-[#0f1720] text-[#e6eef6] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <header className="flex flex-row items-center gap-4 mb-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden">
              <Image
                src="/assests/YenMozhi logo.png"
                alt="YenMozhi Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#00e676] mb-1">
                YenMozhi
              </h1>
              <p className="text-sm sm:text-base text-[#9aa0a6]">
                Giving a voice to interact with the World.!
              </p>
            </div>
          </header>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold mb-1">Error</p>
                  <p>{errorMessage}</p>
                  {!scriptsLoaded && (
                    <p className="mt-2 text-xs">Waiting for TensorFlow.js libraries to load... Please wait.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={startListening}
              disabled={isLoadingModel || isListening || !scriptsLoaded}
              className="px-6 py-3 bg-[#00e676] text-black font-bold rounded-lg hover:bg-[#00d469] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {!scriptsLoaded ? 'Loading Libraries...' : isLoadingModel ? 'Loading Model...' : isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <button
              onClick={stopListening}
              disabled={!isListening}
              className="px-4 py-2 bg-transparent border border-white/10 text-[#9aa0a6] rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Stop
            </button>
            <div className="flex items-center gap-2 ml-2">
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  isListening ? 'bg-[#00e676] shadow-lg shadow-[#00e676]/30' : 'bg-[#9aa0a6]'
                }`}
              />
              <span className="text-sm text-[#9aa0a6]">Microphone</span>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Left Section - Live Class Confidences */}
            <div className="flex-1 bg-[#111318] rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm sm:text-base text-[#9aa0a6]">
                  Live class confidences
                </div>
                <div className="text-xs text-[#9aa0a6]">
                  Threshold: <span>{threshold}</span>
                </div>
              </div>

              {/* Labels */}
              <div className="grid grid-cols-[1fr_80px] gap-2 mb-4">
                {classLabels.map((label, index) => (
                  <div key={index} className="contents">
                    <div className="text-sm text-[#cfe7db] py-1">{label}</div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden relative">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#00e676] to-[#ffd600] rounded-full transition-all duration-150"
                        style={{ width: `${confidences[index] || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Label */}
              <div
                className={`bg-gradient-to-b from-white/5 to-white/2 rounded-xl p-4 sm:p-6 text-center shadow-xl transition-transform ${
                  topConfidence >= threshold * 100 ? 'scale-[1.02]' : ''
                }`}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {topLabel}
                </div>
                <div className="text-sm text-[#9aa0a6]">
                  {topConfidence > 0 ? `${topConfidence.toFixed(2)}%` : '—'}
                </div>
              </div>
            </div>

            {/* Right Section - Avatar & Voice */}
            <div className="w-full lg:w-80 bg-[#111318] rounded-2xl p-4 sm:p-6 shadow-2xl">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div
                  className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-xl overflow-hidden transition-transform bg-gradient-to-br from-[#0b0f12] to-[#0d1216] flex items-center justify-center ${
                    isSpeaking ? 'scale-125' : ''
                  }`}
                >
                  <Image
                    src="/assests/YenMozhi logo.png"
                    alt="Avatar"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="text-center">
                  <div className="font-bold text-base">{speakText || '—'}</div>
                  <div className="text-xs text-[#9aa0a6] mt-1">Avatar</div>
                </div>
              </div>

              {/* Voice Selection */}
              <div className="w-full">
                <label className="block text-xs text-[#9aa0a6] mb-2">Voice</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#222] border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00e676]"
                >
                  {voices.map((voice, index) => (
                    <option key={index} value={index}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

