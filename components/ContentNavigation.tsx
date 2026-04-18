/**
 * @purpose Bottom-of-page navigation component showing prev/next links and example series progress dots
 * @llm-note
 *   Dependencies: imports from [next/link, next/navigation, lucide-react, lib/navigation] | imported by [app/page.tsx, app/quickstart/page.tsx, app/agent/page.tsx, +28 more pages]
 *   Data flow: receives pathname from usePathname() → getPageByHref() returns {prev, next, section, exampleIndex} → renders prev/next buttons + progress dots
 *   State/Effects: reads URL pathname | no state mutations | no API calls | client-side navigation via Link
 *   Integration: exposes ContentNavigation component | uses lib/navigation for page metadata | returns null if page not in navigation map
 *   UX: example series shows dots with active indicator (purple w-8 vs gray w-2) | prev/next buttons with hover effects | empty div spacers for alignment
 */
'use client'

import Link from 'next/link'
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2'
import { usePathname } from 'next/navigation'
import { getPageByHref } from '../lib/navigation'

export function ContentNavigation() {
  const pathname = usePathname()
  const currentPage = getPageByHref(pathname)

  if (!currentPage) return null

  const { prev, next } = currentPage
  const prevPage = prev ? getPageByHref(prev.href) : null
  const nextPage = next ? getPageByHref(next.href) : null

  return (
    <div className="mt-20 pt-10 border-t border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex flex-col gap-1.5 px-5 py-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm rounded-xl transition-all"
          >
            <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors">
              <HiOutlineArrowLeft className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-widest">Previous</span>
            </div>
            {prevPage?.section && (
              <div className="text-[11px] text-gray-400 font-mono">{prevPage.section}</div>
            )}
            <div className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors leading-snug">{prev.title}</div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col gap-1.5 px-5 py-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm rounded-xl transition-all sm:items-end sm:text-right"
          >
            <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors sm:flex-row-reverse">
              <HiOutlineArrowRight className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-widest">Next</span>
            </div>
            {nextPage?.section && (
              <div className="text-[11px] text-gray-400 font-mono">{nextPage.section}</div>
            )}
            <div className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors leading-snug">{next.title}</div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}