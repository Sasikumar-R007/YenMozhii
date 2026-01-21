'use client'

import { motion } from 'framer-motion'

export default function DevelopmentJourney() {
  const milestones = [
    {
      phase: 'Concept',
      description: 'Identifying the communication gap and envisioning a solution that is both accessible and effective.',
      status: 'completed',
    },
    {
      phase: 'Prototype',
      description: 'Developing the initial hardware prototype with core functionality for sound-to-voice conversion.',
      status: 'completed',
    },
    {
      phase: 'Testing',
      description: 'Iterative testing with users, caregivers, and educators to refine functionality and user experience.',
      status: 'in-progress',
    },
    {
      phase: 'Future Scaling',
      description: 'Planning for production scaling, institutional deployment, and continuous improvement based on user feedback.',
      status: 'upcoming',
    },
  ]

  return (
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
            Development Journey
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            From concept to prototype, our journey has been guided by one principle: 
            building something that truly makes a difference.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 top-0" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-lg">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {milestone.phase}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex w-2/12 justify-center z-10">
                  <div className="w-4 h-4 rounded-full border-4 border-white bg-neutral-400" />
                </div>

                {/* Empty Space for Balance */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

