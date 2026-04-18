'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface Heading {
  id: string
  text: string
  level: number
}

export function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    setHeadings([])
    setActiveId('')
    // Small delay so the new page content is in the DOM before scanning
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('h2.heading-2'))
      const items: Heading[] = elements.map(el => {
        if (!el.id) {
          const slug = (el.textContent || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 60)
          el.id = slug
        }
        ;(el as HTMLElement).style.scrollMarginTop = '6rem'
        return {
          id: el.id,
          text: el.textContent?.trim() || '',
          level: parseInt(el.tagName[1]),
        }
      }).filter(h => h.text && h.id)
      setHeadings(items)
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav className="sticky top-[6.5rem] w-56 flex-shrink-0">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 pl-2">
        On this page
      </p>
      <ul className="space-y-0.5">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              title={h.text}
              className={`flex items-center text-[13px] py-1 rounded-md transition-all border-l-2 ${
                h.level === 3 ? 'pl-3' : 'pl-2'
              } ${
                activeId === h.id
                  ? 'text-green-700 font-semibold border-green-500 bg-green-50'
                  : 'text-gray-400 hover:text-gray-800 hover:bg-gray-50 border-transparent'
              }`}
            >
              <span className="truncate">{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
