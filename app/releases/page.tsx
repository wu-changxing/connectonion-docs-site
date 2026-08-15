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
import { PREVIEW_VERSION, STABLE_VERSION } from '../../lib/version'

const channels = [
  {
    version: '1.7.0aN',
    name: 'Alpha',
    description: 'Incomplete, usable slices for opt-in developers. Interfaces may still change.',
    icon: HiOutlineBeaker,
  },
  {
    version: '1.7.0bN',
    name: 'Beta',
    description: 'Feature-complete. Testing shifts to integration, upgrades, compatibility, and real users.',
    icon: HiOutlineArrowPath,
  },
  {
    version: '1.7.0rcN',
    name: 'Release candidate',
    description: 'Could become stable unchanged. Only release-blocking fixes are accepted.',
    icon: HiOutlineCheckCircle,
  },
  {
    version: '1.7.0',
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
          description="Stable stays safe while the next feature train moves through alpha, beta, and release candidates."
          markdownPath="/releases.md"
          markdownFilename="releases.md"
        />

        <section className="mb-10 grid sm:grid-cols-2 gap-4" aria-label="Current releases">
          <div className="border border-green-200 bg-green-50 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-2">Current stable</p>
            <p className="text-2xl font-bold text-gray-900">v{STABLE_VERSION}</p>
            <p className="text-sm text-gray-600 mt-2">Installed by normal pip commands.</p>
          </div>
          <div className="border border-gray-200 bg-gray-50 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Current preview</p>
            <p className="text-2xl font-bold text-gray-900">{PREVIEW_VERSION ? `v${PREVIEW_VERSION}` : 'Not published yet'}</p>
            <p className="text-sm text-gray-600 mt-2">
              {PREVIEW_VERSION
                ? 'Available only to users who explicitly opt in.'
                : 'The 1.7 train is in development; the site will show its exact version after publication.'}
            </p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Join the preview track</h2>
          <CommandBlock commands={[
            'python -m pip install --pre --upgrade connectonion',
            'co --version',
          ]} />
          <p className="text-sm text-gray-600 mt-4">
            The <code>--pre</code> flag is the explicit opt-in. An exact pin such as{' '}
            <code>{PREVIEW_VERSION ? `connectonion==${PREVIEW_VERSION}` : 'connectonion==X.Y.ZaN'}</code>{' '}
            also opts in and does not need <code>--pre</code>.
            {!PREVIEW_VERSION && ' No 1.7 preview is published yet, so this command currently keeps the latest stable release.'}
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current plan</h2>
          <div className="border-l-2 border-gray-300 pl-5 space-y-4 text-gray-700">
            <p><strong>1.6.x:</strong> stable maintenance fixes only.</p>
            <p><strong>1.7.0 previews:</strong> validate OIP browser sessions and native coding adapters.</p>
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
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 space-y-3">
            <p>
              <strong>Alpha.5 candidate:</strong> OIP is the only first-party browser protocol, with native
              Claude Code and Codex tools for delegated coding work.
            </p>
            <p>
              Claude Code and Codex preserve their provider session IDs, stream normalized tool activity through
              OIP, and appear as live cards in O Chat through <code>@connectonion/react</code>.
            </p>
          </div>
        </section>

        <section className="mb-14 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Design Journal</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why the preview train uses alpha, beta, and RC</h2>
          <p className="text-gray-600 mb-4">
            Release notes explain what changed. The design journal explains why OIP owns the browser boundary
            while Claude Code and Codex remain native backend adapters.
          </p>
          <Link
            href="/blog/oip-native-coding-adapters"
            className="text-sm font-semibold text-green-700 hover:underline"
          >
            Read the design decision
          </Link>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
