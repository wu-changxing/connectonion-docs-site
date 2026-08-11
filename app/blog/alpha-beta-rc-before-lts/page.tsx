import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS'
const description = 'Why ConnectOnion keeps 1.6 stable while testing ACP and coding-agent features through 1.7.0 alpha, beta, and RC releases before LTS.'
const canonicalPath = '/blog/alpha-beta-rc-before-lts'

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'ConnectOnion 1.7',
    'Python prerelease',
    'PyPI alpha beta RC',
    'AI agent framework',
    'Agent Client Protocol',
    'ACP',
    'LTS release',
    'semantic versioning',
  ],
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-11T00:00:00+10:00',
    modifiedTime: '2026-08-11T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release engineering', 'Python', 'ACP', 'semantic versioning', 'LTS'],
    images: [
      {
        url: '/onion-logo.png',
        alt: 'ConnectOnion release train design decision',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/onion-logo.png'],
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-11',
  dateModified: '2026-08-11',
  author: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    url: 'https://docs.connectonion.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: {
      '@type': 'ImageObject',
      url: 'https://docs.connectonion.com/onion-logo.png',
    },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['Python prereleases', 'Agent Client Protocol', 'release engineering', 'LTS'],
}

const phases = [
  ['1.6.x', 'Stable maintenance', 'Bug, security, documentation, and compatibility fixes'],
  ['1.7.0aN', 'Alpha', 'Incomplete but usable slices for opt-in developers'],
  ['1.7.0bN', 'Beta', 'Feature-complete integration and compatibility testing'],
  ['1.7.0rcN', 'Release candidate', 'Release blockers only; the candidate could become stable unchanged'],
  ['1.7.0', 'Stable / LTS', 'Default install after end-to-end acceptance'],
]

