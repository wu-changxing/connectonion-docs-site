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
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import { DocsSidebar } from './DocsSidebar'
import { MobileDocsNav } from './MobileDocsNav'
import { MobileSectionJump } from './MobileSectionJump'
import Footer from './Footer'
import { OnThisPage } from './OnThisPage'
import { HeadingAnchors } from './HeadingAnchors'

const docNavItems = [
  { href: '/quickstart', label: 'Quickstart', prefixes: ['/quickstart', '/vibe-coding'] },
  { href: '/cli', label: 'CLI', prefixes: ['/cli'] },
  { href: '/agent', label: 'Agent API', prefixes: ['/agent', '/prompts', '/tools', '/models', '/llm_do', '/on_events', '/plugin'] },
  { href: '/host', label: 'Network', prefixes: ['/host', '/connect', '/websocket', '/session-reconnect', '/threat-model'] },
  { href: '/useful-tools', label: 'Tools', prefixes: ['/useful-tools', '/memory', '/web-fetch', '/agent-emails', '/gmail', '/outlook'] },
  { href: '/useful-plugins', label: 'Plugins', prefixes: ['/useful-plugins'] },
  { href: '/tui', label: 'TUI', prefixes: ['/tui'] },
  { href: '/auto-debug', label: 'Debug', prefixes: ['/auto-debug', '/auto-debug-exception', '/logging', '/xray'] },
  { href: '/blog', label: 'Blog', prefixes: ['/blog'] },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isBlog = pathname.startsWith('/blog')

  if (isHomepage) {
    return (
      <>
        <main>{children}</main>
        <Footer />
      </>
    )
  }

  // Editorial layout for blog — no sidebar, clean reading column
  if (isBlog) {
    const isBlogPost = pathname !== '/blog'
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Blog top bar */}
        <header className="sticky top-0 z-50 h-10 flex items-center justify-between px-6 bg-white border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors" aria-label="ConnectOnion — back to home">
            <img src="/onion-logo.png" alt="" className="w-5 h-5 rounded" />
            ConnectOnion
          </Link>
          {isBlogPost ? (
            <Link href="/blog" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <HiOutlineArrowLeft className="w-3.5 h-3.5" />
              All Posts
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <HiOutlineArrowLeft className="w-3.5 h-3.5" />
              Back to Docs
            </Link>
          )}
          <div className="flex items-center gap-1">
            <a href="https://github.com/openonion/connectonion" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" aria-label="GitHub">
              <FaGithub className="w-3.5 h-3.5" />
            </a>
            <a href="https://discord.gg/4xfD9k8AUF" target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" aria-label="Discord">
              <FaDiscord className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <HeadingAnchors />
        <Footer />
      </div>
    )
  }

  return (
    <>
      {/* Slim persistent top bar — shared chrome across all doc pages */}
      <header className="hidden md:flex sticky top-0 z-50 h-10 items-center justify-between px-4 bg-white border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors flex-shrink-0" aria-label="ConnectOnion — back to home">
          <img src="/onion-logo.png" alt="" className="w-5 h-5 rounded" />
          ConnectOnion
        </Link>
        {/* Center nav — section-level orientation for developers */}
        <nav className="flex items-center gap-0.5" aria-label="Top navigation">
          {docNavItems.map(({ href, label, prefixes }) => {
            const isActive = prefixes.some(p => pathname === p || pathname.startsWith(p + '/'))
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  isActive
                    ? 'text-gray-900 font-semibold bg-gray-100'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-1 flex-shrink-0">
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
      <MobileSectionJump />
      <HeadingAnchors />

      <div className="flex min-h-screen">
        {/* Desktop Sidebar - always visible for navigation */}
        <div className="hidden md:block">
          <DocsSidebar />
        </div>

        {/* Main Content + On This Page */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-1 min-w-0 doc-content">
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