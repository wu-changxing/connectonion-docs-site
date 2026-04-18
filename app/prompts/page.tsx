/*
  @date: 2025-01-01
  @description: Prompts Overview Page
  
  DESIGN ISSUES TO FIX:
  
  1. **Content Structure** (Priority: HIGH)
     - Missing copy-all-content button (CLAUDE.md requirement)
     - No clear distinction between loading methods
     - Code examples not using CodeWithResult component
     - Fix: Add CopyMarkdownButton, use tabs for methods, standardize code display
  
  2. **Navigation & Discovery** (Priority: HIGH)
     - No breadcrumb navigation
     - Missing links to example prompts
     - No table of contents for sections
     - Fix: Add breadcrumb, create prompt gallery links, add TOC
  
  3. **Best Practices Presentation** (Priority: MEDIUM)
     - Recommendations buried in text
     - No visual do/don't examples
     - Missing prompt testing playground
     - Fix: Create best practices cards, add visual examples, prompt tester
  
  4. **Code Examples** (Priority: MEDIUM)
     - Inconsistent syntax highlighting
     - No line numbers for reference
     - Missing file path indicators
     - Fix: Standardize highlighting, add line numbers, show file paths
  
  5. **Mobile Optimization** (Priority: LOW)
     - Code blocks require horizontal scroll
     - Text too dense on small screens
     - Fix: Responsive code display, improve spacing
  
  NAVIGATION INCONSISTENCY FOUND (2025-01-02):
  - Uses PageNavigation component 
  - Has breadcrumb navigation at top
  - Has CopyMarkdownButton component
  - Lists prompt examples that link to pages with different nav
  - Child pages use custom "Previous/Next in series" navigation
  - Creates inconsistent navigation experience
*/

'use client'

import { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineDocumentText, HiOutlinePlay, HiOutlineArrowRight, HiOutlineInformationCircle, HiOutlineExclamationTriangle, HiOutlineFolderOpen, HiOutlineBookOpen, HiOutlineLightBulb, HiOutlineViewfinderCircle, HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

export default function PromptsOverviewPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'loading' | 'formats' | 'best-practices'>('loading')

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const quickStartCode = `from connectonion import Agent

# Method 1 (Recommended): Load from Markdown file
agent = Agent(
    name="expert",
    system_prompt="prompts/expert.md",  # Versioned prompt content
    tools=[...]
)

# Method 2: Path object
from pathlib import Path
agent = Agent(
    name="specialist",
    system_prompt=Path("prompts/specialist.txt"),
    tools=[...]
)`

  const recommendedMarkdown = `# Assistant
You are a helpful, concise assistant. When answering:

- Be direct and use simple language
- Prefer bullet points over long paragraphs
- Ask one clarifying question if necessary before acting

Output format:
- Start with a one-sentence summary
- Then provide numbered steps if applicable
`

  const loadFromMarkdown = `from connectonion import Agent

agent = Agent(
    name="assistant",
    system_prompt="prompts/assistant.md",  # Recommended: Markdown file
    tools=[...]
)

print(agent.input("Summarize the key points of our meeting notes."))`

  const folderTree = `prompts/
  assistant.md
  expert/
    researcher.md
`

  const iterationCode = `from connectonion import Agent

# Set a global limit for this agent
agent = Agent(
    name="helper",
    system_prompt="You are precise and concise.",
    tools=[...],
    max_iterations=15  # default limit for this agent
)

# For one-off complex tasks, override per call
result = agent.input(
    "Plan a 3-step workflow using the available tools",
    max_iterations=25
)`

  const pageContent = `# System Prompts

Learn how to craft effective system prompts that define your agent's personality, behavior, and approach to tasks.

## Recommended: Keep prompts in Markdown files

Store prompts in versioned \`.md\` files. This keeps code clean, enables easy edits and reviews, and works across tools.

### Example Markdown Prompt

\`\`\`markdown
# Assistant
You are a helpful, concise assistant. When answering:

- Be direct and use simple language
- Prefer bullet points over long paragraphs
- Ask one clarifying question if necessary before acting

Output format:
- Start with a one-sentence summary
- Then provide numbered steps if applicable
\`\`\`

### Loading from Markdown

\`\`\`python
from connectonion import Agent

agent = Agent(
    name="assistant",
    system_prompt="prompts/assistant.md",  # Recommended: Markdown file
    tools=[...]
)

print(agent.input("Summarize the key points of our meeting notes."))
\`\`\`

## Three Ways to Provide Prompts

### 1. Markdown File (Recommended)

\`\`\`python
agent = Agent(
    name="expert",
    system_prompt="prompts/expert.md",
    tools=[...]
)
\`\`\`

### 2. Path Object

\`\`\`python
from pathlib import Path
agent = Agent(
    name="specialist",
    system_prompt=Path("prompts/specialist.txt"),
    tools=[...]
)
\`\`\`

### 3. Inline String

\`\`\`python
agent = Agent(
    name="helper",
    system_prompt="You are a helpful assistant.",
    tools=[...]
)
\`\`\`

## Folder Structure

\`\`\`
prompts/
  assistant.md
  expert/
    researcher.md
\`\`\`

## Browse Example Prompts

Explore ready-to-use prompt templates:
- Friendly Assistant
- Math Tutor
- Code Reviewer
- Data Analyst
- Business Strategist
- Technical Writer
- Customer Support
- Security Analyst
`

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
        <Link href="/" className="hover:text-gray-500 transition-colors">
          Docs
        </Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <span className="text-gray-900">System Prompts</span>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl border border-green-200">
              <HiOutlineChatBubbleOvalLeft className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h1 className="heading-1">System Prompts</h1>
              <p className="text-lg text-gray-700">
                Define your agent's personality, behavior, and approach to tasks.
              </p>
            </div>
          </div>
          <CopyMarkdownButton markdownPath="/prompts/prompts.md" filename="prompts.md" className="flex-shrink-0" />
        </div>
      </div>

      {/* Recommended: Markdown Files */}
      <section className="mb-16">
        <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/10 border border-emerald-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <HiOutlineInformationCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Recommended: Keep prompts in Markdown files</h2>
              <p className="text-gray-700 text-sm mb-4">
                Store prompts in versioned <code className="bg-black/30 px-1 py-0.5 rounded">.md</code> files. This keeps code clean, enables easy edits and reviews, and works across tools.
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Readable and diff-friendly</li>
                <li>Reusable across multiple agents</li>
                <li>Simple to test and iterate</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
              <span className="text-sm text-gray-700 font-mono flex items-center gap-2"><HiOutlineFolderOpen className="w-4 h-4"/>project structure</span>
              <button
                onClick={() => copyToClipboard(folderTree, 'folderTree')}
                className="text-gray-700 hover:text-gray-900 transition-colors p-1"
              >
                {copiedId === 'folderTree' ? (
                  <HiOutlineCheck className="w-4 h-4 text-green-400" />
                ) : (
                  <HiOutlineClipboard className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="p-6">
              <SyntaxHighlighter 
                language="bash" 
                style={monokai}
                customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}
                showLineNumbers={true}
              >
                {folderTree}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800">
              <span className="text-sm text-gray-700 font-mono">prompts/assistant.md</span>
              <button
                onClick={() => copyToClipboard(recommendedMarkdown, 'recommendedMarkdown')}
                className="text-gray-700 hover:text-gray-900 transition-colors p-1"
              >
                {copiedId === 'recommendedMarkdown' ? (
                  <HiOutlineCheck className="w-4 h-4 text-green-400" />
                ) : (
                  <HiOutlineClipboard className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="p-6">
              <SyntaxHighlighter 
                language="markdown" 
                style={monokai}
                customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}
                showLineNumbers={true}
              >
                {recommendedMarkdown}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800">
              <span className="text-sm text-gray-700 font-mono">load_markdown.py</span>
              <button
                onClick={() => copyToClipboard(loadFromMarkdown, 'loadFromMarkdown')}
                className="text-gray-700 hover:text-gray-900 transition-colors p-1"
              >
                {copiedId === 'loadFromMarkdown' ? (
                  <HiOutlineCheck className="w-4 h-4 text-green-400" />
                ) : (
                  <HiOutlineClipboard className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="p-6">
              <SyntaxHighlighter 
                language="python" 
                style={monokai}
                customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}
                showLineNumbers={true}
              >
                {loadFromMarkdown}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-rose-900/30 to-rose-800/10 border border-rose-500/30 rounded-xl p-5 mt-6">
          <div className="flex items-start gap-3">
            <HiOutlineExclamationTriangle className="w-5 h-5 text-rose-400 mt-0.5" />
            <p className="text-gray-700 text-sm">
              Avoid embedding large prompt strings directly in code. It makes diffs noisy and complicates collaboration. Prefer <code className="bg-black/30 px-1 py-0.5 rounded">.md</code> files and reference them from your agent.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="heading-2">Quick Start</h2>
        
        <p className="text-gray-700 mb-8">
          ConnectOnion offers three ways to provide system prompts. We recommend Markdown files.
        </p>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-green-900/50 border border-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Markdown File (Recommended)</h4>
                <p className="text-gray-700 text-sm">
                  Store prompts in <code className="bg-black/30 px-1 py-0.5 rounded">prompts/*.md</code> and reference by path. Best for collaboration, reviews, and reuse.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-blue-900/50 border border-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Path Object</h4>
                <p className="text-gray-700 text-sm">
                  Use <code className="bg-black/30 px-1 py-0.5 rounded">pathlib.Path</code> when you need explicit file existence checks.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-gray-900/50 border border-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-gray-500 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-500 mb-2">Direct String (for quick demos)</h4>
                <p className="text-gray-700 text-sm">
                  Acceptable for tiny demos or notebooks, but keep production prompts in Markdown files.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <span className="text-sm text-gray-700 font-mono">quick_start.py</span>
              <button
                onClick={() => copyToClipboard(quickStartCode, 'quick-start')}
                className="text-gray-700 hover:text-gray-900 transition-colors p-1"
              >
                {copiedId === 'quick-start' ? (
                  <HiOutlineCheck className="w-4 h-4 text-green-400" />
                ) : (
                  <HiOutlineClipboard className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <div className="p-6">
              <SyntaxHighlighter 
                language="python" 
                style={monokai}
                customStyle={{
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}
                showLineNumbers={true}
              >
                {quickStartCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      {/* Iteration Control */}
      <section className="mb-16">
        <h2 className="heading-2">Iteration Control (max_iterations)</h2>
        <p className="text-gray-700 mb-6">
          You can set a default iteration limit on the agent, and still override it for specific tasks.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <span className="text-sm text-gray-700 font-mono">iterations.py</span>
            <button
              onClick={() => copyToClipboard(iterationCode, 'iterations')}
              className="text-gray-700 hover:text-gray-900 transition-colors p-1"
            >
              {copiedId === 'iterations' ? (
                <HiOutlineCheck className="w-4 h-4 text-green-400" />
              ) : (
                <HiOutlineClipboard className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="p-6">
            <SyntaxHighlighter 
              language="python" 
              style={monokai}
              customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}
              showLineNumbers={true}
            >
              {iterationCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="mb-16">
        <h2 className="heading-2">Supported File Formats</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {[
            { ext: '.md', name: 'Markdown', desc: 'Human-readable, structured prompts', color: 'text-blue-400' },
            { ext: '.yaml', name: 'YAML', desc: 'Structured data with metadata', color: 'text-green-400' },
            { ext: '.json', name: 'JSON', desc: 'Machine-readable with schemas', color: 'text-gray-500' },
            { ext: '.txt', name: 'Plain Text', desc: 'Simple text prompts', color: 'text-yellow-400' },
            { ext: 'none', name: 'No Extension', desc: 'Any text file works', color: 'text-gray-700' },
          ].map((format) => (
            <div key={format.ext} className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineDocumentText className={`w-5 h-5 ${format.color}`} />
                <span className={`font-mono font-bold ${format.color}`}>
                  {format.ext === 'none' ? '(none)' : format.ext}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{format.name}</h3>
              <p className="text-gray-700 text-sm">{format.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's Next */}
      <section className="mb-16">
        <h2 className="heading-2">What's Next</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link 
            href="/prompts/examples" 
            className="group bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Prompt Examples</h3>
              <HiOutlineArrowRight className="w-5 h-5 text-gray-700 group-hover:text-blue-400 transition-colors" />
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Explore real-world prompt examples for different roles and domains.
            </p>
            <div className="text-xs text-blue-400">View examples →</div>
          </Link>

          <Link 
            href="/prompts/examples" 
            className="group bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Examples</h3>
              <HiOutlineArrowRight className="w-5 h-5 text-gray-700 group-hover:text-green-400 transition-colors" />
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Browse real-world prompt examples for different roles and domains.
            </p>
            <div className="text-xs text-green-400">View examples →</div>
          </Link>
        </div>
      </section>

      {/* Unified Navigation */}
      <ContentNavigation />
      </div>
    </div>
  )
}