'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Contact & Collaboration
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Interested in collaborating, piloting YenMozhi, or supporting our mission? 
            We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-50 to-neutral-50 rounded-xl p-8 border border-neutral-200"
          >
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-neutral-900 mb-1">Email</p>
                  <a href="mailto:symphonixtech@gmail.com" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    symphonixtech@gmail.com
                  </a>
                </div>
              </div>
              
              {/* PDF Download */}
              <div className="mt-6">
                <a
                  href="/assests/YenMozhi PPt.pdf"
                  download
                  className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Project PDF</span>
                </a>
                <div className="mt-4">
                  <iframe
                    src="/assests/YenMozhi PPt.pdf"
                    className="w-full h-96 rounded-lg border border-neutral-200"
                    title="PDF Preview"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Collaboration CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900 text-white rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">
              Collaborate / Pilot / Support
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-6">
              We&apos;re looking for partners who share our vision:
            </p>
            <ul className="space-y-3 mb-8 text-neutral-300">
              <li className="flex items-start space-x-2">
                <span className="text-primary-400 mt-1">•</span>
                <span>Special schools and institutions for pilot programs</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-400 mt-1">•</span>
                <span>CSR initiatives and funding partners</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-400 mt-1">•</span>
                <span>Researchers and assistive technology experts</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-400 mt-1">•</span>
                <span>Hackathon judges and evaluators</span>
              </li>
            </ul>
            <a
              href="mailto:symphonixtech@gmail.com"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start a Conversation
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

