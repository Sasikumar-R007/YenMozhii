import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">YenMozhi</h3>
            <p className="text-sm text-neutral-400">
              A stand-alone assistive communication device designed for autistic and speech-impaired individuals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#problem" className="hover:text-white transition-colors">
                  Problem Statement
                </Link>
              </li>
              <li>
                <Link href="/#solution" className="hover:text-white transition-colors">
                  Solution
                </Link>
              </li>
              <li>
                <Link href="/#technology" className="hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors">
                  Live Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm text-neutral-400 mb-2">
              Team Symphonix
            </p>
            <p className="text-sm text-neutral-400">
              For collaborations, pilot programs, and support inquiries.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Symphonix Team. All rights reserved.</p>
          <p className="mt-2">YenMozhi - Empowering Communication, One Sound at a Time</p>
        </div>
      </div>
    </footer>
  )
}

