'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { HiOutlineListBullet } from 'react-icons/hi2'

interface Heading {
  id: string
  text: string
  level: number
}

export function MobileSectionJump() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const pathname = usePathname()

  useEffect(() => {
    setHeadings([])
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('h2.heading-2, h3.heading-3'))
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
        ;(el as HTMLElement).style.scrollMarginTop = '7rem'
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

  if (headings.length < 4) return null

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    e.target.value = ''
  }

  return (
    <div className="md:hidden sticky top-[3.25rem] z-30 bg-white border-b border-gray-100 px-4 py-2">
      <div className="relative flex items-center gap-2">
        <HiOutlineListBullet className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <select
          onChange={handleChange}
          defaultValue=""
          className="w-full text-sm text-gray-600 bg-transparent appearance-none cursor-pointer focus:outline-none pr-4"
          aria-label="Jump to section"
        >
          <option value="" disabled>Jump to section…</option>
          {headings.map(h => (
            <option key={h.id} value={h.id}>
              {h.level === 3 ? '  · ' : ''}{h.text}
            </option>
          ))}
        </select>
        <svg className="w-3.5 h-3.5 text-gray-400 absolute right-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
