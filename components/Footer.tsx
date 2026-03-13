/**
 * @purpose Site footer with conditional CTA section and social links
 * @llm-note
 *   Dependencies: imports from [next/link, next/navigation, react-icons] | imported by [ClientLayout.tsx]
 *   Data flow: reads pathname via usePathname() → conditionally renders CTA for / and /quickstart pages
 *   State/Effects: reads current year via Date() | no state mutations | no API calls
 *   Integration: exposes Footer component (default export)
 *   UX: CTA only on landing/quickstart | minimal footer with brand, copyright, social links (GitHub, Discord)
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineHeart } from 'react-icons/hi2'
import { FaDiscord, FaGithub } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  
  // Only show CTA on landing page and getting started pages
  const showCTA = pathname === '/' || pathname === '/quickstart'
  
  return (
    <footer className="mt-auto">
      {/* Simple CTA - Only on specific pages */}
      {showCTA && (
        <div className="mt-32 mb-20 text-center px-4">
          <h3 className="text-2xl font-light text-gray-300 mb-6">
            Ready to build?
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quickstart"
              className="px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-colors"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/wu-changxing/connectonion"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}

      {/* Minimal Footer - Mobile Optimized */}
      <div className="border-t border-gray-800/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mobile: Stacked | Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left: Brand & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-base text-gray-400">
              <div className="flex items-center gap-2">
                <img
                  src="/onion-logo.png"
                  alt="ConnectOnion"
                  className="w-8 h-8 rounded"
                />
                <span className="font-medium text-gray-300">ConnectOnion</span>
              </div>
              <span className="hidden sm:inline text-gray-700">·</span>
              <span>© {currentYear}</span>
            </div>

            {/* Right: Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/wu-changxing/connectonion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://discord.gg/4xfD9k8AUF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-6 h-6" />
              </a>
              <span className="text-sm text-gray-500 ml-2">v0.6.9</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * Design Principles Applied:
 * 
 * 1. Context-Aware Content
 *    - CTA only shows on landing and quickstart pages
 *    - Reduces repetition and clutter
 * 
 * 2. Minimal Footer
 *    - Just essentials: brand, copyright, social links
 *    - No overwhelming link lists
 *    - Clean single-line layout
 * 
 * 3. Mobile Optimization
 *    - Stacks vertically on mobile
 *    - Smaller elements for small screens
 *    - Reduced content density
 * 
 * 4. Clear Visual Hierarchy
 *    - Page content has space to breathe
 *    - Navigation is distinct from footer
 *    - Subtle borders and colors
 * 
 * 5. Performance
 *    - Smaller DOM size
 *    - Less CSS to process
 *    - Faster page loads
 */