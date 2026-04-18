/*
  DESIGN INCONSISTENCY ISSUES FOUND (2025-01-02):
  
  1. **Navigation System Chaos** (Priority: CRITICAL)
     - Uses ContentNavigation component for automatic Previous/Next
     - Has breadcrumb but with "Back to Home" instead of standard breadcrumb
     - Has CopyMarkdownButton component
     - Consistent with main docs pages
     - BUT: Many pages have custom navigation implementations
     - Examples use custom "Previous/Next in series" navigation
     - Blog has simple "Back to Docs" link
     - Roadmap has no page navigation at all
     - FIX: Standardize on ContentNavigation component across ALL pages
  
  2. **Copy Button Implementation** (Priority: HIGH)
     - Some pages have CopyMarkdownButton component (good)
     - Some pages have custom copy implementations
     - Some pages missing copy functionality entirely
     - Different icons and placements
     - FIX: Use CopyMarkdownButton consistently on every documentation page
  
  3. **Code Display Patterns** (Priority: HIGH)  
     - CodeWithResult component used inconsistently
     - Some pages use raw SyntaxHighlighter
     - Line numbers sometimes present, sometimes not
     - Different font sizes and padding across pages
     - FIX: Always use CodeWithResult for code examples with output
  
  4. **Breadcrumb Navigation** (Priority: MEDIUM)
     - Some pages have breadcrumb navigation (Home > Page)
     - Some have "Back to Docs" or "Back to Home" link
     - Format inconsistent across site
     - Icon usage varies (ArrowRight vs ArrowLeft)
     - FIX: Implement consistent breadcrumb component
  
  5. **Page Header Structure** (Priority: MEDIUM)
     - Different layouts for page titles
     - Icon placement varies (left, right, inline)
     - Description text size inconsistent
     - FIX: Create standardized PageHeader component
*/

'use client'

