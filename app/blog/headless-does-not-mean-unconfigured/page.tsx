import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'Headless Does Not Mean Unconfigured'
const description = 'How unattended Auto honors deliberate command grants without turning a broad legacy wildcard into unlimited authority.'
const canonicalPath = '/blog/headless-does-not-mean-unconfigured'
const articleMarkdown = `# ${title}\n\n${description}\n\nA 1.6 cron job upgraded to 1.7 RC11 and stopped at co browser status because no approval dialog existed.\n\n## The decision\n\nHeadless Auto honors narrow operator Bash permissions. The historical Bash(co *) rule restores only co status and co browser compatibility; stronger effects remain denied.\n`

export const metadata: Metadata = {
  title: "Configure Headless Agent Command Permissions | ConnectOnion",
  alternates: { canonical: canonicalPath },
  openGraph: { title, description, url: canonicalPath, siteName: 'ConnectOnion Docs', type: 'article', publishedTime: '2026-08-25T00:00:00+10:00', authors: ['ConnectOnion Team'], tags: ['permissions', 'automation', 'security'], images: [{ url: '/onion-logo.png', alt: title }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}
const articleJsonLd = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: title, description, datePublished: '2026-08-25', dateModified: '2026-08-25', author: { '@type': 'Organization', name: 'ConnectOnion' }, mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}` }

export default function HeadlessConfiguredPage() {
  return <main className="px-5 md:px-10 py-14 md:py-20"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} /><article className="max-w-3xl mx-auto">
    <header className="mb-12 border-b border-gray-100 pb-10"><div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"><div><p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Design Journal · August 25, 2026 · Permissions</p><h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1><p className="text-lg text-gray-600 leading-relaxed">{description}</p></div><CopyMarkdownButton content={articleMarkdown} filename="headless-does-not-mean-unconfigured.md" /></div></header>
    <div className="prose prose-gray max-w-none [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_p]:my-4 [&_p]:leading-7 [&_p]:text-gray-700">
      <h2>The upgrade stopped at action one</h2><p>A launchd job that worked on 1.6 reached 1.7 RC11 and failed on <code>co browser status</code>. Auto required a live approval, stdin was closed, and the operator&apos;s standing command permission was ignored.</p>
      <h2>The tempting compatibility fix was too broad</h2><p>Blindly honoring the historical <code>Bash(co *)</code> pattern would include deployment, email, account, server, and payment actions. Compatibility could not become an unattended escalation path.</p>
      <h2>Configuration is authority</h2><p>Headless Auto now honors operator-authored command rules for ordinary commands. The shipped broad compatibility entry restores only <code>co status</code> and <code>co browser ...</code>. Publication, deployment, unknown, destructive, credential, and external-effect calls keep their stronger verdicts.</p>
      <h2>Evidence and tradeoff</h2><p>The exact no-IO path and a command chain pass, while <code>co deploy</code>, <code>co publish</code>, and <code>co email send</code> remain denied. Narrow operator rules are still authority; effect-typed permissions would eventually be clearer than command-text classification.</p>
      <p>See <Link href="/cli/ai">co ai</Link> and <Link href="/useful-plugins/tool-approval">tool approval</Link>.</p>
    </div><ContentNavigation /></article></main>
}
