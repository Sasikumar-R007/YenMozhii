'use client'

import { motion } from 'framer-motion'
import { EmergencyIcon, TouchIcon, MoneyIcon } from '@/components/Icons'

export default function ProblemStatement() {
  const problems = [
    {
      title: 'Emergency Communication Gap',
      description: 'Non-verbal individuals face critical challenges during emergencies when they cannot communicate their needs, pain, or distress effectively.',
      icon: EmergencyIcon,
    },
    {
      title: 'Motor Coordination Challenges',
      description: 'Many existing AAC devices require fine motor skills, touch screens, or complex gestures that are difficult for individuals with motor impairments.',
      icon: TouchIcon,
    },
    {
      title: 'Cost & Dependency Issues',
      description: 'Current assistive communication solutions are often expensive, require smartphones, internet connectivity, or specialized software—creating barriers to access.',
      icon: MoneyIcon,
    },
  ]

  return (
    <section id="problem" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            The Communication Challenge
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Millions of individuals with autism spectrum disorder and speech impairments face daily barriers to expressing themselves, 
            especially in critical moments when communication matters most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-xl p-8 border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <problem.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

