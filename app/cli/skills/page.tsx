/**
 * @purpose CLI skills command documentation
 * @context Shows how to use `co skills` — discover skill files across AI coding agents and import them into ~/.co/skills/
 */

'use client'

import { HiOutlinePuzzlePiece, HiOutlineBolt, HiOutlineCommandLine, HiOutlineMagnifyingGlass, HiOutlineArrowPath } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliSkillsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co skills' }
            ]}
            icon={HiOutlinePuzzlePiece}
            iconColor="icon-ui"
            title="co skills"
            description="Scan skill files across your AI coding agents (Claude Code, Codex, Cursor, Kiro) and import the ones you want into ~/.co/skills/ so ConnectOnion can use them."
            markdownPath="/cli/skills.md"
            markdownFilename="skills.md"
          />
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Quick Start
          </h2>

          <CodeWithResult
            code={`# Scan every known agent skill directory
co skills discover

# Pull a discovered skill into ~/.co/skills/
co skills copy ship-feature

# See what's already imported
co skills list`}
            language="bash"
          />
        </section>

        {/* Why */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineMagnifyingGlass className="w-8 h-8 text-gray-700" />
            Why
          </h2>

          <p className="text-gray-700 mb-6">
            Skills you&apos;ve written for one tool (for example Claude Code) are usually stored in that tool&apos;s own directory, such as <code className="bg-gray-100 px-2 py-1 rounded">~/.claude/skills/</code>. <code className="bg-gray-100 px-2 py-1 rounded">co skills</code> gives ConnectOnion a normal import path — <code className="bg-gray-100 px-1 rounded">co ai</code> loads skills from <code className="bg-gray-100 px-1 rounded">.co/skills/</code> and <code className="bg-gray-100 px-1 rounded">~/.co/skills/</code>, and importing makes publishing and manifest generation consistent.
          </p>

          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm leading-relaxed">{`~/.claude/skills/<name>/SKILL.md   ─┐
~/.codex/skills/<name>/SKILL.md    ─┤
~/.cursor/rules/<name>.mdc         ─┼─→  co skills discover  →  ~/.co/skills/index.json
~/.kiro/steering/<name>.md         ─┤                              │
~/.co/skills/<name>/SKILL.md       ─┘                              ▼
                                                          co skills copy <name>
                                                                   │
                                                                   ▼
                                                      ~/.co/skills/<name>/SKILL.md
                                                      (now visible to co ai, skills plugin, publishing)`}</pre>
          </div>
        </section>

        {/* Commands */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Commands
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-3">co skills discover</h3>
              <p className="text-gray-700 mb-3">
                Walks every known skill root, parses YAML frontmatter (<code className="bg-gray-100 px-1 rounded">name</code>, <code className="bg-gray-100 px-1 rounded">description</code>), and writes an index to <code className="bg-gray-100 px-1 rounded">~/.co/skills/index.json</code>. Plugin-namespaced entries (names containing <code className="bg-gray-100 px-1 rounded">:</code>) are filtered out by default (<code className="bg-gray-100 px-1 rounded">--include-namespaced</code> keeps them). <code className="bg-gray-100 px-1 rounded">--no-save</code> prints without writing; <code className="bg-gray-100 px-1 rounded">--json</code> prints the raw index.
              </p>
              <CodeWithResult
                code={`co skills discover`}
                result={`                Discovered skills (57)
┏━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳────────────────────────────┓
┃ Name                  ┃ Source ┃ Description                ┃
┡━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇────────────────────────────┩
│ ship-feature          │ claude │ Ship a feature end-to-end… │
│ frontend-test         │ claude │ Use browser agent to test… │
│ ship-feature          │ codex  │ Ship a feature end-to-end… │
└───────────────────────┴────────┴────────────────────────────┘
Index written to /Users/you/.co/skills/index.json`}
                language="bash"
              />
              <p className="text-gray-600 text-sm mt-3">
                The index is a <strong>cache, not a database</strong> — regenerated on every run, so stale entries disappear automatically.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co skills copy &lt;name&gt;</h3>
              <p className="text-gray-700 mb-3">
                Copy a discovered skill into <code className="bg-gray-100 px-1 rounded">~/.co/skills/&lt;name&gt;/</code> — sibling files alongside <code className="bg-gray-100 px-1 rounded">SKILL.md</code> (READMEs, helper scripts) come with it.
              </p>
              <CommandBlock
                commands={[
                  'co skills copy ship-feature',
                  'co skills copy ship-feature x-reply tweet',
                  'co skills copy --all',
                  'co skills copy --all --source claude',
                  'co skills copy --all --force'
                ]}
              />
              <p className="text-gray-600 text-sm mt-3">
                If the same skill name exists in multiple sources, a single copy refuses and asks you to disambiguate with <code className="bg-gray-100 px-1 rounded">--source</code>. With <code className="bg-gray-100 px-1 rounded">--all</code>, collisions resolve automatically by priority: <code className="bg-gray-100 px-1 rounded">co-project</code> &gt; <code className="bg-gray-100 px-1 rounded">co-user</code> &gt; <code className="bg-gray-100 px-1 rounded">claude</code> &gt; <code className="bg-gray-100 px-1 rounded">codex</code> &gt; <code className="bg-gray-100 px-1 rounded">cursor</code> &gt; <code className="bg-gray-100 px-1 rounded">kiro</code>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co skills manifest</h3>
              <p className="text-gray-700 mb-3">
                Build skill metadata from a skills directory and merge it into <code className="bg-gray-100 px-1 rounded">agent.json[&quot;skills&quot;]</code> — the shape publishing needs.
              </p>
              <CommandBlock
                commands={[
                  'co skills manifest',
                  'co skills manifest --path ./skills',
                  'co skills manifest --stdout'
                ]}
              />
              <p className="text-gray-600 text-sm mt-3">
                Defaults: <code className="bg-gray-100 px-1 rounded">--path ~/.co/skills/</code>, merges into <code className="bg-gray-100 px-1 rounded">~/.co/agent.json</code>. When merging, any prior <code className="bg-gray-100 px-1 rounded">signature</code> / <code className="bg-gray-100 px-1 rounded">signer</code> fields are removed (content changed, must re-sign). Each entry gets <code className="bg-gray-100 px-1 rounded">publish: false</code> by default; existing values are preserved on refresh.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co skills list</h3>
              <p className="text-gray-700 mb-3">
                List skills currently installed in <code className="bg-gray-100 px-1 rounded">~/.co/skills/</code>. Runs by default if you type <code className="bg-gray-100 px-1 rounded">co skills</code> with no subcommand.
              </p>
              <CommandBlock commands={['co skills list']} />
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineMagnifyingGlass className="w-8 h-8 text-gray-700" />
            Sources
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Source ID</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Root</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Layout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 font-mono text-gray-700">co-project</td><td className="px-4 py-3 font-mono text-gray-600">./.co/skills/</td><td className="px-4 py-3 font-mono text-gray-600">&lt;name&gt;/SKILL.md</td></tr>
                <tr><td className="px-4 py-3 font-mono text-gray-700">co-user</td><td className="px-4 py-3 font-mono text-gray-600">~/.co/skills/</td><td className="px-4 py-3 font-mono text-gray-600">&lt;name&gt;/SKILL.md</td></tr>
                <tr><td className="px-4 py-3 font-mono text-gray-700">claude</td><td className="px-4 py-3 font-mono text-gray-600">~/.claude/skills/</td><td className="px-4 py-3 font-mono text-gray-600">&lt;name&gt;/SKILL.md</td></tr>
                <tr><td className="px-4 py-3 font-mono text-gray-700">codex</td><td className="px-4 py-3 font-mono text-gray-600">~/.codex/skills/</td><td className="px-4 py-3 font-mono text-gray-600">&lt;name&gt;/SKILL.md</td></tr>
                <tr><td className="px-4 py-3 font-mono text-gray-700">cursor</td><td className="px-4 py-3 font-mono text-gray-600">~/.cursor/rules/</td><td className="px-4 py-3 font-mono text-gray-600">&lt;name&gt;.mdc</td></tr>
                <tr><td className="px-4 py-3 font-mono text-gray-700">kiro</td><td className="px-4 py-3 font-mono text-gray-600">~/.kiro/steering/</td><td className="px-4 py-3 font-mono text-gray-600">&lt;name&gt;.md</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 text-sm mt-4">Missing roots are silently skipped.</p>
        </section>

        {/* How it composes */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-gray-700" />
            How It Composes
          </h2>

          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm leading-relaxed">{`co skills discover        ← scan agent dirs → index.json
co skills copy --all      ← materialize ~/.co/skills/
co skills manifest        ← merge skill metadata into ~/.co/agent.json
co ai                     ← auto-loads .co/skills/ and ~/.co/skills/
co setup                  ← runs the full setup sequence
publish workflow          ← sign + announce ~/.co/agent.json`}</pre>
          </div>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/cli/setup" className="text-gray-700 hover:underline">co setup</a> — runs discover/copy/manifest for you</li>
              <li>• <a href="/cli/sub" className="text-gray-700 hover:underline">co sub</a> — subscribe to skills other people published</li>
              <li>• <a href="/cli/copy" className="text-gray-700 hover:underline">co copy</a> — copy built-in tools/plugins/prompts (different command, similar idea)</li>
              <li>• <a href="/features/skills" className="text-gray-700 hover:underline">Skills</a> — runtime auto-discovery in your agents</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
