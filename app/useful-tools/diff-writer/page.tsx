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

          <h3 className="text-lg font-semibold text-gray-900 mb-3">write(path, content)</h3>
          <p className="text-gray-700 mb-4">Write content to a file with diff display and user approval.</p>
          <CodeWithResult
            code={`result = writer.write("hello.py", "print('hello')")
# Shows colorized diff
# Asks user to choose: 1=Yes, 2=Yes to all, 3=No + feedback
# Returns: "Wrote 15 bytes to hello.py" or feedback message`}
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
          <p className="text-gray-700 mb-4">When a file change is proposed, user sees:</p>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm mb-4">
            <div className="text-slate-400">╭─── Changes to hello.py ────────────────────────╮</div>
            <div className="text-slate-300">│ --- a/hello.py                                 │</div>
            <div className="text-slate-300">│ +++ b/hello.py                                 │</div>
            <div className="text-slate-300">│ @@ -1,2 +1,3 @@                                │</div>
            <div className="text-slate-300">│  def hello():                                  │</div>
            <div className="text-red-400">│ -    pass                                      │</div>
            <div className="text-green-400">│ +    print("Hello!")                           │</div>
            <div className="text-slate-400">╰────────────────────────────────────────────────╯</div>
            <div className="mt-4 text-slate-300">
              Choose an option:<br/>
              &nbsp;&nbsp;1 - Yes, apply this change<br/>
              &nbsp;&nbsp;2 - Yes to all (auto-approve for this session)<br/>
              &nbsp;&nbsp;3 - No, and tell agent what to do instead<br/>
              <br/>
              Apply changes to hello.py? [1/2/3]:
            </div>
          </div>

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
                  <td className="px-4 py-3 font-mono text-gray-500">1</td>
                  <td className="px-4 py-3 text-gray-700">Apply this change, ask again for next change</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-500">2</td>
                  <td className="px-4 py-3 text-gray-700">Apply this and all future changes (session-wide)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-500">3</td>
                  <td className="px-4 py-3 text-gray-700">Reject + provide feedback for agent to try again</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Options */}
        <section className="mb-12">
          <h2 className="heading-2">Options</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">auto_approve</h3>
          <p className="text-gray-700 mb-4">Skip approval prompts (for automation).</p>
          <CodeWithResult
            code={`# Ask for approval (default)
writer = DiffWriter(auto_approve=False)

# Auto-approve all writes
writer = DiffWriter(auto_approve=True)`}
            language="python"
          />
        </section>

        {/* Use with Agent */}
        <section className="mb-12">
          <h2 className="heading-2">Use with Agent</h2>
          <CodeWithResult
            code={`from connectonion import Agent, DiffWriter

writer = DiffWriter()
agent = Agent("coder", tools=[writer])

agent.input("create a hello.py file with a hello world function")
# Agent calls writer.write()
# User sees diff and chooses 1, 2, or 3
# If 3: User provides feedback, agent receives it and tries again`}
            language="python"
          />
        </section>

        {/* Feedback Flow */}
        <section className="mb-12">
          <h2 className="heading-2">Feedback Flow</h2>
          <p className="text-gray-700 mb-4">When user chooses option 3 (reject):</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>User is prompted: "What should the agent do instead?"</li>
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
writer = DiffWriter()
agent = Agent("coder", tools=[writer])

# CI/CD automation - skip prompts
writer = DiffWriter(auto_approve=True)
agent = Agent("automation", tools=[writer])

# Preview changes only
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
