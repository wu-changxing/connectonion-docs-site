'use client'

import { useState } from 'react'
import { FileText, Check, Copy, Play, Eye, Terminal, FolderOpen, RotateCcw } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CommandBlock } from '../../components/CommandBlock'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'

const pageContent = `# Logging

Save agent activity to files with the \`log\` parameter.

## Quick Start

### Enable Logging
The simplest way to keep a record of your agent's activity.

\`\`\`python
agent = Agent("assistant", log=True)
\`\`\`

Saves to: \`.co/logs/assistant.log\`

### Logging Modes

| Mode | Code | File Location | Use Case |
|------|------|---------------|----------|
| Default | log=False | None | Testing, quick scripts |
| Standard | log=True | .co/logs/<name>.log | Production, audit trails |
| Custom | log="file.log" | ./file.log | Debugging, specific output |

## Log Format

Logs include timestamps, user input, LLM calls, tool executions, and results:

\`\`\`log
[2025-09-25 10:32:14.123] INPUT: Generate a Python function
[2025-09-25 10:32:14.127] LLM_REQUEST: model=gpt-4 messages=2
[2025-09-25 10:32:15.235] LLM_RESPONSE: duration=1.1s
[2025-09-25 10:32:15.238] TOOL_CALL: generate_code(language="python")
[2025-09-25 10:32:15.286] TOOL_RESULT: success (0.05s)
[2025-09-25 10:32:16.458] RESULT: Task completed
[2025-09-25 10:32:16.461] DURATION: 2.3s
\`\`\`

### What's Logged
* User input
* LLM requests with timing
* Tool calls and results
* Final responses
* Total execution time

### Benefits
* Audit trail for compliance
* Debug agent behavior
* Performance monitoring
* Error tracking

## View Logs

### Watch in real-time
\`tail -f assistant.log\`

### Search for errors
\`grep ERROR assistant.log\`

### See all tool calls
\`grep TOOL assistant.log\`

## Environment Variable

Set log file via environment variable:
\`CONNECTONION_LOG=debug.log python agent.py\`

Priority order: Environment variable → \`log\` parameter → default (no logging)

## Auto Rotation

Logs automatically rotate when they exceed 10MB:

\`\`\`bash
assistant.log           # Current
assistant_20250925.log  # Rotated
\`\`\`

### How It Works
1. Log file reaches 10MB
2. Renamed with date suffix
3. New log file created
4. Continues logging

### Why 10MB?
* Small enough to open quickly
* Large enough for daily use
* Prevents disk space issues

## Git Ignore

**Security Warning**: Log files often contain sensitive information like API keys, user data, or internal logic. Never commit them to version control.

Add to your \`.gitignore\`:

\`\`\`gitignore
*.log
.co/logs/
\`\`\`

## Default Location

When using \`log=True\`, logs are saved to:
\`.co/logs/{agent_name}.log\`

This provides automatic audit trails for all your agents in one organized location.

## Complete Example

Full logging setup with multiple agents:

\`\`\`python
from connectonion import Agent

# Development: detailed logging
dev_agent = Agent(
    "dev_assistant",
    log="dev.log",
    debug=True  # Console + file logging
)

# Production: file logging only
prod_agent = Agent(
    "prod_assistant",
    log=True,  # Logs to .co/logs/prod_assistant.log
    debug=False  # No console output
)

# Test: no logging
test_agent = Agent(
    "test_assistant"
    # No log parameter = no logging
)

# Using environment variable
import os
os.environ['CONNECTONION_LOG'] = 'all_agents.log'
env_agent = Agent("env_assistant")  # Uses all_agents.log
\`\`\`

### Best Practices
* Use \`log=True\` in production for audit trails
* Use custom log files for specific debugging
* Disable logging in tests to avoid clutter
* Add \`*.log\` to \`.gitignore\`
* Use environment variables for deployment flexibility

## Philosophy

Use \`log=True\` when you need persistent records.
That's it. Simple, automatic, and always there when you need it.
`

