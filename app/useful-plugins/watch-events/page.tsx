'use client'

import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'
import { HiOutlineBellAlert } from 'react-icons/hi2'

export default function WatchEventsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'watch_events' },
          ]}
          icon={HiOutlineBellAlert}
          iconColor="icon-ui"
          title="watch_events"
          description="Give a running Agent fresh event data at the next iteration boundary."
          markdownPath="/useful-plugins/watch_events.md"
          markdownFilename="watch_events.md"
        />

        <section className="mb-12">
          <h2 className="heading-2">Use it in an Agent</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import watch_events

# claim_events() atomically returns [{"id": "stable-id", "content": "What changed"}]
agent = Agent("worker", plugins=[watch_events(claim_events)])`}
            language="python"
          />
          <p className="text-gray-700 mt-4">
            Copy the implementation with <code>co copy watch_events</code> to edit
            how your Agent receives and formats in-flight observations.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2">Lifecycle</h2>
          <p className="text-gray-700 mb-4">
            The plugin checks at <code>before_iteration</code>. If an event arrives
            during the final model call, <code>after_iteration</code> requests one
            more iteration. It runs only while <code>Agent.input()</code> is active.
          </p>
          <p className="text-gray-700">
            To observe sources and wake an idle Agent, use the Host{' '}
            <Link href="/host" className="text-blue-700 underline">watch configuration</Link>.
            Host stores events in SQLite and binds this plugin to the active turn.
          </p>
        </section>
      </div>
    </div>
  )
}
