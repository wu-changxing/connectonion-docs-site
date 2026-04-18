/**
 * @purpose Client-side layout wrapper managing responsive sidebar navigation and footer placement
 * @context Consumed by app/layout.tsx, orchestrates DocsSidebar, MobileDocsNav, and Footer components
 * @llm-note Always shows sidebar on desktop, handles mobile navigation separately,
 *           provides flex layout structure for main content and footer positioning
 */
'use client'

import { DocsSidebar } from './DocsSidebar'
import { MobileDocsNav } from './MobileDocsNav'
import Footer from './Footer'
import { OnThisPage } from './OnThisPage'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
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
            <div className="px-6 py-24">
              <OnThisPage />
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  )
}