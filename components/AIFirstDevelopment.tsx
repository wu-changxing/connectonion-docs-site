'use client'

import { HiOutlineSparkles, HiOutlineRocketLaunch, HiOutlineCog, HiOutlineLightBulb, HiOutlineCommandLine, HiOutlineArrowPath } from 'react-icons/hi2'

export function AIFirstDevelopment() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-pink-900/10 to-transparent" />

      {/* Animated background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6">
            <HiOutlineSparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">The Future is AI-First</span>
          </div>

          <h2 className="heading-2 mb-6">
            AI Agents Building AI Agents
          </h2>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light">
            Why write code when you can describe what you want? ConnectOnion enables <span className="text-purple-400 font-semibold">meta-agents</span> that build, test, and deploy other agents.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: The Problem */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🤔</span>
                Traditional Development
              </h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Write boilerplate, test, debug, repeat</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Manual tool integration for every agent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Hours spent on repetitive patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Human bottleneck in agent creation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: The Solution */}
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">✨</span>
                AI-First with ConnectOnion
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Describe your agent, let AI build it</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Meta-agents generate, test, and deploy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Ship agents in minutes, not hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>AI handles the boring parts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Advantages */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Why AI-First Development Wins</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800/50 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
              <HiOutlineRocketLaunch className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">10x Faster Development</h4>
              <p className="text-sm text-slate-400">
                Meta-agents generate production-ready code in minutes. What took hours now takes seconds.
              </p>
            </div>

            <div className="p-6 bg-gray-800/50 border border-pink-500/20 rounded-xl hover:border-pink-500/40 transition-all">
              <HiOutlineArrowPath className="w-10 h-10 text-pink-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Self-Improving Agents</h4>
              <p className="text-sm text-slate-400">
                Agents analyze their own execution, identify issues, and generate fixes automatically.
              </p>
            </div>

            <div className="p-6 bg-gray-800/50 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
              <HiOutlineLightBulb className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Zero Boilerplate</h4>
              <p className="text-sm text-slate-400">
                Focus on what you want to build, not how. AI handles imports, error handling, and best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Real Example */}
        <div className="p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <HiOutlineCommandLine className="w-8 h-8 text-purple-400 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Real-World Example</h3>
              <p className="text-slate-400">
                Build an email automation agent using a meta-agent:
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-black/40 rounded-lg border border-gray-700">
              <div className="text-xs text-purple-400 mb-2">You:</div>
              <p className="text-white font-mono text-sm">
                "Create an agent that monitors my inbox and replies to customer questions about pricing"
              </p>
            </div>

            <div className="flex justify-center">
              <HiOutlineSparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>

            <div className="p-4 bg-black/40 rounded-lg border border-purple-500/30">
              <div className="text-xs text-green-400 mb-2">Meta-Agent:</div>
              <ul className="text-slate-300 text-sm space-y-2 font-mono">
                <li>✓ Generated Gmail integration tool</li>
                <li>✓ Created pricing knowledge base</li>
                <li>✓ Built reply agent with context</li>
                <li>✓ Added tests and error handling</li>
                <li>✓ Agent deployed and running</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              <span className="text-purple-400 font-semibold">Time saved: 4 hours</span> •
              <span className="text-green-400 font-semibold"> Lines of code written by you: 0</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/quickstart"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all"
          >
            <HiOutlineRocketLaunch className="w-5 h-5" />
            Start Building AI-First
          </a>
          <p className="mt-4 text-sm text-slate-500">
            No credit card required • Free tier available
          </p>
        </div>
      </div>
    </section>
  )
}
