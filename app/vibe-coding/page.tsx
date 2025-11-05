'use client'

import { useState } from 'react'
import { FileCode2, Copy, Check, Sparkles, ArrowRight, Zap, BookOpen, Mouse, Rocket, Code, Terminal, Download, ChevronRight, Target } from 'lucide-react'
import { FaBullseye, FaRocket, FaEnvelope, FaLightbulb, FaGift } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'

export default function VibeCodingPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  
  // Add CSS for gradient animation
  const gradientStyle = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }
  `

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language = 'python', id }: { code: string; language?: string; id: string }) => (
    <div className="relative group">
      <button
        onClick={() => handleCopyCode(code, id)}
        className="absolute right-2 top-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {copiedCode === id ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
      <SyntaxHighlighter 
        language={language} 
        style={monokai}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.25rem',
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: '1.5',
          overflowX: 'auto'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <style jsx>{gradientStyle}</style>
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/30">
              <FileCode2 className="w-10 h-10 text-purple-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Vibe-Coding Support
              </h1>
              <p className="text-gray-300 text-lg md:text-xl">Build AI Agents Correctly with Claude Code Plugin</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CopyMarkdownButton />
            <a
              href="https://github.com/openonion/connectonion-claude-plugin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors border border-purple-500 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-sm">Get Claude Plugin</span>
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-32">
          <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-8 border border-purple-500/20 mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30 mb-6">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Documentation-Grounded Development</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Build ConnectOnion Agents <span className="text-purple-400">The Right Way</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Code review and agent builder powered by actual ConnectOnion documentation. No hallucinations, no wrong patterns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Terminal className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold">1. Install Plugin</p>
                  <p className="text-sm text-gray-300">2 simple commands</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold">2. Review or Build</p>
                  <p className="text-sm text-gray-300">Use /co commands</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Rocket className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold">3. Ship</p>
                  <p className="text-sm text-gray-300">Correct code, first time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Claude Code Plugin - Installation */}
        <section className="mb-32">
          <div className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 rounded-2xl p-8 border border-purple-500/30 overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <Terminal className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-300">Claude Code Plugin</h2>
                <p className="text-gray-300 text-base md:text-lg">Code review & agent builder directly in Claude Code</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold">Documentation-Grounded</h3>
                </div>
                <p className="text-sm text-gray-300">Every recommendation based on actual ConnectOnion docs. No hallucinations.</p>
              </div>
              <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold">Two Powerful Commands</h3>
                </div>
                <p className="text-sm text-gray-300"><code className="bg-gray-800 px-1 rounded">/co-review</code> for code review & <code className="bg-gray-800 px-1 rounded">/co-build</code> for agent builder</p>
              </div>
            </div>

            <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-800 mb-4">
              <p className="text-sm text-gray-300 mb-3 font-semibold">Quick Install:</p>
              <div className="space-y-2">
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 select-none">1. </span>
                    <span className="text-purple-400">/plugin marketplace add openonion/connectonion-claude-plugin</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode('/plugin marketplace add openonion/connectonion-claude-plugin', 'plugin-marketplace')}
                    className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    {copiedCode === 'plugin-marketplace' ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-300" />
                    )}
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 select-none">2. </span>
                    <span className="text-purple-400">/plugin install connectonion</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode('/plugin install connectonion', 'plugin-install')}
                    className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    {copiedCode === 'plugin-install' ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/openonion/connectonion-claude-plugin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-lg transition-all text-sm font-medium text-purple-300"
              >
                <Code className="w-4 h-4" />
                <span>View on GitHub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('plugin-usage-examples')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all text-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>See Examples</span>
              </button>
            </div>
          </div>
        </section>

        {/* Alternative: Cursor AI */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-6">
            <Mouse className="w-5 h-5 text-gray-500" />
            <h3 className="text-xl font-semibold text-gray-300">Alternative: Use Cursor AI</h3>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">For general coding</span>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-transparent rounded-xl p-6 border border-gray-700">
            <p className="text-sm text-gray-300 mb-4">
              If you prefer using Cursor AI for broader coding tasks, you can drag our documentation file into Cursor:
            </p>
            <ol className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-gray-600">1.</span>
                <span>Run <code className="bg-gray-800 px-2 py-0.5 rounded text-xs">co init</code> to get docs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600">2.</span>
                <span>Drag <code className="bg-gray-800 px-2 py-0.5 rounded text-xs">.co/docs/co-vibecoding-*.md</code> into Cursor chat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600">3.</span>
                <span>Describe what agent you want to build</span>
              </li>
            </ol>
            <p className="text-xs text-gray-500 mt-4">
              💡 Note: Claude Code plugin provides more accurate results with documentation-grounded code review
            </p>
          </div>
        </section>

        {/* Live Demo */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-6 h-6 text-green-400" />
            <h2 className="text-3xl font-bold">Live Example</h2>
            <span className="text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">See it in action</span>
          </div>
          
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
              <p className="text-sm text-gray-300 mb-2">You ask Cursor:</p>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-purple-400" />
                <p className="text-lg font-mono text-purple-300">"Using ConnectOnion docs, create a calculator agent"</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-300 mb-4">Cursor automatically generates:</p>
            <CodeBlock 
              code={`from connectonion import Agent

