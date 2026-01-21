import LiveDemo from '@/components/demo/LiveDemo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YenMozhi Live Prototype Demo | Voice Recognition Interface',
  description: 'Live voice recognition demonstration using TensorFlow.js. Real-time speech recognition and voice synthesis for YenMozhi.',
}

export default function DemoPage() {
  return <LiveDemo />
}

