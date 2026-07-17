/**
 * @purpose CLI browser command documentation
 * @context Shows how to use `co browser` — one persistent logged-in browser, direct functions + the `do` agent, multi-agent tab sharing with contention guards
 */

'use client'

import { HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineCodeBracket, HiOutlineComputerDesktop, HiOutlineCommandLine, HiOutlineCpuChip, HiOutlineUserGroup, HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
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
            description="Drive one persistent, logged-in browser from the shell — and let several AI agents share it without stepping on each other's pages."
            markdownPath="/co-browser.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> <code className="bg-gray-100 px-2 py-1 rounded">co browser go_to news.ycombinator.com</code> opens a real browser. The next command drives the same window — logins persist.
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
            code={`co browser go_to https://news.ycombinator.com   # opens a real browser, navigates
co browser get_text                              # dumps the page text
co browser do "click the top story and summarize it"   # let the AI agent do it
co browser close                                 # shut the browser down`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            The browser stays open <strong>between commands</strong> — one shared session — so cookies and logins persist from one command to the next until you <code className="bg-gray-100 px-2 py-1 rounded">close</code>. The first run opens a window you can log into once; every later run reuses that session.
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
              <h3 className="text-lg font-semibold mb-2">Direct functions</h3>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">co browser go_to x.com</code>
              <p className="text-gray-600 text-sm mt-3">Deterministic, instant, free (no LLM): <code className="bg-gray-100 px-1 rounded">go_to</code>, <code className="bg-gray-100 px-1 rounded">get_text</code>, <code className="bg-gray-100 px-1 rounded">click_element_by_selector</code>, <code className="bg-gray-100 px-1 rounded">take_screenshot</code>, … Run <code className="bg-gray-100 px-1 rounded">co browser help</code> for the full list.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Natural language</h3>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">co browser do &quot;find the cheapest flight&quot;</code>
              <p className="text-gray-600 text-sm mt-3">An AI agent operates the same live browser and figures out the steps itself.</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            Output contract: <strong>stdout = data, stderr = errors.</strong> Exit code is <code className="bg-gray-100 px-1 rounded">0</code> on success.
          </p>
        </section>

        {/* Why */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Why Use This
          </h2>

          <p className="text-gray-700 mb-4">
            An automation script that spins up a fresh headless browser every run throws away your logins and pays the launch cost each time. <code className="bg-gray-100 px-2 py-1 rounded">co browser</code> keeps <strong>one real browser alive</strong> behind a small daemon, so:
          </p>

          <ul className="space-y-2 text-gray-700 list-disc pl-6">
            <li>You log into a site <strong>once</strong>; subsequent commands are already authenticated.</li>
            <li>A shell script (or an AI agent) can issue many quick commands against the same page.</li>
            <li>Multiple agents can work in the same browser at the same time — each in its own tab.</li>
          </ul>
        </section>

        {/* One task = one tab */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            One Task = One Tab
          </h2>

          <p className="text-gray-700 mb-4">
            The browser has <strong>tabs</strong>, and the rule is simple: <strong>one task uses one tab.</strong> Solo use needs no ceremony at all — bare commands run on the shared <code className="bg-gray-100 px-2 py-1 rounded">main</code> tab:
          </p>

          <CodeWithResult
            code={`co browser go_to example.com     # runs on 'main'
co browser get_text              # still 'main'`}
            language="bash"
          />

          <p className="text-gray-700 my-4">
            Running a distinct task (or a second agent)? Give it its own tab:
          </p>

          <CodeWithResult
            code={`NAME=$(co browser tab open --who alice --for "scrape pricing")   # prints the tab name
co browser -t "$NAME" go_to https://example.com/pricing          # -t targets that tab
co browser -t "$NAME" do "extract every plan and its monthly price"
co browser tab close "$NAME"                                     # release it when done`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            <code className="bg-gray-100 px-2 py-1 rounded">-t &lt;tab&gt;</code> uses the exact same grammar for direct functions <strong>and</strong> <code className="bg-gray-100 px-1 rounded">do</code>. A bare command (no <code className="bg-gray-100 px-1 rounded">-t</code>) always means the <code className="bg-gray-100 px-1 rounded">main</code> tab.
          </p>
        </section>

        {/* Multi-agent contention */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineUserGroup className="w-8 h-8 text-gray-700" />
            Several Agents, One Browser
          </h2>

          <p className="text-gray-700 mb-6">
            When two agents share the browser, the daemon makes sure they never silently drive the <strong>same page</strong>. If a second agent runs a bare command while another is mid-task on <code className="bg-gray-100 px-1 rounded">main</code>, it fails loudly and is told exactly what to do instead:
          </p>

          <CodeWithResult
            code={`co browser go_to other.com`}
            result={`tab 'main' is in use by alice — last: "go_to example.com" · 4s ago

You are a second agent on this browser. Two agents cannot share one tab.
Run your task in your own tab — three commands:
  1. co browser tab open <name> --who <your-name> --for "<what you are doing>"
  2. co browser -t <name> <verb> [args]      # add -t <name> to EVERY command, including do
  3. co browser tab close <name>             # when your task is done

see who owns what:  co browser tab ls`}
            language="bash"
          />

          <p className="text-gray-700 mt-4 mb-6">
            This error <strong>is the documentation</strong> — an agent that has never read these docs learns the whole lifecycle from the message it gets on its first collision. The same guard protects named tabs and refuses <code className="bg-gray-100 px-1 rounded">tab close</code> of a tab another agent is using. A claim lasts ~2 minutes from the tab&apos;s last command; once it expires the tab is free for anyone to take over.
          </p>

          <h3 className="text-xl font-semibold mb-4">The board</h3>
          <p className="text-gray-700 mb-4">See who is running what, right now:</p>

          <CodeWithResult
            code={`co browser tab ls`}
            result={`Tabs (2):
  *[main]   https://example.com          who=alice   purpose='shared main tab'
            last: "get_text" · 3s ago
   [scrape] (reserved — no page yet)     who=bob     purpose='scrape pricing'`}
            language="bash"
          />

          <p className="text-gray-600 mt-4 mb-8">
            <code className="bg-gray-100 px-2 py-1 rounded">tab ls --json</code> returns the same board as JSON for scripting.
          </p>

          <h3 className="text-xl font-semibold mb-4">Identity</h3>
          <p className="text-gray-700 mb-4">
            The daemon needs to know <strong>who</strong> you are to attribute tabs and enforce the guard. Set <code className="bg-gray-100 px-2 py-1 rounded">CO_WHO=&lt;name&gt;</code> to name yourself (recommended for scripts) — Claude Code sessions are identified automatically. An anonymous caller can still use the browser, but gets no contention protection.
          </p>

          <CodeWithResult
            code={`export CO_WHO=alice        # once per shell/script — every command now carries it
co browser go_to example.com`}
            language="bash"
          />
        </section>

        {/* Exit codes */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Exit Codes
          </h2>

          <p className="text-gray-700 mb-6">
            <code className="bg-gray-100 px-2 py-1 rounded">co browser</code> returns structured exit codes so an orchestrator can branch without parsing prose:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Code</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">0</td>
                  <td className="px-4 py-3 text-gray-600">success</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">1</td>
                  <td className="px-4 py-3 text-gray-600">the action failed (e.g. selector not found)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">2</td>
                  <td className="px-4 py-3 text-gray-600">usage error (bad flags, empty <code className="bg-gray-100 px-1 rounded">-t</code>, <code className="bg-gray-100 px-1 rounded">tab</code> misuse)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">3</td>
                  <td className="px-4 py-3 text-gray-600">unknown tab (<code className="bg-gray-100 px-1 rounded">-t</code> names a tab that was never <code className="bg-gray-100 px-1 rounded">tab open</code>ed)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">4</td>
                  <td className="px-4 py-3 text-gray-600">tab busy (another agent is mid-task on that tab)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Command reference */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Command Reference
          </h2>

          <CodeWithResult
            code={`co browser [-t TAB] <function> [args]    # run a browser function (bare = the shared 'main' tab)
co browser [-t TAB] do "<instruction>"   # let the AI agent do it — same targeting grammar
co browser tab open [NAME] [--who <agent>] [--for "<purpose>"]   # register a tab; prints its name
co browser tab ls [--json]               # the board: every tab, who runs it, last command
co browser tab close <NAME>              # release your tab when the task is done
co browser status                        # browser state, stealth-driver health, last command, the board
co browser close                         # close the browser and stop the daemon
co browser help                          # list every browser function
co browser --headless <function>         # run without a visible window`}
            language="bash"
          />

          <h3 className="text-xl font-semibold mt-8 mb-4">Everyday functions</h3>
          <p className="text-gray-700 mb-4"><code className="bg-gray-100 px-2 py-1 rounded">co browser help</code> prints the live list; these cover most sessions:</p>

          <CodeWithResult
            code={`co browser go_to https://example.com/login       # navigate (https:// is assumed if omitted)
co browser get_text                              # the page's visible text
co browser get_links_from_page                   # every link, one per line
co browser take_screenshot                       # saves a PNG, prints its path
co browser click_element_by_selector "#submit"   # deterministic click by CSS selector
co browser type_text_by_selector "#email" "aaron@example.com"
co browser save_state auth.json                  # export cookies/localStorage (keep it secret!)`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            Function arguments follow the shell: positional args in order, options as <code className="bg-gray-100 px-1 rounded">--flag=value</code> (e.g. <code className="bg-gray-100 px-1 rounded">take_screenshot --full-page=true</code>). Calling a function with the wrong arguments returns its usage line so a script (or agent) can self-correct.
          </p>
        </section>

        {/* do — natural language */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-gray-700" />
            do — Natural Language
          </h2>

          <p className="text-gray-700 mb-6">
            <code className="bg-gray-100 px-2 py-1 rounded">do</code> hands the same live browser to an AI agent that sees the page and works out the steps itself — clicking, typing, scrolling, reading — until your instruction is done:
          </p>

          <CodeWithResult
            code={`co browser do "log into github with the saved credentials and open my notifications"
co browser -t scrape do "collect every plan name and monthly price into a list"`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            Describe the <strong>end state</strong> you want (&quot;download the June invoice PDF&quot;), not the steps. <code className="bg-gray-100 px-1 rounded">do</code> costs LLM calls and is slower than direct functions — use functions for anything deterministic, <code className="bg-gray-100 px-1 rounded">do</code> for judgment. While a <code className="bg-gray-100 px-1 rounded">do</code> runs, the daemon is busy: other commands queue behind it (or exit 4 if they target its tab). This path uses managed keys — run <code className="bg-gray-100 px-1 rounded">co auth</code> once if you see an authentication message.
          </p>
        </section>

        {/* Visible or headless */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineComputerDesktop className="w-8 h-8 text-gray-700" />
            Visible or Headless
          </h2>

          <p className="text-gray-700 mb-6">
            <strong>The default is a visible window</strong> — <code className="bg-gray-100 px-2 py-1 rounded">co browser go_to example.com</code> opens real Chrome on your screen, which is what you want for logging in once or watching an agent work. Add <code className="bg-gray-100 px-2 py-1 rounded">--headless</code> to run without a window:
          </p>

          <CodeWithResult
            code={`co browser --headless go_to example.com`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            The choice is made by whichever command <strong>starts the daemon</strong> and sticks for the daemon&apos;s lifetime — every later command reuses the same browser regardless of its own flags (<code className="bg-gray-100 px-1 rounded">co browser status</code> shows <code className="bg-gray-100 px-1 rounded">headless=true/false</code>). To switch modes, <code className="bg-gray-100 px-1 rounded">co browser close</code> and let the next command relaunch.
          </p>
        </section>

        {/* Best practices */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Best Practices
          </h2>

          <ul className="space-y-3 text-gray-700 list-disc pl-6">
            <li><strong>Solo work:</strong> just use bare commands. Don&apos;t reach for <code className="bg-gray-100 px-1 rounded">-t</code> until a second agent or a second concurrent task actually exists.</li>
            <li><strong>Concurrent agents:</strong> each <code className="bg-gray-100 px-1 rounded">tab open</code>s once, adds <code className="bg-gray-100 px-1 rounded">-t &lt;name&gt;</code> to <strong>every</strong> command (including <code className="bg-gray-100 px-1 rounded">do</code>), and <code className="bg-gray-100 px-1 rounded">tab close</code>s when finished. Set <code className="bg-gray-100 px-1 rounded">CO_WHO</code>.</li>
            <li><strong>On an exit-4:</strong> don&apos;t retry the same bare command — open your own tab (the error tells you how). Two agents on one page corrupt each other&apos;s navigation.</li>
            <li><strong>On an exit-3:</strong> <code className="bg-gray-100 px-1 rounded">tab open</code> the name first, then target it — a tab must be registered before <code className="bg-gray-100 px-1 rounded">-t</code> can drive it.</li>
            <li><strong>Scripting:</strong> <code className="bg-gray-100 px-1 rounded">TAB=$(co browser tab open --for &quot;job&quot;)</code> captures the tab name (that&apos;s the only thing <code className="bg-gray-100 px-1 rounded">tab open</code> prints to stdout); branch on the exit code, and read <code className="bg-gray-100 px-1 rounded">tab ls --json</code> to see the shared state.</li>
          </ul>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            How It Works
          </h2>

          <p className="text-gray-700 mb-6">
            A small <strong>daemon</strong> owns the one browser and listens on a Unix socket (macOS/Linux) or a named pipe (Windows — native since v1.2.1, no WSL); each <code className="bg-gray-100 px-2 py-1 rounded">co browser …</code> invocation is a short-lived client that sends one request and prints the reply. Every terminal on the machine talks to the <strong>same</strong> daemon — there is one browser, one board, no matter where you type. The daemon serializes commands, tracks per-tab ownership, and keeps the browser alive between commands. It starts automatically on first use and exits when you <code className="bg-gray-100 px-1 rounded">close</code> it.
          </p>

          <p className="text-gray-700 mb-6">
            The daemon records its pid next to the socket, so a daemon that is merely <strong>busy</strong> (a long <code className="bg-gray-100 px-1 rounded">do</code> holding the single-threaded loop) is never mistaken for a dead one: clients wait up to ~15s for it to come free and then say so (&quot;daemon is busy&quot;), instead of spawning a rival daemon over a live browser. Startup itself is race-proof: a kernel lock makes two terminals&apos; simultaneous first commands elect exactly one daemon — the loser exits and its command is served by the winner.
          </p>

          <p className="text-gray-700 mb-4">
            The browser runs on <strong>Patchright</strong>, a stealth-patched, API-compatible Playwright fork. Setup is zero-touch since v1.2.1: desktop Chrome is auto-detected and preferred, and if no browser exists the first page-driving command auto-installs chromium (per-user, no admin rights). To install manually instead:
          </p>

          <CodeWithResult
            code={`pip install patchright
patchright install chrome`}
            language="bash"
          />
        </section>

        {/* Troubleshooting */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineWrenchScrewdriver className="w-8 h-8 text-gray-700" />
            Troubleshooting
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">&quot;Where is my browser window?&quot;</h3>
              <p className="text-gray-700 text-sm">The default is a <strong>visible</strong> window; if <code className="bg-gray-100 px-1 rounded">co browser status</code> says <code className="bg-gray-100 px-1 rounded">headless=true</code>, some earlier command started the daemon with <code className="bg-gray-100 px-1 rounded">--headless</code>. Run <code className="bg-gray-100 px-1 rounded">co browser close</code>, then rerun without the flag.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">&quot;tab &apos;X&apos; is in use by …&quot; (exit 4)</h3>
              <p className="text-gray-700 text-sm">Another agent is mid-task there. Open your own tab (the error shows the three commands). A crashed agent&apos;s claim expires on its own in ~2 minutes.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">&quot;Chrome failed to start&quot;</h3>
              <p className="text-gray-700 text-sm">Usually running over ssh/cron without a desktop session (start from a logged-in Terminal, or use <code className="bg-gray-100 px-1 rounded">--headless</code>), or a leftover Chrome still holds the profile. The full launch log is in <code className="bg-gray-100 px-1 rounded">~/.co/browser.log</code>.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">&quot;daemon is busy&quot; after ~15s</h3>
              <p className="text-gray-700 text-sm">A long <code className="bg-gray-100 px-1 rounded">do</code> is holding the single-threaded daemon. Wait for it, or find the culprit with <code className="bg-gray-100 px-1 rounded">co browser status</code> once it frees up.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Nuclear option</h3>
              <p className="text-gray-700 text-sm mb-2">Kill the daemon and let the next command start fresh (logins survive: they live in the profile, not the daemon):</p>
              <CodeWithResult
                code={`pkill -f connectonion.cli.browser_agent.daemon`}
                language="bash"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 text-sm">
                <strong>State locations</strong> — profile (cookies/logins): <code className="bg-gray-100 px-1 rounded">~/.co/browser_profile/</code> · daemon log: <code className="bg-gray-100 px-1 rounded">~/.co/browser.log</code> · socket: <code className="bg-gray-100 px-1 rounded">$TMPDIR/co/browser.sock</code> (plus <code className="bg-gray-100 px-1 rounded">.pid</code>/<code className="bg-gray-100 px-1 rounded">.lock</code> beside it).
              </p>
            </div>
          </div>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <code className="bg-gray-100 px-1 rounded">co browser help</code> — the live list of every function you can call directly</li>
              <li>• <a href="/cli/auth" className="text-gray-700 hover:underline">co auth</a> — managed keys for the <code className="bg-gray-100 px-1 rounded">do</code> agent</li>
              <li>• <a href="/useful-tools/browser-tools" className="text-gray-700 hover:underline">BrowserAutomation</a> — the browser tools used in your own agents</li>
              <li>• <a href="/tools/browser" className="text-gray-700 hover:underline">Browser agent</a> — full browser automation in code (<code className="bg-gray-100 px-1 rounded">co create --template browser</code>)</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
