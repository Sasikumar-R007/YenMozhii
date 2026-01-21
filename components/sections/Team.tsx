'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Team() {
  const teamMembers = [
    {
      name: 'Sasikumar R',
      role: 'Team Leader & Innovator',
      image: '/assests/Sasikumar.jpg',
      imagePosition: 'object-contain object-bottom',
    },
    {
      name: 'Shivani V',
      role: 'Business',
      image: '/assests/Shivani.jpeg',
      imagePosition: 'object-cover',
    },
    {
      name: 'Harindranath KS',
      role: 'Researcher',
      image: '/assests/Hari.jpeg',
      imagePosition: 'object-cover',
    },
    {
      name: 'Suguna R',
      role: 'Documentation',
      image: '/assests/Suguna.jpeg',
      imagePosition: 'object-contain object-bottom',
    },
    {
      name: 'Ashok Kumar S',
      role: 'Researcher',
      image: '/assests/Ashok.jpeg',
      imagePosition: 'object-cover',
    },
    {
      name: 'Rishivarman M',
      role: 'Editor',
      image: '/assests/Rishi.jpeg',
      imagePosition: 'object-contain object-bottom',
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3">
            Our Team
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-base">
            Team Symphonix
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4 rounded-full overflow-hidden bg-neutral-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={member.imagePosition || 'object-cover'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/assests/YenMozhi logo.png'
                  }}
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-1">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm text-neutral-500">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
