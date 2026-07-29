'use client'

import { FaDiscord, FaGithub } from 'react-icons/fa'
import { HiOutlineRocketLaunch, HiOutlineCommandLine, HiOutlineCheckCircle, HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineBugAnt, HiOutlineSparkles, HiOutlineCpuChip, HiOutlineTableCells, HiOutlineDocumentText, HiOutlinePuzzlePiece, HiOutlineArrowRight } from 'react-icons/hi2'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { CommandBlock } from '../components/CommandBlock'
import { CopyMarkdownButton } from '../components/CopyMarkdownButton'
import { ContentNavigation } from '../components/ContentNavigation'
import { FrameworkComparison } from '../components/FrameworkComparison'
import { MacOSDownload } from '../components/MacOSDownload'
import { AIFirstDevelopment } from '../components/AIFirstDevelopment'
import { NonObviousAdvantages } from '../components/NonObviousAdvantages'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { VERSION } from '../lib/version'

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
            <Link href="/agent" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
              Docs
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
      <section className="flex items-center justify-center px-4 md:px-6 py-20 md:py-32 relative border-b border-gray-100 overflow-hidden">
        {/* Dot-grid texture — fades to edges */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.35) 0%, transparent 68%)',
          maskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.35) 0%, transparent 68%)',
        }} />

        <div className="w-full max-w-2xl mx-auto text-center relative z-10">
          {/* Brand eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-sm font-medium text-gray-500">ConnectOnion</span>
            <span className="text-gray-400">·</span>
            <span className="px-2 py-0.5 bg-gray-100 text-green-700 text-xs font-semibold rounded-full">v{VERSION}</span>
          </div>

          {/* Value proposition headline */}
          <h1 className="heading-1 mb-4 text-balance">
            Build AI Agents in{' '}
            <span className="accent-italic text-[1.05em]">2 lines</span>{' '}
            of Python
          </h1>

          {/* Philosophy — now secondary */}
          <p className="text-base sm:text-lg text-gray-500 mb-8 leading-relaxed text-balance">
            Keep simple things simple, make complicated things possible.
            No boilerplate. No framework lock-in. Just Python.
          </p>

          {/* Install Command */}
          <div className="mb-6 max-w-md mx-auto">
            <CommandBlock commands={['pip install connectonion']} />
          </div>

          {/* Hero code block — full-width terminal treatment */}
          <div className="mb-8 text-left rounded-xl overflow-hidden border border-gray-700 shadow-xl shadow-black/20">
            {/* Terminal chrome */}
            <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-3 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-gray-400 font-mono flex-1 text-center">agent.py</span>
              <span className="text-xs text-gray-600 font-mono">Python 3.11</span>
            </div>
            <div className="bg-gray-900">
              <SyntaxHighlighter
                language="python"
                style={okaidia}
                customStyle={{
                  background: 'transparent',
                  padding: '1rem 1.25rem',
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.75',
                }}
              >
{`from connectonion import Agent

def get_weather(city: str) -> str:
    return f"72°F, sunny in {city}"

agent = Agent("assistant", tools=[get_weather])
agent.input("What's the weather in NYC?")`}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* CTAs */}
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
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Docs Quick Access — jump straight into documentation */}
      <section className="py-10 px-4 md:px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold text-gray-500 tracking-[0.12em] uppercase mb-5">Documentation</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {[
              { href: '/quickstart', icon: HiOutlineRocketLaunch, label: 'Quick Start', sub: 'Get running in 60s' },
              { href: '/agent', icon: HiOutlineCpuChip, label: 'Agent API', sub: 'Core class + methods' },
              { href: '/cli', icon: HiOutlineCommandLine, label: 'CLI Reference', sub: 'co commands & flags' },
              { href: '/models', icon: HiOutlineTableCells, label: 'Models', sub: 'GPT / Claude / Gemini' },
              { href: '/useful-plugins', icon: HiOutlinePuzzlePiece, label: 'Plugins', sub: 'ReAct, Eval, Shell...' },
              { href: '/tui', icon: HiOutlineCommandLine, label: 'TUI Components', sub: 'pick, chat, fuzzy...' },
              { href: '/auto-debug', icon: HiOutlineBugAnt, label: 'Auto Debug', sub: 'Interactive breakpoints' },
              { href: '/logging', icon: HiOutlineDocumentText, label: 'Logging', sub: 'Logs, sessions, YAML' },
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
            <Link href="/agent" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors">
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

      {/* Framework Comparison */}
      <FrameworkComparison />

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
                <div><span className="text-green-400">model=</span><span className="text-yellow-300">"co/gemini-2.5-pro"</span></div>
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
              <div className="text-2xl font-bold text-gray-900 mb-2">8 lines</div>
              <p className="text-sm text-gray-600">For basic agents. No boilerplate.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">Full power</div>
              <p className="text-sm text-gray-600">Production features when you need them.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">Your code</div>
              <p className="text-sm text-gray-600">Not framework code. Just Python.</p>
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

          <div className="mb-6 max-w-md mx-auto">
            <CommandBlock commands={['pip install connectonion']} />
          </div>

          <Link href="/quickstart" className="btn btn-primary inline-flex items-center gap-2">
            Quick Start →
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            60 seconds to your first agent. No AWS. Just code.
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
