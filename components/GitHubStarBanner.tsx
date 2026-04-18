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
    }, 20000)

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
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 sm:p-5 max-w-[280px] sm:max-w-sm relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close banner"
        >
          <FaTimes className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <FaStar className="w-5 h-5 text-yellow-400" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-base text-gray-900 mb-1.5">
              Enjoying ConnectOnion?
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              ⭐ Star us on GitHub = ☕ Coffee chat with our founder.
            </p>

            <button
              onClick={handleStarClick}
              className="w-full bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <FaStar className="w-3.5 h-3.5" />
              <span>Star on GitHub</span>
              {starCount !== null && (
                <span className="text-gray-400 text-xs">({starCount.toLocaleString()})</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
