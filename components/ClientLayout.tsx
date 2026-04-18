/**
 * @purpose Client-side layout wrapper managing responsive sidebar navigation and footer placement
 * @context Consumed by app/layout.tsx, orchestrates DocsSidebar, MobileDocsNav, and Footer components
 * @llm-note Always shows sidebar on desktop, handles mobile navigation separately,
 *           provides flex layout structure for main content and footer positioning
 */
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import { DocsSidebar } from './DocsSidebar'
import { MobileDocsNav } from './MobileDocsNav'
import Footer from './Footer'
import { OnThisPage } from './OnThisPage'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  if (isHomepage) {
    return (
      <>
        <main>{children}</main>
        <Footer />
      </>
    )
  }

  return (
    <>
      {/* Slim persistent top bar — shared chrome across all doc pages */}
      <header className="hidden lg:flex sticky top-0 z-50 h-10 items-center justify-between px-4 bg-white border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors" aria-label="ConnectOnion — back to home">
          <img src="/onion-logo.png" alt="" className="w-5 h-5 rounded" />
          ConnectOnion
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/quickstart" className="text-xs text-gray-500 hover:text-gray-900 px-2.5 py-1 rounded hover:bg-gray-100 transition-colors">Quickstart</Link>
          <a href="https://github.com/openonion/connectonion" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" aria-label="GitHub">
            <FaGithub className="w-3.5 h-3.5" />
          </a>
          <a href="https://discord.gg/4xfD9k8AUF" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" aria-label="Discord">
            <FaDiscord className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Mobile Documentation Navigation */}
      <MobileDocsNav />

      <div className="flex min-h-screen">
        {/* Desktop Sidebar - always visible for navigation */}
        <div className="hidden lg:block">
          <DocsSidebar />
        </div>

        {/* Main Content + On This Page */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-1 min-w-0">
              {children}
            </div>
            <div className="hidden lg:block px-4 pt-8 flex-shrink-0">
              <OnThisPage />
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  )
}