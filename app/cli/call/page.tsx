/**
 * @purpose CLI call command documentation
 * @context Shows how to use `co call` — run one command on a remote agent from the shell, no LLM, no session
 */

'use client'

import { HiOutlineBolt, HiOutlineCommandLine, HiOutlineShieldCheck, HiOutlineCamera, HiOutlineCodeBracket } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliCallPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co call' }
            ]}
            icon={HiOutlineCommandLine}
            iconColor="icon-ui"
            title="co call"
            description="Run one command on a remote agent from the shell, print the result. No LLM, no session — like a remote command line."
            markdownPath="/cli/call.md"
            markdownFilename="call.md"
          />
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Quick Start
          </h2>
          <CommandBlock
            commands={[
              'co call 0x3d40... co status',
              'co call 0x3d40... co browser go_to https://example.com',
              'co call --out shot.png 0x3d40... co browser take_screenshot',
              'co call 0x3d40... uptime',
            ]}
          />
          <p className="text-gray-700 mt-4 text-sm">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">co call</code> is the <strong>remote twin of <code className="bg-gray-100 px-1.5 py-0.5 rounded">co browser</code></strong>: what <code className="bg-gray-100 px-1.5 py-0.5 rounded">co browser take_screenshot</code> does on this machine, <code className="bg-gray-100 px-1.5 py-0.5 rounded">co call &lt;address&gt; co browser take_screenshot</code> does on a remote agent — same verbs, one extra address up front.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            How It Works
          </h2>
          <CodeWithResult
            code={`co call <address> <command...>
        │           │
        │           └── runs on the REMOTE agent, verbatim
        └────────────── the agent's 0x address (or an announced alias)`}
            language="text"
          />
          <p className="text-gray-700 mt-4">
            The command is sent over the same authenticated WebSocket the Python <code className="bg-gray-100 px-1.5 py-0.5 rounded">connect()</code> client uses (direct or via relay), executed on the remote through its direct-exec path, and the raw output comes straight back. Under the hood this is:
          </p>
          <CodeWithResult
            code={`connect(address).call("bash", command="<command...>")`}
            language="python"
          />
        </section>

        {/* Whitelist */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-400" />
            Gated by the Remote's Whitelist
          </h2>
          <p className="text-gray-700 mb-4">
            The remote decides what may run: every <code className="bg-gray-100 px-1.5 py-0.5 rounded">co call</code> is checked against <strong>that agent's <code className="bg-gray-100 px-1.5 py-0.5 rounded">.co/host.yaml</code> <code className="bg-gray-100 px-1.5 py-0.5 rounded">permissions</code></strong> whitelist — the same list its own LLM uses to auto-run a command without asking. <code className="bg-gray-100 px-1.5 py-0.5 rounded">co ...</code> commands (including <code className="bg-gray-100 px-1.5 py-0.5 rounded">co browser &lt;verb&gt;</code>) are whitelisted by default; read-only shell commands too. Anything not on the list comes back as an error:
          </p>
          <CodeWithResult
            code={`$ co call 0x3d40... rm -rf /
blocked: command not in the permission whitelist. Allow it by adding a rule to .co/host.yaml permissions.
$ echo $?
1`}
            language="bash"
          />
          <p className="text-gray-700 mt-4 text-sm">
            To expose more, edit the whitelist <strong>on the remote</strong> (<code className="bg-gray-100 px-1.5 py-0.5 rounded">.co/host.yaml</code>), e.g. add <code className="bg-gray-100 px-1.5 py-0.5 rounded">&quot;Bash(git status)&quot;</code>.
          </p>
        </section>

        {/* Driving a remote browser */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCamera className="w-8 h-8 text-gray-500" />
            Driving a Remote Browser
          </h2>
          <p className="text-gray-700 mb-4">
            Browser control goes through <code className="bg-gray-100 px-1.5 py-0.5 rounded">co browser</code>, which on the remote talks to its persistent browser <strong>daemon</strong> (a separate process that manages tabs and lifecycle itself):
          </p>
          <CommandBlock
            commands={[
              'co call 0x3d40... co browser go_to https://news.ycombinator.com',
              'co call 0x3d40... co browser click "text=login"',
              'co call --out home.png 0x3d40... co browser take_screenshot',
            ]}
          />
          <p className="text-gray-700 mt-4 text-sm">
            A screenshot returns as base64; <code className="bg-gray-100 px-1.5 py-0.5 rounded">co call</code> detects an image result and saves it — to <code className="bg-gray-100 px-1.5 py-0.5 rounded">--out PATH</code> if given, else <code className="bg-gray-100 px-1.5 py-0.5 rounded">./screenshot.png</code> — then prints the path.
          </p>
        </section>

        {/* Options */}
        <section className="mb-20">
          <h2 className="heading-2">Options</h2>
          <p className="text-gray-700 mb-4">
            Options go <strong>before</strong> the address; everything after the address is the remote command, verbatim (so it keeps its own flags — <code className="bg-gray-100 px-1.5 py-0.5 rounded">co call 0x.. ls -la</code> works).
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-gray-700">Option</th>
                  <th className="px-4 py-3 text-gray-700">Default</th>
                  <th className="px-4 py-3 text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">--out PATH</td>
                  <td className="px-4 py-3 text-gray-500">./screenshot.png</td>
                  <td className="px-4 py-3 text-gray-700">Save an image result (screenshot) to PATH</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">--timeout SEC</td>
                  <td className="px-4 py-3 text-gray-500">60</td>
                  <td className="px-4 py-3 text-gray-700">Seconds to wait for the result</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">--relay URL</td>
                  <td className="px-4 py-3 text-gray-500">wss://oo.openonion.ai</td>
                  <td className="px-4 py-3 text-gray-700">Relay server</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Scripting */}
        <section className="mb-20">
          <h2 className="heading-2">Scripting</h2>
          <p className="text-gray-700 mb-4">Clean stdout, standard exit codes — safe to pipe and branch on:</p>
          <CommandBlock
            commands={[
              'status=$(co call 0x3d40... co status)',
              'co call 0x3d40... co browser get_links_from_page | grep github',
              'co call --out /tmp/s.png 0x3d40... co browser take_screenshot && open /tmp/s.png',
            ]}
          />
          <p className="text-gray-700 mt-4 text-sm">
            Exit codes: <code className="bg-gray-100 px-1.5 py-0.5 rounded">0</code> ok · <code className="bg-gray-100 px-1.5 py-0.5 rounded">1</code> failure (tool error / not whitelisted / connection) · <code className="bg-gray-100 px-1.5 py-0.5 rounded">2</code> usage.
          </p>
        </section>

        {/* Identity */}
        <section className="mb-20">
          <h2 className="heading-2">Identity</h2>
          <p className="text-gray-700">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">co call</code> signs the request with your local identity (<code className="bg-gray-100 px-1.5 py-0.5 rounded">.co</code> in the project, else <code className="bg-gray-100 px-1.5 py-0.5 rounded">~/.co</code>), which the remote needs if it runs at a strict trust level. For open / careful agents no keys are required — it works out of the box.
          </p>
        </section>

        {/* When to use */}
        <section className="mb-20">
          <h2 className="heading-2">When to Use</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>co call</strong> — you know the exact command and want the result now (scripting, an agent driving another agent, remote-control steps).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Python <code className="bg-gray-100 px-1.5 py-0.5 rounded">connect().input(prompt)</code></strong> — hand the remote agent an open-ended task and let its LLM decide the steps. See <a href="/connect" className="text-gray-700 hover:underline">Multi-Agent Networking</a>.</span>
            </li>
          </ul>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/connect" className="text-gray-700 hover:underline">connect() and remote.call()</a> — the Python API this CLI wraps</li>
              <li>• <a href="/tools/browser" className="text-gray-700 hover:underline">co browser</a> — the local browser CLI this mirrors</li>
              <li>• <a href="/host" className="text-gray-700 hover:underline">host()</a> — configure the whitelist that gates every call</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
