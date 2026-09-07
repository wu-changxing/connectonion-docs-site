'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaDiscord, FaGithub } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const showCTA = pathname === '/' || pathname === '/quickstart'

  return (
    <footer className="mt-auto">
      {showCTA && (
        <div className="mt-32 mb-16 text-center px-4">
          <h3 className="text-2xl font-light text-gray-700 mb-6">
            Ready to build?
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/quickstart"
              className="px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/openonion/connectonion"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <img src="/onion-logo.png" alt="ConnectOnion" className="w-6 h-6 rounded" />
                <span className="font-medium text-gray-600">ConnectOnion</span>
              </div>
              <span className="hidden sm:inline text-gray-400">·</span>
              <span>© {currentYear}</span>
              <span className="hidden sm:inline text-gray-400">·</span>
              <span>Apache-2.0 License</span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://github.com/openonion/connectonion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 min-w-11 items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/4xfD9k8AUF"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 min-w-11 items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
