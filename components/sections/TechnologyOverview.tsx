'use client'

import { motion } from 'framer-motion'
import { MicrophoneIcon, BrainIcon, SpeakerIcon } from '@/components/Icons'

export default function TechnologyOverview() {
  const modules = [
    {
      name: 'Input Module',
      description: 'Captures natural sounds, vocalizations, and gesture-based signals',
      icon: MicrophoneIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Processing Module',
      description: 'Embedded intelligence processes input signals and maps them to meaningful communication',
      icon: BrainIcon,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Output Module',
      description: 'Generates clear audio feedback and voice output for communication',
      icon: SpeakerIcon,
      color: 'from-green-500 to-green-600',
    },
  ]

  return (
    <section id="technology" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Technology & System Overview
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            A high-level view of YenMozhi&apos;s modular architecture, designed for reliability and real-world deployment.
          </p>
        </motion.div>

        {/* Block Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-neutral-50 to-primary-50 rounded-2xl p-8 sm:p-12 border border-neutral-200">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
              {/* Input Module */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-4"
                  animate={{ 
                    boxShadow: [
                      "0 10px 25px rgba(59, 130, 246, 0.3)",
                      "0 15px 35px rgba(59, 130, 246, 0.5)",
                      "0 10px 25px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MicrophoneIcon className="w-12 h-12 text-white" />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-semibold text-neutral-900 mb-2">Input</h3>
                  <p className="text-sm text-neutral-600 max-w-[200px]">
                    Sound / Gesture Capture
                  </p>
                </div>
              </motion.div>

              {/* Arrow */}
              <motion.div 
                className="hidden lg:block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.svg 
                  className="w-12 h-12 text-neutral-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.div>
              <div className="lg:hidden">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Processing Module */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mb-4"
                  animate={{ 
                    boxShadow: [
                      "0 10px 25px rgba(168, 85, 247, 0.3)",
                      "0 15px 35px rgba(168, 85, 247, 0.5)",
                      "0 10px 25px rgba(168, 85, 247, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <BrainIcon className="w-12 h-12 text-white" />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-semibold text-neutral-900 mb-2">Processing</h3>
                  <p className="text-sm text-neutral-600 max-w-[200px]">
                    Embedded Intelligence
                  </p>
                </div>
              </motion.div>

              {/* Arrow */}
              <motion.div 
                className="hidden lg:block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.svg 
                  className="w-12 h-12 text-neutral-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.div>
              <div className="lg:hidden">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Output Module */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-4"
                  animate={{ 
                    boxShadow: [
                      "0 10px 25px rgba(34, 197, 94, 0.3)",
                      "0 15px 35px rgba(34, 197, 94, 0.5)",
                      "0 10px 25px rgba(34, 197, 94, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <SpeakerIcon className="w-12 h-12 text-white" />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-semibold text-neutral-900 mb-2">Output</h3>
                  <p className="text-sm text-neutral-600 max-w-[200px]">
                    Audio Feedback
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Module Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <module.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {module.name}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                {module.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-neutral-500 italic">
            Note: This is a high-level conceptual overview. Technical implementation details are proprietary.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

