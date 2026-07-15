/**
 * @purpose CLI sub command documentation
 * @context Shows how to use `co sub` — subscribe to published agents, mirror their skills, fan out to every coding agent on the machine
 */

'use client'

import { HiOutlineArrowPath, HiOutlineBolt, HiOutlineCommandLine, HiOutlineShieldCheck, HiOutlineSquares2X2 } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliSubPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co sub' }
            ]}
            icon={HiOutlineArrowPath}
            iconColor="icon-ui"
            title="co sub"
            description="Follow another agent's address, mirror their published skills to your machine, and make them available to every coding agent on your system (Claude Code, Codex, OpenClaw, Cursor, Kiro)."
            markdownPath="/cli/sub.md"
            markdownFilename="sub.md"
          />
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Quick Start
          </h2>

          <CodeWithResult
            code={`# Subscribe to a publisher (first time needs the full 0x address)
co sub sync 0xcd92510bb6cc090374ecc345ef8c19b9d3797624fd1fbf7e078a9372fc31bdc1

# Re-sync every publisher you follow (refresh after they push new versions)
co sub

# Show who you follow (local only, no relay calls)
co sub list

# Stop following
co sub remove changxing`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            After any <code className="bg-gray-100 px-2 py-1 rounded">co sub</code> invocation that pulls new content, <strong>restart your coding agent</strong> to pick up the new skills.
          </p>
        </section>

        {/* Fan-out */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSquares2X2 className="w-8 h-8 text-gray-700" />
            How the Fan-out Works
          </h2>

          <p className="text-gray-700 mb-6">
            One subscription is mirrored once into <code className="bg-gray-100 px-2 py-1 rounded">~/.co/subs/&lt;alias&gt;/</code> (the single source of truth), then distributed into every coding agent installed on your machine:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Tool</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Destination</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-gray-700">Claude Code</td><td className="px-4 py-3 font-mono text-gray-600">~/.claude/plugins/&lt;alias&gt;/</td><td className="px-4 py-3 text-gray-600">Symlink to the whole bundle</td></tr>
                <tr><td className="px-4 py-3 text-gray-700">Codex</td><td className="px-4 py-3 font-mono text-gray-600">~/.codex/skills/&lt;alias&gt;-&lt;skill&gt;/</td><td className="px-4 py-3 text-gray-600">Per-skill symlinks</td></tr>
                <tr><td className="px-4 py-3 text-gray-700">OpenClaw</td><td className="px-4 py-3 font-mono text-gray-600">~/.openclaw/skills/&lt;alias&gt;-&lt;skill&gt;/</td><td className="px-4 py-3 text-gray-600">Per-skill symlinks</td></tr>
                <tr><td className="px-4 py-3 text-gray-700">Cursor</td><td className="px-4 py-3 font-mono text-gray-600">~/.cursor/rules/&lt;alias&gt;-&lt;skill&gt;.mdc</td><td className="px-4 py-3 text-gray-600">File copy with frontmatter rewritten</td></tr>
                <tr><td className="px-4 py-3 text-gray-700">Kiro</td><td className="px-4 py-3 font-mono text-gray-600">~/.kiro/steering/&lt;alias&gt;-&lt;skill&gt;.md</td><td className="px-4 py-3 text-gray-600">Plain file copy</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 text-sm">
            Only tools that exist on your machine (have a <code className="bg-gray-100 px-1 rounded">~/.&lt;tool&gt;/</code> directory) are touched.
          </p>
        </section>

        {/* Commands */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Commands
          </h2>

          <p className="text-gray-700 mb-8">
            <code className="bg-gray-100 px-2 py-1 rounded">co sub</code> is the <strong>sync verb</strong>: with a target it syncs one publisher; with no target it re-syncs every entry in <code className="bg-gray-100 px-1 rounded">~/.co/subscriptions.txt</code>. Subscribing and refreshing are the same operation — re-running re-fetches the profile, re-writes the mirrored bodies, and re-runs the fan-out.
          </p>

          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-3">co sub sync &lt;0xaddress&gt; — sync one publisher</h3>
              <CodeWithResult
                code={`co sub sync 0xcd92510bb6cc090374ecc345ef8c19b9d3797624fd1fbf7e078a9372fc31bdc1`}
                result={`Fetching profile 0xcd92510bb6cc...
✓ Subscribed to changxing (0xcd92510bb6cc...)
  mirrored 18 skill(s) → /Users/you/.co/subs/changxing
  claude: installed 1 skill(s)
  codex: installed 18 skill(s)
  openclaw: installed 18 skill(s)
  cursor: installed 17 skill(s)

→ Restart your coding agent to load the new skills.`}
                language="bash"
              />
              <p className="text-gray-600 text-sm mt-3">
                Idempotent — re-running refreshes. Once a publisher is in <code className="bg-gray-100 px-1 rounded">subscriptions.txt</code>, the alias works as shorthand: <code className="bg-gray-100 px-1 rounded">co sub sync changxing</code>. <code className="bg-gray-100 px-1 rounded">--relay &lt;url&gt;</code> overrides the relay (default <code className="bg-gray-100 px-1 rounded">https://oo.openonion.ai</code>).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co sub — sync every subscription</h3>
              <CommandBlock commands={['co sub']} />
              <p className="text-gray-600 text-sm mt-3">
                Walks <code className="bg-gray-100 px-1 rounded">~/.co/subscriptions.txt</code> and re-syncs each publisher in order. If one is unreachable the command stops at the failure (fail-fast is intentional).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co sub list — local view only</h3>
              <CodeWithResult
                code={`co sub list`}
                result={`                          Subscriptions
┏━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━┓
┃ Alias     ┃ Address                         ┃ Version ┃ Skills ┃
┡━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━┩
│ changxing │ 0xcd92510bb6cc0903…             │ v0.1.0  │     18 │
└───────────┴─────────────────────────────────┴─────────┴────────┘

Stored in: /Users/you/.co/subscriptions.txt`}
                language="bash"
              />
              <p className="text-gray-600 text-sm mt-3">No network calls — pure local read.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co sub remove &lt;alias|0xaddress&gt;</h3>
              <CommandBlock commands={['co sub remove changxing']} />
              <p className="text-gray-600 text-sm mt-3">
                Reverse of sync: drops the line from <code className="bg-gray-100 px-1 rounded">subscriptions.txt</code>, uninstalls every per-tool symlink/copy, and deletes <code className="bg-gray-100 px-1 rounded">~/.co/subs/&lt;alias&gt;/</code>. Idempotent.
              </p>
            </div>
          </div>
        </section>

        {/* Address vs alias */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            Address vs Alias
          </h2>

          <p className="text-gray-700 mb-4">
            <strong>First-time subscriptions require a 0x address.</strong> Aliases are mutable: a publisher can change their alias, the relay could serve the wrong agent under a familiar name, and the subscriber couldn&apos;t tell after the fact. Subscribing by alias would be an MITM hole.
          </p>

          <p className="text-gray-700 mb-6">
            Once you&apos;ve subscribed by address, the alias from the publisher&apos;s profile is recorded next to it — from then on either works. A bare alias that&apos;s <em>not</em> already in <code className="bg-gray-100 px-1 rounded">subscriptions.txt</code> errors out and tells you to paste the address.
          </p>

          <p className="text-gray-700 mb-4">
            <code className="bg-gray-100 px-2 py-1 rounded">~/.co/subscriptions.txt</code> is plain text — edit it by hand if you like; <code className="bg-gray-100 px-1 rounded">co sub</code> is just sugar:
          </p>

          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm leading-relaxed">{`# ~/.co/subscriptions.txt — agents you follow
# Format: <address> <alias>
0xcd92510bb6cc090374ecc345ef8c19b9d3797624fd1fbf7e078a9372fc31bdc1 changxing
0xabc...                                                           alice`}</pre>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            v1 Limitations
          </h2>

          <ul className="space-y-3 text-gray-700 list-disc pl-6">
            <li><strong>No signature verification yet.</strong> The relay strips <code className="bg-gray-100 px-1 rounded">signer</code>/<code className="bg-gray-100 px-1 rounded">signature</code> from profile responses, so the client trusts the relay. When the relay exposes the signature, <code className="bg-gray-100 px-1 rounded">co sub</code> will verify locally before writing anything to disk.</li>
            <li><strong>No lazy version check.</strong> Every sync re-pulls the full profile + every skill body even if nothing changed. A future <code className="bg-gray-100 px-1 rounded">profile-head</code> relay endpoint will let it skip unchanged publishers — the CLI surface won&apos;t change.</li>
          </ul>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/cli/setup" className="text-gray-700 hover:underline">co setup</a> — the publisher side: set up ~/.co/ identity and skill library</li>
              <li>• <a href="/cli/skills" className="text-gray-700 hover:underline">co skills</a> — discover and import skills you&apos;ve written yourself</li>
              <li>• <a href="/connect" className="text-gray-700 hover:underline">Multi-Agent Networking</a> — the broader relay/host/connect picture</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
