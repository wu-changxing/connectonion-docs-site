'use client'

import { FaDiscord, FaGithub } from 'react-icons/fa'
import { HiOutlineRocketLaunch, HiOutlineCommandLine, HiOutlineCheckCircle, HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineBugAnt, HiOutlineSparkles, HiOutlineCpuChip, HiOutlineTableCells, HiOutlineDocumentText, HiOutlinePuzzlePiece, HiOutlineArrowRight } from 'react-icons/hi2'
import Link from 'next/link'
import { CommandBlock } from '../components/CommandBlock'
import { CopyMarkdownButton } from '../components/CopyMarkdownButton'
import { ContentNavigation } from '../components/ContentNavigation'
import { MacOSDownload } from '../components/MacOSDownload'
import { AIFirstDevelopment } from '../components/AIFirstDevelopment'
import { NonObviousAdvantages } from '../components/NonObviousAdvantages'
import { STABLE_VERSION } from '../lib/version'

/** What each command connects, in the order the sidebar lists them. Only
 *  commands with a guide page; /cli lists all of them. */
const CLI_GROUPS: [string, [string, string][]][] = [
  ['identity & account', [['co init', '/cli/init'], ['co auth', '/cli/auth'], ['co setup', '/cli/setup'], ['co env', '/cli/env']]],
  ['mail & calendar', [['co email', '/cli/email'], ['co gmail', '/cli/gmail'], ['co outlook', '/cli/outlook'], ['co gcalendar', '/cli/gcalendar']]],
  ['chat apps', [['co whatsapp', '/cli/whatsapp'], ['co telegram', '/cli/telegram'], ['co discord', '/cli/discord'], ['co feishu', '/cli/feishu'], ['co sms', '/cli/sms']]],
  ['browser & files', [['co browser', '/cli/browser-command'], ['co proxy', '/cli/proxy'], ['co gdrive', '/cli/gdrive'], ['co syno', '/cli/synology'], ['co youtube', '/cli/youtube'], ['co tiktok', '/cli/tiktok']]],
  ['coding agents & memory', [['co skills', '/cli/skills'], ['co sub', '/cli/sub'], ['co wiki', '/cli/wiki']]],
  ['build & ship', [['co ai', '/cli/ai'], ['co benchmark', '/cli/benchmark'], ['co call', '/cli/call'], ['co deploy', '/deploy'], ['co server', '/cli/server'], ['co schedule', '/cli/schedule']]],
]

