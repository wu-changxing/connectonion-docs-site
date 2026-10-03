/**
 * @purpose GitHub star banner promoting repository with live star count and founder chat offer
 * @context A small launcher floats at bottom-right after the reader scrolls past the
 *          first screen; its full panel opens on request and dismissal persists
 * @llm-note Uses GitHub API for live star count, dark theme matching site design (gray-950),
 *           implements slide-in animation, persists dismissal state to avoid showing again
 *
 * These bugs must not return:
 *   1. It used to appear on a timer, which meant it covered the hero terminal on first
 *      paint — the one thing the page exists to show. It is scroll-gated now.
 *   2. The star count fetched github.com/wu-changxing/connectonion, which is not where
 *      the repo lives. It 404s, so the count silently never rendered.
 *   3. Release status is a decision surface. The banner must not cover candidate
 *      versions, promotion requirements, or blocker evidence on /releases or
 *      an individual release note.
 *   4. The full panel covered first-run commands and reference text on phones.
 *      Keep it behind the small launcher until the reader opens it.
 */
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaStar, FaTimes } from 'react-icons/fa'

export default function GitHubStarBanner() {
  const pathname = usePathname()
  const isReleasePage = pathname === '/releases' || pathname.startsWith('/releases/')
  const isTrialPage = pathname === '/rem' || pathname.startsWith('/rem/')
  const [isVisible, setIsVisible] = useState(false)
  const [starCount, setStarCount] = useState<number | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsVisible(false)
    setIsExpanded(false)
    if (isReleasePage || isTrialPage) return

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
  }, [pathname, isReleasePage, isTrialPage])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsExpanded(false)
    localStorage.setItem('github-star-banner-dismissed', 'true')
    setIsDismissed(true)
  }

  const handleStarClick = () => {
    window.open('https://github.com/openonion/connectonion', '_blank')
    handleDismiss()
  }

  if (isDismissed || isReleasePage || isTrialPage) return null

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      {isExpanded ? (
        <div className="bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-5 sm:p-6 max-w-[300px] sm:max-w-[340px] relative overflow-hidden">
          {/* Subtle glow behind star */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={handleDismiss}
            className="absolute top-1 right-1 min-h-[48px] min-w-[48px] flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors"
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
            className="w-full min-h-[48px] bg-green-500 hover:bg-green-400 text-gray-950 font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <FaStar className="w-3.5 h-3.5" />
            <span>Star on GitHub</span>
            {starCount !== null && (
              <span className="text-gray-700 text-xs font-normal">· {starCount.toLocaleString()} stars</span>
            )}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-green-400/40 bg-gray-950 text-green-400 shadow-xl hover:bg-gray-900"
          aria-label="Show GitHub star options"
          title="Star ConnectOnion on GitHub"
        >
          <FaStar className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
