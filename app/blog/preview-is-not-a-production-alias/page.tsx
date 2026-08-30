import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'Preview Is Not a Production Alias'
const description = 'The pending ConnectOnion 1.8.0a4 browser candidate pins its API, signed manifest, exact wheel, and runtime channel before any $0.025 charge.'
const canonicalPath = '/blog/preview-is-not-a-production-alias'

const articleMarkdown = `# Preview is not a production alias

ConnectOnion 1.8.0a4 is a pending browser-preview candidate, not a published package. This note records the boundary it must prove before publication.

## The failure

A preview-labelled package followed the ordinary \`OO_API_URL\` setting back to the production control plane. Its checksum could be correct while the authority choosing executable bytes and creating a metered session was wrong.

## The decision

The client calls only the dedicated preview API, accepts a signed manifest whose own channel is \`preview\`, installs the exact Onionwright preview wheel by checksum, resolves the matching catalogue, and checks the runtime channel before browser preparation or billing.

A bare browser call uses the free system engine. Explicit \`auto\` may select paid Onion after preflight; explicit \`onion\` requires it. Artifact checks cost $0; a paid session costs $0.025 / 15 min.

## The boundary

System and Onion use separate profiles. Service Worker blocking improves visibility but is not a security boundary; the loopback-authenticated egress gateway and native preflight are.

## What remains

The exact 1.8.0a4 public package still has to pass the isolated API, catalogue, Linux Chromium 151 browser lifecycle, and billing reconciliation. macOS signing and notarization remain internal.
`

export const metadata: Metadata = {
  title: `Why a Preview API Must Stay Separate from Production | ConnectOnion`,
  description,
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-30T00:00:00+10:00',
    modifiedTime: '2026-08-30T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['browser preview', 'release channels', 'security boundary', 'billing'],
    images: [{ url: '/onion-logo.png', alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-30',
  dateModified: '2026-08-30',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['browser preview', 'release channel isolation', 'paid browser runtime'],
}

export default function PreviewIsNotProductionAliasPage() {
  return (
    <main className="px-5 md:px-10 py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Design Journal · August 30, 2026 · Browser preview candidate</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton content={articleMarkdown} filename="preview-is-not-a-production-alias.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_p]:my-4 [&_p]:leading-7 [&_p]:text-gray-700 [&_li]:my-2 [&_li]:text-gray-700">
          <p><strong>1.8.0a4 is a pending candidate, not a published package.</strong> This decision records the boundary it must prove before the docs can call it the latest preview.</p>

          <h2>A correct checksum can still come from the wrong authority</h2>
          <p>The first cross-repository test gave a preview client the ordinary <code>OO_API_URL</code> setting. The version and wheel were preview-labelled, but the request followed that ambient setting to production. The bytes could be authentic while the service choosing the artifact, creating the metered session, and signing runtime policy was not the preview authority.</p>

          <h2>Why a version label or query flag was not enough</h2>
          <p>A version label proves which Python package ran; it does not prove which control plane chose executable bytes or charged the account. Reusing production API and storage with a preview query keeps deployment simple, but one missing flag silently becomes production traffic and shares billing, rollback, and catalogue blast radius.</p>

          <h2>The channel now crosses every trust boundary</h2>
          <p>The candidate calls only the dedicated browser-preview API. It accepts an Ed25519-signed manifest whose own channel is <code>preview</code>, installs the exact Onionwright preview wheel by checksum, resolves the matching browser catalogue, and checks the runtime channel before browser preparation or billing.</p>
          <p>The general <code>OO_API_URL</code> override is ignored. Tests have a separate loopback-only override; credentials, remote hosts, paths, queries, fragments, and malformed ports fail closed instead of being normalized into something surprising.</p>

          <h2>Free is the default; spending is explicit</h2>
          <p>A bare <code>co browser</code> or <code>BrowserAutomation()</code> uses the free system engine and returns before the paid preview path. Explicit <code>auto</code> may select Onion after non-billing preflight. Explicit <code>onion</code> requires it and never silently falls back.</p>
          <p>Artifact checks and installation cost $0. A paid session begins only after the complete artifact is locally ready and costs <code>$0.025 / 15 min</code>. Status names the requested and resolved engines, typed reason, exact artifact, price, and live paid-session ID.</p>

          <h2>Visibility is not the security boundary</h2>
          <p>System and Onion engines keep separate profiles. Blocking Service Workers improves request visibility, but it is best-effort and is not a sandbox. The paid runtime is bounded by a loopback-authenticated egress gateway and native preflight.</p>

          <h2>Offline green is not hosted release evidence</h2>
          <p>Focused preview, version, security, package, and cross-repository tests prove the client-side failure order. The exact 1.8.0a4 public wheel must still pass the isolated preview API, catalogue, browser create/navigation/download/renewal/close flow, and billing reconciliation after PyPI and the GitHub prerelease exist.</p>
          <p>The first public Onion artifact target is Chromium 151 on Linux x86_64. macOS signing and notarization remain internal and are not part of this candidate&apos;s public support claim.</p>

          <h2>The tradeoff and revisit condition</h2>
          <p>This costs an extra API deployment, bucket/catalogue lifecycle, and cross-repository release coordinate. We would revisit it only if one service can provide cryptographically scoped channel authority, isolated billing and rollback, and a missing channel can no longer degrade into production. Until then, a different version string is evidence, not a trust boundary.</p>

          <p>See <Link href="/releases">Release Channels</Link>, <Link href="/cli/browser-command">co browser</Link>, and <Link href="/useful-tools/browser-tools">BrowserAutomation</Link> for the prepared candidate interface.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