export default function HomePage() {
  return (
    <main>
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 md:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/onion-logo.png" alt="ConnectOnion" className="w-7 h-7 rounded-md" />
            <span className="font-semibold text-gray-900 text-sm">ConnectOnion</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/quickstart" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
              Quickstart
            </Link>
            <Link href="/cli" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
              Docs
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              Blog
            </Link>
            <a href="https://github.com/openonion/connectonion" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <FaGithub className="w-4 h-4" />
            </a>
            <Link href="/quickstart" className="text-sm font-medium bg-gray-900 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex items-center justify-center px-4 md:px-6 py-10 md:py-14 relative border-b border-gray-100 overflow-hidden">
        {/* Dot-grid texture — fades to edges */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.35) 0%, transparent 68%)',
          maskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.35) 0%, transparent 68%)',
        }} />

        {/* max-w-3xl, not 2xl: the template block below is 78 columns wide and was being
            clipped at the right edge at 2xl. It is quoted verbatim from the shipped
            template, so the container gives way, not the code. */}
        <div className="w-full max-w-3xl mx-auto text-center relative z-10">
          {/* Brand eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-sm font-medium text-gray-500">ConnectOnion · the agent CLI harness</span>
            <span className="text-gray-400">·</span>
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full">Stable v{STABLE_VERSION}</span>
          </div>

          {/* The brand line, the same as connectonion.com (the landing repo's
              DESIGN.md §2b): the H1 is the founder's "CLI is all you need.",
              the category sits in the eyebrow above it, what you get is the subline,
              and the proof is every command, each linking to its page. This used to
              be "Your agent is already written." over a Python file — true, but it
              sold the SDK, and the product people install is the CLI. Only commands
              in `co commands` for the release go in CLI_GROUPS. */}
          <h1 className="heading-1 mb-4 text-balance">
            <span className="accent-italic text-[1.05em]">CLI</span> is all you need.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-7 leading-relaxed text-balance">
            Connect your AI agent to your mail, your chats, a real browser, your files
            and your coding agents — one <code className="font-mono text-gray-800">co</code> command each.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm w-full">
            <a href="/quickstart" className="btn btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto">
              Quick Start →
            </a>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="https://github.com/openonion/connectonion" className="btn btn-secondary inline-flex items-center justify-center gap-2">
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a href="https://discord.gg/4xfD9k8AUF" className="btn btn-secondary inline-flex items-center justify-center gap-2">
                <FaDiscord className="w-4 h-4" />
                <span>Discord</span>
              </a>
            </div>
          </div>

          <p className="mt-5 mb-8 text-sm text-gray-500 flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span>No OAuth app</span>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span>No DNS records</span>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span>No Playwright script</span>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span>$5 credits, no API key</span>
          </p>

          <div className="mb-8 text-left rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden">
            <div className="bg-gray-900 px-4 py-2 flex items-center justify-between gap-3 border-b border-gray-800">
              <span className="text-xs text-gray-400 font-mono">$ co commands</span>
              <Link href="/cli" className="text-[11px] text-green-400 font-mono whitespace-nowrap hover:underline">all 42 commands →</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-gray-800">
              {CLI_GROUPS.map(([group, cmds]) => (
                <div key={group} className="bg-gray-950 px-4 py-3">
                  <div className="text-[11px] font-mono text-gray-400 mb-1.5"># {group}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm">
                    {cmds.map(([cmd, href]) => (
                      <Link key={cmd} href={href} className="text-green-400 hover:text-green-300 hover:underline">
                        {cmd}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The bouncing chevron that used to live here was pinned to the bottom of a
            ~1240px section, so the "there is more below" hint was itself below the fold.
            It also animated infinitely with no motion-reduce guard (WCAG 2.2.2). The
            proof card running past the fold is the scroll cue now. */}
      </section>

      {/* Docs Quick Access — jump straight into documentation */}
      <section className="py-10 px-4 md:px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold text-gray-500 tracking-[0.12em] uppercase mb-5">Documentation</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {[
              { href: '/quickstart', icon: HiOutlineRocketLaunch, label: 'Quick Start', sub: 'Get running in 60s' },
              { href: '/cli', icon: HiOutlineCommandLine, label: 'All co commands', sub: 'The CLI harness' },
              { href: '/agent', icon: HiOutlineCpuChip, label: 'Python SDK', sub: 'Build your own agent' },
              { href: '/models', icon: HiOutlineTableCells, label: 'Models', sub: 'GPT / Claude / Gemini' },
              { href: '/useful-plugins', icon: HiOutlinePuzzlePiece, label: 'Plugins', sub: 'ReAct, Eval, Shell...' },
              { href: '/tui', icon: HiOutlineCommandLine, label: 'TUI Components', sub: 'pick, chat, fuzzy...' },
              { href: '/auto-debug', icon: HiOutlineBugAnt, label: 'Auto Debug', sub: 'Interactive breakpoints' },
              { href: '/logging', icon: HiOutlineDocumentText, label: 'Logging', sub: 'Logs, sessions, YAML' },
              { href: '/blog', icon: HiOutlineDocumentText, label: 'Design Journal', sub: 'Why we built it this way' },
            ].map(({ href, icon: Icon, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center group-hover:bg-white group-hover:border group-hover:border-gray-300 transition-all">
                  <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 leading-tight">{label}</div>
                  <div className="text-xs text-gray-500 leading-tight">{sub}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link href="/cli" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors">
              All documentation <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-6 px-4 md:px-6 border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://github.com/openonion/connectonion/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/license-Apache_2.0-green.svg" alt="Apache-2.0 License" />
            </a>
            <a href="https://pypi.org/project/connectonion/" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/python-3.9+-blue.svg" alt="Python 3.9+" />
            </a>
            <a href="https://pepy.tech/projects/connectonion" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/pypi/dm/connectonion?label=PyPI%20downloads" alt="PyPI Downloads" />
            </a>
          </div>
        </div>
      </section>

      {/* Non-Obvious Advantages */}
      <NonObviousAdvantages />

      {/* The LangChain / OpenAI-SDK line-count comparison used to sit here. It was
          removed deliberately: we are not competing on "fewer lines than LangChain",
          and a side-by-side with those libraries plants us in their category. The
          component still exists if it is ever wanted on a dedicated page. */}

      {/* AI-First Development */}
      <AIFirstDevelopment />

      {/* macOS App Download */}
      <MacOSDownload />

      {/* Free Credits Banner */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">FREE</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">$5 Free Credits — No API Key Needed</h3>
                <p className="text-gray-600 text-sm">
                  Get $5 free credits to try Gemini 2.5 Pro, GPT-4o, Claude, and more. Start building immediately.
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm border border-gray-700">
                <div><span className="text-green-400">model=</span><span className="text-yellow-300">"co/gemini-3.7-flash"</span></div>
                <div className="text-gray-400 text-xs mt-1">Check balance: co status</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2">What You Can Build</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="card-interactive rounded-xl p-6 border border-gray-200">
              <HiOutlineBolt className="w-7 h-7 text-gray-500 mb-4" />
              <h3 className="text-base font-bold text-gray-900 mb-3">Functions = Tools</h3>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs mb-4">
                <div className="text-gray-100">def search(q: str):</div>
                <div className="text-gray-100 pl-4">return results</div>
              </div>
              <p className="text-sm text-gray-600">No wrappers. No decorators. Just functions.</p>
            </div>

            <div className="card-interactive rounded-xl p-6 border border-gray-200">
              <HiOutlineGlobeAlt className="w-7 h-7 text-gray-500 mb-4" />
              <h3 className="text-base font-bold text-gray-900 mb-3">Deploy Anywhere</h3>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs mb-4">
                <div className="text-green-400">agent.serve()</div>
                <div className="text-gray-400"># Globally accessible</div>
              </div>
              <p className="text-sm text-gray-600">From your laptop. No AWS needed.</p>
            </div>

            <div className="card-interactive rounded-xl p-6 border border-gray-200">
              <HiOutlineRocketLaunch className="w-7 h-7 text-gray-500 mb-4" />
              <h3 className="text-base font-bold text-gray-900 mb-3">Connect Agents</h3>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs mb-4">
                <div className="text-green-400">other = connect("0x...")</div>
                <div className="text-gray-400"># Agents as tools</div>
              </div>
              <p className="text-sm text-gray-600">Build agent networks. Like the internet, but for AI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Ready */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2">Production Ready</h2>
            <p className="text-gray-500">Built for production from day one</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-interactive p-5 text-center bg-white rounded-xl border border-gray-200">
              <HiOutlineCommandLine className="w-6 h-6 icon-ui mx-auto mb-2" />
              <h4 className="text-sm font-bold text-gray-900 mb-1">Auto Log</h4>
              <p className="text-xs text-gray-500">.co/logs/</p>
            </div>
            <div className="card-interactive p-5 text-center bg-white rounded-xl border border-gray-200">
              <HiOutlineBugAnt className="w-6 h-6 icon-ui mx-auto mb-2" />
              <h4 className="text-sm font-bold text-gray-900 mb-1">@xray</h4>
              <p className="text-xs text-gray-500">Breakpoints</p>
            </div>
            <div className="card-interactive p-5 text-center bg-white rounded-xl border border-gray-200">
              <HiOutlineSparkles className="w-6 h-6 icon-ui mx-auto mb-2" />
              <h4 className="text-sm font-bold text-gray-900 mb-1">Plugins</h4>
              <p className="text-xs text-gray-500">Just functions</p>
            </div>
            <div className="card-interactive p-5 text-center bg-white rounded-xl border border-gray-200">
              <HiOutlineCheckCircle className="w-6 h-6 icon-ui mx-auto mb-2" />
              <h4 className="text-sm font-bold text-gray-900 mb-1">Human Loop</h4>
              <p className="text-xs text-gray-500">Approval flows</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/quickstart" className="inline-flex items-center justify-center min-h-[44px] px-4 text-sm text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4">
              Learn more in docs →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5 text-left">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">0 lines</div>
              <p className="text-sm text-gray-600">To get started. The template is already written.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">1 file</div>
              <p className="text-sm text-gray-600">Is the thing you change. Usually just the prompt.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">Your code</div>
              <p className="text-sm text-gray-600">It lives in your repo, not behind an abstraction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community + CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-2 mb-6">Ready to Start?</h2>

          <div className="flex justify-center gap-4 mb-8">
            <a href="https://discord.gg/4xfD9k8AUF" target="_blank" rel="noopener noreferrer"
              className="card-interactive p-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white">
              <FaDiscord className="w-5 h-5 text-indigo-500" />
              <span className="font-semibold text-gray-900">Discord</span>
            </a>
            <a href="https://github.com/openonion/connectonion" target="_blank" rel="noopener noreferrer"
              className="card-interactive p-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white">
              <FaGithub className="w-5 h-5 text-gray-800" />
              <span className="font-semibold text-gray-900">GitHub</span>
            </a>
          </div>

          <div className="mb-4 max-w-md mx-auto">
            <CommandBlock commands={['pip install connectonion', 'co create my-agent', 'cd my-agent && python agent.py']} />
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Installs stable. Preview releases need an explicit <code>--pre</code> flag or an exact version pin.
          </p>

          <Link href="/quickstart" className="btn btn-primary inline-flex items-center gap-2">
            Quick Start →
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            Three commands to a running agent. No AWS. No API key.
          </p>
        </div>
      </section>

      {/* Navigation + Copy Button */}
      <section className="px-4 md:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <CopyMarkdownButton markdownPath="/home.md" filename="home.md" />
          </div>
          <ContentNavigation />
        </div>
      </section>
    </main>
  )
}
