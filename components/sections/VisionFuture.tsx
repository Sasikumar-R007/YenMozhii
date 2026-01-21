'use client'

import { motion } from 'framer-motion'

export default function VisionFuture() {
  const visionAreas = [
    {
      title: 'AI-Assisted Personalization',
      description: 'Leveraging machine learning to adapt to individual communication patterns and preferences, making YenMozhi more effective over time.',
    },
    {
      title: 'Scalable Production',
      description: 'Building pathways for mass production while maintaining quality and affordability, ensuring accessibility at scale.',
    },
    {
      title: 'CSR & Institutional Deployment',
      description: 'Partnering with organizations, special schools, and CSR initiatives to deploy YenMozhi where it\'s needed most.',
    },
    {
      title: 'Ethical & Inclusive Growth',
      description: 'Growing responsibly, always prioritizing user welfare, privacy, and inclusive design principles.',
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Vision & Future Scope
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            YenMozhi is just the beginning. Our vision extends beyond the device itself, 
            toward a future where communication barriers no longer exist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {visionAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-neutral-50 rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {area.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Building an Inclusive Future
          </h3>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            We envision a world where assistive technology is not a luxury but a fundamental right. 
            Where every individual, regardless of their communication challenges, has the tools they need to express themselves, 
            connect with others, and participate fully in society.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