export default function LoggingPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language = 'python', id }: { code: string; language?: string; id: string }) => (
    <div className="relative group max-w-4xl mx-auto">
      <button
        onClick={() => handleCopyCode(code, id)}
        className="absolute right-2 top-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {copiedCode === id ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-slate-100" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={monokai}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.25rem',
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: '1.5',
          overflowX: 'auto'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="heading-1">Logging</h1>
                <p className="text-slate-100 mt-2">Save agent activity to files with the <code className="bg-gray-800 px-2 py-0.5 rounded text-sm">log</code> parameter.</p>
              </div>
            </div>
            <CopyMarkdownButton content={pageContent} filename="logging.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-6 h-6 text-purple-400" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-purple-500/20 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Enable Logging</h3>
                <p className="text-slate-100">The simplest way to keep a record of your agent's activity.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                <Check className="w-4 h-4" />
                <span>Recommended for Production</span>
              </div>
            </div>
            
            <CodeBlock
              code={`agent = Agent("assistant", log=True)`}
              id="hero-log-true"
            />
            
            <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span>Saves to: <code className="text-purple-400">.co/logs/assistant.log</code></span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-6 text-slate-100">Logging Modes</h3>
          <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800/50">
                  <th className="p-4 font-medium text-slate-100">Mode</th>
                  <th className="p-4 font-medium text-slate-100">Code</th>
                  <th className="p-4 font-medium text-slate-100">File Location</th>
                  <th className="p-4 font-medium text-slate-100">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 text-white font-medium">Default</td>
                  <td className="p-4 font-mono text-gray-400">log=False</td>
                  <td className="p-4 text-gray-500 italic">None</td>
                  <td className="p-4 text-gray-400">Testing, quick scripts</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition-colors bg-purple-500/5">
                  <td className="p-4 text-purple-300 font-medium">Standard</td>
                  <td className="p-4 font-mono text-purple-300">log=True</td>
                  <td className="p-4 font-mono text-gray-400">.co/logs/&lt;name&gt;.log</td>
                  <td className="p-4 text-slate-100">Production, audit trails</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 text-white font-medium">Custom</td>
                  <td className="p-4 font-mono text-gray-400">log="file.log"</td>
                  <td className="p-4 font-mono text-gray-400">./file.log</td>
                  <td className="p-4 text-gray-400">Debugging, specific output</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Log Format */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-purple-400" />
            <h2 className="heading-2">Log Format</h2>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6 mb-6">
            <p className="text-slate-100 mb-4">Logs include timestamps, user input, LLM calls, tool executions, and results:</p>
            <CodeBlock
              code={`[2025-09-25 10:32:14.123] INPUT: Generate a Python function
[2025-09-25 10:32:14.127] LLM_REQUEST: model=gpt-4 messages=2
[2025-09-25 10:32:15.235] LLM_RESPONSE: duration=1.1s
[2025-09-25 10:32:15.238] TOOL_CALL: generate_code(language="python")
[2025-09-25 10:32:15.286] TOOL_RESULT: success (0.05s)
[2025-09-25 10:32:16.458] RESULT: Task completed
[2025-09-25 10:32:16.461] DURATION: 2.3s`}
              language="log"
              id="log-format"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">What's Logged</h3>
              <ul className="space-y-2 text-sm text-slate-100">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>User input</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>LLM requests with timing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Tool calls and results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Final responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Total execution time</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Benefits</h3>
              <ul className="space-y-2 text-sm text-slate-100">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Audit trail for compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Debug agent behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Performance monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Error tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* View Logs */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Eye className="w-6 h-6 text-purple-400" />
            <h2 className="heading-2">View Logs</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-100">Watch in real-time</h3>
              <CommandBlock commands={['tail -f assistant.log']} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-100">Search for errors</h3>
              <CommandBlock commands={['grep ERROR assistant.log']} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-100">See all tool calls</h3>
              <CommandBlock commands={['grep TOOL assistant.log']} />
            </div>
          </div>
        </section>

        {/* Environment Variable */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-purple-400" />
            <h2 className="heading-2">Environment Variable</h2>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6 mb-6">
            <p className="text-slate-100 mb-4">Set log file via environment variable:</p>
            <CommandBlock commands={['CONNECTONION_LOG=debug.log python agent.py']} />
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <p className="text-sm text-slate-100">
              <span className="text-purple-300 font-semibold">Priority order:</span> Environment variable → <code className="bg-gray-800 px-2 py-0.5 rounded">log</code> parameter → default (no logging)
            </p>
          </div>
        </section>

        {/* Auto Rotation */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <RotateCcw className="w-6 h-6 text-purple-400" />
            <h2 className="heading-2">Auto Rotation</h2>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6 mb-6">
            <p className="text-slate-100 mb-4">Logs automatically rotate when they exceed 10MB:</p>
            <CodeBlock
              code={`assistant.log           # Current
assistant_20250925.log  # Rotated`}
              language="bash"
              id="rotation"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">How It Works</h3>
              <ul className="space-y-2 text-sm text-slate-100">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">1.</span>
                  <span>Log file reaches 10MB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">2.</span>
                  <span>Renamed with date suffix</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">3.</span>
                  <span>New log file created</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">4.</span>
                  <span>Continues logging</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Why 10MB?</h3>
              <ul className="space-y-2 text-sm text-slate-100">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Small enough to open quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Large enough for daily use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Prevents disk space issues</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Git Ignore */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FolderOpen className="w-6 h-6 text-purple-400" />
            <h2 className="heading-2">Git Ignore</h2>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg shrink-0">
                <Eye className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="space-y-4 w-full">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-200 mb-1">Security Warning</h3>
                  <p className="text-yellow-200/80 text-sm">
                    Log files often contain sensitive information like API keys, user data, or internal logic. 
                    Never commit them to version control.
                  </p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/10">
                  <p className="text-sm text-gray-400 mb-2">Add to your <code className="text-yellow-200">.gitignore</code>:</p>
                  <CodeBlock
                    code={`*.log
.co/logs/`}
                    language="gitignore"
                    id="gitignore"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Default Location */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-10 border border-purple-500/20">
            <h2 className="heading-2">Default Location</h2>
            <p className="text-slate-100 mb-6">
              When using <code className="bg-gray-800 px-3 py-1.5 rounded text-purple-400">log=True</code>, logs are saved to:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-purple-400 text-center mb-6">
              .co/logs/{'{'}'agent_name'{'}'}.log
            </div>
            <p className="text-slate-100">
              This provides automatic audit trails for all your agents in one organized location.
            </p>
          </div>
        </section>

        {/* Complete Example */}
        <section className="mb-16">
          <h2 className="heading-2">Complete Example</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-slate-100 text-lg">Full logging setup with multiple agents:</p>

            <CodeBlock
              code={`from connectonion import Agent

# Development: detailed logging
dev_agent = Agent(
    "dev_assistant",
    log="dev.log",
    debug=True  # Console + file logging
)

# Production: file logging only
prod_agent = Agent(
    "prod_assistant",
    log=True,  # Logs to .co/logs/prod_assistant.log
    debug=False  # No console output
)

# Test: no logging
test_agent = Agent(
    "test_assistant"
    # No log parameter = no logging
)

# Using environment variable
import os
os.environ['CONNECTONION_LOG'] = 'all_agents.log'
env_agent = Agent("env_assistant")  # Uses all_agents.log`}
              id="complete-example"
            />

            <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Best Practices</h3>
              <ul className="space-y-2 text-sm text-slate-100">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Use <code className="bg-gray-800 px-2 py-0.5 rounded">log=True</code> in production for audit trails</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Use custom log files for specific debugging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Disable logging in tests to avoid clutter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Add <code className="bg-gray-800 px-2 py-0.5 rounded">*.log</code> to <code className="bg-gray-800 px-2 py-0.5 rounded">.gitignore</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Use environment variables for deployment flexibility</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-10 border border-purple-500/20">
            <h2 className="heading-2">Philosophy</h2>
            <p className="text-xl font-semibold text-purple-300 mb-6">
              Use <code className="bg-gray-800 px-3 py-1.5 rounded text-purple-400">log=True</code> when you need persistent records.
            </p>
            <p className="text-slate-100">
              That's it. Simple, automatic, and always there when you need it.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
