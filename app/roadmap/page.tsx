'use client'

import { useState } from 'react'
import { HiOutlineRocketLaunch, HiOutlineCube, HiOutlineServerStack, HiOutlineShieldCheck, HiOutlineCpuChip, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { id: 'core', name: 'Core', icon: HiOutlineCube },
    { id: 'trust', name: 'Trust', icon: HiOutlineShieldCheck },
    { id: 'intelligence', name: 'AI', icon: HiOutlineCpuChip },
    { id: 'platform', name: 'Platform', icon: HiOutlineServerStack },
  ]

  const features = {
    core: [
      {
        title: 'Basic Agent Framework',
        status: 'completed',
        description: 'Simple Python framework with tool system',
        targetDate: 'Jan 2025',
        progress: 100,
      },
      {
        title: 'CLI Tool (co)',
        status: 'completed',
        description: 'Initialize, run, and manage agent projects from the terminal',
        targetDate: 'Feb 2025',
        progress: 100,
      },
      {
        title: 'Browser Agent',
        status: 'completed',
        description: 'Stateful web navigation, screenshots, and scraping via Playwright',
        targetDate: 'Aug 2025',
        progress: 100,
      },
      {
        title: 'Event System & Plugins',
        status: 'completed',
        description: '12 lifecycle events, plugin architecture, 10+ built-in plugins',
        targetDate: 'Oct 2025',
        progress: 100,
      },
      {
        title: 'Agent-to-Agent Protocol',
        status: 'completed',
        description: 'host(), connect(), relay, trust verification between agents',
        targetDate: 'Dec 2025',
        progress: 100,
      },
      {
        title: 'Advanced Tool System',
        status: 'completed',
        description: 'TUI components, file tools, email/calendar, memory, shell, browser tools',
        targetDate: 'Jan 2026',
        progress: 100,
      },
      {
        title: 'Interactive Debugging',
        status: 'completed',
        description: '@xray decorator, auto_debug breakpoints, Python REPL, exception inspector',
        targetDate: 'Mar 2026',
        progress: 100,
      },
    ],
    trust: [
      {
        title: 'Behavior Tracking',
        status: 'completed',
        description: 'Automatic recording of all agent actions',
        targetDate: 'Mar 2025',
        progress: 100,
      },
      {
        title: 'Trust Verification System',
        status: 'completed',
        description: 'Three-level trust (open/careful/strict) with custom policies',
        targetDate: 'Sep 2025',
        progress: 100,
      },
      {
        title: 'Onboard Protocol',
        status: 'completed',
        description: 'Invite codes and payment-based agent onboarding',
        targetDate: 'Nov 2025',
        progress: 100,
      },
      {
        title: 'Audit Logs',
        status: 'completed',
        description: 'YAML session logging, .co/logs/ and .co/evals/ tracking',
        targetDate: 'Jan 2026',
        progress: 100,
      },
    ],
    intelligence: [
      {
        title: 'OpenAI Integration',
        status: 'completed',
        description: 'Full GPT function calling and structured output',
        targetDate: 'Jan 2025',
        progress: 100,
      },
      {
        title: 'Multi-Model Support',
        status: 'completed',
        description: 'Claude, Gemini, Groq, and managed keys (co/ prefix)',
        targetDate: 'Oct 2025',
        progress: 100,
      },
      {
        title: 'ReAct & Reflection Plugins',
        status: 'completed',
        description: 'Plan-Act-Reflect loop, eval plugin, tool approval flows',
        targetDate: 'Feb 2026',
        progress: 100,
      },
      {
        title: 'Local Model Support',
        status: 'in-progress',
        description: 'Run Llama, Mistral locally via Ollama',
        targetDate: 'Q2 2026',
        progress: 20,
      },
    ],
    platform: [
      {
        title: 'PyPI Package',
        status: 'completed',
        description: 'pip install connectonion',
        targetDate: 'Feb 2025',
        progress: 100,
      },
      {
        title: 'Documentation Site',
        status: 'completed',
        description: '90+ pages at docs.connectonion.com',
        targetDate: 'Jul 2025',
        progress: 100,
      },
      {
        title: 'Multi-Language SDKs',
        status: 'in-progress',
        description: 'TypeScript, Rust, Kotlin, Swift implementations',
        targetDate: 'Q2 2026',
        progress: 40,
      },
      {
        title: 'Cloud Deploy',
        status: 'in-progress',
        description: 'co deploy for one-command agent deployment',
        targetDate: 'Q2 2026',
        progress: 50,
      },
      {
        title: 'Agent Registry',
        status: 'planned',
        description: 'Share and discover community agents',
        targetDate: 'Q3 2026',
        progress: 0,
      },
    ],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <HiOutlineCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
      case 'in-progress':
        return <HiOutlineClock className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
      case 'planned':
        return <HiOutlineExclamationCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
      default:
        return null
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-gray-600'
      case 'planned': return 'bg-gray-300'
      default: return 'bg-gray-300'
    }
  }

  const displayedFeatures = selectedCategory
    ? { [selectedCategory]: features[selectedCategory as keyof typeof features] }
    : features

  // counts
  const allFeatures = Object.values(features).flat()
  const completedCount = allFeatures.filter(f => f.status === 'completed').length
  const inProgressCount = allFeatures.filter(f => f.status === 'in-progress').length
  const plannedCount = allFeatures.filter(f => f.status === 'planned').length

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Roadmap' }
          ]}
          icon={HiOutlineRocketLaunch}
          title="Roadmap"
          description="Track our progress from v0.0.1 to v1.0 and beyond."
          badge={<span className="px-2 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full">v0.9.2</span>}
          markdownPath="/roadmap.md"
          markdownFilename="roadmap.md"
        />

        {/* Progress Summary */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-xs text-gray-500 mt-1">Completed</div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-700">{inProgressCount}</div>
            <div className="text-xs text-gray-500 mt-1">In Progress</div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-500">{plannedCount}</div>
            <div className="text-xs text-gray-500 mt-1">Planned</div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900">v0.9.2</div>
            <div className="text-xs text-gray-500 mt-1">Current Version</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              !selectedCategory
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Features List */}
        <div className="space-y-8">
          {Object.entries(displayedFeatures).map(([categoryId, categoryFeatures]) => {
            const category = categories.find(c => c.id === categoryId)
            if (!category) return null

            return (
              <div key={categoryId}>
                {!selectedCategory && (
                  <div className="flex items-center gap-2 mb-4">
                    <category.icon className="w-5 h-5 text-gray-400" />
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{category.name}</h2>
                  </div>
                )}

                <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
                  {categoryFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {getStatusIcon(feature.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                              {feature.status === 'in-progress' && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium">In Progress</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{feature.description}</p>

                            {feature.status !== 'planned' && (
                              <div className="mt-2">
                                <div className="w-full bg-gray-100 rounded-full h-1">
                                  <div
                                    className={`h-1 rounded-full transition-all ${getProgressColor(feature.status)}`}
                                    style={{ width: `${feature.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 mt-0.5">{feature.targetDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Shape the Roadmap</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your feedback helps us prioritize. Open an issue or join the community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="https://github.com/openonion/connectonion/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Request a Feature
            </a>
            <a
              href="https://discord.gg/4xfD9k8AUF"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>

        <ContentNavigation />
      </div>
    </div>
  )
}
