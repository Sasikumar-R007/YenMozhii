import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'YenMozhi | Assistive Communication Device',
  description: 'A stand-alone assistive hardware device for autistic and speech-impaired individuals. Touchless, affordable, and designed for real-world communication.',
  keywords: ['assistive technology', 'AAC device', 'autism', 'speech impairment', 'communication device', 'YenMozhi'],
  authors: [{ name: 'Symphonix Team' }],
  openGraph: {
    title: 'YenMozhi | Assistive Communication Device',
    description: 'A stand-alone assistive hardware device for autistic and speech-impaired individuals.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

