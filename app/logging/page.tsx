'use client'

import { useState } from 'react'
import { HiOutlineDocumentText, HiOutlineCheck, HiOutlineClipboard, HiOutlinePlay, HiOutlineEye, HiOutlineCommandLine, HiOutlineFolderOpen, HiOutlineCircleStack } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CommandBlock } from '../../components/CommandBlock'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function LoggingPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language = 'python', id, fileName }: { code: string; language?: string; id: string; fileName?: string }) => (
    <div className="group rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-mono text-gray-400">{fileName || (language === 'bash' ? '# shell' : language === 'yaml' ? 'yaml' : 'python')}</span>
        <button
          onClick={() => handleCopyCode(code, id)}
          className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors opacity-60 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copiedCode === id ? (
            <HiOutlineCheck className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <HiOutlineClipboard className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto bg-gray-900">
        <SyntaxHighlighter
          language={language}
          style={monokai}
          customStyle={{
            background: 'transparent',
            padding: '1rem 1.25rem',
            margin: 0,
            fontSize: '0.8125rem',
            lineHeight: '1.65',
            overflowX: 'visible'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )

  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Logging' }
          ]}
          icon={HiOutlineDocumentText}
          iconColor="icon-ui"
          title="Logging"
          description="Automatic activity logging for debugging and analysis."
          markdownPath="/debug/log.md"
          markdownFilename="logging.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Quick Start</h2>

          <div className="section-featured mb-12">
            <CodeBlock
              code={`# Default: logs to .co/logs/{name}.log + .co/sessions/{name}_{timestamp}.yaml
agent = Agent("assistant")

# Quiet mode: no console output, but sessions still recorded
agent = Agent("assistant", quiet=True)

# Disable all logging
agent = Agent("assistant", log=False)

# Custom log file path
agent = Agent("assistant", log="debug.log")`}
              id="quick-start"
            />
          </div>
        </section>

        {/* Logging Modes */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Logging Modes</h2>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 backdrop-blur mb-8">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100">
                  <th className="p-4 font-medium text-gray-700">quiet</th>
                  <th className="p-4 font-medium text-gray-700">log</th>
                  <th className="p-4 font-medium text-gray-700">Console</th>
                  <th className="p-4 font-medium text-gray-700">Plain Text</th>
                  <th className="p-4 font-medium text-gray-700">Sessions</th>
                  <th className="p-4 font-medium text-gray-700">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                  <td className="p-4 font-mono text-gray-700">False</td>
                  <td className="p-4 font-mono text-gray-700">True/None</td>
                  <td className="p-4 text-green-600">Yes</td>
                  <td className="p-4 text-green-600">Yes</td>
                  <td className="p-4 text-green-600">Yes</td>
                  <td className="p-4 text-gray-700 font-medium">Development (default)</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors">
                  <td className="p-4 font-mono text-gray-700">True</td>
                  <td className="p-4 font-mono text-gray-700">True/None</td>
                  <td className="p-4 text-gray-500">No</td>
                  <td className="p-4 text-gray-500">No</td>
                  <td className="p-4 text-green-600">Yes</td>
                  <td className="p-4 text-gray-700">Eval/testing</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors">
                  <td className="p-4 font-mono text-gray-700">False</td>
                  <td className="p-4 font-mono text-gray-700">False</td>
                  <td className="p-4 text-green-600">Yes</td>
                  <td className="p-4 text-gray-500">No</td>
                  <td className="p-4 text-gray-500">No</td>
                  <td className="p-4 text-gray-700">Benchmarking</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors">
                  <td className="p-4 font-mono text-gray-700">False</td>
                  <td className="p-4 font-mono text-gray-700">"path"</td>
                  <td className="p-4 text-green-600">Yes</td>
                  <td className="p-4 text-gray-700">custom</td>
                  <td className="p-4 text-green-600">Yes</td>
                  <td className="p-4 text-gray-700">Custom log path</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Log Locations */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Log Locations</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <CodeBlock
              code={`.co/
├── logs/
│   └── assistant.log        # Plain text logs
└── sessions/
    └── assistant_2024-12-02_10-30-00.yaml  # Session YAML`}
              language="bash"
              id="log-locations"
            />
          </div>
        </section>

        {/* Plain Text Format */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Plain Text Format (.co/logs/)</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <CodeBlock
              code={`============================================================
Session started: 2024-12-02 10:32:14
============================================================

[10:32:14] INPUT: Generate a Python function...
[10:32:14] -> LLM Request (co/o4-mini) • 2 msgs • 3 tools
[10:32:15] <- LLM Response (1.1s) • 1 tools • 1.2k tokens • $0.0012
[10:32:15] -> Tool: generate_code({"language": "python"})
[10:32:15] <- Result (0.05s): def hello(): print("Hi")...
[10:32:16] [OK] Complete (2.3s)`}
              language="log"
              id="plain-text-format"
            />
          </div>
        </section>

        {/* Session YAML Format */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Session YAML Format (.co/sessions/)</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-4">Sessions are saved as YAML for replay and eval:</p>
            <CodeBlock
              code={`name: assistant
timestamp: 2024-12-02 10:32:14

turns:
  - input: "Generate a Python function"
    model: "co/o4-mini"
    duration_ms: 2300
    tokens: 1234
    cost: 0.0012
    tools_called: [generate_code]
    result: "Here's a Python function..."
    messages: '[{"role":"system",...}]'`}
              language="yaml"
              id="session-yaml"
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Use Cases</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-500 font-bold">Session replay:</span>
                <span>Restore context from saved sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 font-bold">Regression testing:</span>
                <span>Compare expected vs actual results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 font-bold">Development comparison:</span>
                <span>See what changed after prompt edits</span>
              </li>
            </ul>
          </div>
        </section>

        {/* View Logs */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">View Logs</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Watch plain text logs in real-time</h3>
              <CommandBlock commands={['tail -f .co/logs/assistant.log']} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Search for errors</h3>
              <CommandBlock commands={['grep ERROR .co/logs/assistant.log']} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">See all tool calls</h3>
              <CommandBlock commands={['grep "Tool:" .co/logs/assistant.log']} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">List sessions</h3>
              <CommandBlock commands={['ls -la .co/sessions/']} />
            </div>
          </div>
        </section>

        {/* Environment Variable */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Environment Variable</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 mb-4">Override log file via environment (highest priority):</p>
            <CommandBlock commands={['CONNECTONION_LOG=debug.log python agent.py']} />
          </div>
        </section>

        {/* Git Ignore */}
        <section className="mb-16">
          <h2 className="heading-2 mb-6">Git Ignore</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <HiOutlineEye className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4 w-full">
                <div>
                  <p className="text-gray-700 text-sm mb-4">
                    Add to your <code className="text-gray-600">.gitignore</code>:
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <CodeBlock
                    code={`.co/logs/
.co/sessions/
*.log`}
                    language="gitignore"
                    id="gitignore"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parameters */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
            <h2 className="heading-2 mb-6">Parameters</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700">
                  <code className="text-gray-500 font-semibold">quiet</code> (bool): Suppress console output. Sessions still recorded. Default: <code className="text-gray-600">False</code>
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 mb-3">
                  <code className="text-gray-500 font-semibold">log</code> (bool|str|Path): Control file logging
                </p>
                <ul className="space-y-2 text-sm text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <code className="text-gray-600">None</code>/<code className="text-gray-600">True</code>:
                    <span>Default <code className="text-gray-600">.co/logs/{'{name}'}.log</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="text-gray-600">False</code>:
                    <span>Disable all logging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="text-gray-600">"path/to/file.log"</code>:
                    <span>Custom log path</span>
                  </li>
                </ul>
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
