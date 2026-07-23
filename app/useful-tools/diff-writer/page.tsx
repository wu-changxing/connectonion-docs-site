'use client'

import { HiOutlineCodeBracket } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'
import Link from 'next/link'

export default function DiffWriterPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'Diff Writer' }
          ]}
          icon={HiOutlineCodeBracket}
          iconColor="icon-ui"
          title="DiffWriter"
          description="Human-in-the-loop file writing with diff display and approval."
          markdownPath="/useful-tools/diff_writer.md"
          markdownFilename="diff-writer.md"
        />

        {/* Installation */}
        <section className="mb-12">
          <h2 className="heading-2">Installation</h2>
          <CodeWithResult
            code={`from connectonion import DiffWriter

writer = DiffWriter()`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">co copy diff_writer</code></Link> to get an editable copy.
          </p>
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">write(agent, path, content)</h3>
          <p className="text-gray-700 mb-4">
            Write content to a file with diff display and user approval. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">agent</code> is injected automatically when this is used as an agent tool — the LLM never sees that parameter.
          </p>
          <CodeWithResult
            code={`result = writer.write(agent, "hello.py", "print('hello')")
# Sends a diff preview + approval prompt over agent.io (WebSocket)
# If no io channel is attached, auto-approves and writes immediately
# Returns: "Wrote 15 bytes to hello.py" or a rejection + feedback message`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-8">diff(path, content)</h3>
          <p className="text-gray-700 mb-4">Show diff without writing (preview mode).</p>
          <CodeWithResult
            code={`diff_text = writer.diff("hello.py", "print('hello')")
# Returns the diff string without writing`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-8">read(path)</h3>
          <p className="text-gray-700 mb-4">Read file contents.</p>
          <CodeWithResult
            code={`content = writer.read("hello.py")
# Returns: "print('hello')"`}
            language="python"
          />
        </section>

        {/* Approval Options */}
        <section className="mb-12">
          <h2 className="heading-2">Approval Options</h2>
          <p className="text-gray-700 mb-4">
            When a file change is proposed in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">mode="normal"</code>, DiffWriter sends a diff preview and an approval question over <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">agent.io</code> (a WebSocket channel) — there's no built-in terminal prompt. The frontend renders whatever UI it wants around these three options:
          </p>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-gray-700">Option</th>
                  <th className="px-4 py-3 text-gray-700">Effect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">"Yes, apply this change"</td>
                  <td className="px-4 py-3 text-gray-700">Apply this change, ask again for next change</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">"Yes to all (auto-approve)"</td>
                  <td className="px-4 py-3 text-gray-700">Apply this and switch to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">auto</code> mode for the rest of the session</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">"No, reject and give feedback"</td>
                  <td className="px-4 py-3 text-gray-700">Reject + provide feedback for agent to try again</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mt-4 text-sm">
            If no <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">io</code> channel is attached (e.g. running outside a hosted/web session), the write is auto-approved without prompting.
          </p>
        </section>

        {/* Options */}
        <section className="mb-12">
          <h2 className="heading-2">Modes</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">mode</h3>
          <p className="text-gray-700 mb-4">Three permission modes, like Claude Code's Shift+Tab cycle.</p>
          <CodeWithResult
            code={`# Prompt for every edit (default)
writer = DiffWriter(mode="normal")

# Auto-approve all writes, no prompting
writer = DiffWriter(mode="auto")

# Read-only: preview what would happen, never write
writer = DiffWriter(mode="plan")

# Also configurable: preview_limit (max chars in diff preview, default 2000)
writer = DiffWriter(mode="normal", preview_limit=5000)`}
            language="python"
          />
        </section>

        {/* Use with Agent */}
        <section className="mb-12">
          <h2 className="heading-2">Use with Agent</h2>
          <CodeWithResult
            code={`from connectonion import Agent, DiffWriter

writer = DiffWriter()  # mode="normal" by default
agent = Agent("coder", tools=[writer])

agent.input("create a hello.py file with a hello world function")
# Agent calls write(agent, path, content) — the tool executor injects "agent"
# User sees a diff preview and approves, auto-approves, or rejects with feedback`}
            language="python"
          />
        </section>

        {/* Feedback Flow */}
        <section className="mb-12">
          <h2 className="heading-2">Feedback Flow</h2>
          <p className="text-gray-700 mb-4">When the user rejects a change:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>User is asked: "What should the agent do instead for hello.py?"</li>
            <li>User types feedback, e.g., "use snake_case for function names"</li>
            <li>Agent receives: <code className="bg-gray-100 px-2 py-1 rounded text-gray-500">"User rejected changes to hello.py. Feedback: use snake_case for function names"</code></li>
            <li>Agent can retry with the feedback</li>
          </ol>
        </section>

        {/* Common Use Cases */}
        <section className="mb-12">
          <h2 className="heading-2">Common Use Cases</h2>
          <CodeWithResult
            code={`# Interactive coding with approval
writer = DiffWriter(mode="normal")
agent = Agent("coder", tools=[writer])

# CI/CD automation - skip prompts
writer = DiffWriter(mode="auto")
agent = Agent("automation", tools=[writer])

# Preview changes only, no writes
diff = writer.diff("config.py", new_config)
print(diff)`}
            language="python"
          />
        </section>

        {/* Customizing */}
        <section className="mb-12">
          <h2 className="heading-2">Customizing</h2>
          <p className="text-gray-700 mb-4">Need to modify DiffWriter's behavior? Copy the source to your project:</p>
          <CodeWithResult
            code={`co copy diff_writer`}
            language="bash"
          />
          <p className="text-gray-700 mt-4 mb-4">Then import from your local copy:</p>
          <CodeWithResult
            code={`# from connectonion import DiffWriter  # Before
from tools.diff_writer import DiffWriter  # After - customize freely!`}
            language="python"
          />
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
