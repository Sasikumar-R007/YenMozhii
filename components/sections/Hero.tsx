'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assests/fv5.jpg"
          alt="YenMozhi Field Visit"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-neutral-900/80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            Empowering Communication
            <br />
            <span className="text-primary-200">Beyond Words</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          >
            YenMozhi is a stand-alone assistive communication device designed for autistic and speech-impaired individuals. 
            Converting natural sounds into meaningful voice output—touchless, affordable, and independent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/#solution"
              className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View Project Overview
            </Link>
            <Link
              href="/demo"
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Live Prototype Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