def add(a: float, b: float) -> float:
    """Add two numbers."""
    return a + b

def multiply(a: float, b: float) -> float:
    """Multiply two numbers."""
    return a * b

# Create agent
calculator = Agent(
    "calculator",
    tools=[add, multiply],
    instructions="You are a helpful calculator"
)

# Use it
result = calculator.input("What is 5 plus 3?")
print(result)  # Output: "5 plus 3 equals 8"`}
              id="example-code"
            />
          </div>

          <div className="bg-gradient-to-br from-green-500/5 to-transparent rounded-lg p-6 border border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>The Magic Happens</span>
              </h3>
            </div>
            <p className="text-gray-300 mb-4">Your agent automatically:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">✅</span>
                  <span className="font-medium text-sm">Understands Context</span>
                </div>
                <p className="text-xs text-gray-500">"plus" → <code className="bg-gray-800 px-1 rounded">add()</code></p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">✅</span>
                  <span className="font-medium text-sm">Picks Right Tool</span>
                </div>
                <p className="text-xs text-gray-500">Automatically selects functions</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">✅</span>
                  <span className="font-medium text-sm">Natural Responses</span>
                </div>
                <p className="text-xs text-gray-500">Speaks human, not code</p>
              </div>
            </div>
          </div>
        </section>

        {/* Plugin Usage Examples */}
        <section id="plugin-usage-examples" className="mb-32">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold">Claude Code Plugin Usage</h2>
            <span className="text-sm text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">After Installation</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Check className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">/co-review</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Review your ConnectOnion code against official documentation</p>
              <div className="space-y-2">
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-800">
                  <code className="text-sm text-purple-300">/co-review</code>
                  <p className="text-xs text-gray-500 mt-1">Review current file</p>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-800">
                  <code className="text-sm text-purple-300">/co-review agent.py</code>
                  <p className="text-xs text-gray-500 mt-1">Review specific file</p>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-800">
                  <code className="text-sm text-purple-300">/co-review .</code>
                  <p className="text-xs text-gray-500 mt-1">Review entire project</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Rocket className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">/co-build</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Interactive agent builder with documented patterns</p>
              <div className="space-y-2">
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-800">
                  <code className="text-sm text-purple-300">/co-build</code>
                  <p className="text-xs text-gray-500 mt-1">Start interactive agent builder</p>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-800 mt-3">
                  <p className="text-xs text-gray-300 mb-2">The agent will ask:</p>
                  <ul className="space-y-1 text-xs text-gray-500">
                    <li>• What should your agent do?</li>
                    <li>• What tools does it need?</li>
                    <li>• Does it need shared state?</li>
                  </ul>
                  <p className="text-xs text-green-400 mt-2">Then generates complete working code!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>Why Use the Plugin?</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <p className="font-medium text-sm mb-2 text-green-400">✓ No Hallucinations</p>
                <p className="text-xs text-gray-300">Every pattern comes from actual docs</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <p className="font-medium text-sm mb-2 text-purple-400">✓ Instant Feedback</p>
                <p className="text-xs text-gray-300">Review code in seconds</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <p className="font-medium text-sm mb-2 text-purple-400">✓ Learn Best Practices</p>
                <p className="text-xs text-gray-300">Explains why patterns matter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prompt Examples */}
        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-8">Cursor AI Prompt Templates</h2>
          <p className="text-gray-300 mb-8">Copy and customize these prompts for Cursor:</p>

          <div className="space-y-4">
            <div className="group bg-gradient-to-r from-purple-500/5 to-transparent rounded-xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <FaBullseye className="text-gray-300" />
                    <span>Basic Agent</span>
                  </h3>
                  <p className="text-sm text-gray-500">Perfect for getting started</p>
                </div>
                <button 
                  onClick={() => handleCopyCode('"Using ConnectOnion docs, create a calculator agent"', 'prompt-basic')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  {copiedCode === 'prompt-basic' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <code className="text-sm text-purple-300">
                  "Using ConnectOnion docs, create a calculator agent"
                </code>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-pink-500/5 to-transparent rounded-xl p-6 border border-gray-700 hover:border-pink-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <FaRocket className="text-gray-300" />
                    <span>Web Scraper</span>
                  </h3>
                  <p className="text-sm text-gray-500">Extract data from websites</p>
                </div>
                <button 
                  onClick={() => handleCopyCode('"Using ConnectOnion docs, create an agent that can scrape product prices from e-commerce sites"', 'prompt-scraper')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  {copiedCode === 'prompt-scraper' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <code className="text-sm text-pink-300">
                  "Using ConnectOnion docs, create an agent that can scrape product prices from e-commerce sites"
                </code>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-green-500/5 to-transparent rounded-xl p-6 border border-gray-700 hover:border-green-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <FaEnvelope className="text-gray-300" />
                    <span>Email Assistant</span>
                  </h3>
                  <p className="text-sm text-gray-500">Send automated emails</p>
                </div>
                <button 
                  onClick={() => handleCopyCode('"Using ConnectOnion docs, create an agent that sends email notifications when certain conditions are met"', 'prompt-email')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  {copiedCode === 'prompt-email' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <code className="text-sm text-green-300">
                  "Using ConnectOnion docs, create an agent that sends email notifications when certain conditions are met"
                </code>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-blue-500/5 to-transparent rounded-xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <FaLightbulb className="text-gray-300" />
                    <span>Custom Idea</span>
                  </h3>
                  <p className="text-sm text-gray-500">Describe your own agent</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <code className="text-sm text-purple-300">
                  "Using ConnectOnion docs, create an agent that [describe what you want your agent to do]"
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-8">Why This Works So Well</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">Complete Context</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Our docs contain everything Cursor needs:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Full API documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Working examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Best practices</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold">AI Understanding</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Cursor's AI can:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Generate complete code</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Handle complex logic</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Fix errors automatically</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step by Step Guide */}
        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-8">Step-by-Step Setup</h2>

          <div className="space-y-4">
            <div className="group bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 rounded-xl p-6 transition-all">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">Install ConnectOnion</p>
                    <Terminal className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm">
                    <span className="text-gray-500 select-none">$ </span>
                    <span className="text-green-400">pip install connectonion</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Takes about 10 seconds</p>
                </div>
              </div>
            </div>

            <div className="group bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 rounded-xl p-6 transition-all">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">Initialize Project</p>
                    <Rocket className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm">
                    <span className="text-gray-500 select-none">$ </span>
                    <span className="text-green-400">co init</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Creates .co/docs/ folder with all documentation</p>
                </div>
              </div>
            </div>

            <div className="group bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 rounded-xl p-6 transition-all">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">Open Cursor AI</p>
                    <Code className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-300">Open Cursor in your project folder</p>
                  <p className="text-xs text-gray-500 mt-2">Don't have Cursor? <a href="https://cursor.sh" className="text-purple-400 hover:text-purple-300">Download free</a></p>
                </div>
              </div>
            </div>

            <div className="group bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 rounded-xl p-6 transition-all">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">Drag Documentation</p>
                    <Mouse className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-300">Drag <code className="bg-gray-800 px-2 py-1 rounded text-xs">.co/docs/co-vibecoding-*.md</code> into Cursor chat</p>
                  <p className="text-xs text-gray-500 mt-2">This gives Cursor all the context it needs</p>
                </div>
              </div>
            </div>

            <div className="group bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 rounded-xl p-6 transition-all">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl flex items-center justify-center font-bold">5</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">Describe Your Agent</p>
                    <Sparkles className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-300">Tell Cursor what kind of agent you want to create</p>
                  <div className="bg-gray-800 rounded-lg p-3 mt-2">
                    <p className="text-xs text-purple-300">"Create an agent that..."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gray-900/50 border border-gray-700 hover:border-green-500/30 rounded-xl p-6 transition-all">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 text-green-400 rounded-xl flex items-center justify-center font-bold">6</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-lg">Run Your Agent!</p>
                    <Rocket className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm">
                    <span className="text-gray-500 select-none">$ </span>
                    <span className="text-green-400">python agent.py</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <FaGift className="text-gray-300" />
                    <span>Congratulations! Your agent is live!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Final CTA */}
        <div className="mb-32">
          <div className="relative bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-12 border border-purple-500/20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 animate-pulse" />
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6 relative" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-400 to-purple-400 bg-clip-text text-transparent relative">
              Ready to Build Your First Agent?
            </h2>
            <p className="text-xl text-gray-300 mb-8 relative max-w-2xl mx-auto">
              Join thousands of developers creating AI agents without writing complex code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <button 
                onClick={() => handleCopyCode('pip install connectonion', 'install-cmd')}
                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                <Terminal className="w-5 h-5" />
                <span>Get Started Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="https://cursor.sh"
                target="_blank"
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all border border-gray-700"
              >
                <Download className="w-5 h-5" />
                <span>Download Cursor</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}