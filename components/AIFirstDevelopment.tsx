'use client'

import { HiOutlineSparkles, HiOutlineRocketLaunch, HiOutlineLightBulb, HiOutlineCommandLine, HiOutlineArrowPath } from 'react-icons/hi2'

export function AIFirstDevelopment() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full mb-5">
            <HiOutlineSparkles className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-600">The Future is AI-First</span>
          </div>

          <h2 className="heading-2 mb-4">AI Agents Building <span className="accent-italic text-[1.05em]">AI Agents</span></h2>

          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Why write code when you can describe what you want? ConnectOnion enables{' '}
            <span className="font-semibold text-gray-900">meta-agents</span> that build, test, and deploy other agents.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Left: The Problem */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span>🤔</span>
              Traditional Development
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Write boilerplate, test, debug, repeat</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Manual tool integration for every agent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Hours spent on repetitive patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Human bottleneck in agent creation</span>
              </li>
            </ul>
          </div>

          {/* Right: The Solution */}
          <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span>✨</span>
              AI-First with ConnectOnion
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Describe your agent, let AI build it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Meta-agents generate, test, and deploy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Ship agents in minutes, not hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>AI handles the boring parts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Advantages */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Why AI-First Development Wins</h3>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 bg-white border border-gray-200 rounded-xl card-interactive">
              <HiOutlineRocketLaunch className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="text-base font-semibold text-gray-900 mb-2">10x Faster Development</h4>
              <p className="text-sm text-gray-500">
                Meta-agents generate production-ready code in minutes. What took hours now takes seconds.
              </p>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-xl card-interactive">
              <HiOutlineArrowPath className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="text-base font-semibold text-gray-900 mb-2">Self-Improving Agents</h4>
              <p className="text-sm text-gray-500">
                Agents analyze their own execution, identify issues, and generate fixes automatically.
              </p>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-xl card-interactive">
              <HiOutlineLightBulb className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="text-base font-semibold text-gray-900 mb-2">Zero Boilerplate</h4>
              <p className="text-sm text-gray-500">
                Focus on what you want to build, not how. AI handles imports, error handling, and best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Real Example */}
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
          <div className="flex items-start gap-4 mb-5">
            <HiOutlineCommandLine className="w-6 h-6 text-green-600 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Real-World Example</h3>
              <p className="text-sm text-gray-500">Build an email automation agent using a meta-agent:</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-xs text-gray-400 mb-1">You:</div>
              <p className="text-gray-800 text-sm font-mono">
                &quot;Create an agent that monitors my inbox and replies to customer questions about pricing&quot;
              </p>
            </div>

            <div className="flex justify-center">
              <HiOutlineSparkles className="w-5 h-5 text-green-500 animate-pulse" />
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs text-green-600 mb-2 font-medium">Meta-Agent:</div>
              <ul className="text-gray-700 text-sm space-y-1.5">
                <li>✓ Generated Gmail integration tool</li>
                <li>✓ Created pricing knowledge base</li>
                <li>✓ Built reply agent with context</li>
                <li>✓ Added tests and error handling</li>
                <li>✓ Agent deployed and running</li>
              </ul>
            </div>
          </div>

          <div className="mt-5 text-center text-sm text-gray-500">
            <span className="text-green-700 font-semibold">Time saved: 4 hours</span>
            {' · '}
            <span className="font-semibold text-gray-900">Lines of code written by you: 0</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href="/quickstart" className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors">
            <HiOutlineRocketLaunch className="w-5 h-5" />
            Start Building AI-First
          </a>
          <p className="mt-3 text-sm text-gray-400">No credit card required · Free tier available</p>
        </div>
      </div>
    </section>
  )
}
