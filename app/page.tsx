'use client'

import { FaDiscord, FaGithub } from 'react-icons/fa'
import { HiOutlineRocketLaunch, HiOutlineCommandLine, HiOutlineCheckCircle, HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineBugAnt, HiOutlineSparkles } from 'react-icons/hi2'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CommandBlock } from '../components/CommandBlock'
import { CopyMarkdownButton } from '../components/CopyMarkdownButton'
import { ContentNavigation } from '../components/ContentNavigation'
import { FrameworkComparison } from '../components/FrameworkComparison'
import { MacOSDownload } from '../components/MacOSDownload'
import { AIFirstDevelopment } from '../components/AIFirstDevelopment'
import { NonObviousAdvantages } from '../components/NonObviousAdvantages'
import { VERSION } from '../lib/version'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section - Compact with Philosophy */}
      <section className="flex items-center justify-center px-4 md:px-6 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-900/5 to-transparent" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="heading-1 text-gradient-hero mb-2">
            ConnectOnion
          </h1>

          <div className="mb-4">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full">v{VERSION}</span>
          </div>

          {/* Philosophy - The Core Message */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 leading-relaxed">
            <span className="text-purple-400 font-bold block sm:inline">Keep simple things simple</span>
            <span className="text-slate-400 hidden sm:inline mx-2">,</span>
            <span className="text-green-400 font-bold block sm:inline">make complicated things possible</span>
          </div>

          {/* Install Command */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="bg-black/60 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-2 hover:border-purple-500/60 transition-all shadow-2xl">
              <CommandBlock commands={['pip install connectonion']} />
            </div>
          </div>

          {/* Quick Code Example */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden mb-8 max-w-lg mx-auto text-left">
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language="python"
                style={monokai}
                customStyle={{
                  background: 'transparent',
                  padding: '0.75rem',
                  margin: 0,
                  fontSize: '0.7rem',
                  lineHeight: '1.6',
                  minWidth: 'max-content'
                }}
              >
{`from connectonion import Agent

agent = Agent("You are helpful", tools=[get_weather])
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
              <a href="https://github.com/wu-changxing/connectonion" className="btn btn-secondary inline-flex items-center justify-center gap-2">
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
      </section>

      {/* Trust Indicators - Compact */}
      <section className="py-8 md:py-12 px-4 md:px-6 border-t border-purple-900/30 bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a href="https://connectonion.com" target="_blank" rel="noopener noreferrer" className="min-h-[48px] flex items-center justify-center">
              <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=flat-square" alt="Production Ready" className="h-5" />
            </a>
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="min-h-[48px] flex items-center justify-center">
              <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="MIT License" className="h-5" />
            </a>
            <a href="https://python.org" target="_blank" rel="noopener noreferrer" className="min-h-[48px] flex items-center justify-center">
              <img src="https://img.shields.io/badge/Python-3.9+-blue?style=flat-square&logo=python" alt="Python 3.9+" className="h-5" />
            </a>
            <a href="https://pepy.tech/projects/connectonion" target="_blank" rel="noopener noreferrer" className="min-h-[48px] flex items-center justify-center">
              <img src="https://static.pepy.tech/personalized-badge/connectonion?period=total&units=international_system&left_color=black&right_color=green&left_text=downloads" alt="PyPI Downloads" className="h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Framework Comparison - The Main Feature */}
      <FrameworkComparison />

      {/* Non-Obvious Advantages - What other frameworks don't have */}
      <NonObviousAdvantages />

      {/* AI-First Development */}
      <AIFirstDevelopment />

      {/* macOS App Download */}
      <MacOSDownload />

      {/* Free Credits Banner - Compact */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-green-900/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/40 to-green-900/10 rounded-xl p-6 border-2 border-green-500/50 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">FREE</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Start Free - No API Key Needed</h3>
                <p className="text-slate-200 text-sm">
                  Get started immediately with free credits for GPT-4o, Claude, and Gemini.
                </p>
              </div>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-sm border border-green-500/20">
                <div><span className="text-green-400">model=</span><span className="text-yellow-300">"co/gemini-2.5-pro"</span></div>
                <div className="text-slate-200 text-xs mt-1">Check balance: co status</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities - 3 Cards */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2">What You Can Build</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Functions = Tools */}
            <div className="card-interactive bg-gradient-to-br from-purple-900/30 to-purple-900/10 rounded-xl p-6 border border-purple-500/30">
              <HiOutlineBolt className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-4">Functions = Tools</h3>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-xs mb-4">
                <div className="text-slate-100">def search(q: str):</div>
                <div className="text-slate-100 pl-4">return results</div>
              </div>
              <p className="text-sm text-slate-200">No wrappers. No decorators. Just functions.</p>
            </div>

            {/* Deploy Anywhere */}
            <div className="card-interactive bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-6 border border-blue-500/30">
              <HiOutlineGlobeAlt className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-4">Deploy Anywhere</h3>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-xs mb-4">
                <div className="text-blue-400">agent.serve()</div>
                <div className="text-slate-400"># Globally accessible</div>
              </div>
              <p className="text-sm text-slate-200">From your laptop. No AWS needed.</p>
            </div>

            {/* Connect Agents */}
            <div className="card-interactive bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-xl p-6 border border-green-500/30">
              <HiOutlineRocketLaunch className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-4">Connect Agents</h3>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-xs mb-4">
                <div className="text-green-400">other = connect("0x...")</div>
                <div className="text-slate-400"># Agents as tools</div>
              </div>
              <p className="text-sm text-slate-200">Build agent networks. Like the internet, but for AI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Ready - 4 Small Cards */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2">Production Ready</h2>
            <p className="text-slate-200">Built for production from day one</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-interactive p-4 text-center">
              <HiOutlineCommandLine className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Auto Log</h4>
              <p className="text-xs text-slate-200">.co/logs/</p>
            </div>

            <div className="card-interactive p-4 text-center">
              <HiOutlineBugAnt className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">@xray</h4>
              <p className="text-xs text-slate-200">Breakpoints</p>
            </div>

            <div className="card-interactive p-4 text-center">
              <HiOutlineSparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Plugins</h4>
              <p className="text-xs text-slate-200">Just functions</p>
            </div>

            <div className="card-interactive p-4 text-center">
              <HiOutlineCheckCircle className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Human Loop</h4>
              <p className="text-xs text-slate-200">Approval flows</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/quickstart" className="inline-flex items-center justify-center min-h-[44px] px-4 text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
              Learn more in docs →
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy - Compact */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
            "<span className="text-purple-400">Keep simple things simple</span>,
            <span className="text-green-400"> make complicated things possible</span>"
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-purple-400 mb-2">8 lines</div>
              <p className="text-sm text-slate-200">For basic agents. No boilerplate.</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-green-400 mb-2">Full power</div>
              <p className="text-sm text-slate-200">Production features when you need them.</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-blue-400 mb-2">Your code</div>
              <p className="text-sm text-slate-200">Not framework code. Just Python.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community + CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-900/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-2 mb-6">Ready to Start?</h2>

          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://discord.gg/4xfD9k8AUF"
              target="_blank"
              rel="noopener noreferrer"
              className="card-interactive p-4 flex items-center gap-3"
            >
              <FaDiscord className="w-6 h-6 text-purple-400" />
              <span className="font-semibold text-white">Discord</span>
            </a>
            <a
              href="https://github.com/wu-changxing/connectonion"
              target="_blank"
              rel="noopener noreferrer"
              className="card-interactive p-4 flex items-center gap-3"
            >
              <FaGithub className="w-6 h-6 text-blue-400" />
              <span className="font-semibold text-white">GitHub</span>
            </a>
          </div>

          <div className="mb-6 max-w-md mx-auto">
            <CommandBlock commands={['pip install connectonion']} />
          </div>

          <Link href="/quickstart" className="btn btn-primary inline-flex items-center gap-2">
            Quick Start →
          </Link>

          <p className="mt-4 text-sm text-slate-200">
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
