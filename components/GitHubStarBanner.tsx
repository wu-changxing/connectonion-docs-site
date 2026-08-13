/**
 * @purpose GitHub star banner promoting repository with live star count and founder chat offer
 * @context Floats at bottom-right, appears only after the reader scrolls past the first
 *          screen, dismissible with localStorage persistence
 * @llm-note Uses GitHub API for live star count, dark theme matching site design (gray-950),
 *           implements slide-in animation, persists dismissal state to avoid showing again
 *
 * Two things here were bugs, do not reintroduce them:
 *   1. It used to appear on a timer, which meant it covered the hero terminal on first
 *      paint — the one thing the page exists to show. It is scroll-gated now.
 *   2. The star count fetched github.com/wu-changxing/connectonion, which is not where
 *      the repo lives. It 404s, so the count silently never rendered.
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

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    fetch('https://api.github.com/repos/openonion/connectonion')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStarCount(data.stargazers_count)
        }
      })
      .catch(() => {
        // Fail silently
      })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('github-star-banner-dismissed', 'true')
    setIsDismissed(true)
  }

  const handleStarClick = () => {
    window.open('https://github.com/openonion/connectonion', '_blank')
    handleDismiss()
  }

  if (isDismissed) return null

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <div className="bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-5 sm:p-6 max-w-[300px] sm:max-w-[340px] relative overflow-hidden">
        {/* Subtle glow behind star */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-400 transition-colors"
          aria-label="Close banner"
        >
          <FaTimes className="w-3 h-3" />
        </button>

        {/* Star icon with pulse ring */}
        <div className="relative inline-flex mb-4">
          <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
          <div className="relative w-11 h-11 bg-green-400/15 border border-green-400/30 rounded-full flex items-center justify-center">
            <FaStar className="w-5 h-5 text-green-400" />
          </div>
        </div>

        <h3 className="font-bold text-base text-white mb-1">
          Star us on GitHub
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          If ConnectOnion saves you time, a ⭐ goes a long way — and earns you a coffee chat with our founder.
        </p>

        <button
          onClick={handleStarClick}
          className="w-full bg-green-500 hover:bg-green-400 text-gray-950 font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <FaStar className="w-3.5 h-3.5" />
          <span>Star on GitHub</span>
          {starCount !== null && (
            <span className="text-gray-700 text-xs font-normal">· {starCount.toLocaleString()} stars</span>
          )}
        </button>
      </div>
    </div>
  )
}
