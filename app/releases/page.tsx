/**
 * @purpose Help readers choose the stable release or an exact-pin preview
 * @context Public counterpart of connectonion/docs/releases.md
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineArrowPath,
  HiOutlineBeaker,
  HiOutlineCheckCircle,
  HiOutlineClipboard,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'
import { PREVIEW_VERSION, STABILIZING_VERSION, STABLE_VERSION } from '../../lib/version'

const channels = [
  { name: 'Alpha', version: 'X.Y.ZaN', description: 'Incomplete, opt-in developer work.', icon: HiOutlineBeaker },
  { name: 'Beta', version: 'X.Y.ZbN', description: 'Feature-complete; testing continues.', icon: HiOutlineArrowPath },
  { name: 'Release candidate', version: 'X.Y.ZrcN', description: 'Only release-blocking fixes remain.', icon: HiOutlineCheckCircle },
  { name: 'Stable / LTS', version: 'X.Y.Z', description: 'Recommended for normal installs.', icon: HiOutlineShieldCheck },
]

function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex min-w-0 items-start gap-2 rounded-lg bg-gray-950 px-4 py-3 text-white">
      <code className="min-w-0 flex-1 whitespace-normal break-words font-mono text-sm leading-6">{command}</code>
      <button
        type="button"
        onClick={() => { void navigator.clipboard.writeText(command); setCopied(true) }}
        aria-label={copied ? 'Install command copied' : 'Copy install command'}
        className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-xs font-semibold text-gray-200 hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      >
        <HiOutlineClipboard className="h-4 w-4" aria-hidden />
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

export default function ReleasesPage() {
  return (
    <div className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          breadcrumbs={[{ label: 'Docs', href: '/' }, { label: 'Release Channels' }]}
          icon={HiOutlineArrowPath}
          title="Release Channels"
          description="Choose the stable release, or opt into a specific preview."
          markdownPath="/releases.md"
          markdownFilename="releases.md"
        />

        <section aria-label="Current releases" className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="min-w-0 rounded-lg border border-green-200 bg-white p-6">
            <p className="mb-2 text-sm font-semibold text-green-800">Recommended · Stable</p>
            <h2 className="mb-3 text-3xl font-bold text-gray-950">ConnectOnion {STABLE_VERSION}</h2>
            <p className="mb-6 text-base leading-7 text-gray-700">
              The default for everyday use. Preview releases never replace this version in normal upgrades.
            </p>
            <InstallCommand command="python -m pip install --upgrade connectonion" />
            <Link href={`https://github.com/openonion/connectonion/releases/tag/v${STABLE_VERSION}`} className="mt-5 inline-flex min-h-11 items-center font-semibold text-green-800 underline underline-offset-4 hover:text-green-950">
              Read the stable release
            </Link>
          </div>

          <div className="min-w-0 rounded-lg border border-amber-300 bg-amber-50/50 p-6">
            <p className="mb-2 text-sm font-semibold text-amber-800">Opt in · Latest preview</p>
            <h2 className="mb-3 text-3xl font-bold text-gray-950">
              {PREVIEW_VERSION ? `ConnectOnion ${PREVIEW_VERSION}` : 'No active preview'}
            </h2>
            <p className="mb-6 text-base leading-7 text-gray-700">
              {PREVIEW_VERSION
                ? 'Subscribed skills now reconcile withdrawn content and carry signed companion files. Browser tasks use one quoted instruction without a do verb.'
                : 'The stable release is the current recommendation.'}
            </p>
            {PREVIEW_VERSION && (
              <>
                <InstallCommand command={`python -m pip install --upgrade 'connectonion==${PREVIEW_VERSION}'`} />
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                  <Link href={`/releases/${PREVIEW_VERSION}.md`} className="inline-flex min-h-11 items-center font-semibold text-amber-900 underline underline-offset-4 hover:text-amber-950">
                    Read the preview notes
                  </Link>
                  <Link href="/blog/a-subscription-is-not-a-copy" className="inline-flex min-h-11 items-center text-amber-900 underline underline-offset-4 hover:text-amber-950">
                    Why subscriptions track ownership
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {STABILIZING_VERSION && (
          <p className="mb-10 border-l-2 border-amber-500 pl-4 text-base text-gray-700">
            Release candidate {STABILIZING_VERSION} is available with an exact version pin.
          </p>
        )}

        <section className="mb-12 border-t border-gray-200 pt-8">
          <h2 className="mb-3 text-2xl font-semibold text-gray-950">Earlier releases</h2>
          <p className="mb-4 text-base leading-7 text-gray-700">
            Browse past previews, release evidence, and version policy in the complete archive.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <Link href="https://github.com/openonion/connectonion/releases" className="text-green-800 underline underline-offset-4 hover:text-green-950">Complete release history</Link>
            <Link href="/releases/1.8.9b11.md" className="text-green-800 underline underline-offset-4 hover:text-green-950">1.8.9b11 · Wiki onboarding</Link>
            <Link href="/releases/1.8.9b6.md" className="text-green-800 underline underline-offset-4 hover:text-green-950">1.8.9b6 · Wiki maintenance</Link>
            <Link href="/releases/1.8.9b5.md" className="text-green-800 underline underline-offset-4 hover:text-green-950">1.8.9b5 · Claude approvals</Link>
          </div>
        </section>

        <details className="mb-12 rounded-lg border border-gray-200 bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 text-base font-semibold text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800">
            How release channels work
          </summary>
          <div className="border-t border-gray-200 px-5 py-5">
            <p className="mb-5 text-base leading-7 text-gray-700">
              An exact version pin opts you into a preview without changing normal stable installs.
              Promotion follows tests against the published package and a real browser.
            </p>
            <dl className="divide-y divide-gray-100">
              {channels.map(channel => {
                const Icon = channel.icon
                return (
                  <div key={channel.name} className="grid gap-1 py-3 sm:grid-cols-[10rem_7rem_1fr] sm:items-baseline sm:gap-3">
                    <dt className="flex items-center gap-2 font-semibold text-gray-900">
                      <Icon className="h-4 w-4 shrink-0 text-gray-600" aria-hidden />
                      {channel.name}
                    </dt>
                    <dd className="font-mono text-sm text-gray-700">{channel.version}</dd>
                    <dd className="text-sm text-gray-700">{channel.description}</dd>
                  </div>
                )
              })}
            </dl>
            <Link href="/releases.md" className="mt-5 inline-flex min-h-11 items-center font-semibold text-green-800 underline underline-offset-4 hover:text-green-950">
              Read the release policy
            </Link>
          </div>
        </details>

        <ContentNavigation />
      </div>
    </div>
  )
}
