/**
 * @purpose Mobile navigation header with hamburger menu and sliding sidebar drawer
 * @llm-note
 *   Dependencies: imports from [react, react-icons, DocsSidebar, framer-motion, next, useCopyMarkdown, markdownMapping]
 *   Imported by: [ClientLayout.tsx]
 *   Data flow: usePathname() → auto-close on route change | hasMarkdownContent() → show/hide copy button
 *   State/Effects: manages isOpen state | closes menu on pathname change | uses useCopyMarkdown hook for copy
 *   Integration: exposes MobileDocsNav component | renders DocsSidebar in slide-out drawer
 *   UX: sticky top header on mobile (lg:hidden) | hamburger toggle | backdrop overlay | copy button if page has markdown
 */
'use client'

import { useState, useEffect, useMemo } from 'react'
import { HiOutlineBars3, HiOutlineXMark, HiOutlineBookOpen, HiOutlineClipboard, HiOutlineCheck, HiOutlineArrowPath, HiOutlineChevronRight } from 'react-icons/hi2'
import { DocsSidebar } from './DocsSidebar'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCopyMarkdown } from '../hooks/useCopyMarkdown'
import { hasMarkdownContent } from '../lib/markdownMapping'
import { navigation as navData } from '../lib/navigation'

export function MobileDocsNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { copyMarkdown, status } = useCopyMarkdown(pathname)
  const hasMarkdown = hasMarkdownContent(pathname)

  const currentPage = useMemo(() => navData.find(p => p.href === pathname), [pathname])
  
  // Auto-close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors"
            aria-label="Toggle documentation menu"
          >
            {isOpen ? <HiOutlineXMark className="w-5 h-5" /> : <HiOutlineBars3 className="w-5 h-5" />}
          </button>

          {/* Current page breadcrumb — spatial context for mobile developers */}
          {currentPage ? (
            <div className="flex items-center gap-1 text-xs min-w-0 overflow-hidden">
              <span className="text-gray-400 truncate flex-shrink-0 max-w-[72px]">{currentPage.section}</span>
              <HiOutlineChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
              <span className="text-gray-800 font-semibold truncate">{currentPage.title}</span>
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/onion-logo.png" alt="ConnectOnion" className="w-6 h-6 rounded-md object-cover" />
              <span className="font-semibold text-gray-900 text-sm">ConnectOnion</span>
            </Link>
          )}

          {/* Copy button - only shows if current page has markdown */}
          {hasMarkdown ? (
            <button
              onClick={() => copyMarkdown()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors text-xs font-medium"
              title="Copy page as markdown"
              aria-label="Copy page as markdown"
            >
              {status === 'loading' ? (
                <HiOutlineArrowPath className="w-4 h-4 animate-spin" />
              ) : status === 'success' ? (
                <HiOutlineCheck className="w-4 h-4 text-green-600" />
              ) : (
                <HiOutlineClipboard className="w-4 h-4" />
              )}
              <span>{status === 'success' ? 'Copied' : 'Copy'}</span>
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 h-screen z-[45]"
            >
              <DocsSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
