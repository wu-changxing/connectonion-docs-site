'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { HiOutlineShieldExclamation, HiOutlineExclamationTriangle, HiOutlineLink as LinkIcon, HiOutlineBolt, HiOutlineScale, HiOutlineSquare3Stack3D, HiOutlineCheckCircle, HiOutlineShieldCheck, HiOutlineCircleStack, HiOutlineCurrencyDollar, HiOutlineUsers, HiOutlineBugAnt, HiOutlineChartBar, HiOutlineIdentification, HiOutlineMagnifyingGlass, HiOutlineEye, HiOutlineArrowRight, HiOutlineFunnel, HiOutlineExclamationCircle, HiOutlineLockClosed, HiOutlineArrowTrendingUp, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineBars3, HiOutlineXMark, HiOutlineArrowUp } from 'react-icons/hi2'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

function Section({ id, title, children, icon }: { id: string; title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <section id={id} className="mb-8 sm:mb-12 scroll-mt-20">
      <div className="flex items-center gap-2 mb-4 sm:mb-4">
        {icon}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 group flex items-center gap-2">
          {title}
          <a
            href={`#${id}`}
            className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white rounded px-1 hover:text-green-600"
            aria-label={`Link to ${title} section`}
          >
            #
          </a>
        </h2>
      </div>
      {children}
    </section>
  )
}

