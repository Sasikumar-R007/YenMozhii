'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SpeakerIcon } from '@/components/Icons'

interface AudioSample {
  id: string
  tamilText: string
  englishTranslation: string
  audioPath: string
}

export default function SampleAudios() {
  const [playingId, setPlayingId] = useState<string | null>(null)

  const audioSamples: AudioSample[] = [
    {
      id: 'thanni-venu',
      tamilText: 'தண்ணி வேணும்',
      englishTranslation: 'I need water',
      audioPath: '/assests/Thanni Venu.m4a',
    },
    {
      id: 'amma-koopdungah',
      tamilText: 'அம்மா வா கூப்பிடுங்க',
      englishTranslation: 'Call mom',
      audioPath: '/assests/Amma va koopdungah.m4a',
    },
    {
      id: 'bathroom-varudhu',
      tamilText: 'குளியலறை வருது',
      englishTranslation: 'I need to go to bathroom',
      audioPath: '/assests/Bathroom varudhu.m4a',
    },
    {
      id: 'kai-valikidhu',
      tamilText: 'கை வலிக்குது',
      englishTranslation: 'My hand hurts',
      audioPath: '/assests/Kai valikidhuu.m4a',
    },
  ]

  const handlePlay = (id: string) => {
    setPlayingId(id)
  }

  const handleEnded = () => {
    setPlayingId(null)
  }

  return (
    <section id="sample-audios" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Sample Audio Recordings
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Real audio samples collected from autism students during field testing. 
            These natural sounds demonstrate how YenMozhi recognizes and processes 
            communication attempts.
          </p>
        </motion.div>

        {/* Audio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {audioSamples.map((sample, index) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              {/* Audio Player */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <SpeakerIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-500 mb-1">
                      Tamil Phrase
                    </p>
                    <p className="text-lg font-semibold text-neutral-900">
                      {sample.tamilText}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-500 mb-1">
                    English Translation
                  </p>
                  <p className="text-base text-neutral-700">
                    {sample.englishTranslation}
                  </p>
                </div>

                {/* Audio Player */}
                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <audio
                    controls
                    className="w-full"
                    onPlay={() => handlePlay(sample.id)}
                    onEnded={handleEnded}
                    onPause={() => setPlayingId(null)}
                  >
                    <source src={sample.audioPath} type="audio/mp4" />
                    <source src={sample.audioPath} type="audio/m4a" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-neutral-500 italic">
            These audio samples are used for training and testing the YenMozhi 
            voice recognition system. All recordings were collected with proper 
            consent and are used for research and development purposes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

