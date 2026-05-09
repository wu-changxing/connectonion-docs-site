/**
 * @purpose CLI create command documentation
 * @context Shows how `co create` scaffolds new ConnectOnion agent projects, including first-time global setup (~/.co/keys.env identity), templates, and project structure
 */

'use client'

import { HiOutlineFolderPlus, HiOutlineSparkles, HiOutlineRocketLaunch, HiOutlineKey, HiOutlineCog6Tooth, HiOutlineCodeBracket, HiOutlineBolt, HiOutlineUserCircle, HiOutlineSquares2X2 } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { FileTree } from '../../../components/FileTree'
import { PageHeader } from '../../../components/PageHeader'

export default function CliCreatePage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co create' }
            ]}
            icon={HiOutlineFolderPlus}
            iconColor="icon-ui"
            title="co create"
            description="Scaffold a new ConnectOnion agent project with intelligent defaults — identity, API keys, and a runnable agent in one command."
            markdownPath="/cli/create.md"
            markdownFilename="create.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> Run <code className="bg-gray-100 px-2 py-1 rounded">co create</code> — picks a template, sets up your global identity, and writes a runnable agent.
            </p>
          </div>
        </section>

        {/* Command Flow */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Command Flow
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            <code className="bg-gray-100 px-2 py-1 rounded">co create</code> behaves differently the first time you run it versus every time after.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">First-Time User</h3>
              <p className="text-gray-500 text-sm mt-2">No <code className="text-gray-600">~/.co/</code> yet. The CLI generates a master keypair, your agent address, and an email — all written to <code className="text-gray-600">~/.co/keys.env</code>.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-700 mb-2">Returning User</h3>
              <p className="text-gray-500 text-sm mt-2">Reuses your global identity and copies any saved API keys from <code className="text-gray-600">~/.co/keys.env</code> straight into the new project's <code className="text-gray-600">.env</code>.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">First-Time Run</h3>
          <CodeWithResult
            code={`co create my-first-agent`}
            result={`🚀 Welcome to ConnectOnion!
✨ Setting up global configuration...
  ✓ Creating ~/.co/ directory
  ✓ Generating master keypair
  ✓ Your address: 0x7a9f3b2c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a
  ✓ Your email: 0x7a9f3b2c@mail.openonion.ai
  ✓ Creating ~/.co/keys.env (ready for your API keys)

🧅 ConnectOnion Project Creator
========================================

✔ Choose a template:
  ❯ Minimal - Simple starting point
    Web Research - Data scraping & analysis
    Playwright - Browser automation
    Custom - AI generates based on needs

✔ Paste your API key (or Enter to skip): › sk-proj-xxx
  ✓ Detected OpenAI API key
  ✓ Saved to ~/.co/keys.env for future projects

✔ Project name: › my-first-agent

✅ Project created successfully!

📁 Created: my-first-agent
📦 Template: Minimal
✨ AI Features: Enabled
📧 Agent email: 0x7a9f3b2c@mail.openonion.ai (global)
🔑 Agent address: 0x7a9f3b2c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a (global)

🚀 Next steps:
────────────────────────────────────────
1️⃣  cd my-first-agent
2️⃣  pip install python-dotenv
3️⃣  python agent.py`}
            language="bash"
          />

          <h3 className="text-xl font-semibold mb-4 mt-10">Returning Run</h3>
          <CodeWithResult
            code={`co create another-agent`}
            result={`🧅 ConnectOnion Project Creator
========================================
✓ Using global identity: 0x7a9f3b2c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a
✓ Using global email: 0x7a9f3b2c@mail.openonion.ai

✔ Choose a template: › Web Research

✓ Found API keys in ~/.co/keys.env
  ✓ OpenAI key will be copied to project

✔ Project name: › research-bot

✅ Project created successfully!

📁 Created: research-bot
📦 Template: Web Research
✨ AI Features: Enabled
📧 Agent email: 0x7a9f3b2c@mail.openonion.ai (global)
🔑 Agent address: 0x7a9f3b2c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a (global)
🔑 API keys: Copied from global config

💡 Using global email/address. Run 'co status' to view.`}
            language="bash"
          />
        </section>

        {/* What Gets Created */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSquares2X2 className="w-8 h-8 text-gray-700" />
            What Gets Created
          </h2>

          <h3 className="text-xl font-semibold mb-4">Global Configuration (first time only)</h3>
          <p className="text-gray-700 mb-4">
            Lives in your home directory and is shared across <strong>every</strong> project on this machine.
          </p>
          <FileTree
            structure={[
              {
                name: '~/.co',
                type: 'folder',
                children: [
                  { name: 'keys.env', type: 'file', icon: 'env', comment: 'Identity (AGENT_ADDRESS, AGENT_EMAIL) + shared API keys' },
                  {
                    name: 'keys',
                    type: 'folder',
                    comment: 'Master identity',
                    children: [
                      { name: 'agent.key', type: 'file', icon: 'env', comment: 'Private key (for signing)' },
                      { name: 'recovery.txt', type: 'file', comment: 'Recovery phrase' }
                    ]
                  },
                  {
                    name: 'logs',
                    type: 'folder',
                    children: [
                      { name: 'cli.log', type: 'file', comment: 'Command history' }
                    ]
                  }
                ]
              }
            ]}
            className="mb-10"
          />

          <h3 className="text-xl font-semibold mb-4">Project Structure</h3>
          <FileTree
            structure={[
              {
                name: 'my-agent',
                type: 'folder',
                children: [
                  { name: 'agent.py', type: 'file', icon: 'python', comment: 'Main agent implementation' },
                  { name: '.env', type: 'file', icon: 'env', comment: 'API keys (copied from ~/.co/keys.env)' },
                  {
                    name: '.co',
                    type: 'folder',
                    children: [
                      { name: 'host.yaml', type: 'file', icon: 'config', comment: 'Project config (uses global address/email)' },
                      {
                        name: 'docs',
                        type: 'folder',
                        comment: 'Framework documentation',
                        children: [
                          { name: 'co-vibe-coding-all-in-one.md', type: 'file', icon: 'markdown' },
                          { name: 'connectonion.md', type: 'file', icon: 'markdown' }
                        ]
                      }
                    ]
                  },
                  { name: 'README.md', type: 'file', icon: 'markdown', comment: 'Project documentation' },
                  { name: '.gitignore', type: 'file', icon: 'git', comment: 'Excludes .env and sensitive files' }
                ]
              }
            ]}
          />

          <p className="text-gray-600 mt-4 text-sm">
            Projects use the global address/email by default — no per-project keypair, no duplicate identity.
          </p>
        </section>

        {/* Configuration Files */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCog6Tooth className="w-8 h-8 text-gray-700" />
            Configuration Files
          </h2>

          <h3 className="text-xl font-semibold mb-4">Global Identity — <code className="bg-gray-100 px-2 py-1 rounded text-base">~/.co/keys.env</code></h3>
          <p className="text-gray-700 mb-4">
            Single source of truth for your address, email, and any third-party API keys. Loaded as environment variables.
          </p>
          <CodeWithResult
            code={`AGENT_CONFIG_PATH=/Users/you/.co
AGENT_ADDRESS=0x7a9f3b2c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a
AGENT_EMAIL=0x7a9f3b2c@mail.openonion.ai
IS_EMAIL_ACTIVE=true                # Becomes true after \`co auth\`
OPENONION_API_KEY=eyJhbGciOiJI...   # If authenticated
# Plus any third-party API keys you've added
# OPENAI_API_KEY=sk-proj-xxx
# ANTHROPIC_API_KEY=sk-ant-xxx`}
            language="bash"
          />

          <h3 className="text-xl font-semibold mb-4 mt-10">Project Config — <code className="bg-gray-100 px-2 py-1 rounded text-base">.co/host.yaml</code></h3>
          <p className="text-gray-700 mb-4">
            Tiny YAML file that tells the runtime which file to launch and where to read environment variables from.
          </p>
          <CodeWithResult
            code={`name: my-agent
entrypoint: agent.py
env: .env`}
            language="yaml"
          />

          <h3 className="text-xl font-semibold mb-4 mt-10">Project API Keys — <code className="bg-gray-100 px-2 py-1 rounded text-base">.env</code></h3>
          <p className="text-gray-700 mb-4">
            Auto-copied from <code className="bg-gray-100 px-2 py-1 rounded">~/.co/keys.env</code> at create time. Edit per-project as needed.
          </p>
          <CodeWithResult
            code={`# my-agent/.env
OPENAI_API_KEY=sk-proj-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
# Any other keys from global config`}
            language="bash"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700">
              <strong>Note:</strong> There is no global <code className="bg-gray-100 px-1 rounded">host.yaml</code>. Identity lives in <code className="bg-gray-100 px-1 rounded">~/.co/keys.env</code> as environment variables. The only YAML is per-project, at <code className="bg-gray-100 px-1 rounded">.co/host.yaml</code>.
            </p>
          </div>
        </section>

        {/* API Key Management */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineKey className="w-8 h-8 text-gray-700" />
            API Key Handling
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            <code className="bg-gray-100 px-2 py-1 rounded">co create</code> resolves API keys in this order:
          </p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Priority</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Source</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">When used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">1</td>
                  <td className="px-4 py-3 font-mono text-gray-700">--key &lt;value&gt;</td>
                  <td className="px-4 py-3 text-gray-700">Explicit override on the command line</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">2</td>
                  <td className="px-4 py-3 font-mono text-gray-700">~/.co/keys.env</td>
                  <td className="px-4 py-3 text-gray-700">Reused from previous projects</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">3</td>
                  <td className="px-4 py-3 font-mono text-gray-700">interactive prompt</td>
                  <td className="px-4 py-3 text-gray-700">Pasted at the prompt and saved globally</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">4</td>
                  <td className="px-4 py-3 font-mono text-gray-700">skip</td>
                  <td className="px-4 py-3 text-gray-700">Add to <code className="bg-gray-100 px-1 rounded">.env</code> later</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-4">Auto-Detection</h3>
          <p className="text-gray-700 mb-4">
            Pasted keys are recognized by prefix — no need to specify the provider:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-500">sk-proj-...</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">OpenAI</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">sk-ant-...</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">Anthropic</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">AIza...</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">Google</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">gsk_...</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">Groq</span>
              </div>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
            Templates
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">minimal</h3>
              <p className="text-gray-500 text-sm">Basic agent with simple tools — the smallest runnable starting point.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">web-research</h3>
              <p className="text-gray-500 text-sm">Web scraping + research tools, ready to crawl and summarize.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">playwright</h3>
              <p className="text-gray-500 text-sm">Browser automation with Playwright wired into the agent.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">custom</h3>
              <p className="text-gray-500 text-sm">AI generates the agent based on a free-form description.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Selecting a Template</h3>
          <CodeWithResult
            code={`# Interactive selection
co create

# Direct specification
co create my-bot --template minimal

# Custom with description
co create assistant --template custom --description "Slack integration bot"`}
            language="bash"
          />
        </section>

        {/* Command Options */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Command Reference
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <code className="text-lg text-gray-700">co create [name] [options]</code>
          </div>

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
                  <td className="px-4 py-3 font-mono text-gray-700">[name]</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-700">Project name (positional, prompts if omitted)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--template</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-t</td>
                  <td className="px-4 py-3 text-gray-700">Template: minimal / web-research / playwright / custom</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--description</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-d</td>
                  <td className="px-4 py-3 text-gray-700">Description used by the <code className="bg-gray-100 px-1 rounded">custom</code> template</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--no-ai</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-700">Disable AI features (not recommended)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--key</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-700">API key to use (overrides global)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">--yes</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-y</td>
                  <td className="px-4 py-3 text-gray-700">Accept all defaults non-interactively</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineRocketLaunch className="w-8 h-8 text-gray-700" />
            Examples
          </h2>

          <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
          <CommandBlock
            commands={[
              '# Simplest form — uses global identity, prompts for name and template',
              'co create',
              '',
              '# With name',
              'co create my-bot',
              '',
              '# With name + template',
              'co create my-bot --template web-research',
              '',
              '# Accept all defaults',
              'co create quickbot -y'
            ]}
          />

          <h3 className="text-xl font-semibold mb-4 mt-10">Custom Template</h3>
          <CodeWithResult
            code={`# Interactive
co create --template custom

# With description
co create slack-bot -t custom -d "Slack bot for answering questions"`}
            language="bash"
          />

          <h3 className="text-xl font-semibold mb-4 mt-10">Override the API Key</h3>
          <CodeWithResult
            code={`# Use a specific key for this project only — global config is unchanged
co create scratch-bot --key sk-proj-xxx`}
            language="bash"
          />
        </section>

        {/* Identity Flow */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineUserCircle className="w-8 h-8 text-gray-700" />
            Identity Flow
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-gray-700 font-semibold">1.</span>
                <span><strong>First <code className="bg-gray-100 px-1 rounded">co create</code></strong> generates your global address/email and writes them to <code className="bg-gray-100 px-1 rounded">~/.co/keys.env</code>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700 font-semibold">2.</span>
                <span><strong>Every project after</strong> reuses the same address/email — one identity for all your agents.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700 font-semibold">3.</span>
                <span><strong>API keys</strong> are copied from global <code className="bg-gray-100 px-1 rounded">keys.env</code> into each project's <code className="bg-gray-100 px-1 rounded">.env</code>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700 font-semibold">4.</span>
                <span><strong>Run <code className="bg-gray-100 px-1 rounded">co status</code></strong> any time to see your current address and email.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Troubleshooting
          </h2>

          <h3 className="text-xl font-semibold mb-4">Check Your Address</h3>
          <CommandBlock commands={['co status']} />

          <h3 className="text-xl font-semibold mb-4 mt-10">Permission Errors</h3>
          <CommandBlock
            commands={[
              '# Fix global permissions',
              'chmod 700 ~/.co',
              'chmod 600 ~/.co/keys.env',
              '',
              '# Fix project permissions',
              'chmod 700 my-agent/.co'
            ]}
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
