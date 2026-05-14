'use client'

import CodeWithResult from '../../../components/CodeWithResult'
import { HiOutlineShieldCheck, HiOutlineUsers, HiOutlineCodeBracket, HiOutlineBolt, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineBookOpen, HiOutlineDocumentText, HiOutlineCpuChip } from 'react-icons/hi2'
import Link from 'next/link'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'

export default function TrustPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50 border-b border-gray-200">
        <div className="relative max-w-4xl mx-auto px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="text-sm text-gray-500 font-medium mb-4">Core Feature</div>
              <h1 className="heading-1">
                Trust in ConnectOnion
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl">
                Server-side access control for hosted agents — decide who can call your agent
              </p>
            </div>
            <CopyMarkdownButton markdownPath="/trust/trust.md" filename="trust.md" className="flex-shrink-0" />
          </div>

          {/* Why Trust Blog Link */}
          <Link
            href="/blog/trust-keyword"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all group"
          >
            <HiOutlineBookOpen className="w-4 h-4 icon-ui" />
            <span className="text-sm text-gray-600">Read: Why we chose "trust" as our keyword</span>
            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Start */}
            <section>
              <h2 className="heading-2">
                <HiOutlineBolt className="w-7 h-7 text-gray-400" />
                Quick Start
              </h2>
              <p className="text-gray-700 mb-4">
                Trust is configured on <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">host()</code> — it controls which incoming
                requests reach your agent. There are three valid levels: <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">"open"</code>,
                <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">"careful"</code> (default), and <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">"strict"</code>.
              </p>
              <CodeWithResult
                code={`from connectonion import Agent, host

def create_agent():
    return Agent("my_service", tools=[process_data])

# Default: "careful" — uses .co/host.yaml policy
host(create_agent)

# Or set explicitly:
host(create_agent, trust="open")     # Development: accept all callers
host(create_agent, trust="careful")  # Default: ask LLM on unknown callers
host(create_agent, trust="strict")   # Production: only whitelisted/contacts`}
                result=""
              />
            </section>

            {/* Three Forms of Trust */}
            <section>
              <h2 className="heading-2">
                <HiOutlineCodeBracket className="w-7 h-7 text-gray-400" />
                Three Forms of Trust
              </h2>

              {/* 1. Trust Levels */}
              <div className="mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-gray-500">1.</span> Trust Levels (String)
                  </h3>
                  <p className="text-gray-700 mb-4">Simple predefined levels for common scenarios:</p>
                </div>
                <CodeWithResult
                  code={`from connectonion import host

# Development - accept every incoming caller
host(create_agent, trust="open")

# Default - LLM evaluates unknown callers against the careful policy
host(create_agent, trust="careful")

# Production - only whitelisted addresses or established contacts
host(create_agent, trust="strict")`}
                  result=""
                />
              </div>

              {/* 2. Trust Policy */}
              <div className="mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineDocumentText className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-500">2.</span> Trust Policy (Natural Language)
                  </h3>
                  <p className="text-gray-700 mb-2">Express complex requirements in plain English:</p>
                </div>
                <CodeWithResult
                  code={`# Inline policy (multi-line string)
host(create_agent, trust="""
---
allow: [whitelisted, contact]
deny: [blocked]
default: ask
---
I accept callers who:
- Are on my whitelist or have been promoted to contact
- Pass a capability check before processing payments
""")

# From file
host(create_agent, trust="./trust_policy.md")`}
                  result=""
                />
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">Policy file format (YAML frontmatter + markdown):</p>
                  <pre className="text-xs text-gray-600 overflow-x-auto"><code>{`---
allow: [whitelisted, contact]
deny: [blocked]
onboard:
  invite_code: [BETA2024]
  payment: 10
default: ask
---
# LLM-evaluated rules (only run when default: ask matches)

I accept callers that meet ALL of these criteria:
- Have a valid invite code, OR have transferred at least 10 credits
- Are not on my blacklist

I immediately reject callers that:
- Have failed a previous capability check
- Are on my blacklist`}</code></pre>
                  <p className="text-xs text-gray-500 mt-2">
                    Fast rules (frontmatter) execute without an LLM call. Only <code className="bg-gray-100 px-1 rounded">default: ask</code> hands the decision to the policy LLM.
                  </p>
                </div>
              </div>

              {/* 3. Trust Agent */}
              <div className="mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineCpuChip className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-500">3.</span> Trust Agent
                  </h3>
                  <p className="text-gray-700 mb-2">For maximum control, use a custom trust agent:</p>
                </div>
                <CodeWithResult
                  code={`from connectonion import Agent, host
from connectonion.network.trust import TrustAgent

# Built-in TrustAgent (configurable level + custom verification)
trust = TrustAgent("careful", model="co/gpt-4o-mini")
host(create_agent, trust=trust)

# Or pass any Agent with verification tools
guardian = Agent(
    name="my_guardian",
    tools=[check_whitelist, verify_capability, check_reputation],
    system_prompt="""
        You verify incoming callers before allowing them to call my service.
        Be strict with payment processors, relaxed with read-only services.
    """
)
host(create_agent, trust=guardian)`}
                  result=""
                />
              </div>
            </section>

            {/* Caller side */}
            <section>
              <h2 className="heading-2">
                <HiOutlineUsers className="w-7 h-7 text-gray-500" />
                The Caller Side
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-4">
                  Trust runs on the host. To <em>call</em> a hosted agent, use <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">connect()</code>
                  with the agent's address. If the host runs <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">trust="strict"</code>,
                  pass your signing keys so the host can verify you.
                </p>
              </div>
              <CodeWithResult
                code={`from connectonion import connect, address

# Open / careful hosts: just connect with the address
agent = connect("0x3d4017c3...")
response = agent.input("Translate hello to Spanish")

# Strict hosts: pass keys for signed requests
keys = address.load(".co")
agent = connect("0x3d4017c3...", keys=keys)
response = agent.input("Process this payment")`}
                result=""
              />
            </section>

            {/* Environment-Based Defaults */}
            <section>
              <h2 className="heading-2">Environment-Based Defaults</h2>
              <p className="text-gray-700 mb-4">
                If you don't pass <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">trust=</code> and don't set it in
                <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">.co/host.yaml</code>, the level is derived from the
                <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">CONNECTONION_ENV</code> environment variable:
              </p>
              <CodeWithResult
                code={`# CONNECTONION_ENV=development  →  trust="open"
# CONNECTONION_ENV=staging      →  trust="careful"
# CONNECTONION_ENV=test         →  trust="careful"
# CONNECTONION_ENV=production   →  trust="strict"
# (unset)                       →  "careful" (host() final fallback)

import os
os.environ['CONNECTONION_ENV'] = 'production'
host(create_agent)  # Now strict by default`}
                result=""
              />
            </section>

            {/* Common Patterns */}
            <section>
              <h2 className="heading-2">Common Patterns</h2>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Development</h4>
                  <CodeWithResult
                    code={`# Accept all incoming requests during local iteration
host(create_agent, trust="open")`}
                    result=""
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Production</h4>
                  <CodeWithResult
                    code={`# Only callers on the whitelist or established contacts
host(
    create_agent,
    trust="strict",
    whitelist=["0xpartner1...", "0xpartner2..."],
)`}
                    result=""
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Block-List Override</h4>
                  <CodeWithResult
                    code={`# Careful by default, but always reject these addresses
host(
    create_agent,
    trust="careful",
    blacklist=["0xbad1...", "0xbad2..."],
)`}
                    result=""
                  />
                </div>
              </div>
            </section>

            {/* Security Best Practices */}
            <section>
              <h2 className="heading-2">Security Best Practices</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Production = Strict:</span>
                      <span className="text-gray-700"> Always use <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">trust="strict"</code> in production</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Test Sensitive Operations:</span>
                      <span className="text-gray-700"> Payment, data modification, etc.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Whitelist Critical Services:</span>
                      <span className="text-gray-700"> Manually verify and whitelist</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Monitor Trust Decisions:</span>
                      <span className="text-gray-700"> Log all trust evaluations</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Regular Audits:</span>
                      <span className="text-gray-700"> Review whitelist and trust policies</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="heading-2">FAQ</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: What's the default trust level?</p>
                  <p className="text-gray-700 text-sm">A: <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">"careful"</code> when nothing is set in <code className="bg-gray-100 px-1 rounded">.co/host.yaml</code> or <code className="bg-gray-100 px-1 rounded">CONNECTONION_ENV</code>.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Where is trust applied — when I create an Agent, or when I call <code className="bg-gray-100 px-1 rounded">host()</code>?</p>
                  <p className="text-gray-700 text-sm">A: Only on <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">host()</code>. The <code className="bg-gray-100 px-1 rounded">Agent()</code> constructor has no <code className="bg-gray-100 px-1 rounded">trust=</code> parameter — trust is enforcement at the network boundary, not on the agent object.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Where do whitelist / blacklist live?</p>
                  <p className="text-gray-700 text-sm">A: Pass <code className="bg-gray-100 px-1 rounded">whitelist=[...]</code> / <code className="bg-gray-100 px-1 rounded">blacklist=[...]</code> to <code className="bg-gray-100 px-1 rounded">host()</code>, or put one address per line in <code className="bg-gray-100 px-1 rounded">.co/whitelist.txt</code> and <code className="bg-gray-100 px-1 rounded">.co/blacklist.txt</code>.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Does the LLM get called on every request?</p>
                  <p className="text-gray-700 text-sm">A: No. Fast rules in the policy YAML frontmatter (<code className="bg-gray-100 px-1 rounded">allow</code>, <code className="bg-gray-100 px-1 rounded">deny</code>, <code className="bg-gray-100 px-1 rounded">onboard</code>) execute without an LLM call. The LLM only runs when <code className="bg-gray-100 px-1 rounded">default: ask</code> matches.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Can I disable trust completely?</p>
                  <p className="text-gray-700 text-sm">A: Yes: <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">host(create_agent, trust="open")</code> accepts every caller without checks.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Decision Helper */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 icon-ui" />
                Choose Your Trust Level
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Development?</p>
                  <code className="text-xs text-gray-700 font-mono">trust="open"</code>
                  <p className="text-xs text-gray-500 mt-1">Accept every caller, iterate fast</p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Default / Staging?</p>
                  <code className="text-xs text-gray-700 font-mono">trust="careful"</code>
                  <p className="text-xs text-gray-500 mt-1">Fast rules + LLM-evaluated unknowns</p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Production?</p>
                  <code className="text-xs text-gray-700 font-mono">trust="strict"</code>
                  <p className="text-xs text-gray-500 mt-1">Whitelisted / contacts only</p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <HiOutlineExclamationCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Security Note</p>
                  <p className="text-xs text-gray-600">
                    Always use <code className="bg-gray-100 px-1.5 py-0.5 rounded">trust="strict"</code> in production environments to prevent unauthorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16">
          <ContentNavigation />
        </div>
      </div>
    </div>
  )
}
