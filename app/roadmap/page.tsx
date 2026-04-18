/*
  @date: 2025-01-01
  @description: Roadmap Page
  
  DESIGN ISSUES TO FIX:
  
  1. **Timeline Visualization** (Priority: HIGH)
     - No visual timeline or gantt chart view
     - Quarters shown as text instead of visual timeline
     - Progress bars disconnected from time context
     - Fix: Add horizontal timeline view, show dependencies, visualize time progression
  
  2. **Feature Status Clarity** (Priority: HIGH)
     - Status icons too small and similar colors
     - Progress percentages arbitrary without context
     - No indication of blockers or dependencies
     - Fix: Larger status badges, explain progress metrics, show dependencies
  
  3. **Filtering UX** (Priority: MEDIUM)
     - Category filters reset scroll position
     - No indication of how many items in each filter
     - Selected filter state not persistent
     - Fix: Maintain scroll, show counts, remember filter selection
  
  4. **Mobile Experience** (Priority: MEDIUM)
     - Feature cards too dense on mobile
     - Progress bars too thin for touch
     - CTA buttons stack poorly
     - Fix: Simplify mobile cards, increase touch targets, responsive CTA layout
  
  5. **User Engagement** (Priority: LOW)
     - No voting or feedback mechanism
     - Missing "notify me" for features
     - Static content without updates indicator
     - Fix: Add voting buttons, email notifications, "last updated" timestamp
*/

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
        description: 'Initialize and manage agent projects',
        targetDate: 'Feb 2025',
        progress: 100,
      },
      {
        title: 'Browser Agent',
        status: 'completed',
        description: 'Stateful web navigation and scraping',
        targetDate: 'Aug 2025',
        progress: 100,
      },
      {
        title: 'Event System & Plugins',
        status: 'completed',
        description: '9 lifecycle events, plugin architecture, built-in plugins',
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
        description: 'TUI components, file tools, email/calendar, memory, shell',
        targetDate: 'Jan 2026',
        progress: 100,
      }
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
      }
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
        title: 'Interactive Debugging',
        status: 'completed',
        description: '@xray decorator, auto_debug, breakpoints, Python REPL',
        targetDate: 'Nov 2025',
        progress: 100,
      },
      {
        title: 'Local Model Support',
        status: 'planned',
        description: 'Run Llama, Mistral locally via Ollama',
        targetDate: 'Q2 2026',
        progress: 0,
      }
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
        description: '59+ pages at docs.connectonion.com',
        targetDate: 'Jul 2025',
        progress: 100,
      },
      {
        title: 'Multi-Language SDKs',
        status: 'in-progress',
        description: 'TypeScript, Rust, Kotlin, Swift implementations',
        targetDate: 'Q1 2026',
        progress: 40,
      },
      {
        title: 'Cloud Deploy',
        status: 'in-progress',
        description: 'co deploy for one-command agent deployment',
        targetDate: 'Q1 2026',
        progress: 50,
      },
      {
        title: 'Agent Registry',
        status: 'planned',
        description: 'Share and discover community agents',
        targetDate: 'Q2 2026',
        progress: 0,
      }
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <HiOutlineCheckCircle className="w-4 h-4 text-green-400" />
      case 'in-progress':
        return <HiOutlineClock className="w-4 h-4 text-yellow-400" />
      case 'planned':
        return <HiOutlineExclamationCircle className="w-4 h-4 text-gray-700" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-yellow-500'
      case 'planned':
        return 'bg-gray-600'
      default:
        return 'bg-gray-700'
    }
  }

  const displayedFeatures = selectedCategory 
    ? { [selectedCategory]: features[selectedCategory as keyof typeof features] }
    : features

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Roadmap' }
          ]}
          icon={HiOutlineRocketLaunch}
          iconColor="text-purple-400"
          iconBgFrom="from-purple-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-purple-500/30"
          title="Roadmap"
          description="Track our progress from v0.0.1 to v1.0 and beyond."
          badge={<span className="px-2 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold rounded-full">v0.6.6</span>}
          markdownPath="/roadmap.md"
          markdownFilename="roadmap.md"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              !selectedCategory 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-700 hover:bg-gray-700'
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
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-700 hover:bg-gray-700'
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
                {/* Category Header */}
                {!selectedCategory && (
                  <div className="flex items-center gap-2 mb-4">
                    <category.icon className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-gray-900">{category.name} Features</h2>
                  </div>
                )}
                
                {/* Features */}
                <div className="space-y-4">
                  {categoryFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="p-4 md:p-5 bg-gray-100 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(feature.status)}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium mb-1 break-words">{feature.title}</h3>
                            <p className="text-gray-700 text-sm break-words">{feature.description}</p>
                          </div>
                        </div>
                        <span className="text-xs text-purple-400 font-medium whitespace-nowrap ml-7 sm:ml-0">{feature.targetDate}</span>
                      </div>

                      {/* Progress Bar - Larger touch target on mobile */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-gray-700">{feature.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 md:h-1.5">
                          <div
                            className={`h-2 md:h-1.5 rounded-full transition-all ${getStatusColor(feature.status)}`}
                            style={{ width: `${feature.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 p-4 bg-gray-100 rounded-xl border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">16</div>
              <div className="text-xs text-gray-700">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">2</div>
              <div className="text-xs text-gray-700">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-700">2</div>
              <div className="text-xs text-gray-700">Planned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">v0.6.6</div>
              <div className="text-xs text-gray-700">Current Version</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 md:p-8 bg-gray-800/30 rounded-xl border border-gray-700 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Want to Shape Our Roadmap?</h2>
          <p className="text-gray-700 text-sm mb-6 max-w-xl mx-auto">
            We're building ConnectOnion with our community. Your feedback helps prioritize features.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <a
              href="https://github.com/wu-changxing/connectonion/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Request Feature
            </a>
            <a
              href="https://discord.gg/4xfD9k8AUF"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>
        
        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}