import React, { useState } from 'react'
import { HiOutlineBolt, HiOutlineGlobeAlt, HiOutlineCpuChip, HiOutlineCurrencyDollar, HiOutlineEye, HiOutlineSquare3Stack3D, HiOutlineUsers, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import CodeWithResult from '../../components/CodeWithResult'
import { CommandBlock } from '../../components/CommandBlock'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function ModelsPage() {
  const [activeProvider, setActiveProvider] = useState<'openai' | 'google' | 'anthropic' | 'mistral'>('openai')

  const markdownContent = `# Models

ConnectOnion supports the latest models from OpenAI, Google Gemini, Anthropic Claude, and Mistral AI. Get started in 60 seconds with managed keys, or bring your own API keys.

## Quick Start (60 Seconds)

**Easiest Way: Use Managed Keys** - No API key setup required!

\`\`\`bash
# Authenticate once (includes 100K free tokens)
co auth
\`\`\`

\`\`\`python
from connectonion import Agent

# Add co/ prefix - that's it!
agent = Agent("assistant", model="co/gpt-5")
response = agent.input("Hello!")
\`\`\`

⭐ **Bonus**: Star our repo for +100K tokens!

**Alternative: Bring Your Own Keys**

\`\`\`bash
# Set your API key
export OPENAI_API_KEY="sk-..."
\`\`\`

\`\`\`python
from connectonion import Agent

# Use model names directly
agent = Agent("assistant", model="gpt-5")
response = agent.input("Hello!")
\`\`\`

## Supported Models

### OpenAI Models
- **gpt-5** - Best for coding and agentic tasks
- **gpt-5-mini** - Faster, cost-efficient version
- **gpt-5-nano** - Fastest, most cost-efficient
- **o4-mini** - OpenAI's newest reasoning model

### Google Gemini Models
- **gemini-3-pro-preview** - State-of-the-art reasoning, 1M context
- **gemini-3-flash-preview** - Fastest Gemini 3 model
- **gemini-3.1-flash-lite-preview** - Ultra fast, cheapest Gemini 3
- **gemini-2.5-pro** - Default model, best price-performance for agents
- **gemini-2.5-flash** - Best price-performance ratio
- **gemini-2.0-flash** - Previous gen workhorse

### Anthropic Claude Models
- **claude-opus-4-5** - Most capable Claude model
- **claude-sonnet-4-5** - Best balance of intelligence and speed
- **claude-haiku-4-5** - Fastest with near-frontier intelligence
- **claude-sonnet-4** - Balanced performance (previous gen)

## Model Selection Guide

### By Use Case

**Best Overall Performance**
\`\`\`python
agent = Agent("assistant", model="gpt-5")           # OpenAI flagship
agent = Agent("assistant", model="gemini-2.5-pro")  # Google default
agent = Agent("assistant", model="claude-opus-4-5") # Anthropic flagship
\`\`\`

**Code Generation**
\`\`\`python
agent = Agent("coder", model="gpt-5")               # Best for coding
agent = Agent("coder", model="claude-sonnet-4-5")   # Alternative
\`\`\`

**Fast Responses**
\`\`\`python
agent = Agent("quick", model="gpt-5-nano")          # OpenAI fastest
agent = Agent("quick", model="gemini-2.5-flash")    # Google fast
\`\`\`

**Long Context (>200K tokens)**
\`\`\`python
agent = Agent("reader", model="gemini-2.5-pro")     # 2M tokens
\`\`\`

## Setting Up API Keys

\`\`\`bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Google Gemini (recommended - matches Google's official SDK)
export GEMINI_API_KEY="AIza..."
# Note: GOOGLE_API_KEY also works but GEMINI_API_KEY is preferred

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."
\`\`\`

**Important:** For Gemini models, use \`GEMINI_API_KEY\` as recommended by [Google's official documentation](https://ai.google.dev/gemini-api/docs/api-key). While \`GOOGLE_API_KEY\` is supported for backward compatibility, \`GEMINI_API_KEY\` is the standard used by Google's Python SDK and most tools in the ecosystem.`

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <PageHeader
        breadcrumbs={[
          { label: 'Docs', href: '/' },
          { label: 'Models' }
        ]}
        icon={HiOutlineCpuChip}
        iconColor="icon-ui"
        title="Models"
        description="Use the latest AI models from OpenAI, Google, Anthropic, and Mistral with a single interface."
        markdownPath="/models/models.md"
        markdownFilename="models.md"
      />

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="heading-2">Quick Start (60 Seconds)</h2>

        {/* Managed Keys Path */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
            <HiOutlineBolt className="mr-2 h-5 w-5 icon-ui" />
            Easiest Way: Use Managed Keys
          </h3>
          <p className="text-gray-700 mb-4">
            No API key setup required! Authenticate once and get 100K free tokens to start.
          </p>

          <div className="mb-4">
            <CommandBlock commands={['co auth']} />
          </div>

          <CodeWithResult
            code={`from connectonion import Agent

# Add co/ prefix - that's it!
agent = Agent("assistant", model="co/gpt-5")
response = agent.input("Explain quantum computing")`}
            result={`Quantum computing harnesses quantum mechanical phenomena...`}
          />

          <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
            <p className="text-sm text-gray-600">
              ⭐ <strong>Bonus:</strong> <a href="https://github.com/wu-changxing/connectonion" target="_blank" rel="noopener" className="underline hover:text-gray-800">Star our repo</a> for an additional 100K tokens!
            </p>
          </div>
        </div>

        {/* Own Keys Path */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
            <HiOutlineGlobeAlt className="mr-2 h-5 w-5 icon-ui" />
            Alternative: Bring Your Own Keys
          </h3>
          <p className="text-gray-700 mb-4">
            For production or high-volume usage, use your own API keys for direct billing.
          </p>

          <div className="mb-4">
            <CommandBlock commands={['export OPENAI_API_KEY="sk-..."']} />
          </div>

          <CodeWithResult
            code={`from connectonion import Agent

# Use model names directly
agent = Agent("assistant", model="gpt-5")
response = agent.input("Explain quantum computing")`}
            result={`Quantum computing harnesses quantum mechanical phenomena...`}
          />
        </div>
      </section>

      {/* Model Comparison — moved to top so developers can pick a model immediately */}
      <section className="mb-16">
        <h2 className="heading-2">Model Comparison</h2>

        <div className="relative overflow-x-auto rounded-lg">
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 sm:hidden" />
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Model</th>
                <th className="px-4 py-3 text-left font-semibold">Provider</th>
                <th className="px-4 py-3 text-left font-semibold">Context</th>
                <th className="px-4 py-3 text-left font-semibold">Strengths</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3"><code className="text-sm">gpt-5</code></td>
                <td className="px-4 py-3">OpenAI</td>
                <td className="px-4 py-3">200K</td>
                <td className="px-4 py-3 text-gray-700">Best for coding & agentic tasks</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm">gemini-3-pro-preview</code></td>
                <td className="px-4 py-3">Google</td>
                <td className="px-4 py-3">1M</td>
                <td className="px-4 py-3 text-gray-700">State-of-the-art reasoning</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm">gemini-2.5-pro</code></td>
                <td className="px-4 py-3">Google</td>
                <td className="px-4 py-3">2M</td>
                <td className="px-4 py-3 text-gray-700">Multimodal, huge context</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm">claude-opus-4-5</code></td>
                <td className="px-4 py-3">Anthropic</td>
                <td className="px-4 py-3">200K</td>
                <td className="px-4 py-3 text-gray-700">Most capable Claude</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm">mistral-large-latest</code></td>
                <td className="px-4 py-3">Mistral</td>
                <td className="px-4 py-3">128K</td>
                <td className="px-4 py-3 text-gray-700">High performance European model</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Default Models */}
      <section className="mb-16">
        <h2 className="heading-2">Default Models</h2>
        <p className="text-gray-700 mb-4">
          When you don't specify a model, ConnectOnion uses these optimized defaults:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineUsers className="mr-2 h-5 w-5 icon-ui" />
              Agent Default
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              For <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Agent()</code> class
            </p>
            <CodeWithResult
              code={`# Default: co/gemini-2.5-pro
agent = Agent("assistant")  # Uses co/gemini-2.5-pro

# Same as:
agent = Agent("assistant", model="co/gemini-2.5-pro")`}
              result=""
            />
            <p className="text-xs text-gray-500 mt-3">
              Best for agentic tasks with tool calling and complex reasoning
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineBolt className="mr-2 h-5 w-5 icon-ui" />
              llm_do Default
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              For <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">llm_do()</code> function
            </p>
            <CodeWithResult
              code={`from connectonion import llm_do

# Default: co/gemini-2.5-flash
result = llm_do("Summarize this text...")

# Same as:
result = llm_do("...", model="co/gemini-2.5-flash")`}
              result=""
            />
            <p className="text-xs text-gray-500 mt-3">
              Fast and cost-effective for simple LLM calls
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> Default models require authentication with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">co auth</code>.
            To use your own API keys without the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">co/</code> prefix, set <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">GEMINI_API_KEY</code> environment variable.
          </p>
        </div>
      </section>

      {/* Provider Tabs */}
      <section className="mb-16">
        <h2 className="heading-2">Available Models</h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveProvider('openai')}
            className={`px-4 py-2 min-h-[48px] rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              activeProvider === 'openai'
                ? 'bg-gray-900 text-gray-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            OpenAI
          </button>
          <button
            onClick={() => setActiveProvider('google')}
            className={`px-4 py-2 min-h-[48px] rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              activeProvider === 'google'
                ? 'bg-gray-900 text-gray-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Google Gemini
          </button>
          <button
            onClick={() => setActiveProvider('anthropic')}
            className={`px-4 py-2 min-h-[48px] rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              activeProvider === 'anthropic'
                ? 'bg-gray-900 text-gray-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Anthropic Claude
          </button>
          <button
            onClick={() => setActiveProvider('mistral')}
            className={`px-4 py-2 min-h-[48px] rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              activeProvider === 'mistral'
                ? 'bg-gray-900 text-gray-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mistral AI
          </button>
        </div>

        {activeProvider === 'openai' && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineCpuChip className="mr-2 h-5 w-5 icon-ui" />
                GPT-5 Series
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gpt-5</code>
                  <span className="text-gray-700">Best for coding and agentic tasks across domains</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gpt-5-mini</code>
                  <span className="text-gray-700">Faster, cost-efficient version for well-defined tasks</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gpt-5-nano</code>
                  <span className="text-gray-700">Fastest, most cost-efficient version</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineCpuChip className="mr-2 h-5 w-5 icon-ui" />
                Reasoning Models
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm mr-3 font-mono">o4-mini</code>
                  <span className="text-gray-700">OpenAI's newest reasoning model</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeProvider === 'google' && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineCpuChip className="mr-2 h-5 w-5 icon-ui" />
                Gemini 3 (Newest)
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-3-pro-preview</code>
                  <span className="text-gray-700">State-of-the-art reasoning, 1M context - <strong className="text-gray-900">Most intelligent</strong></span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-3-flash-preview</code>
                  <span className="text-gray-700">Fastest Gemini 3 model</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-3-pro-image-preview</code>
                  <span className="text-gray-700">Image generation with grounded generation</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-3.1-flash-lite-preview</code>
                  <span className="text-gray-700">Ultra fast, cheapest Gemini 3</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineEye className="mr-2 h-5 w-5 icon-ui" />
                Gemini 2.5
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-2.5-pro</code>
                  <span className="text-gray-700">Enhanced reasoning, supports audio/video/PDF (2M tokens) - <strong className="text-gray-900">Agent default</strong></span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-2.5-flash</code>
                  <span className="text-gray-700">Fast and cost-effective reasoning (1M tokens) - <strong className="text-gray-900">llm_do default</strong></span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineBolt className="mr-2 h-5 w-5 icon-ui" />
                Gemini 2.0
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-2.0-flash</code>
                  <span className="text-gray-700">Previous gen workhorse</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">gemini-2.0-flash-lite</code>
                  <span className="text-gray-700">Previous gen lite version</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeProvider === 'anthropic' && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineSquare3Stack3D className="mr-2 h-5 w-5 icon-ui" />
                Claude 4.5 Series (Latest)
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">claude-opus-4-5</code>
                  <span className="text-gray-700">Most capable Claude model (200K tokens)</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">claude-sonnet-4-5</code>
                  <span className="text-gray-700">Best balance of intelligence and speed</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">claude-haiku-4-5</code>
                  <span className="text-gray-700">Fastest with near-frontier intelligence</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1"><HiOutlineCheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />All 4.5 series models support <strong>structured output</strong> with Pydantic models</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineGlobeAlt className="mr-2 h-5 w-5 icon-ui" />
                Claude 4 Series (Previous Gen)
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm mr-3 font-mono">claude-opus-4-1</code>
                  <span className="text-gray-700">Specialized reasoning - <strong className="text-gray-900">supports structured output</strong></span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm mr-3 font-mono">claude-sonnet-4</code>
                  <span className="text-gray-700">Balanced performance - <strong className="text-gray-600">no structured output</strong></span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-500">
                  ⚠️ Legacy models (claude-sonnet-4, claude-opus-4) do NOT support structured output.
                  Use 4.5 or 4.1 series for <code className="bg-gray-100 px-1 rounded">llm_do(..., output=Model)</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {activeProvider === 'mistral' && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <HiOutlineCpuChip className="mr-2 h-5 w-5 icon-ui" />
                Mistral Latest
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">mistral-large-latest</code>
                  <span className="text-gray-700">Most capable Mistral model - High performance European model</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">mistral-small-latest</code>
                  <span className="text-gray-700">Balanced performance and efficiency</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-3 font-mono">mistral-medium-latest</code>
                  <span className="text-gray-700">Mid-tier performance</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1"><HiOutlineExclamationTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />Mistral models require your own API key</span> (<code className="bg-gray-100 px-1 rounded">MISTRAL_API_KEY</code>).
                  Managed keys (<code className="bg-gray-100 px-1 rounded">co/</code> prefix) are not yet available for Mistral.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Model Selection Guide */}
      <section className="mb-16">
        <h2 className="heading-2">Model Selection Guide</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineCpuChip className="mr-2 h-5 w-5 icon-ui" />
              Best for Coding
            </h3>
            <CodeWithResult
              code={`agent = Agent("coder", model="gpt-5")
# Alternative: claude-sonnet-4-5`}
              result=""
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineBolt className="mr-2 h-5 w-5 icon-ui" />
              Fast Responses
            </h3>
            <CodeWithResult
              code={`agent = Agent("quick", model="gpt-5-nano")
# Alternative: gemini-2.5-flash`}
              result=""
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineCurrencyDollar className="mr-2 h-5 w-5 icon-ui" />
              Cost-Optimized
            </h3>
            <CodeWithResult
              code={`agent = Agent("budget", model="gpt-5-nano")
# Alternative: gemini-2.5-flash-lite`}
              result=""
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineEye className="mr-2 h-5 w-5 icon-ui" />
              Multimodal
            </h3>
            <CodeWithResult
              code={`agent = Agent("vision", model="gemini-2.5-pro")
# Supports: audio, video, images, PDF`}
              result=""
            />
          </div>
        </div>
      </section>

      {/* Two Ways to Use Models */}
      <section className="mb-16">
        <h2 className="heading-2">Two Ways to Use Models</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Managed Keys */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineBolt className="mr-2 h-5 w-5 icon-ui" />
              Option 1: Managed Keys
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Recommended for getting started
            </p>
            <div className="mb-4">
              <CommandBlock commands={['co auth']} />
            </div>
            <CodeWithResult
              code={`# Use any model with co/ prefix
agent = Agent("assistant", model="co/gpt-5")
agent = Agent("assistant", model="co/gemini-2.5-pro")
agent = Agent("assistant", model="co/claude-opus-4-5")`}
              result=""
            />
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>✓ 100K free tokens to start</p>
              <p>✓ Access to all providers</p>
              <p>✓ No API key management</p>
              <p className="pt-1"><a href="/models/pricing" className="text-gray-500 hover:text-gray-700 underline text-xs">View pricing →</a></p>
            </div>
          </div>

          {/* Own Keys */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
              <HiOutlineGlobeAlt className="mr-2 h-5 w-5 icon-ui" />
              Option 2: Your Own Keys
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              For production or high-volume usage
            </p>
            <div className="mb-4">
              <CommandBlock
                commands={[
                  'export OPENAI_API_KEY="sk-..."',
                  'export GEMINI_API_KEY="AIza..."',
                  'export ANTHROPIC_API_KEY="sk-ant-..."',
                  'export MISTRAL_API_KEY="..."'
                ]}
              />
            </div>
            <CodeWithResult
              code={`# Use models without co/ prefix
agent = Agent("assistant", model="gpt-5")
agent = Agent("assistant", model="gemini-2.5-pro")
agent = Agent("assistant", model="claude-opus-4-5")`}
              result=""
            />
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>✓ Production deployments</p>
              <p>✓ Direct billing</p>
              <p>✓ Existing infrastructure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Model Selection */}
      <section className="mb-16">
        <h2 className="heading-2">Smart Model Selection</h2>
        <p className="text-gray-700 mb-4">
          Automatically select the best model based on your needs:
        </p>
        <CodeWithResult
          code={`def select_model(task_type: str, speed_priority: bool = False) -> str:
    """Select optimal model based on requirements."""
    
    if speed_priority:
        return {
            "code": "gpt-5-mini",
            "chat": "gpt-5-nano",
            "analysis": "gemini-2.5-flash"
        }.get(task_type, "gpt-5-nano")
    else:
        return {
            "code": "gpt-5",
            "reasoning": "o4-mini",
            "analysis": "claude-opus-4-5"
        }.get(task_type, "gpt-5")

# Use appropriate model
model = select_model("code", speed_priority=False)
agent = Agent("coder", model=model)`}
          result={`Selected model: gpt-5`}
        />
      </section>

      {/* Fallback Chain */}
      <section className="mb-16">
        <h2 className="heading-2">Fallback Chain</h2>
        <p className="text-gray-700 mb-4">
          Try multiple models if one fails:
        </p>
        <CodeWithResult
          code={`def create_agent_with_fallback(name: str):
    """Try multiple models if one fails."""
    
    model_chain = [
        "gpt-5",           # Best overall
        "claude-opus-4-5", # Strong alternative
        "gemini-2.5-pro",  # Multimodal option
        "gpt-5-mini"       # Faster fallback
    ]
    
    for model in model_chain:
        try:
            return Agent(name, model=model)
        except Exception as e:
            print(f"Failed with {model}: {e}")
            continue
    
    raise Exception("No models available")

# Will use best available model
agent = create_agent_with_fallback("assistant")`}
          result={`Using model: gpt-5`}
        />
      </section>

      {/* Info Box */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200 mb-16">
        <h3 className="font-semibold mb-2 flex items-center text-gray-900">
          <HiOutlineBolt className="mr-2 h-5 w-5 icon-ui" />
          Key Benefits
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <strong>Get started in 60 seconds</strong> with managed keys (co auth)</li>
          <li>• <strong>100K free tokens</strong> + bonus credits for starring our repo</li>
          <li>• <strong>Same pricing as official APIs</strong> - see <a href="/models/pricing" className="text-gray-500 hover:text-gray-700 underline">full pricing table</a> or <a href="https://o.openonion.ai/purchase" target="_blank" rel="noopener" className="text-gray-500 hover:text-gray-700 underline">add credits</a></li>
          <li>• <strong>Same code works everywhere</strong> - just change the model name or add/remove co/ prefix</li>
          <li>• <strong>Tool support identical</strong> across all models and providers</li>
          <li>• <strong>Easy transition</strong> from managed keys to your own keys when ready for production</li>
        </ul>
      </div>

      {/* Navigation */}
      <ContentNavigation />
    </div>
  )
}