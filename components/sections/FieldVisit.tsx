'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const allFieldVisitImages = [
  { src: '/assests/fv1.jpg', alt: 'Field Visit - Testing with users' },
  { src: '/assests/fv2.jpg', alt: 'Field Visit - Device demonstration' },
  { src: '/assests/fv3.jpg', alt: 'Field Visit - User interaction' },
  { src: '/assests/fv4.jpg', alt: 'Field Visit - Real-world testing' },
  { src: '/assests/fv5.jpg', alt: 'Field Visit - Community engagement' },
  { src: '/assests/fv6.jpeg', alt: 'Field Visit - Educational session' },
  { src: '/assests/fv7.jpeg', alt: 'Field Visit - User feedback' },
  { src: '/assests/fv8.jpeg', alt: 'Field Visit - Team collaboration' },
  { src: '/assests/fv9.jpeg', alt: 'Field Visit - Implementation' },
  { src: '/assests/fv10.jpeg', alt: 'Field Visit - Community outreach' },
]

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function FieldVisit() {
  const [shuffledImages, setShuffledImages] = useState(allFieldVisitImages)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    setShuffledImages(shuffleArray(allFieldVisitImages))
  }, [])

  return (
    <>
      <section className="py-20 sm:py-28 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Field Visits & Real-World Testing
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              YenMozhi has been tested and refined through real-world interactions with users, 
              caregivers, and educators. These field visits are crucial to understanding the 
              practical needs and challenges of our target users.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shuffledImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-xl p-8 border border-neutral-200 shadow-lg max-w-3xl mx-auto">
              <p className="text-neutral-700 leading-relaxed">
                Our field visits have provided invaluable insights into how YenMozhi is used in real-world scenarios. 
                These interactions help us continuously improve the device to better serve individuals with communication challenges 
                and their support networks.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal Gallery */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={shuffledImages[selectedImage].src}
                alt={shuffledImages[selectedImage].alt}
                width={1200}
                height={900}
                className="object-contain w-full h-full rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedImage > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(selectedImage - 1)
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {selectedImage < shuffledImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(selectedImage + 1)
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded-full px-4 py-2">
                {selectedImage + 1} / {shuffledImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
