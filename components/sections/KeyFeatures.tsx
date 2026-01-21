'use client'

import { motion } from 'framer-motion'
import { HandWaveIcon, EmergencyIcon, MoneyIcon, SchoolIcon, PlugIcon, CheckIcon } from '@/components/Icons'

export default function KeyFeatures() {
  const features = [
    {
      title: 'Touchless Interaction',
      description: 'Operates through natural sounds and gestures, eliminating the need for fine motor control or screen interaction.',
      icon: HandWaveIcon,
    },
    {
      title: 'Emergency Usability',
      description: 'Designed for critical moments when communication is most urgent—simple, immediate, reliable.',
      icon: EmergencyIcon,
    },
    {
      title: 'Affordable & Indigenous',
      description: 'Built with cost-effectiveness in mind, making assistive communication accessible to a wider population.',
      icon: MoneyIcon,
    },
    {
      title: 'Special School Ready',
      description: 'Tailored for inclusive educational environments, supporting teachers and caregivers in communication facilitation.',
      icon: SchoolIcon,
    },
    {
      title: 'No Dependencies',
      description: 'Works independently without smartphones, internet, or external software—truly stand-alone.',
      icon: PlugIcon,
    },
    {
      title: 'Real-World Tested',
      description: 'Designed through iterative testing with actual users in real-world scenarios.',
      icon: CheckIcon,
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-neutral-100 to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Every feature of YenMozhi is designed with the end-user in mind—simplicity, reliability, and accessibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title === 'Touchless Interaction' && <><span className="font-bold text-primary-600">Touchless</span> Interaction</>}
                {feature.title === 'Emergency Usability' && <><span className="font-bold text-primary-600">Emergency</span> Usability</>}
                {feature.title === 'Affordable & Indigenous' && <><span className="font-bold text-primary-600">Affordable</span> & <span className="font-bold text-primary-600">Indigenous</span></>}
                {feature.title === 'Special School Ready' && <><span className="font-bold text-primary-600">Special</span> School Ready</>}
                {feature.title === 'No Dependencies' && <><span className="font-bold text-primary-600">No</span> Dependencies</>}
                {feature.title === 'Real-World Tested' && <><span className="font-bold text-primary-600">Real-World</span> Tested</>}
                {!['Touchless Interaction', 'Emergency Usability', 'Affordable & Indigenous', 'Special School Ready', 'No Dependencies', 'Real-World Tested'].includes(feature.title) && feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                {feature.description.split(/(\b)/).map((word, i) => {
                  const keywords = ['sound-based', 'affordable', 'emergency', 'touchless', 'stand-alone', 'independent', 'real-world', 'dependencies'];
                  const lowerWord = word.toLowerCase();
                  return keywords.some(k => lowerWord.includes(k)) ? (
                    <span key={i} className="font-semibold text-neutral-800">{word}</span>
                  ) : word;
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

