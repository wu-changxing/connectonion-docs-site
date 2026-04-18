/**
 * @purpose CLI AI command documentation
 * @context Shows how to use `co ai` for coding agent — web server mode and one-shot mode
 */

'use client'

import { HiOutlineCommandLine, HiOutlineSparkles, HiOutlineCodeBracket, HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineFolder } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliAiPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co ai' }
            ]}
            icon={HiOutlineSparkles}
            iconColor="icon-ui"
            title="co ai"
            description="AI coding agent that works in your project. Start a web chat session or run one-shot prompts — with full access to your files, shell, and tools."
            markdownPath="/cli/ai.md"
            markdownFilename="ai.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> Run <code className="bg-gray-100 px-2 py-1 rounded">co ai</code> in your project — it opens a web chat connected to a coding agent that can read and edit your files.
            </p>
          </div>
        </section>

        {/* Two Modes */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Two Modes
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Web Chat (default)</h3>
              <code className="text-sm text-gray-600">co ai</code>
              <p className="text-gray-500 text-sm mt-2">Starts a local agent server, opens <code className="text-gray-600">chat.openonion.ai</code> in your browser. Chat conversationally — best for extended sessions.</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-700 mb-2">One-Shot</h3>
              <code className="text-sm text-gray-600">co ai "your prompt"</code>
              <p className="text-gray-500 text-sm mt-2">Runs the prompt, prints the result, exits. Best for quick tasks and scripting.</p>
            </div>
          </div>
        </section>

        {/* Web Chat Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineGlobeAlt className="w-8 h-8 text-gray-700" />
            Web Chat Mode
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Run <code className="bg-gray-100 px-2 py-1 rounded">co ai</code> in your project directory:
          </p>

          <CodeWithResult
            code={`co ai`}
            result={`Starting AI coding agent...
Server running at http://localhost:8000
Opening chat.openonion.ai/0x7a9f3b2c...`}
            language="bash"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-gray-700">1.</span>
                <span>Agent server starts on <code className="bg-gray-100 px-1 rounded">localhost:8000</code></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">2.</span>
                <span>Your browser opens <code className="bg-gray-100 px-1 rounded">chat.openonion.ai/{'{your-address}'}</code></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">3.</span>
                <span>The agent runs in your project directory with full tool access</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">4.</span>
                <span>Your identity comes from <code className="bg-gray-100 px-1 rounded">~/.co/</code> — same across all sessions</span>
              </div>
            </div>
          </div>
        </section>

        {/* One-Shot Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            One-Shot Mode
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Pass a prompt directly — the agent runs, prints the result, and exits:
          </p>

          <CodeWithResult
            code={`co ai "Create a FastAPI hello world app"`}
            result={`[agent] Creating FastAPI hello world app...
[agent] Writing main.py...

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello World"}

Done! Run with: uvicorn main:app --reload`}
            language="bash"
          />

          <div className="mt-8 space-y-3">
            <CodeWithResult
              code={`# Fix a bug
co ai "fix the failing test in tests/unit/test_agent.py"

# Add a feature
co ai "add rate limiting to the /api endpoint"

# Refactor
co ai "refactor agent.py to use the new event system"

# Write tests
co ai "write pytest tests for models/user.py"`}
              language="bash"
            />
          </div>
        </section>

        {/* Project Context */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineFolder className="w-8 h-8 text-gray-700" />
            Project Context
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            When started, the agent automatically loads context from your project — no setup required:
          </p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Source</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">.co/OO.md</td>
                  <td className="px-4 py-3 text-gray-700">Project instructions (primary)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">CLAUDE.md</td>
                  <td className="px-4 py-3 text-gray-700">Claude Code compatibility</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">README.md</td>
                  <td className="px-4 py-3 text-gray-700">Project overview</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">~/.claude/skills/</td>
                  <td className="px-4 py-3 text-gray-700">User-defined skills</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">git status</td>
                  <td className="px-4 py-3 text-gray-700">Current branch, changes, recent commits</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 mb-4">
            Give the agent persistent project rules with <code className="bg-gray-100 px-2 py-1 rounded">.co/OO.md</code>:
          </p>

          <CodeWithResult
            code={`mkdir -p .co
cat > .co/OO.md << 'EOF'
Always run tests before committing.
Use snake_case for function names.
The main entry point is src/main.py.
EOF`}
            language="bash"
          />
          <p className="text-gray-500 mt-3 text-sm">
            Loaded every session — the agent always follows your rules without being told.
          </p>
        </section>

        {/* Available Tools */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Available Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">File Operations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Read, write, edit files</li>
                <li>• Search with glob and grep</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Shell</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Run bash commands</li>
                <li>• Approval flow for destructive ops</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Planning</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Enter plan mode, write plans</li>
                <li>• Exit plan and implement</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-500 mb-2">Tasks & Skills</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Background tasks, todo lists</li>
                <li>• Load and run user-defined skills</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Options */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-indigo-400" />
            Command Reference
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Option</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Short</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Default</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--port</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-p</td>
                  <td className="px-4 py-3 text-gray-600">8000</td>
                  <td className="px-4 py-3 text-gray-700">Web server port</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--model</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-m</td>
                  <td className="px-4 py-3 text-gray-600">co/claude-opus-4-5</td>
                  <td className="px-4 py-3 text-gray-700">LLM model to use</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--max-iterations</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-i</td>
                  <td className="px-4 py-3 text-gray-600">100</td>
                  <td className="px-4 py-3 text-gray-700">Max tool iterations per turn</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <CodeWithResult
              code={`# Different port
co ai --port 9000

# Faster model
co ai --model co/gemini-2.5-pro

# One-shot with options
co ai "build a microservice" --model co/gpt-4o --max-iterations 50`}
              language="bash"
            />
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