export default function AlphaBetaRcBeforeLtsPage() {
  return (
    <main className="px-5 md:px-10 py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />

      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                Design Decision · August 11, 2026
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
                Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                A version is a compatibility promise, not a progress counter.
              </p>
            </div>
            <CopyMarkdownButton
              markdownPath="/tutorials/alpha-beta-rc-before-lts.md"
              filename="alpha-beta-rc-before-lts.md"
            />
          </div>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20">
          <p className="text-lg leading-relaxed">
            ConnectOnion will keep the 1.6 line stable while the next feature train moves through{' '}
            <code>1.7.0aN</code>, <code>1.7.0bN</code>, and <code>1.7.0rcN</code> before{' '}
            <code>1.7.0</code> becomes stable and long-term supported.
          </p>

          <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-2">The decision</p>
            <p className="text-gray-900 font-semibold leading-relaxed m-0">
              Stable 1.6 users receive maintenance fixes. Developers who explicitly opt in test the 1.7 feature train.
            </p>
          </div>

          <h2>The question that exposed the problem</h2>
          <p>
            We wanted to validate a large set of ACP and coding-agent features before calling ConnectOnion 1.7 stable.
            A tempting plan was to ship those experiments as <code>1.6.1</code>, <code>1.6.2</code>, and{' '}
            <code>1.6.3</code>, then rename the result <code>1.7.0</code> after the bugs were gone.
          </p>
          <p>
            The numbers would show progress, but they would make the wrong promise. A patch says that it is a
            compatible maintenance update for the stable line. Normal Python upgrades consider that patch, so
            unfinished 1.7 behavior would turn stable users into preview testers without their consent.
          </p>

          <h2>Two release lanes, one clear promise</h2>
          <pre className="overflow-x-auto"><code>{`1.6.0 ─────→ 1.6.1 ─────→ 1.6.2
stable fixes   stable fixes   stable fixes

       1.7.0a1 → 1.7.0a2 → 1.7.0b1 → 1.7.0rc1 → 1.7.0
       incomplete preview   feature complete   stable / LTS`}</code></pre>

          <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Version</th>
                  <th className="px-4 py-3 font-semibold">Promise</th>
                  <th className="px-4 py-3 font-semibold">Allowed work</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {phases.map(([version, promise, work]) => (
                  <tr key={version}>
                    <td className="px-4 py-3 whitespace-nowrap"><code>{version}</code></td>
                    <td className="px-4 py-3 font-medium text-gray-900">{promise}</td>
                    <td className="px-4 py-3 text-gray-600">{work}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Why this protects existing users</h2>
          <p>A normal upgrade stays on stable releases:</p>
          <pre><code>python -m pip install --upgrade connectonion</code></pre>
          <p>A developer has to opt into a published preview:</p>
          <pre><code>python -m pip install --pre --upgrade connectonion</code></pre>
          <p>
            An exact pin such as <code>connectonion==1.7.0a1</code> is also an explicit choice. The first preview
            was published on August 11, 2026. PyPI and the{' '}
            <a href="https://github.com/openonion/connectonion/releases/tag/v1.7.0a1">GitHub Prerelease</a>{' '}
            carry the same wheel and source archive hashes. The latest stable GitHub Release remains{' '}
            <code>1.6.0</code>, so publishing the alpha did not move normal users onto 1.7.
          </p>

          <h2>What the 1.7 train is validating</h2>
          <p>The product theme is one complete coding-agent and Agent Client Protocol experience:</p>
          <ul>
            <li>delegate coding work to Claude and Codex;</li>
            <li>track tasks and structured results;</li>
            <li>stop, resume, and recover sessions;</li>
            <li>stream ordered ACP updates and final agent messages;</li>
            <li>approve tools and switch modes without losing session state;</li>
            <li>connect authorized MCP servers;</li>
            <li>keep the Python host, React SDK, and chat UI compatible with the same events.</li>
          </ul>

          <h2>How we keep the scope understandable</h2>
          <p>
            The{' '}
            <a href="https://github.com/openonion/connectonion/milestone/7">1.7.0 milestone</a>{' '}
            contains feature issues and release gates. The{' '}
            <a href="https://github.com/openonion/connectonion/issues/792">integration checklist</a>{' '}
            contains the exact PR inventory, cross-repository dependencies, and phase evidence.
          </p>
          <p>
            We deliberately do not add every implementation PR to the milestone. Counting both a feature issue and
            its implementation PRs makes progress look larger without making the remaining work clearer.
          </p>

          <h2>Publication is part of the engineering work</h2>
          <p>
            A release is not complete when the code merges. The exact artifact must pass its gates, publish through
            PyPI Trusted Publishing, install cleanly, and appear in a GitHub Release. Only then does the documentation
            site advertise that exact version.
          </p>
          <p>Release notes say what changed. The design journal records:</p>
          <ul>
            <li>the problem and alternatives;</li>
            <li>the decision and tradeoffs;</li>
            <li>the evidence that supports it;</li>
            <li>what would make us revisit it.</li>
          </ul>
          <p>
            From now on, every meaningful feature-train launch, phase promotion, stable release, or architecture
            change will create or substantially update a design journal entry. Small maintenance patches stay in
            release notes unless they teach a reusable lesson. That keeps the journal useful instead of filling it
            with duplicate changelog pages.
          </p>

          <h2>The rule we will carry forward</h2>
          <p>
            Stable users should never become experiment participants because maintainers wanted a convenient sequence
            of numbers. Preview users should know exactly what promise they are accepting. Maintainers should be able
            to point to one public record of why a release was shaped this way.
          </p>
          <p>
            That is why ConnectOnion 1.7 starts with an alpha, earns its way through beta and RC, and becomes LTS only
            after the experience is proven.
          </p>
        </div>

        <aside className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6" aria-label="Follow the 1.7 release">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Follow the release</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/releases" className="font-medium text-green-700 hover:underline">Release channels</Link>
            <Link href="/roadmap" className="font-medium text-green-700 hover:underline">1.7 roadmap</Link>
            <a href="https://github.com/openonion/connectonion/releases/tag/v1.7.0a1" className="font-medium text-green-700 hover:underline">1.7.0a1 artifacts</a>
            <a href="https://github.com/openonion/connectonion/milestone/7" className="font-medium text-green-700 hover:underline">Milestone</a>
            <a href="https://github.com/openonion/connectonion/issues/792" className="font-medium text-green-700 hover:underline">Release checklist</a>
          </div>
        </aside>

        <ContentNavigation />
      </article>
    </main>
  )
}
