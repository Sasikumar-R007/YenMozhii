'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Solution() {
  return (
    <section id="solution" className="py-20 sm:py-28 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Introducing YenMozhi
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
            A stand-alone assistive device that bridges the communication gap through sound-based interaction, 
            designed for real-world, spontaneous usage.
          </p>
        </motion.div>

        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-neutral-200">
              <Image
                src="/assests/YenMozhi Device 1.png"
                alt="YenMozhi Device - Front View"
                fill
                className="object-contain p-4 bg-white"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-neutral-200">
              <Image
                src="/assests/YenMozhi Device 2.png"
                alt="YenMozhi Device - Side View"
                fill
                className="object-contain p-4 bg-white"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-neutral-200">
              <Image
                src="/assests/YM01.jpg"
                alt="YenMozhi Product"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-neutral-200">
              <Image
                src="/assests/YM02.jpg"
                alt="YenMozhi Product"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-neutral-200">
              <Image
                src="/assests/YM003.jpg"
                alt="YenMozhi Product"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-neutral-200">
              <Image
                src="/assests/YM004.jpg"
                alt="YenMozhi Product"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 flex flex-col"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                Sound-Based Interaction
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                YenMozhi converts natural sounds—vocalizations, environmental sounds, or simple gestures—into meaningful voice output. 
                No screen dependency, no complex interfaces.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Designed for individuals who may struggle with traditional touch-based or visual communication systems.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                Stand-Alone & Independent
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                No smartphone required. No internet dependency. YenMozhi operates independently, 
                making it reliable in any environment—home, school, or public spaces.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Affordable and designed for accessibility, ensuring that cost doesn&apos;t become a barrier to communication.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200 flex flex-col"
          >
            <div className="text-center mb-6">
              <div className="inline-block bg-neutral-100 rounded-full p-3 mb-4 w-20 h-20 flex items-center justify-center">
                <Image
                  src="/assests/YenMozhi logo.png"
                  alt="YenMozhi Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Designed for Real Life
              </h3>
            </div>
            <div className="flex-grow flex flex-col justify-center">
            <blockquote className="text-center text-lg text-neutral-700 italic mb-6 border-l-4 border-neutral-400 pl-6">
              &quot;என் மொழி எனக்கு வழங்கும் சுதந்திரம்&quot;
              <br />
              <span className="text-base text-neutral-600 mt-2 block">
                &quot;My voice, my freedom&quot;
              </span>
            </blockquote>
            <p className="text-neutral-600 text-center leading-relaxed">
              YenMozhi empowers individuals to express themselves naturally, 
              in moments that matter—whether it&apos;s asking for help, expressing emotions, 
              or simply being heard.
            </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

