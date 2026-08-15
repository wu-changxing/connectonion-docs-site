'use client'

import { HiOutlineCommandLine, HiOutlineGlobeAlt, HiOutlineSparkles } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliAiPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'CLI', href: '/cli' },
            { label: 'co ai' },
          ]}
          icon={HiOutlineSparkles}
          iconColor="icon-ui"
          title="co ai"
          description="Run the ConnectOnion coding agent in O Chat or as a one-shot command."
          markdownPath="/cli/ai.md"
          markdownFilename="ai.md"
        />

        <section className="mb-14">
          <h2 className="heading-2">
            <HiOutlineGlobeAlt className="w-8 h-8 text-gray-700" />
            Web chat over OIP
          </h2>
          <CodeWithResult
            code="co ai"
            result={"Starting AI coding agent...\nOpen https://chat.openonion.ai/0x..."}
            language="bash"
          />
          <div className="mt-6 space-y-3 text-gray-700">
            <p>The Host serves OIP 0.1 on its authenticated <code className="bg-gray-100 px-1 rounded">/ws</code> connection. The React client owns onboarding, reconnect, approvals, permission profiles, plans, and provider cards.</p>
            <p>A fresh installation creates one private owner invite. Startup logs never print it; reveal it deliberately with <code className="bg-gray-100 px-1 rounded">co keys --reveal</code>.</p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            One-shot mode
          </h2>
          <CodeWithResult
            code={'co ai "Fix the failing tests" --json'}
            result={'{"session_id":"...","result":"...","error":null}'}
            language="bash"
          />
          <p className="mt-4 text-gray-700">Use <code className="bg-gray-100 px-1 rounded">--resume</code> with the returned session ID to continue the same project conversation.</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Native coding adapters</h2>
          <div className="space-y-3 text-gray-700">
            <p>Codex and Claude Code run as native backend provider adapters. Their installed CLIs keep provider authentication and session semantics while normalized activity streams through the one OIP browser connection.</p>
            <p>Explicit run/use/start/open Codex requests call <code className="bg-gray-100 px-1 rounded">codex()</code>. A shell or background command cannot silently replace that route: raw Codex launches are rejected before approval or process creation. If no task was supplied, the adapter opens a provider thread and Work Room without inventing a model turn.</p>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
