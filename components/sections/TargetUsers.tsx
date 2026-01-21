'use client'

import { motion } from 'framer-motion'

export default function TargetUsers() {
  const userGroups = [
    {
      title: 'Autistic Children',
      description: 'Supporting communication development and expression for children on the autism spectrum, especially those with minimal verbal communication.',
      impact: 'Reduced frustration, increased social participation, enhanced quality of life',
    },
    {
      title: 'Speech-Impaired Individuals',
      description: 'Enabling communication for individuals with various speech impairments, developmental delays, or communication disorders.',
      impact: 'Greater independence, improved access to education and social opportunities',
    },
    {
      title: 'Caregivers & Families',
      description: 'Providing tools for parents, caregivers, and family members to better understand and communicate with their loved ones.',
      impact: 'Reduced caregiving stress, stronger family bonds, better understanding',
    },
    {
      title: 'Special Educators',
      description: 'Supporting teachers and therapists in creating inclusive learning environments where every student can express themselves.',
      impact: 'Enhanced teaching effectiveness, personalized support, inclusive education',
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
            Target Users & Impact
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            YenMozhi is designed for real people facing real communication challenges. 
            Our focus is on human impact, not just technological innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-neutral-50 to-primary-50 rounded-xl p-8 border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                {group.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-6">
                {group.description}
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-primary-500">
                <p className="text-sm font-medium text-neutral-700">
                  <span className="font-semibold text-primary-600">Impact: </span>
                  {group.impact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary-50 rounded-xl p-8 border border-primary-200 max-w-4xl mx-auto">
            <p className="text-lg text-neutral-700 leading-relaxed">
              <span className="font-semibold text-primary-700">Our Mission:</span> Every individual deserves the right to communicate. 
              YenMozhi is our contribution to making that right accessible to all, regardless of their challenges.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

