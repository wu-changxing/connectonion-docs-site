import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'The Agent That Was Itself, and Billed Someone Else'
const description = 'ConnectOnion 1.6.5 stops co deploy --to from shipping the operator identity to the server. Why the bug was invisible, and what a deployed process should inherit.'
const canonicalPath = '/blog/deployed-agent-identity'

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'ConnectOnion 1.6.5',
    'agent identity',
    'deployment credentials',
    'AI agent framework',
    'environment variables',
    'billing isolation',
    'Python agent deployment',
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
    publishedTime: '2026-08-15T00:00:00+10:00',
    modifiedTime: '2026-08-15T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release', 'security', 'agent identity', 'deployment'],
    images: [
      {
        url: '/onion-logo.png',
        alt: 'ConnectOnion deployed agent identity design decision',
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
  datePublished: '2026-08-15',
  dateModified: '2026-08-15',
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
  about: ['agent identity', 'deployment', 'billing isolation', 'release engineering'],
}

const travelled = [
  ['AGENT_EMAIL', 'Overrode the mailbox the agent derives, so it sent mail as its author'],
  ['OPENONION_API_KEY', 'Billing keys off the JWT, so every model call charged its author'],
  ['AGENT_ADDRESS', 'Set nothing, but it is what people read to learn who an agent is'],
  ['IS_EMAIL_ACTIVE', 'Travelled with the rest'],
]

export default function DeployedAgentIdentityPage() {
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
                Design Journal · August 15, 2026 · ConnectOnion 1.6.5
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
                The Agent That Was Itself, and Billed Someone Else
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                A deployed agent now runs on its own account. Getting there meant deciding what a
                process should inherit when it leaves the machine that made it.
              </p>
            </div>
            <CopyMarkdownButton
              markdownPath="/tutorials/deployed-agent-identity.md"
              filename="deployed-agent-identity.md"
            />
          </div>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20">
          <p className="text-lg leading-relaxed">
            In 1.6.5, <code>co deploy --to</code> stops sending the operator&apos;s identity to the
            server. The agent that comes up on the other side has its own address, its own mailbox,
            and its own balance.
          </p>

          <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-2">The decision</p>
            <p className="text-gray-900 font-semibold leading-relaxed m-0">
              A deploy carries the project. It does not carry the person who deployed it.
            </p>
          </div>

          <h2>The problem, and why nobody saw it</h2>
          <p>
            <code>co init</code> writes four identity lines into a project&apos;s <code>.env</code> on
            purpose. They are what makes a project run as you while you are building it on your laptop.
            That is the right behaviour locally, and it is the whole difficulty: the file that makes a
            project yours is the file a deploy was copying to the server verbatim.
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">What travelled</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Effect on the server</th>
                </tr>
              </thead>
              <tbody>
                {travelled.map(([key, effect]) => (
                  <tr key={key} className="border-t border-gray-100">
                    <td className="p-3 font-mono text-gray-900 whitespace-nowrap">{key}</td>
                    <td className="p-3 text-gray-600">{effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            So the deployed agent was <strong>cryptographically itself and financially its author</strong>.
            It signed with its own key, answered on its own address, and passed every check an operator
            would think to run. Then it sent mail from its author&apos;s mailbox and charged every model
            call to its author&apos;s balance.
          </p>

          <p>
            Nothing errored. There was no failed request to notice, no warning line in a log, no
            reconciliation that came out wrong. One agent ran that way for nine days. The reason it
            lasted nine days rather than nine minutes is the part worth keeping:
          </p>

          <div className="not-prose my-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-gray-900 leading-relaxed m-0">
              <strong>Every observable signal agreed with itself.</strong> The identity checks passed
              because the identity was real. The billing was consistent because it consistently charged
              one account. A wrong answer that is internally coherent survives far longer than one that
              is merely wrong.
            </p>
          </div>

          <p>
            It also could not be undone after the fact. <code>usage_logs</code> has no column naming the
            machine that made a call, so once two agents bill the same account there is no query that
            separates them. The cost of the bug was fixed at the moment it started, not at the moment
            it was found.
          </p>

          <h2>Alternatives we considered</h2>

          <h3>Strip nothing, and document it</h3>
          <p>
            Tell operators to remove the identity lines before deploying. This is what the situation
            already implied, and it is why the bug existed: a rule that lives in documentation is
            enforced by whoever remembers it at 2am. The default has to be correct, because the default
            is what runs.
          </p>

          <h3>Strip the whole <code>.env</code></h3>
          <p>
            Simple, and wrong in the other direction. Projects legitimately carry configuration a
            deployed agent needs — provider keys for tools, endpoints, feature flags. Refusing to send
            any of it would trade a silent billing error for a loud broken deployment, which is better
            but still not right.
          </p>

          <h3>Withhold the identity keys and substitute the agent&apos;s own</h3>
          <p>
            What shipped. <code>_env_for_server</code> holds back the four identity lines and supplies
            the agent&apos;s own credentials in their place, derived from the key the deploy is already
            using to reach the machine. Ordinary configuration travels untouched. The distinction is not
            &quot;secret vs not secret&quot; — it is <em>whose</em> a value is.
          </p>

          <h2>The tradeoff we accepted</h2>
          <p>
            A deployed agent now needs an account of its own, which means a deploy can fail for a reason
            it never used to: the agent has no balance. We think that is the correct failure. An agent
            with no funding should say so, rather than quietly spending someone else&apos;s. But it is a
            real change for anyone who deployed expecting the operator&apos;s balance to cover it, and
            the release notes say so plainly.
          </p>

          <h2>Evidence</h2>
          <p>
            The regression test was checked in the only way that proves anything: it was run against the
            unpatched code first. Reverting the three source files and keeping the test fails ten tests;
            restoring the fix passes them. A test that has never been red is a test that has never
            demonstrated it can catch the thing it is named after.
          </p>

          <h2>What would make us revisit this</h2>
          <p>
            If <code>usage_logs</code> ever records the machine alongside the account, the
            &quot;cannot be separated afterwards&quot; half of this problem goes away, and a more
            permissive model — a deliberately shared account across an operator&apos;s fleet — becomes
            defensible. That is a real deployment pattern and we are not ruling it out. It just cannot be
            the default, and it cannot be reached by accident.
          </p>

          <h2>Upgrading</h2>
          <pre className="overflow-x-auto"><code>{`pip install --upgrade connectonion   # 1.6.5 or later, stable
co deploy --to prod`}</code></pre>
          <p>
            Existing deployments keep working. Redeploy to move an agent onto its own account.
          </p>

          <p className="text-gray-600">
            See also{' '}
            <Link href="/blog/alpha-beta-rc-before-lts">
              Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS
            </Link>{' '}
            for why this is a 1.6 patch rather than part of the 1.7 preview train.
          </p>
        </div>

        <ContentNavigation />
      </article>
    </main>
  )
}
