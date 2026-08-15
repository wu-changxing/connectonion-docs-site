'use client'

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
          description="One OIP browser lifecycle, native coding adapters, and evidence-driven promotion to 1.7 stable."
          markdownPath="/roadmap.md"
          markdownFilename="roadmap.md"
        />

        <section className="mb-14">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            1.7.0 preview train
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>Remove the abandoned alternate transport and generic provider edge.</li>
            <li>Publish matching Python and React previews.</li>
            <li>Pin the exact React artifact in O Chat.</li>
            <li>Run onboarding, normal-prompt, Codex, logs, and screenshot acceptance.</li>
            <li>Promote only after reconnect, approval, cancel, and provider-card evidence is complete.</li>
          </ol>
        </section>

        <section className="mb-14 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Longer-term work</h2>
          <p className="text-gray-700">Secure agent networking, production deployment, stronger interactive debugging, more managed integrations, and expanded tutorials continue after the 1.7 release gates close.</p>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
