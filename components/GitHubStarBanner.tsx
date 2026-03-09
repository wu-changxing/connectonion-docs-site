/**
 * @purpose GitHub star banner promoting repository with live star count and founder chat offer
 * @context Floats at bottom-right, slides in after 3s delay, dismissible with localStorage persistence
 * @llm-note Uses GitHub API for live star count, dark theme matching site design (gray-950),
 *           implements slide-in animation, persists dismissal state to avoid showing again
 */
'use client'

import { useState, useEffect } from 'react'
import { FaStar, FaTimes } from 'react-icons/fa'

export default function GitHubStarBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [starCount, setStarCount] = useState<number | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('github-star-banner-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    fetch('https://api.github.com/repos/wu-changxing/connectonion')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStarCount(data.stargazers_count)
        }
      })
      .catch(() => {
        // Fail silently
      })

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('github-star-banner-dismissed', 'true')
    setIsDismissed(true)
  }

  const handleStarClick = () => {
    window.open('https://github.com/wu-changxing/connectonion', '_blank')
    handleDismiss()
  }

  if (isDismissed) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <div className="bg-gray-950 border border-gray-800 rounded-lg shadow-2xl p-6 max-w-sm relative">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Close banner"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Star icon */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <FaStar className="w-6 h-6 text-yellow-400" />
          </div>

          <div className="flex-1">
            {/* Heading */}
            <h3 className="font-semibold text-lg text-white mb-2">
              Enjoying ConnectOnion?
            </h3>

            {/* Message */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              ⭐ Star us on GitHub = ☕ Coffee chat with our founder. We love meeting builders.
            </p>

            {/* Button */}
            <button
              onClick={handleStarClick}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FaStar className="w-4 h-4" />
              <span>Star on GitHub</span>
              {starCount !== null && (
                <span className="text-gray-400 text-sm">({starCount.toLocaleString()})</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
