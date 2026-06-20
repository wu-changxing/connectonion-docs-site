/**
 * @purpose CLI browser command documentation
 * @context Shows how to use `co browser` — direct function dispatch + the `do` agent, over one persistent browser session
 */

'use client'

import { HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineCodeBracket, HiOutlineComputerDesktop, HiOutlineCommandLine, HiOutlineCpuChip } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliBrowserCommandPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co browser' }
            ]}
            icon={HiOutlineGlobeAlt}
            iconColor="icon-ui"
            title="co browser"
            description="Drive one real browser from the shell — call browser functions directly, or hand a task to the AI agent. The browser stays open between commands."
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> <code className="bg-gray-100 px-2 py-1 rounded">co browser go_to news.ycombinator.com</code> opens a browser. The next command drives the same window.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Quick Start (60 seconds)
          </h2>

          <CodeWithResult
            code={`co browser go_to news.ycombinator.com    # opens a browser, navigates
co browser get_current_url               # → https://news.ycombinator.com/
co browser take_screenshot /tmp/shot.png # saves a PNG
co browser close                         # done`}
            result={`Navigated to https://news.ycombinator.com/
https://news.ycombinator.com/
Browser closed`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            The browser stays open <strong>between commands</strong>. Each <code className="bg-gray-100 px-2 py-1 rounded">co browser ...</code> call drives the <em>same</em> window — your navigation, cookies, and logged-in session persist until you <code className="bg-gray-100 px-2 py-1 rounded">close</code>.
          </p>
        </section>

        {/* Two ways */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-gray-700" />
            Two Ways to Drive It
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Direct function call</h3>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">co browser go_to x.com</code>
              <p className="text-gray-600 text-sm mt-3">Deterministic, instant, free (no LLM). For scripting and exact steps you already know.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Natural language</h3>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">co browser do "find the cheapest flight"</code>
              <p className="text-gray-600 text-sm mt-3">The AI agent figures out the steps. For when you don&apos;t want to spell them out.</p>
            </div>
          </div>

          <p className="text-gray-700 mb-4">Both drive the <strong>same live browser</strong>, so you can mix them — script the boring parts, let the agent handle the hard part:</p>

          <CodeWithResult
            code={`co browser go_to myapp.com/login
co browser do "log me in and open the billing page"   # agent takes over the same window
co browser take_screenshot /tmp/billing.png           # back to a direct call`}
            language="bash"
          />
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            How It Works
          </h2>

          <p className="text-gray-700 mb-6">
            The first <code className="bg-gray-100 px-2 py-1 rounded">co browser</code> command starts a small background <strong>daemon</strong> that owns one browser. Every later command connects to it over a local socket and drives that same browser. The daemon lives exactly as long as the browser:
          </p>

          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm leading-relaxed">{`co browser go_to x.com   ──► starts daemon ──► opens browser ─┐
co browser click "Login" ──────────────────► same browser    │  state persists
co browser screenshot    ──────────────────► same browser    │
co browser close         ──► browser closes ──► daemon exits ─┘`}</pre>
          </div>

          <p className="text-gray-700 mb-6">
            You never manage the daemon directly — the <strong>first command starts it</strong>, and <code className="bg-gray-100 px-2 py-1 rounded">close</code> (or closing the window) stops it. There is no separate &quot;start&quot; step.
          </p>

          <h3 className="text-xl font-semibold mb-4">How a command is dispatched</h3>
          <p className="text-gray-700 mb-4">The first word is compared against the browser&apos;s function names:</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">You type</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">What happens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">co browser go_to x.com</td>
                  <td className="px-4 py-3 text-gray-600"><code className="bg-gray-100 px-1 rounded">go_to</code> <strong>is</strong> a function → runs it directly</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">co browser do &quot;...&quot;</td>
                  <td className="px-4 py-3 text-gray-600"><code className="bg-gray-100 px-1 rounded">do</code> → hands the instruction to the AI agent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">co browser frobnicate</td>
                  <td className="px-4 py-3 text-gray-600">matches nothing → <code className="bg-gray-100 px-1 rounded">unknown command</code> (exit 1)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 text-sm mt-4">
            Quote natural-language instructions: <code className="bg-gray-100 px-2 py-1 rounded">co browser do &quot;click the blue button&quot;</code>. A bare word that happens to be a function name (like <code className="bg-gray-100 px-1 rounded">click</code>) is treated as a direct call, not language.
          </p>
        </section>

        {/* Discovering functions */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Discovering Functions
          </h2>

          <p className="text-gray-700 mb-6">
            The CLI describes itself — run <code className="bg-gray-100 px-2 py-1 rounded">help</code> to list every callable function with its arguments and a one-line summary (no browser is launched). This is the fastest way, for a person or an AI agent, to find the exact function name and arguments before calling it.
          </p>

          <CodeWithResult
            code={`co browser help`}
            result={`Functions:
  go_to(url) — Navigate to a URL.
  take_screenshot(path=None, full_page=False) — Take a screenshot of the current page...
  click(description) — Click on an element using natural language description.
  get_links_from_page(domain_filter='') — Extract all unique links from the current page...
  ...`}
            language="bash"
          />
        </section>

        {/* Common functions */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Common Functions
          </h2>

          <p className="text-gray-700 mb-4">Any function listed by <code className="bg-gray-100 px-2 py-1 rounded">co browser help</code> is callable. The ones you&apos;ll reach for most:</p>

          <CodeWithResult
            code={`co browser go_to <url>                     # navigate
co browser get_current_url                 # print the current URL
co browser get_text                        # print visible page text
co browser take_screenshot /tmp/shot.png [--full-page]
co browser click "<description or selector>"
co browser type_text_by_selector <css> "<text>"
co browser get_links_from_page             # one link per line
co browser scroll                          # scroll the main content
co browser close                           # close browser, stop daemon`}
            language="bash"
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
            <p className="text-gray-700 text-sm">
              <strong>Use absolute paths for files.</strong> The daemon resolves relative paths against <em>its own</em> working directory (where it was first started), not the directory you run each command from. <code className="bg-gray-100 px-1 rounded">take_screenshot /tmp/shot.png</code> is predictable; a bare <code className="bg-gray-100 px-1 rounded">shot.png</code> lands in the daemon&apos;s <code className="bg-gray-100 px-1 rounded">.tmp/</code> folder.
            </p>
          </div>
        </section>

        {/* Scripting */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Scripting
          </h2>

          <p className="text-gray-700 mb-6">
            Output is clean stdout, errors go to stderr, and the exit code is <code className="bg-gray-100 px-2 py-1 rounded">0</code> on success / <code className="bg-gray-100 px-2 py-1 rounded">1</code> on failure — so commands compose like any Unix tool:
          </p>

          <CodeWithResult
            code={`# Capture a value
url=$(co browser get_current_url)

# Pipe list output (one item per line)
co browser get_links_from_page | grep github | wc -l

# Fail-fast in a script
co browser go_to "$DEPLOY_URL" && co browser take_screenshot /tmp/deployed.png`}
            language="bash"
          />
        </section>

        {/* Headless vs GUI */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineComputerDesktop className="w-8 h-8 text-gray-700" />
            Headless vs GUI
          </h2>

          <p className="text-gray-700 mb-6">
            By default the browser is <strong>visible</strong> (a real Chrome window you can watch). Add <code className="bg-gray-100 px-2 py-1 rounded">--headless</code> for scripts/CI:
          </p>

          <CodeWithResult
            code={`co browser --headless go_to example.com    # no window
co browser go_to example.com               # visible window (default)`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            The mode is fixed when the daemon starts (the first command). To switch modes, <code className="bg-gray-100 px-2 py-1 rounded">co browser close</code> first, then start again with the mode you want.
          </p>
        </section>

        {/* Natural language agent */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-gray-700" />
            Natural Language Agent
          </h2>

          <p className="text-gray-700 mb-6">
            <code className="bg-gray-100 px-2 py-1 rounded">do</code> runs the full AI browser agent on the live browser and prints its final answer:
          </p>

          <CodeWithResult
            code={`co browser do "search for wireless headphones and list the top 3 prices"`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            This path uses managed keys — run <code className="bg-gray-100 px-2 py-1 rounded">co auth</code> once if you see an authentication message.
          </p>
        </section>

        {/* Installation */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Installation
          </h2>

          <p className="text-gray-700 mb-6">The browser needs Playwright:</p>

          <CodeWithResult
            code={`pip install playwright
playwright install chromium`}
            language="bash"
          />
        </section>

        {/* Error Messages */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 icon-ui" />
            Error Messages
          </h2>

          <p className="text-gray-700 mb-6">
            Errors print to <strong>stderr</strong> and exit with code <code className="bg-gray-100 px-2 py-1 rounded">1</code>. Each one tells you the next step — handy when an AI agent is driving the CLI and needs to self-correct.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Unknown function</h3>
              <CodeWithResult
                code={`co browser frobnicate`}
                result={`unknown command: frobnicate
Run 'co browser help' to list functions, or 'co browser do "<instruction>"' for natural language.`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Wrong arguments</h3>
              <CodeWithResult
                code={`co browser go_to`}
                result={`TypeError: BrowserAutomation.go_to() missing 1 required positional argument: 'url'
usage: go_to(url)`}
                language="bash"
              />
              <p className="text-gray-600 text-sm mt-2">The <code className="bg-gray-100 px-1 rounded">usage:</code> line shows the exact signature — pass the missing argument.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Authentication required (only for <code className="bg-gray-100 px-1 rounded">do</code>)</h3>
              <CodeWithResult
                code={`co browser do "find the price"`}
                result={`Browser agent requires authentication. Run: co auth`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Playwright not installed</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-700">Browser tools not installed. Run: pip install playwright &amp;&amp; playwright install chromium</p>
              </div>
            </div>
          </div>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/cli/auth" className="text-gray-700 hover:underline">co auth</a> — managed keys for the <code className="bg-gray-100 px-1 rounded">do</code> agent</li>
              <li>• <a href="/useful-tools/browser-tools" className="text-gray-700 hover:underline">BrowserAutomation</a> — the browser tools used in your own agents</li>
              <li>• <a href="/tools/browser" className="text-gray-700 hover:underline">Browser agent</a> — full browser automation in code</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
