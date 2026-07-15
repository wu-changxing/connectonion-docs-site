/**
 * @purpose CLI setup command documentation
 * @context Shows how to use `co setup` — global ~/.co/ identity, agent.json profile, and skill library in one command
 */

'use client'

import { HiOutlineCog, HiOutlineBolt, HiOutlineCommandLine, HiOutlineFolderOpen, HiOutlineArrowPath } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliSetupPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co setup' }
            ]}
            icon={HiOutlineCog}
            iconColor="icon-ui"
            title="co setup"
            description="One command to set up everything in ~/.co/ that you need to publish an agent: identity keypair, agent.json profile, and a populated skill library scanned from every coding agent on your machine."
            markdownPath="/cli/setup.md"
            markdownFilename="setup.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> <code className="bg-gray-100 px-2 py-1 rounded">co setup --name my-alias --bio &quot;One-line description of what I do&quot;</code>
            </p>
          </div>
        </section>

        {/* What it creates */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineFolderOpen className="w-8 h-8 text-gray-700" />
            What ~/.co/ Looks Like After
          </h2>

          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm leading-relaxed">{`~/.co/
├── keys/
│   ├── agent.key        # Ed25519 private key (signing identity)
│   ├── agent.pub        # Public key
│   └── recovery.txt     # 12-word recovery phrase
├── keys.env             # OPENONION_API_KEY (after \`co auth\`)
├── agent.json           # your publishable profile
│                        #   {address, alias, name, bio, skills:[...], version}
└── skills/              # populated from claude/codex/cursor/kiro
    ├── index.json       # discovery cache (where each skill came from)
    └── <name>/SKILL.md  # one dir per discovered skill`}</pre>
          </div>

          <p className="text-gray-700">
            There is <strong>no separate &quot;bundle&quot; directory</strong> — <code className="bg-gray-100 px-2 py-1 rounded">~/.co/</code> itself is what the publish workflow reads from at publish time.
          </p>
        </section>

        {/* What it does */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            What It Does (in order)
          </h2>

          <ol className="space-y-3 text-gray-700 list-decimal pl-6 mb-8">
            <li><strong>Identity.</strong> If <code className="bg-gray-100 px-1 rounded">~/.co/keys/agent.key</code> is missing, bootstraps one (in a temp directory, so no <code className="bg-gray-100 px-1 rounded">agent.py</code> pollution).</li>
            <li><strong><code className="bg-gray-100 px-1 rounded">~/.co/agent.json</code>.</strong> Writes the profile with your signing address, alias, bio, and <code className="bg-gray-100 px-1 rounded">skills[]</code>. Skipped if the file already exists unless you pass <code className="bg-gray-100 px-1 rounded">--force</code> (backs up to <code className="bg-gray-100 px-1 rounded">agent.json.bak</code>).</li>
            <li><strong>Skill library.</strong> Runs <code className="bg-gray-100 px-1 rounded">co skills discover &amp;&amp; co skills copy --all &amp;&amp; co skills manifest</code>. Idempotent — existing skills are not overwritten without <code className="bg-gray-100 px-1 rounded">--force</code>.</li>
            <li><strong>Auth check.</strong> Reports whether <code className="bg-gray-100 px-1 rounded">OPENONION_API_KEY</code> is present. Publishing works without it; only the <code className="bg-gray-100 px-1 rounded">co/*</code> managed models require it.</li>
          </ol>

          <CodeWithResult
            code={`co setup --name writing-tools --bio "Skills for nonfiction writing and editing"`}
            result={`✓ Identity: 0xcd92510bb6cc090374ecc345ef8c19b9d3797624fd1fbf7e078a9372fc31bdc1
✓ Wrote /Users/you/.co/agent.json (alias=writing-tools)

Refreshing ~/.co/skills/ library...
              Discovered skills (57)
... (table) ...
✓ Copied 30 skill(s) → /Users/you/.co/skills
✓ Merged 30 skill(s) into /Users/you/.co/agent.json

✓ Auth: OPENONION_API_KEY present

Setup complete. Run the oo-publish skill to sign + announce.`}
            language="bash"
          />
        </section>

        {/* Options */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Options
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Option</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Short</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--name</td>
                  <td className="px-4 py-3 font-mono text-gray-700">-n</td>
                  <td className="px-4 py-3 text-gray-600">Alias for agent.json (default <code className="bg-gray-100 px-1 rounded">$USER</code> lowercased)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--bio</td>
                  <td className="px-4 py-3 font-mono text-gray-700">-b</td>
                  <td className="px-4 py-3 text-gray-600">One-line bio for agent.json</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--force</td>
                  <td className="px-4 py-3 font-mono text-gray-700">-f</td>
                  <td className="px-4 py-3 text-gray-600">Overwrite existing agent.json (backs up to .bak)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--no-skills</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-gray-600">Skip the skill library refresh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Idempotency + relation to co init */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-gray-700" />
            Safe to Re-run
          </h2>

          <ul className="space-y-2 text-gray-700 list-disc pl-6 mb-10">
            <li>Identity is never regenerated if <code className="bg-gray-100 px-1 rounded">~/.co/keys/agent.key</code> exists.</li>
            <li><code className="bg-gray-100 px-1 rounded">agent.json</code> is skipped if it exists (use <code className="bg-gray-100 px-1 rounded">--force</code> to overwrite — it backs up first).</li>
            <li>Skill library is refreshed — new skills are added, existing ones skipped. You can also just edit <code className="bg-gray-100 px-1 rounded">~/.co/agent.json</code> directly; it&apos;s normal JSON.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">How co setup relates to co init</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Command</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Scope</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">What it creates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">co init</td>
                  <td className="px-4 py-3 text-gray-600"><strong>Project</strong> (cwd)</td>
                  <td className="px-4 py-3 text-gray-600">agent.py, .env, .co/host.yaml, vibe-coding docs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">co setup</td>
                  <td className="px-4 py-3 text-gray-600"><strong>Global</strong> (~/.co/)</td>
                  <td className="px-4 py-3 text-gray-600">agent.json, skills/, keys/ (if missing)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 mt-4">
            They&apos;re orthogonal. Use <code className="bg-gray-100 px-1 rounded">co init</code> to scaffold a new agent <em>project</em>; use <code className="bg-gray-100 px-1 rounded">co setup</code> to prepare your <em>identity</em> for publishing.
          </p>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/cli/skills" className="text-gray-700 hover:underline">co skills</a> — the discover/copy/manifest commands that co setup orchestrates</li>
              <li>• <a href="/cli/sub" className="text-gray-700 hover:underline">co sub</a> — the subscriber side: follow other publishers</li>
              <li>• <a href="/cli/init" className="text-gray-700 hover:underline">co init</a> — project scaffold (different scope)</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
