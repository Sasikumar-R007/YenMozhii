/**
 * Custom Audio Classifier
 * 
 * This module provides functions to:
 * 1. Train a model from audio files
 * 2. Classify audio input and return the best match with accuracy
 * 
 * Uses Web Audio API for feature extraction and cosine similarity for classification
 */

export interface AudioSample {
    label: string // e.g., "thanni venum", "pasikudhu"
    audioFile: File | Blob | string // File, Blob, or URL
    tamilText?: string // Optional Tamil text for display
}

export interface ClassificationResult {
    label: string
    confidence: number // 0-1
    tamilText?: string
    allScores?: Array<{ label: string; confidence: number }>
}

export interface TrainedModel {
    features: Map<string, Float32Array[]> // label -> array of feature vectors
    labels: string[]
    metadata: Map<string, { tamilText?: string }>
}

/**
 * Extract audio features from audio file/URL
 * Uses Web Audio API to extract MFCC-like features
 */
export async function extractAudioFeatures(
    audioSource: File | Blob | string
): Promise<Float32Array> {
    return new Promise(async (resolve, reject) => {
        try {
            // Convert to AudioBuffer
            let arrayBuffer: ArrayBuffer

            if (audioSource instanceof File || audioSource instanceof Blob) {
                arrayBuffer = await audioSource.arrayBuffer()
            } else if (typeof audioSource === 'string') {
                // URL - fetch it
                const response = await fetch(audioSource)
                arrayBuffer = await response.arrayBuffer()
            } else {
                throw new Error('Invalid audio source type')
            }

            // Create AudioContext
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

            // Extract features
            const features = extractFeaturesFromBuffer(audioBuffer)

            audioContext.close()
            resolve(features)
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Extract features from AudioBuffer
 * Returns a feature vector (MFCC-like features)
 */
function extractFeaturesFromBuffer(audioBuffer: AudioBuffer): Float32Array {
    const sampleRate = audioBuffer.sampleRate
    const channelData = audioBuffer.getChannelData(0) // Use first channel
    const length = channelData.length

    // Normalize audio
    const normalized = normalizeAudio(channelData)

    // Extract features: spectral features, zero-crossing rate, energy, etc.
    const features: number[] = []

    // 1. Spectral features (using FFT)
    const fftSize = 2048
    const hopSize = 512
    const spectralFeatures: number[] = []

    for (let i = 0; i < length - fftSize; i += hopSize) {
        const segment = normalized.slice(i, i + fftSize)
        const fft = computeFFT(segment)

        // Extract mel-frequency cepstral coefficients (MFCC-like)
        const mfcc = extractMFCC(fft, sampleRate)
        spectralFeatures.push(...mfcc)
    }

    // Average spectral features
    const avgSpectral = averageFeatures(spectralFeatures, 13) // 13 MFCC coefficients
    features.push(...avgSpectral)

    // 2. Zero-crossing rate
    const zcr = computeZeroCrossingRate(normalized)
    features.push(zcr)

    // 3. Energy/RMS
    const energy = computeEnergy(normalized)
    features.push(energy)

    // 4. Spectral centroid
    const centroid = computeSpectralCentroid(normalized, sampleRate)
    features.push(centroid)

    // 5. Spectral rolloff
    const rolloff = computeSpectralRolloff(normalized, sampleRate)
    features.push(rolloff)

    return new Float32Array(features)
}

/**
 * Normalize audio to [-1, 1]
 */
function normalizeAudio(audio: Float32Array): Float32Array {
    const max = Math.max(...Array.from(audio).map(Math.abs))
    if (max === 0) return audio
    return new Float32Array(audio.map(sample => sample / max))
}

/**
 * Simple FFT implementation (using Web Audio API AnalyserNode for better performance)
 */
function computeFFT(signal: Float32Array): Float32Array {
    // Use Web Audio API for FFT
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const buffer = audioContext.createBuffer(1, signal.length, audioContext.sampleRate)
    buffer.getChannelData(0).set(signal)

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = signal.length * 2
    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(analyser)

    const fftBuffer = new Float32Array(analyser.frequencyBinCount)
    analyser.getFloatFrequencyData(fftBuffer)

    audioContext.close()

    // Convert to magnitude spectrum
    return new Float32Array(fftBuffer.map(x => Math.pow(10, x / 20)))
}

/**
 * Extract MFCC-like features from FFT
 */
function extractMFCC(fft: Float32Array, sampleRate: number): number[] {
    // Simplified MFCC extraction
    // In production, use proper mel filter banks
    const numCoeffs = 13
    const coeffs: number[] = []

    // Group frequencies into mel bands
    const melBands = 26
    const melFreqs: number[] = []

    for (let i = 0; i < melBands; i++) {
        const ratio = i / (melBands - 1)
        const logValue = Math.log10(1 + sampleRate / 2 / 700)
        const melFreq = 700 * (Math.pow(10, ratio * logValue) - 1)
        melFreqs.push(melFreq)
    }

    // Compute mel spectrum
    const melSpectrum: number[] = []
    for (let i = 0; i < melBands - 1; i++) {
        const startFreq = melFreqs[i]
        const endFreq = melFreqs[i + 1]
        const startBin = Math.floor((startFreq / sampleRate) * fft.length)
        const endBin = Math.floor((endFreq / sampleRate) * fft.length)

        let sum = 0
        for (let bin = startBin; bin < endBin && bin < fft.length; bin++) {
            sum += fft[bin]
        }
        melSpectrum.push(Math.log10(sum + 1e-10))
    }

    // DCT to get MFCC coefficients
    for (let c = 0; c < numCoeffs; c++) {
        let sum = 0
        for (let m = 0; m < melSpectrum.length; m++) {
            sum += melSpectrum[m] * Math.cos((Math.PI * c * (m + 0.5)) / melSpectrum.length)
        }
        coeffs.push(sum)
    }

    return coeffs
}

/**
 * Average features into fixed-size vector
 */
function averageFeatures(features: number[], size: number): number[] {
    const chunkSize = Math.ceil(features.length / size)
    const averaged: number[] = []

    for (let i = 0; i < size; i++) {
        const start = i * chunkSize
        const end = Math.min(start + chunkSize, features.length)
        const chunk = features.slice(start, end)
        const avg = chunk.reduce((a, b) => a + b, 0) / chunk.length
        averaged.push(avg)
    }

    return averaged
}

/**
 * Compute zero-crossing rate
 */
function computeZeroCrossingRate(audio: Float32Array): number {
    let crossings = 0
    for (let i = 1; i < audio.length; i++) {
        if ((audio[i - 1] >= 0 && audio[i] < 0) || (audio[i - 1] < 0 && audio[i] >= 0)) {
            crossings++
        }
    }
    return crossings / audio.length
}

/**
 * Compute energy (RMS)
 */
function computeEnergy(audio: Float32Array): number {
    let sum = 0
    for (let i = 0; i < audio.length; i++) {
        sum += audio[i] * audio[i]
    }
    return Math.sqrt(sum / audio.length)
}

/**
 * Compute spectral centroid
 */
function computeSpectralCentroid(audio: Float32Array, sampleRate: number): number {
    const fft = computeFFT(audio)
    let weightedSum = 0
    let magnitudeSum = 0

    for (let i = 0; i < fft.length; i++) {
        const freq = (i * sampleRate) / (2 * fft.length)
        const magnitude = fft[i]
        weightedSum += freq * magnitude
        magnitudeSum += magnitude
    }

    return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0
}

/**
 * Compute spectral rolloff (frequency below which 85% of energy is contained)
 */
function computeSpectralRolloff(audio: Float32Array, sampleRate: number): number {
    const fft = computeFFT(audio)
    const threshold = 0.85

    let totalEnergy = 0
    for (let i = 0; i < fft.length; i++) {
        totalEnergy += fft[i]
    }

    let cumulativeEnergy = 0
    for (let i = 0; i < fft.length; i++) {
        cumulativeEnergy += fft[i]
        if (cumulativeEnergy >= threshold * totalEnergy) {
            return (i * sampleRate) / (2 * fft.length)
        }
    }

    return (fft.length * sampleRate) / (2 * fft.length)
}

/**
 * Compute cosine similarity between two feature vectors
 */
function cosineSimilarity(a: Float32Array, b: Float32Array): number {
    if (a.length !== b.length) {
        // Pad shorter vector with zeros
        const maxLen = Math.max(a.length, b.length)
        const aPadded = new Float32Array(maxLen)
        const bPadded = new Float32Array(maxLen)
        aPadded.set(a)
        bPadded.set(b)
        return cosineSimilarity(aPadded, bPadded)
    }

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i]
        normA += a[i] * a[i]
        normB += b[i] * b[i]
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB)
    return denominator > 0 ? dotProduct / denominator : 0
}

/**
 * Train model from audio samples
 * 
 * @param samples Array of audio samples with labels
 * @returns Trained model
 */
export async function trainModel(samples: AudioSample[]): Promise<TrainedModel> {
    console.log(`🎓 Training model with ${samples.length} samples...`)

    const featuresMap = new Map<string, Float32Array[]>()
    const labels: string[] = []
    const metadata = new Map<string, { tamilText?: string }>()

    // Process each sample
    for (const sample of samples) {
        console.log(`📊 Processing: ${sample.label}...`)

        try {
            const features = await extractAudioFeatures(sample.audioFile)

            if (!featuresMap.has(sample.label)) {
                featuresMap.set(sample.label, [])
                labels.push(sample.label)
                metadata.set(sample.label, { tamilText: sample.tamilText })
            }

            featuresMap.get(sample.label)!.push(features)
            console.log(`✅ Extracted features for "${sample.label}" (${features.length} dimensions)`)
        } catch (error) {
            console.error(`❌ Error processing "${sample.label}":`, error)
            throw error
        }
    }

    console.log(`✅ Training complete! Learned ${labels.length} classes`)
    console.log(`📋 Classes:`, labels)

    return {
        features: featuresMap,
        labels,
        metadata
    }
}

/**
 * Classify audio input using trained model
 * 
 * @param audioInput Audio file, blob, or URL
 * @param model Trained model
 * @param threshold Minimum confidence threshold (0-1)
 * @returns Classification result with best match and accuracy
 */
export async function classifyAudio(
    audioInput: File | Blob | string,
    model: TrainedModel,
    threshold: number = 0.3
): Promise<ClassificationResult> {
    try {
        // Extract features from input audio
        const inputFeatures = await extractAudioFeatures(audioInput)

        // Compare with all training samples
        const scores: Array<{ label: string; confidence: number }> = []

        for (const label of model.labels) {
            const trainingFeatures = model.features.get(label) || []

            if (trainingFeatures.length === 0) {
                continue
            }

            // Compute similarity with all samples of this label
            const similarities = trainingFeatures.map(trainingFeature =>
                cosineSimilarity(inputFeatures, trainingFeature)
            )

            // Use maximum similarity as confidence
            const maxSimilarity = Math.max(...similarities)

            // Average similarity for more stable results
            const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length

            // Use weighted combination
            const confidence = 0.7 * maxSimilarity + 0.3 * avgSimilarity

            scores.push({ label, confidence })
        }

        // Sort by confidence
        scores.sort((a, b) => b.confidence - a.confidence)

        // Get best match
        const bestMatch = scores[0]

        // Normalize confidence to [0, 1] range
        // If best match is above threshold, return it
        if (bestMatch && bestMatch.confidence >= threshold) {
            const metadata = model.metadata.get(bestMatch.label)
            return {
                label: bestMatch.label,
                confidence: Math.min(1, bestMatch.confidence), // Cap at 1.0
                tamilText: metadata?.tamilText,
                allScores: scores
            }
        }

        // No match above threshold
        return {
            label: 'Unknown',
            confidence: bestMatch ? bestMatch.confidence : 0,
            allScores: scores
        }
    } catch (error) {
        console.error('❌ Classification error:', error)
        throw error
    }
}

/**
 * Classify real-time audio stream
 * Uses Web Audio API to capture audio and classify it
 */
export async function classifyStream(
    audioStream: MediaStream,
    model: TrainedModel,
    onResult: (result: ClassificationResult) => void,
    interval: number = 1000 // Check every 1 second
): Promise<() => void> {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const source = audioContext.createMediaStreamSource(audioStream)
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    source.connect(analyser)

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)

    let isRunning = true

    const processAudio = async () => {
        if (!isRunning) return

        analyser.getFloatTimeDomainData(dataArray)

        // Convert to AudioBuffer format for feature extraction
        const audioBuffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate)
        audioBuffer.getChannelData(0).set(dataArray)

        // Extract features and classify
        try {
            const features = extractFeaturesFromBuffer(audioBuffer)
            const buffer = features.buffer instanceof ArrayBuffer ? features.buffer : new ArrayBuffer(features.byteLength)
            const blob = new Blob([buffer], { type: 'application/octet-stream' })

            // Create a temporary audio file for classification
            // In practice, you'd want to buffer more audio (e.g., 1 second chunks)
            const result = await classifyAudio(blob as any, model, 0.3)
            onResult(result)
        } catch (error) {
            console.error('Stream classification error:', error)
        }

        setTimeout(processAudio, interval)
    }

    processAudio()

    // Return stop function
    return () => {
        isRunning = false
        audioContext.close()
        source.disconnect()
    }
}