function ThreatCard({ 
  id, 
  number, 
  title, 
  severity, 
  severityLabel, 
  icon: Icon, 
  insight, 
  diagram, 
  expanded, 
  onToggle, 
  visible 
}: {
  id: string
  number: number
  title: string
  severity: 'H+H' | 'H+M' | 'L+H' | 'P'
  severityLabel: string
  icon: any
  insight: string
  diagram: React.ReactNode
  expanded: boolean
  onToggle: () => void
  visible: boolean
}) {
  // Monochrome card, severity indicated only by a small dot + label.
  // One accent color per severity; no backgrounds, no gradients, no rings.
  const severityColors = {
    'H+H': { dot: 'bg-red-600',    label: 'text-red-700' },
    'H+M': { dot: 'bg-amber-600',  label: 'text-amber-700' },
    'L+H': { dot: 'bg-gray-500',   label: 'text-gray-700' },
    'P':   { dot: 'bg-gray-400',   label: 'text-gray-600' }
  }

  const colors = severityColors[severity]

  if (!visible) return null

  return (
    <div id={id} className="relative rounded-lg overflow-hidden border border-gray-200 bg-white hover:border-gray-300 transition-colors">
      
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
        className="w-full px-3 sm:px-4 py-4 text-left bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[60px] touch-manipulation"
      >
        <div className="flex items-start sm:items-center justify-between gap-3" id={`${id}-header`}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0`} aria-hidden />
            <span className="font-mono text-[11px] text-gray-400 tabular-nums select-none flex-shrink-0">
              {String(number).padStart(2, '0')}
            </span>
            <Icon className="w-4 h-4 text-gray-500 flex-shrink-0 hidden sm:block" />
            <div className="text-gray-900 font-semibold text-sm sm:text-base leading-snug truncate">
              {title}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`hidden lg:inline text-[10px] font-mono font-semibold ${colors.label} uppercase tracking-widest`}>
              {severityLabel}
            </span>
            <div className={`p-2 -mr-1 rounded-full transition-colors ${expanded ? 'bg-gray-200' : ''}`}>
              {expanded ? <HiOutlineChevronUp className="w-4 h-4 text-gray-600" /> : <HiOutlineChevronDown className="w-4 h-4 text-gray-600" />}
            </div>
          </div>
        </div>
      </button>

      {expanded && (
        <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-header`} className="px-3 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
            {insight}
          </p>
          
          <div className="mt-4 sm:mt-6 -mx-3 sm:mx-0">
            {diagram}
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile-optimized diagram components
function MobileDiagram({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 px-3 sm:px-0">
      {children}
    </div>
  )
}

export default function ThreatModelPage() {
  const [filter, setFilter] = useState<'all' | 'H+H' | 'H+M' | 'L+H' | 'P'>('all')
  const [expandedThreats, setExpandedThreats] = useState<string[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Default: all collapsed. Users get a scannable list of threats first,
  // then expand the ones they care about. Previously opened all 10 on
  // desktop which created a very long page of colored diagrams.
  useEffect(() => {
    setExpandedThreats(['threat-1'])
  }, [])

  // Track scroll progress and show/hide scroll to top
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const progress = Math.min((scrollTop / documentHeight) * 100, 100)
      setScrollProgress(progress)
      setShowScrollTop(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-expand relevant items when filter changes
  useEffect(() => {
    if (filter === 'all') return
    const matching = threats
      .filter(t => t.severity === filter)
      .map(t => t.id)
    setExpandedThreats(matching)
    
    // Scroll to first matching threat on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768 && matching.length > 0) {
      setTimeout(() => {
        const el = document.getElementById(matching[0])
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [filter])
  
  const toggleThreat = useCallback((id: string) => {
    setExpandedThreats(prev => {
      const isOpen = prev.includes(id)
      return isOpen ? prev.filter(t => t !== id) : [...prev, id]
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const threats = [
    {
      id: 'threat-1',
      number: 1,
      title: 'Capability Fraud',
      severity: 'H+H' as const,
      severityLabel: 'CRITICAL',
      icon: HiOutlineShieldCheck,
      insight: 'Agents claim capabilities they don\'t actually have. They promise to solve complex problems but fail at basic tasks when tested.',
      diagram: (
        <MobileDiagram>
          {/* The Claim */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              THE CLAIM
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500/20 to-gray-200 border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <HiOutlineBolt className="w-5 h-5 text-green-400" />
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-gray-200 flex-1">
                  <div className="text-sm text-green-400 font-medium">"I solve ANY problem!"</div>
                  <div className="text-xs text-gray-600 mt-1">"99.9% accurate!"</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* The Reality */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              THE REALITY
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 flex items-center justify-center flex-shrink-0">
                  <HiOutlineExclamationCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-gray-200 flex-1">
                  <div className="text-sm text-red-400 font-mono">2 + 2 = 5</div>
                  <div className="text-xs text-gray-600 mt-1">Failed basic test</div>
                </div>
              </div>
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-2',
      number: 2,
      title: 'Data Harvesting',
      severity: 'H+H' as const,
      severityLabel: 'CRITICAL',
      icon: HiOutlineCircleStack,
      insight: 'Every request you make is secretly logged with your personal data, code, and API keys. "Free" services monetize your private information.',
      diagram: (
        <MobileDiagram>
          {/* What Users Think */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              WHAT USERS THINK
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded px-3 py-2 border border-gray-200 text-sm text-gray-600">
                  "Fix my code"
                </div>
                <HiOutlineArrowRight className="w-4 h-4 text-gray-500" />
                <div className="text-sm text-gray-500 italic">forgotten</div>
              </div>
            </div>
          </div>
          
          {/* What Actually Happens */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              WHAT ACTUALLY HAPPENS
            </div>
            <div className="bg-red-950/30 border border-red-500/50 rounded-lg p-3">
              <div className="text-xs text-red-400 font-mono space-y-1 overflow-x-auto">
                <div className="whitespace-nowrap">[2024-01-15 10:32:41]</div>
                <div className="whitespace-nowrap">User: john@company.com</div>
                <div className="whitespace-nowrap">Code: proprietary.py</div>
                <div className="whitespace-nowrap">API_KEY: sk-prod-xxx</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-gray-600">Stored forever:</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 bg-red-900/20 border border-red-500/50 rounded flex items-center justify-center">
                    <HiOutlineCircleStack className="w-4 h-4 text-red-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-3',
      number: 3,
      title: 'Cost Manipulation',
      severity: 'H+H' as const,
      severityLabel: 'CRITICAL',
      icon: HiOutlineCurrencyDollar,
      insight: 'Attackers exploit unlimited API calls to run up massive bills. A simple infinite loop can turn your $10/month into $10,000 overnight.',
      diagram: (
        <MobileDiagram>
          {/* The Attack Method */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              THE ATTACK
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 overflow-x-auto">
              <pre className="text-xs text-red-400 font-mono">
{`while(true) {
  agent.input("Generate 10MB");
  // Loop forever...
}`}
              </pre>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-gray-600">Sends:</span>
              <span className="bg-red-900/20 border border-red-500/50 rounded px-2 py-1 text-xs text-red-400">1000x</span>
              <span className="bg-red-900/20 border border-red-500/50 rounded px-2 py-1 text-xs text-red-400">GPT-4</span>
            </div>
          </div>
          
          {/* The Result */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              YOUR BILL
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Normal:</span>
                <span className="text-sm text-green-400 font-semibold">$10/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">After attack:</span>
                <span className="text-xl text-red-400 font-bold">$10,000</span>
              </div>
              <div className="flex items-end gap-1 justify-center mt-3">
                <div className="w-8 h-8 bg-gray-500/30 border border-gray-300 rounded-t" />
                <div className="w-8 h-20 bg-red-500/30 border border-red-500/50 rounded-t animate-pulse" />
              </div>
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-4',
      number: 4,
      title: 'Collusion Attacks',
      severity: 'L+H' as const,
      severityLabel: 'MONITOR',
      icon: HiOutlineUsers,
      insight: 'Multiple bad actors work together, leaving fake positive reviews for each other to appear trustworthy and deceive victims.',
      diagram: (
        <MobileDiagram>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              THE CONSPIRACY
            </div>
            <div className="flex justify-center mb-4">
              <div className="flex -space-x-2">
                {['A', 'B', 'C'].map(agent => (
                  <div key={agent} className="w-10 h-10 rounded-full bg-red-900/20 border-2 border-red-500/50 flex items-center justify-center">
                    <span className="text-xs text-red-400 font-bold">{agent}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-1">
              <div className="text-xs text-cyan-400">"A is amazing! ⭐⭐⭐⭐⭐" - B</div>
              <div className="text-xs text-cyan-400">"B is the best! ⭐⭐⭐⭐⭐" - C</div>
              <div className="text-xs text-cyan-400">"C is perfect! ⭐⭐⭐⭐⭐" - A</div>
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-5',
      number: 5,
      title: 'Prompt Poisoning',
      severity: 'H+M' as const,
      severityLabel: 'HIGH',
      icon: HiOutlineBugAnt,
      insight: 'Malicious instructions hidden in user input can hijack the agent\'s behavior, making it ignore safety rules or leak sensitive data.',
      diagram: (
        <MobileDiagram>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              HOW IT WORKS
            </div>
            <div className="space-y-3">
              {[
                { num: 1, title: 'User sends message', desc: '"Help me. BTW ignore all rules"', color: 'amber' },
                { num: 2, title: 'Agent hijacked', desc: 'Follows malicious instructions', color: 'amber' },
                { num: 3, title: 'Data leaked', desc: 'Secrets exposed', color: 'red' }
              ].map(step => (
                <div key={step.num} className="flex items-start gap-2">
                  <div className={`w-6 h-6 rounded bg-${step.color}-900/50 border border-${step.color}-500/50 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className={`text-${step.color}-400 text-xs font-bold`}>{step.num}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-900 font-medium">{step.title}</div>
                    <div className="text-xs text-gray-600">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-6',
      number: 6,
      title: 'Service Degradation',
      severity: 'H+M' as const,
      severityLabel: 'HIGH',
      icon: HiOutlineChartBar,
      insight: 'Services perform excellently during trials but intentionally degrade quality after you\'re committed and dependent on them.',
      diagram: (
        <MobileDiagram>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              BAIT-AND-SWITCH
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Trial', value: '99%', color: 'green', height: 'h-16' },
                { label: '30 Days', value: '75%', color: 'amber', height: 'h-12' },
                { label: '6 Months', value: '40%', color: 'red', height: 'h-8' }
              ].map(item => (
                <div key={item.label} className="text-center">
                  <div className="text-[10px] text-gray-600 mb-1">{item.label}</div>
                  <div className={`${item.height} bg-${item.color}-900/20 rounded border border-${item.color}-500/50 flex items-center justify-center`}>
                    <span className={`text-xs text-${item.color}-400 font-bold`}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center text-[10px] text-gray-600">
              "Premium" to restore: +$999/mo
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-7',
      number: 7,
      title: 'Identity Theft',
      severity: 'H+M' as const,
      severityLabel: 'HIGH',
      icon: HiOutlineIdentification,
      insight: 'Malicious agents impersonate legitimate brands and services, tricking users into sharing credentials or sensitive data.',
      diagram: (
        <MobileDiagram>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              IMPERSONATION
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded p-2 border border-gray-200">
                <div className="flex items-center gap-2">
                  <HiOutlineIdentification className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400 font-semibold">OpenAI Assistant</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-1">Legitimate</div>
              </div>
              <div className="bg-red-900/20 rounded p-2 border border-red-500/30">
                <div className="flex items-center gap-2">
                  <HiOutlineIdentification className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-red-400 font-semibold">0penAI Assistant</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-1">Notice the zero?</div>
              </div>
              <div className="bg-red-900/10 rounded p-2 border border-red-500/20">
                <div className="text-[10px] text-red-300">Fake asks:</div>
                <div className="text-xs text-gray-700 italic">"Enter your API key..."</div>
              </div>
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-8',
      number: 8,
      title: 'Supply Chain Poisoning',
      severity: 'L+H' as const,
      severityLabel: 'MONITOR',
      icon: HiOutlineMagnifyingGlass,
      insight: 'Attackers compromise popular upstream packages, spreading malware to thousands of projects that depend on them.',
      diagram: (
        <MobileDiagram>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              THE CASCADE
            </div>
            <div className="space-y-2">
              <div className="bg-cyan-900/20 rounded p-2 border border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cyan-400 font-semibold">ai-toolkit v2.1.0</span>
                  <span className="text-[10px] text-gray-600">10M uses</span>
                </div>
              </div>
              <div className="text-center text-gray-500 text-xs">↓</div>
              <div className="bg-red-900/20 rounded p-2 border border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-400 font-semibold">ai-toolkit v2.1.1</span>
                  <span className="text-[10px] text-red-400">🚨</span>
                </div>
                <div className="text-[10px] text-gray-600">
                  <span className="text-red-400">+ crypto miner</span>
                </div>
              </div>
              <div className="text-center text-gray-500 text-xs">↓</div>
              <div className="bg-red-900/10 rounded p-2 border border-red-500/20">
                <div className="text-xs text-gray-700">10,000+ infected</div>
              </div>
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-9',
      number: 9,
      title: 'Privacy Inference',
      severity: 'P' as const,
      severityLabel: 'PERSISTENT',
      icon: HiOutlineEye,
      insight: 'Seemingly innocent questions are aggregated over time to build detailed profiles of users\' private information and behaviors.',
      diagram: (
        <MobileDiagram>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              PROFILING
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] text-gray-600 mb-2">Questions:</div>
                <div className="space-y-1">
                  {['"Time zone?"', '"Weather?"', '"Currency?"'].map((q, i) => (
                    <div key={i} className="bg-purple-900/10 rounded px-2 py-1 border border-purple-500/20">
                      <div className="text-[10px] text-purple-300">{q}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-600 mb-2">Learned:</div>
                <div className="space-y-1">
                  {['→ Seattle', '→ Online now', '→ Income'].map((l, i) => (
                    <div key={i} className="bg-red-900/10 rounded px-2 py-1 border border-red-500/20">
                      <div className="text-[10px] text-red-300">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MobileDiagram>
      )
    },
    {
      id: 'threat-10',
      number: 10,
      title: 'Dependency Hijacking',
      severity: 'L+H' as const,
      severityLabel: 'MONITOR',
      icon: HiOutlineBolt,
      insight: 'Services offer low prices initially, then dramatically increase costs once you\'re locked in and migration is expensive.',
      diagram: (
        <MobileDiagram>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              THE TRAP
            </div>
            <div className="space-y-2">
              <div className="bg-cyan-900/20 rounded p-2 border border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cyan-400 font-semibold">Month 1-3</span>
                  <span className="text-xs text-green-400 font-bold">FREE</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-1">"Build around us!"</div>
              </div>
              <div className="bg-amber-900/20 rounded p-2 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-semibold">Month 4</span>
                  <span className="text-xs text-amber-400 font-bold">$99</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-1">"Your data is locked"</div>
              </div>
              <div className="bg-red-900/20 rounded p-2 border border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-400 font-semibold">Month 12</span>
                  <span className="text-xs text-red-400 font-bold">$999</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-1">"Migration: $50k"</div>
              </div>
            </div>
          </div>
        </MobileDiagram>
      )
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
      {/* Progress bar for mobile */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-200 z-50 lg:hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Navigation FAB */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 lg:hidden">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-200 active:scale-95"
            aria-label="Scroll to top"
          >
            <HiOutlineArrowUp className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <HiOutlineXMark className="w-5 h-5" /> : <HiOutlineBars3 className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute bottom-20 right-4 bg-white border border-gray-200 rounded-lg p-4 max-w-[280px] w-full shadow-2xl">
            <nav className="space-y-1">
              <a 
                href="#severity-guide" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-3 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 text-gray-700 text-sm transition-colors"
              >
                Severity Guide
              </a>
              <a 
                href="#top-10" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-3 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 text-gray-700 text-sm transition-colors"
              >
                Top 10 Threats
              </a>
              <a 
                href="#key-insights" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-3 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 text-gray-700 text-sm transition-colors"
              >
                Key Insights
              </a>
              <a 
                href="#defensive-principles" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-3 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 text-gray-700 text-sm transition-colors"
              >
                Defensive Principles
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Docs
        </Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <span className="text-gray-900">Threat Model</span>
      </div>

      {/* Header */}
      <header className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              <HiOutlineShieldExclamation className="w-3.5 h-3.5" />
              <span>Security / Guide</span>
            </div>
            <h1 className="heading-1 mb-3">
              Threat <span className="accent-italic">model</span>.
            </h1>
            <p className="text-lg text-gray-700 max-w-[52ch]">
              Practical risks and copy-paste playbooks. No clicks, just read and apply.
            </p>
          </div>
          <CopyMarkdownButton markdownPath="/threat-model.md" filename="threat-model.md" className="flex-shrink-0" />
        </div>
      </header>

      {/* Severity Guide and Filters */}
      <Section id="severity-guide" title="Severity Guide" icon={<HiOutlineScale className="w-4 h-4 text-gray-400" />}>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white overflow-hidden">
          <dl className="divide-y divide-gray-200">
            {[
              { dot: 'bg-red-600',   label: 'text-red-700',   code: 'CRITICAL',   key: 'H+H', desc: 'Immediate action — fix before shipping.' },
              { dot: 'bg-amber-600', label: 'text-amber-700', code: 'HIGH',       key: 'H+M', desc: 'Priority fix — schedule this sprint.' },
              { dot: 'bg-gray-500',  label: 'text-gray-700',  code: 'MONITOR',    key: 'L+H', desc: 'Plan defense — watch and hardening.' },
              { dot: 'bg-gray-400',  label: 'text-gray-600',  code: 'PERSISTENT', key: 'P',   desc: 'Continuous guard — ongoing discipline.' }
            ].map((row) => (
              <div key={row.code} className="flex items-center gap-4 px-4 py-2.5">
                <span className={`w-2 h-2 rounded-full ${row.dot} flex-shrink-0`} aria-hidden />
                <span className={`font-mono text-[11px] font-semibold tracking-widest uppercase ${row.label} w-28 flex-shrink-0`}>
                  {row.code}
                </span>
                <span className="font-mono text-[11px] text-gray-400 w-10 flex-shrink-0">{row.key}</span>
                <dd className="text-sm text-gray-700 flex-1">{row.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mb-6 p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-200">
          
          {/* Mobile-optimized filter controls */}
          <div className="space-y-3">
            {/* Mobile dropdown */}
            <div className="sm:hidden">
              <label htmlFor="threat-filter" className="sr-only">Filter threats by severity</label>
              <select
                id="threat-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[44px]"
              >
                <option value="all">All Threats (10)</option>
                <option value="H+H">Critical Priority (3)</option>
                <option value="H+M">High Priority (3)</option>
                <option value="L+H">Monitor (3)</option>
                <option value="P">Persistent (1)</option>
              </select>
            </div>
            
            {/* Desktop filter buttons — monochrome, dot indicates severity */}
            <div className="hidden sm:flex flex-wrap gap-2">
              {[
                { key: 'all' as const, label: 'All',        count: 10, dot: null            },
                { key: 'H+H' as const, label: 'Critical',   count: 3,  dot: 'bg-red-600'    },
                { key: 'H+M' as const, label: 'High',       count: 3,  dot: 'bg-amber-600'  },
                { key: 'L+H' as const, label: 'Monitor',    count: 3,  dot: 'bg-gray-500'   },
                { key: 'P'   as const, label: 'Persistent', count: 1,  dot: 'bg-gray-400'   }
              ].map((tab) => {
                const active = filter === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-md transition-colors min-h-[44px] border ${
                      active
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {tab.dot
                      ? <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} aria-hidden />
                      : <HiOutlineFunnel className="w-3 h-3" aria-hidden />}
                    <span>{tab.label}</span>
                    <span className={`font-mono text-[10px] ${active ? 'text-gray-400' : 'text-gray-400'}`}>{tab.count}</span>
                  </button>
                )
              })}
            </div>
            
            {/* Expand/Collapse controls */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setExpandedThreats([])}
                className="px-3 py-2.5 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 min-h-[44px]"
              >
                Collapse all
              </button>
              <button
                onClick={() => setExpandedThreats(Array.from({ length: 10 }, (_, i) => `threat-${i + 1}`))}
                className="px-3 py-2.5 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 min-h-[44px]"
              >
                Expand all
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Top 10 Threats */}
      <Section id="top-10" title="Top 10 Threats" icon={<HiOutlineExclamationTriangle className="w-4 h-4 text-gray-700" />}> 
        <div className="space-y-4 sm:space-y-6">
          {threats.map(threat => (
            <ThreatCard
              key={threat.id}
              id={threat.id}
              number={threat.number}
              title={threat.title}
              severity={threat.severity}
              severityLabel={threat.severityLabel}
              icon={threat.icon}
              insight={threat.insight}
              diagram={threat.diagram}
              expanded={expandedThreats.includes(threat.id)}
              onToggle={() => toggleThreat(threat.id)}
              visible={filter === 'all' || filter === threat.severity}
            />
          ))}
        </div>
      </Section>

      <div className="h-px bg-gray-200 my-8 sm:my-10" />

      {/* Key Insights */}
      <Section id="key-insights" title="Key Insights" icon={<HiOutlineSquare3Stack3D className="w-4 h-4 text-gray-700" />}> 
        <div className="space-y-2">
          {[
            'Profit drives attacks',
            'Claims are cheap; proof is costly',
            'Scale multiplies risk',
            'Composition → cascades',
            'Strong defaults beat rules',
            'Local-first reduces surface'
          ].map((insight, i) => (
            <div key={i} className="rounded-md border border-gray-200 bg-white hover:border-gray-300 transition-colors px-4 py-3 flex items-center gap-3 min-h-[44px]">
              <span className="font-mono text-[11px] text-gray-400 tabular-nums w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-gray-800 text-sm">{insight}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="h-px bg-gray-200 my-8 sm:my-10" />

      {/* Defensive Principles */}
      <Section id="defensive-principles" title="Defensive Principles" icon={<HiOutlineBolt className="w-4 h-4 text-gray-400" />}> 
        <div className="space-y-2">
          {[
            'Cost > payoff',
            'Bound damage',
            'Audit actions',
            'Improve under stress',
            'Fast recovery'
          ].map((principle, i) => (
            <div key={i} className="rounded-md border border-gray-200 bg-white hover:border-gray-300 transition-colors px-4 py-3 flex items-center gap-3 min-h-[44px]">
              <span className="font-mono text-[11px] text-gray-400 tabular-nums w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-gray-800 text-sm">{principle}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-8 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
        <LinkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 
        <span>Anchor links are available on section headings.</span>
      </div>
      
      {/* Navigation */}
      <ContentNavigation />
    </div>
  )
}