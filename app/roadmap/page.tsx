'use client'

import Link from 'next/link'
import { HiOutlineRocketLaunch, HiOutlineShieldCheck } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function RoadmapPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[{ label: 'Docs', href: '/' }, { label: 'Roadmap' }]}
          icon={HiOutlineRocketLaunch}
          iconColor="icon-ui"
          title="Roadmap"
          description="Stable 1.7 maintenance and the evidence-gated 1.8 browser preview stay on separate release tracks."
          markdownPath="/roadmap.md"
          markdownFilename="roadmap.md"
        />

        <section className="mb-14">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            1.7 maintenance line
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>Keep Core, React, O Chat, and docs on one coordinated compatibility contract.</li>
            <li>Exercise real projects and providers across Auto, Read only, and bounded Full access.</li>
            <li>Verify onboarding, Stop, reconnect, upgrade, rollback, logs, and desktop/mobile screenshots.</li>
            <li>Keep 1.7.1 as the normal-install stable release while 1.8 remains opt-in.</li>
            <li>Forward-port every applicable stable fix before a newer 1.8 preview can publish.</li>
          </ol>
        </section>

        <section className="mb-14 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">Prepared candidate · not published</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1.8.0a4 browser preview</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>A bare browser call stays on the free system engine.</li>
            <li>Explicit <code>auto</code> may select paid Onion; explicit <code>onion</code> requires it.</li>
            <li>Paid runtime is <code>$0.025 / 15 min</code>; artifact checks cost $0.</li>
            <li>Preview API, manifest, wheel, catalogue, and runtime channel fail closed before charging.</li>
            <li>The first public artifact target is Chromium 151 on Linux x86_64; macOS remains internal.</li>
            <li>Promotion waits for exact public package bytes and installed-artifact browser and billing evidence.</li>
          </ol>
          <Link href="/blog/preview-is-not-a-production-alias" className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline">
            Read the preview trust-boundary decision
          </Link>
        </section>

        <section className="mb-14 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Longer-term work</h2>
          <p className="text-gray-700">Public signed/notarized Onion Browser support beyond Linux x86_64, secure agent networking, production deployment, stronger interactive debugging, more managed integrations, and expanded tutorials remain later work.</p>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
