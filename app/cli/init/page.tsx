/**
 * @purpose CLI init command documentation
 * @context Shows how to use `co init` to add ConnectOnion to an existing directory — global identity from ~/.co/keys.env, smart .env merging, doc updates
 */

'use client'

import { HiOutlineFolderPlus, HiOutlineBolt, HiOutlineCodeBracket, HiOutlineCog6Tooth, HiOutlineDocumentText, HiOutlineShieldCheck, HiOutlineExclamationTriangle, HiOutlineLockClosed, HiOutlineSparkles } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { FileTree } from '../../../components/FileTree'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliInitPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co init' }
            ]}
            icon={HiOutlineFolderPlus}
            iconColor="icon-ui"
            title="co init"
            description="Add ConnectOnion to an existing folder safely. Preserves your code and .env, appends only what's missing, refreshes docs to the latest version."
            markdownPath="/cli/init.md"
            markdownFilename="init.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> <code className="bg-gray-100 px-2 py-1 rounded">cd existing-project && co init</code> — your existing files stay put, ConnectOnion slots in around them.
            </p>
          </div>
        </section>

        {/* When to use init vs create */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            init vs create
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Use <code className="bg-gray-100 px-2 py-1 rounded">co create</code> for a fresh project in a new directory.
            Use <code className="bg-gray-100 px-2 py-1 rounded">co init</code> when you already have a folder — Django app, scripts, or an existing ConnectOnion project you want to refresh.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Feature</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">co create</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">co init</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">Creates new directory</td>
                  <td className="px-4 py-3 text-gray-700">Yes</td>
                  <td className="px-4 py-3 text-gray-700">No (uses current)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Works in non-empty dir</td>
                  <td className="px-4 py-3 text-gray-700">No</td>
                  <td className="px-4 py-3 text-gray-700">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Uses global identity (~/.co/)</td>
                  <td className="px-4 py-3 text-gray-700">Yes</td>
                  <td className="px-4 py-3 text-gray-700">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Handles existing .env</td>
                  <td className="px-4 py-3 text-gray-700">Creates fresh</td>
                  <td className="px-4 py-3 text-gray-700">Appends missing keys</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Refresh docs anytime</td>
                  <td className="px-4 py-3 text-gray-700">On creation</td>
                  <td className="px-4 py-3 text-gray-700">Every run / --update-docs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Basic Usage */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
            Basic Usage
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Drop into any directory and run <code className="bg-gray-100 px-2 py-1 rounded">co init</code>:
          </p>

          <CodeWithResult
            code={`cd my-existing-project
co init`}
            result={`🧅 ConnectOnion Project Initializer
========================================

✓ Using global identity from ~/.co/
✓ Found existing .env file
✓ Appending API keys from ~/.co/keys.env
✓ Wrote .co/host.yaml
✓ Refreshed .co/docs/

✅ ConnectOnion project initialized!`}
            language="bash"
          />

          <p className="text-gray-600 mt-6 mb-4">
            Common one-liners:
          </p>

          <CommandBlock
            commands={[
              'co init',
              'co init -y',
              'co init -t minimal',
              'co init -t playwright',
              'co init --update-docs',
            ]}
          />
        </section>

        {/* What gets added */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDocumentText className="w-8 h-8 text-gray-700" />
            What Gets Added
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            <code className="bg-gray-100 px-2 py-1 rounded">co init</code> adds a small set of files. Everything else in your project stays exactly as it was.
          </p>

          <FileTree
            structure={[
              {
                name: 'your-project/',
                type: 'folder',
                children: [
                  { name: 'agent.py', type: 'file', icon: 'python', comment: 'added if missing — never overwritten' },
                  { name: '.env', type: 'file', icon: 'env', comment: 'created or appended with missing API keys' },
                  {
                    name: '.co/',
                    type: 'folder',
                    children: [
                      { name: 'host.yaml', type: 'file', icon: 'config', comment: 'project config — uses global identity' },
                      {
                        name: 'docs/',
                        type: 'folder',
                        comment: 'always refreshed to latest',
                        children: [
                          { name: 'connectonion.md', type: 'file', icon: 'markdown' },
                          { name: 'co-vibe-coding-all-in-one.md', type: 'file', icon: 'markdown' },
                        ],
                      },
                    ],
                  },
                  { name: '.gitignore', type: 'file', comment: 'ConnectOnion entries appended' },
                ],
              },
            ]}
          />

          <p className="text-gray-600 mt-6">
            Identity (address + email) lives in <code className="bg-gray-100 px-2 py-1 rounded">~/.co/keys.env</code> and <code className="bg-gray-100 px-2 py-1 rounded">~/.co/host.yaml</code> — shared across every project. The per-project <code className="bg-gray-100 px-2 py-1 rounded">.co/host.yaml</code> only stores project-specific overrides.
          </p>
        </section>

        {/* File Safety */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            File Safety
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Each file has a clear, predictable behavior. Your code is never touched.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">File / Directory</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">If Exists</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">agent.py</td>
                  <td className="px-4 py-3 text-gray-700">Skip</td>
                  <td className="px-4 py-3 text-gray-600">Won't overwrite your code</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">.env</td>
                  <td className="px-4 py-3 text-gray-700">Append</td>
                  <td className="px-4 py-3 text-gray-600">Adds only API keys that are missing</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">.co/docs/</td>
                  <td className="px-4 py-3 text-gray-700">Overwrite</td>
                  <td className="px-4 py-3 text-gray-600">Always pinned to latest framework docs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">.co/host.yaml</td>
                  <td className="px-4 py-3 text-gray-700">Update</td>
                  <td className="px-4 py-3 text-gray-600">Merges, preserves custom keys</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">.gitignore</td>
                  <td className="px-4 py-3 text-gray-700">Append</td>
                  <td className="px-4 py-3 text-gray-600">Adds ConnectOnion entries if missing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* .env handling — 4 cases */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineLockClosed className="w-8 h-8 text-gray-700" />
            How .env Is Merged
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Global API keys live in <code className="bg-gray-100 px-2 py-1 rounded">~/.co/keys.env</code>. <code className="bg-gray-100 px-2 py-1 rounded">co init</code> reads them and intelligently merges into your project's <code className="bg-gray-100 px-2 py-1 rounded">.env</code> — four cases, all safe.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Case 1 — No .env File</h3>
              <p className="text-gray-600 mb-3">Creates a fresh <code className="bg-gray-100 px-2 py-1 rounded">.env</code> with your global keys.</p>
              <CodeWithResult
                code={`co init`}
                result={`# .env (created)
OPENAI_API_KEY=sk-proj-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
GEMINI_API_KEY=AIza...`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Case 2 — .env Exists, No API Keys</h3>
              <p className="text-gray-600 mb-3">Appends the API keys section. Your variables stay intact.</p>
              <CodeWithResult
                code={`# Original .env
DATABASE_URL=postgres://localhost/mydb
SECRET_KEY=mysecret`}
                result={`# After co init
DATABASE_URL=postgres://localhost/mydb
SECRET_KEY=mysecret

# ConnectOnion API Keys
OPENAI_API_KEY=sk-proj-xxx
ANTHROPIC_API_KEY=sk-ant-xxx`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Case 3 — .env Has Some API Keys</h3>
              <p className="text-gray-600 mb-3">Existing keys are preserved. Only the missing ones are added.</p>
              <CodeWithResult
                code={`# Original .env
OPENAI_API_KEY=sk-proj-old`}
                result={`# After co init
OPENAI_API_KEY=sk-proj-old   # untouched

# ConnectOnion API Keys
ANTHROPIC_API_KEY=sk-ant-xxx
GEMINI_API_KEY=AIza...`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Case 4 — .env Has All Keys</h3>
              <p className="text-gray-600 mb-3">Nothing to do — file isn't modified.</p>
              <CodeWithResult
                code={`co init`}
                result={`✓ .env already contains all API keys`}
                language="bash"
              />
            </div>
          </div>

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Provider mapping</h3>
            <p className="text-gray-700 mb-3">When you pass <code className="bg-gray-100 px-2 py-1 rounded">--key</code>, the provider is auto-detected from the prefix:</p>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• OpenAI → <code className="bg-gray-100 px-1 rounded">OPENAI_API_KEY</code></li>
              <li>• Anthropic → <code className="bg-gray-100 px-1 rounded">ANTHROPIC_API_KEY</code></li>
              <li>• Google → <code className="bg-gray-100 px-1 rounded">GEMINI_API_KEY</code></li>
              <li>• Groq → <code className="bg-gray-100 px-1 rounded">GROQ_API_KEY</code></li>
            </ul>
          </div>
        </section>

        {/* Templates */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
            Templates
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Same templates as <code className="bg-gray-100 px-2 py-1 rounded">co create</code> — pick the closest fit, you can always edit afterward.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">minimal</h3>
              <p className="text-gray-600 text-sm">Basic agent with simple tools. Good starting point.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">playwright</h3>
              <p className="text-gray-600 text-sm">Browser automation — clicking, scraping, screenshots.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">custom</h3>
              <p className="text-gray-600 text-sm">Describe what you want — generated by AI.</p>
            </div>
          </div>

          <CodeWithResult
            code={`co init -t minimal
co init -t playwright
co init -t custom --description "Monitor a site and alert me on changes"`}
            language="bash"
          />
        </section>

        {/* --update-docs */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDocumentText className="w-8 h-8 text-gray-700" />
            Refreshing Docs
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            The <code className="bg-gray-100 px-2 py-1 rounded">.co/docs/</code> folder ships with the framework — it's overwritten on every <code className="bg-gray-100 px-2 py-1 rounded">co init</code> so the agent always has the current docs in context.
          </p>

          <p className="text-gray-700 mb-4">
            For a docs-only refresh in an existing project, use <code className="bg-gray-100 px-2 py-1 rounded">--update-docs</code>:
          </p>

          <CodeWithResult
            code={`co init --update-docs`}
            result={`✓ Project already initialized
✓ Updated .co/docs/ to latest version

✅ Documentation updated!`}
            language="bash"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700">
              <strong className="text-gray-900">Don't edit framework docs.</strong> They'll be overwritten on the next update. Put your own project rules in <code className="bg-gray-100 px-2 py-1 rounded">.co/OO.md</code> instead — that file is yours, never touched by init.
            </p>
          </div>
        </section>

        {/* Special directory warnings */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineExclamationTriangle className="w-8 h-8 text-gray-700" />
            Special Directory Warnings
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            <code className="bg-gray-100 px-2 py-1 rounded">co init</code> refuses (or warns) when run in directories that probably aren't projects:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <ul className="text-gray-700 space-y-2">
              <li>• Home directory (<code className="bg-gray-100 px-1 rounded">~</code>)</li>
              <li>• Root directory (<code className="bg-gray-100 px-1 rounded">/</code>)</li>
              <li>• System directories (<code className="bg-gray-100 px-1 rounded">/usr</code>, <code className="bg-gray-100 px-1 rounded">/etc</code>)</li>
              <li>• Existing git repositories — warns, then continues</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4">
            If you really mean it, pass <code className="bg-gray-100 px-2 py-1 rounded">--force</code>:
          </p>

          <CodeWithResult
            code={`co init --force`}
            language="bash"
          />
        </section>

        {/* Command Reference */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCog6Tooth className="w-8 h-8 text-gray-700" />
            Command Reference
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Option</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Short</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--template</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-t</td>
                  <td className="px-4 py-3 text-gray-700"><code className="bg-gray-100 px-1 rounded">co-ai</code> | <code className="bg-gray-100 px-1 rounded">custom</code></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--key</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-700">Paste an API key — provider auto-detected, appended to .env</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--force</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-700">Continue in non-empty or special directories</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--yes</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-y</td>
                  <td className="px-4 py-3 text-gray-700">Accept defaults, skip prompts</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--update-docs</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-700">Refresh <code className="bg-gray-100 px-1 rounded">.co/docs/</code> only — leaves everything else alone</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--no-ai</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-700">Disable AI features (not recommended)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common workflows */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Common Workflows
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Add agents to a Django app</h3>
              <CodeWithResult
                code={`cd my-django-app
co init`}
                result={`✓ Found existing .env file
✓ Appending API keys (DATABASE_URL preserved)
✓ Skipped agent.py (none found — created)
✓ Refreshed .co/docs/

✅ ConnectOnion project initialized!`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Refresh an older ConnectOnion project</h3>
              <CodeWithResult
                code={`cd old-agent-project
co init`}
                result={`✓ Project already initialized
✓ Adding ANTHROPIC_API_KEY (was missing)
✓ Refreshed .co/docs/ to latest

✅ Project updated!`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Convert a scripts folder into an agent project</h3>
              <CodeWithResult
                code={`cd my-scripts
co init -y`}
                result={`✓ Created .env with API keys
✓ Added agent.py template
✓ Your scripts untouched

✅ Ready — run: python agent.py`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineExclamationTriangle className="w-8 h-8 text-gray-700" />
            Troubleshooting
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">My .env had a different OPENAI_API_KEY — was it overwritten?</h3>
              <p className="text-gray-700 text-sm">
                No. <code className="bg-gray-100 px-1 rounded">co init</code> never replaces an existing key. Your old value stays. To use the global one, delete the line and re-run <code className="bg-gray-100 px-1 rounded">co init</code>.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">The docs in .co/docs/ look out of date</h3>
              <p className="text-gray-700 text-sm">
                Run <code className="bg-gray-100 px-1 rounded">co init --update-docs</code>. The folder is always overwritten with the latest framework docs.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">I want a clean .env from scratch</h3>
              <p className="text-gray-700 text-sm">
                Remove it manually, then re-init: <code className="bg-gray-100 px-1 rounded">rm .env && co init</code>.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Refused to run — "special directory"</h3>
              <p className="text-gray-700 text-sm">
                You're probably in <code className="bg-gray-100 px-1 rounded">~</code>, <code className="bg-gray-100 px-1 rounded">/</code>, or a system path. Move into a project folder, or pass <code className="bg-gray-100 px-1 rounded">--force</code> if you really mean it.
              </p>
            </div>
          </div>
        </section>

        {/* Best practices */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Practices</h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-gray-900">Review .env after init</strong> — confirm the API keys appended cleanly.
              </div>
              <div>
                <strong className="text-gray-900">Refresh docs periodically</strong> — <code className="bg-gray-100 px-2 py-1 rounded">co init --update-docs</code> keeps the agent's context fresh.
              </div>
              <div>
                <strong className="text-gray-900">Commit .co/host.yaml</strong> — track project-specific config in git.
              </div>
              <div>
                <strong className="text-gray-900">Never commit .env</strong> — keep API keys out of the repo.
              </div>
              <div>
                <strong className="text-gray-900">Don't edit .co/docs/</strong> — it's framework-owned, overwritten on update. Put your rules in <code className="bg-gray-100 px-2 py-1 rounded">.co/OO.md</code>.
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
