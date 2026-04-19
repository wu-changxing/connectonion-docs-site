'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Injects copyable # anchor links into all h2/h3 headings that have IDs.
// The anchor appears on parent hover via .heading-anchor CSS in globals.css.
// This runs client-side so it works for both static and dynamic page content.
export function HeadingAnchors() {
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('h2.heading-2, h3.heading-3').forEach(el => {
        if (!el.id || el.querySelector('.heading-anchor')) return
        const a = document.createElement('a')
        a.href = `#${el.id}`
        a.className = 'heading-anchor'
        a.setAttribute('aria-label', `Link to section: ${el.textContent?.replace('#', '').trim()}`)
        a.textContent = '#'
        el.appendChild(a)
      })
    }, 200)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
