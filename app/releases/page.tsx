/**
 * @purpose Explain stable, alpha, beta, RC, and LTS release channels
 * @context Public counterpart of connectonion/docs/releases.md
 */

'use client'

import Link from 'next/link'
import {
  HiOutlineArrowPath,
  HiOutlineBeaker,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'
import { CommandBlock } from '../../components/CommandBlock'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'
import {
  PREVIEW_VERSION,
  STABILIZING_VERSION,
  STABLE_VERSION,
} from '../../lib/version'

const channels = [
  {
    version: 'X.Y.ZaN',
    name: 'Alpha',
    description: 'Incomplete, usable slices for opt-in developers. Interfaces may still change.',
    icon: HiOutlineBeaker,
  },
  {
    version: 'X.Y.ZbN',
    name: 'Beta',
    description: 'Feature-complete. Testing shifts to integration, upgrades, compatibility, and real users.',
    icon: HiOutlineArrowPath,
  },
  {
    version: 'X.Y.ZrcN',
    name: 'Release candidate',
    description: 'Could become stable unchanged. Only release-blocking fixes are accepted.',
    icon: HiOutlineCheckCircle,
  },
  {
    version: 'X.Y.Z',
    name: 'Stable / LTS',
    description: 'Default for normal installs. New features move to 1.8; 1.7.x receives maintenance fixes.',
    icon: HiOutlineShieldCheck,
  },
]

export default function ReleasesPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Release Channels' },
          ]}
          icon={HiOutlineArrowPath}
          title="Release Channels"
          description="Stable, the train being stabilized, and the latest preview stay explicit when releases overlap."
          markdownPath="/releases.md"
          markdownFilename="releases.md"
        />

        <section className="mb-10 grid md:grid-cols-3 gap-4" aria-label="Current releases">
          <div className="border border-green-200 bg-green-50 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-2">Current stable</p>
            <p className="text-2xl font-bold text-gray-900">v{STABLE_VERSION}</p>
            <p className="text-sm text-gray-600 mt-2">Installed by normal pip commands.</p>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-2">Stabilizing 1.7</p>
            <p className="text-2xl font-bold text-gray-900">
              {STABILIZING_VERSION ? `v${STABILIZING_VERSION}` : 'No active candidate'}
            </p>
            <p className="text-sm text-gray-600 mt-2">Exact-pin candidate for the 1.7 release gates.</p>
          </div>
          <div className="border border-gray-200 bg-gray-50 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Latest preview</p>
            <p className="text-2xl font-bold text-gray-900">{PREVIEW_VERSION ? `v${PREVIEW_VERSION}` : 'Not published yet'}</p>
            <p className="text-sm text-gray-600 mt-2">
              {PREVIEW_VERSION
                ? 'Available only to users who explicitly opt in.'
                : 'No newer feature-train preview is currently published.'}
            </p>
          </div>
        </section>

        <section className="mb-14 rounded-lg border border-green-200 bg-green-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-2">Stable-line design notes</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Two boundaries that still let the user through</h2>
          <p className="text-gray-600 mb-4">
            The release creates a private door for a fresh <code>co ai</code> owner and makes finite
            mailbox pages traversable instead of silently incomplete.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm font-semibold">
            <Link href="/blog/the-owner-needs-a-door" className="text-green-700 hover:underline">
              The Owner Needs a Door
            </Link>
            <span className="hidden sm:inline text-green-400">·</span>
            <Link href="/blog/a-page-should-not-become-a-wall" className="text-green-700 hover:underline">
              A Page Should Not Become a Wall
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-gray-900 font-semibold mb-2">A version is a compatibility promise, not a progress counter.</p>
            <p className="text-gray-600">
              A version such as <code>1.6.3</code> maintains stable 1.6. New 1.7 features are tested as
              {' '}<code>1.7.0aN</code>, <code>1.7.0bN</code>, and <code>1.7.0rcN</code> before <code>1.7.0</code> becomes stable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <div key={channel.name} className="border border-gray-200 rounded-lg p-5 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-gray-900">{channel.name}</h2>
                    <code className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">{channel.version}</code>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{channel.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Install stable</h2>
          <CommandBlock commands={['python -m pip install --upgrade connectonion']} />
          <p className="text-sm text-gray-600 mt-4">
            Normal installs and upgrades ignore preview releases. Publishing a preview does not move existing users off stable.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test the stabilizing 1.7 candidate</h2>
          <CommandBlock commands={[
            STABILIZING_VERSION
              ? `python -m pip install --upgrade connectonion==${STABILIZING_VERSION}`
              : 'python -m pip install --upgrade connectonion==1.7.0rcN',
            'co --version',
          ]} />
          <p className="text-sm text-gray-600 mt-4">
            Use the exact pin for 1.7 release testing. A broad <code>--pre</code> upgrade follows the
            highest published feature train, which is currently {PREVIEW_VERSION ? <code>{PREVIEW_VERSION}</code> : 'not published'},
            not the stabilizing 1.7 line.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Join the preview track</h2>
          <CommandBlock commands={[
            'python -m pip install --pre --upgrade connectonion',
            'co --version',
          ]} />
          <p className="text-sm text-gray-600 mt-4">
            The <code>--pre</code> flag is the explicit opt-in. An exact pin such as{' '}
            <code>{PREVIEW_VERSION ? `connectonion==${PREVIEW_VERSION}` : 'connectonion==X.Y.ZaN'}</code>{' '}
            also opts in and does not need <code>--pre</code>.
            {!PREVIEW_VERSION && ' No preview is published, so this command currently keeps the latest stable release.'}
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current plan</h2>
          <div className="border-l-2 border-gray-300 pl-5 space-y-4 text-gray-700">
            <p><strong>1.6.x:</strong> stable maintenance fixes only.</p>
            <p><strong>1.7.0 beta:</strong> stabilize the exercised OIP browser sessions, native coding adapters, modes, and release path.</p>
            <p><strong>1.7.0:</strong> stable/LTS after browser, adapter, upgrade, and release gates pass.</p>
            <p><strong>1.8.0 previews:</strong> new remote-browser sessions and hosted execution after the 1.7 gates close.</p>
            <p className="text-sm">
              Track the live scope in the{' '}
              <a className="text-green-700 hover:underline" href="https://github.com/openonion/connectonion/milestone/7">
                1.7 milestone
              </a>{' '}
              and the exact PR inventory and phase gates in{' '}
              <a className="text-green-700 hover:underline" href="https://github.com/openonion/connectonion/issues/792">
                issue #792
              </a>.
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 text-sm text-gray-700 space-y-3">
            <p className="font-semibold text-gray-900">How a candidate earns promotion</p>
            <p>
              Each release gate starts from the exact published package, launches its real <code>co ai</code>{' '}
              Host, and connects the production O Chat build through a real browser. The acceptance flow exercises
              a non-trivial project, permission modes, cancellation, Host restart, and reconnect without resending
              the last prompt.
            </p>
            <p>
              The run produces screenshots, sanitized logs, and a hash-addressed manifest. UI text alone cannot
              mark the gate as passed: process state, workspace output, reconnect state, and the absence of a
              duplicate input are checked independently. A failed gate stays failed and feeds the next issue and PR.
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 space-y-3">
            <p>
              <strong>Beta 9 candidate:</strong> it remains the latest published 1.7 artifact. The newer coordinated
              release-branch source passed the complete localhost browser gate; the unchanged RC artifact must repeat it.
            </p>
            <p>
              Claude Code and Codex preserve their provider session IDs, stream normalized tool activity through
              OIP, and appear as live cards in O Chat through <code>@connectonion/react</code>.
            </p>
            <p>
              The public wheel denied an outside-workspace write in headless Auto and left its target absent; explicit
              bounded Full access then completed the outside canary read and write plus the full Todo lifecycle.
            </p>
            <p>
              A running coding task now streams compact, correlated provider activity and its nested approval into
              one Work Room. Recent semantic steps stay readable; raw commands and outputs are opt-in details.
            </p>
            <p>
              Descriptor-less OIP 0.1 peers remain readable through 1.7.x. Unsupported versions fail once without
              reconnecting, and privacy-safe compatibility telemetry contains no prompts, identities, or paths.
            </p>
          </div>
        </section>

        <section className="mb-14 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Design Journal</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why the preview train uses alpha, beta, and RC</h2>
          <p className="text-gray-600 mb-4">
            Release notes explain what changed. The design journal explains why OIP owns the browser boundary,
            while a Work Room treats one long native coding task as a live, correlated surface rather than a
            terminal transcript.
          </p>
          <Link
            href="/blog/a-tool-transaction-is-not-a-work-room"
            className="text-sm font-semibold text-green-700 hover:underline"
          >
            Read the Work Room decision
          </Link>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
