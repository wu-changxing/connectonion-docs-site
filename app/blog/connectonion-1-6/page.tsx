import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'

const installCommand = 'pip install --upgrade connectonion==1.6.0'

const releaseMarkdown = `# ConnectOnion 1.6.0

ConnectOnion 1.6.0 makes remote agents safer to operate and draws a clearer boundary around credentials.

## What changed

- Remote-agent identity and temporary session-status requests are signed consistently.
- Relay profile updates reject stale or conflicting state.
- Microsoft OAuth access and refresh tokens stay on the CLI machine. The backend stores no Microsoft credentials.
- New projects use private invite credentials; there is no shared default invite code.
- Email sends carry traceable, tenant-scoped idempotency keys, so retrying an uncertain response does not send the same message twice.
- Paid mailbox upgrades are atomic and can preserve an existing address.
- Dependency checks, Windows coverage, installed-wheel acceptance, and exact-artifact verification now gate releases.

## Upgrade

\`\`\`bash
${installCommand}
\`\`\`

The standalone TypeScript client is available as \`connectonion@0.3.4\`. React applications should use \`@connectonion/react@0.3.3\`.

Every 1.6.0 wheel and source archive attached to the GitHub release is byte-for-byte identical to the corresponding file on PyPI.`

export default function ConnectOnion160Page() {
  return (
    <main className="px-6 md:px-12 py-14 md:py-20">
      <article className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Release notes · August 9, 2026</p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">ConnectOnion 1.6.0</h1>
            <p className="text-xl leading-relaxed text-gray-600">
              Safer remote agents and a cleaner credential boundary.
            </p>
          </div>
          <CopyMarkdownButton content={releaseMarkdown} />
        </div>

        <div className="prose prose-gray max-w-none">
          <p>
            This release is the result of a security and reliability pass across the Python package,
            hosted-agent backend, TypeScript client, React SDK, and documentation.
          </p>

          <h2>Remote control is authenticated more consistently</h2>
          <p>
            Host identity and temporary session-status probes now use the same signed-command model.
            Relay profile updates also reject stale state and conflicting updates instead of silently
            accepting whichever request arrives last.
          </p>

          <h2>Microsoft credentials stay local</h2>
          <p>
            Microsoft OAuth access tokens, refresh tokens, and token rotation now remain on the CLI
            machine. ConnectOnion&apos;s backend does not store Microsoft credentials. This is a deliberate
            design boundary: the CLI refreshes locally when it needs to make a Microsoft API call.
          </p>

          <h2>Safer onboarding and email delivery</h2>
          <ul>
            <li>New projects use private invite credentials; the old shared default invite code is gone.</li>
            <li>Email retries use traceable, tenant-scoped idempotency keys to prevent duplicate sends.</li>
            <li>Provider failures return stable errors without hiding the underlying server trace.</li>
            <li>Mailbox upgrades charge and apply the new quota atomically, and can keep the existing address.</li>
          </ul>

          <h2>Release artifacts are exercised as users install them</h2>
          <p>
            The release gate covers Python 3.10–3.13, native Windows browser behavior, dependency audits,
            and installation from the built wheel. PyPI and GitHub carry the same verified wheel and
            source archive.
          </p>

          <h2>Upgrade</h2>
          <pre><code>{installCommand}</code></pre>

          <p>
            React applications should use <code>@connectonion/react@0.3.3</code>. The standalone
            TypeScript client remains available for non-React consumers as <code>connectonion@0.3.4</code>.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="https://pypi.org/project/connectonion/1.6.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700"
          >
            Install from PyPI
          </a>
          <a
            href="https://github.com/openonion/connectonion/releases/tag/v1.6.0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
          >
            View verified artifacts
          </a>
          <Link href="/blog" className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-900">
            Back to the journal
          </Link>
        </div>
      </article>
    </main>
  )
}
