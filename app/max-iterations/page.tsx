'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Zap, Settings, Brain, Gauge, Lightbulb, ArrowRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

export default function MaxIterationsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Markdown content for copy/download feature
  const pageContent = `# max_iterations Guide

Control how many tool calls your agent can make. Master this to build efficient, reliable agents.

## What Are Iterations?

Think of iterations as "attempts" - how many times your agent can use tools to complete a task.

\`\`\`bash
# Your agent tries to complete the task
# Iteration 1: "I need to search for info" → calls search tool
# Iteration 2: "Now I'll calculate something" → calls calculate tool
# Iteration 3: "Let me save the result" → calls save tool
# Done! Task completed in 3 iterations
\`\`\`

## Quick Start

### The Basics (90% of cases)

\`\`\`python
from connectonion import Agent

# Default: 10 iterations (works for most tasks!)
agent = Agent("my_bot", tools=[search, calculate])

# That's it! Just use it:
result = agent.input("What's 2+2?")  # Uses 1 iteration
result = agent.input("Search for Python tutorials")  # Uses 1-2 iterations
\`\`\`

### When You Need More Power

\`\`\`python
# Complex tasks need more iterations
research_agent = Agent(
    "researcher",
    tools=[search, analyze, summarize],
    max_iterations=25  # I need more attempts for complex research
)
\`\`\`

### Quick Override for One Task

\`\`\`python
# Normal agent
agent = Agent("helper", tools=[...])  # Default 10

# But this ONE task is complex:
result = agent.input(
    "Do something really complex",
    max_iterations=30  # Just for this task!
)
\`\`\`

## Real Examples

### Simple Calculator Bot

\`\`\`python
def calculate(expression: str) -> float:
    return eval(expression)  # Simple math

# Calculator rarely needs many attempts
calc_bot = Agent(
    "calculator",
    tools=[calculate],
    max_iterations=3  # Math is simple, 3 attempts is plenty
)

# This works fine with just 1 iteration:
result = calc_bot.input("What's 15 * 8?")
print(result)  # "The answer is 120"
\`\`\`

## Cool Tricks & Advanced Patterns

### Auto-Retry with Higher Limit

\`\`\`python
def smart_input(agent, prompt, max_retries=3):
    """Automatically increases iterations if task fails."""
    limits = [10, 25, 50]  # Try these limits in order

    for limit in limits:
        result = agent.input(prompt, max_iterations=limit)
        if "Maximum iterations" not in result:
            return result  # Success!

    return "Task too complex even with 50 iterations"

# Use it:
agent = Agent("smart", tools=[...])
result = smart_input(agent, "Complex task")  # Auto-adjusts!
\`\`\`

## Quick Reference

| What You're Doing | Iterations | Example |
|-------------------|------------|---------|
| Simple Q&A | 3-5 | "What's the weather?" |
| Calculations | 5-10 | "Calculate my taxes" |
| Multi-step tasks | 10-20 | "Search and summarize" |
| Complex workflows | 20-40 | "Analyze all data and generate report" |
| Research projects | 30-50 | "Research topic from multiple sources" |

## The One-Minute Summary

1. Most agents are fine with default \`max_iterations=10\`
2. Simple bots can use 5, complex ones need 20-30
3. Override per-task when needed: \`agent.input(prompt, max_iterations=X)\`
4. If you see "Maximum iterations reached", just increase the limit
5. Advanced: Build smart agents that adjust limits automatically

That's it! You now know everything about iteration control. Start simple, adjust when needed!
`;

  const examples = {
    basic: `from connectonion import Agent

# Default: 10 iterations (works for most tasks!)
agent = Agent("my_bot", tools=[search, calculate])

# That's it! Just use it:
result = agent.input("What's 2+2?")  # Uses 1 iteration
result = agent.input("Search for Python tutorials")  # Uses 1-2 iterations`,

    complex: `# Complex tasks need more iterations
research_agent = Agent(
    "researcher",
    tools=[search, analyze, summarize],
    max_iterations=25  # I need more attempts for complex research
)`,

    override: `# Normal agent
agent = Agent("helper", tools=[...])  # Default 10

# But this ONE task is complex:
result = agent.input(
    "Do something really complex",
    max_iterations=30  # Just for this task!
)`,

    calculator: `def calculate(expression: str) -> float:
    return eval(expression)  # Simple math

# Calculator rarely needs many attempts
calc_bot = Agent(
    "calculator",
    tools=[calculate],
    max_iterations=3  # Math is simple, 3 attempts is plenty
)

# This works fine with just 1 iteration:
result = calc_bot.input("What's 15 * 8?")
print(result)  # "The answer is 120"`,

    autoRetry: `def smart_input(agent, prompt, max_retries=3):
    """Automatically increases iterations if task fails."""
    limits = [10, 25, 50]  # Try these limits in order
    
    for limit in limits:
        result = agent.input(prompt, max_iterations=limit)
        if "Maximum iterations" not in result:
            return result  # Success!
    
    return "Task too complex even with 50 iterations"

# Use it:
agent = Agent("smart", tools=[...])
result = smart_input(agent, "Complex task")  # Auto-adjusts!`,

    selfAdjusting: `class SelfAdjustingAgent:
    """Agent that learns optimal iterations from history."""
    
    def __init__(self, name, tools):
        self.agent = Agent(name, tools, max_iterations=10)
        self.task_history = {}
    
    def input(self, prompt):
        # Start with learned limit or default
        task_type = self._classify_task(prompt)
        max_iter = self.task_history.get(task_type, 10)
        
        # Try with current limit
        result = self.agent.input(prompt, max_iterations=max_iter)
        
        # If failed, increase and retry
        while "Maximum iterations" in result and max_iter < 50:
            max_iter += 10
            print(f"Increasing to {max_iter} iterations...")
            result = self.agent.input(prompt, max_iterations=max_iter)
        
        # Remember what worked
        if "Maximum iterations" not in result:
            self.task_history[task_type] = max_iter
            print(f"Learned: {task_type} tasks need {max_iter} iterations")
        
        return result`
  };

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 lg:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with Breadcrumb and Copy Button */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">max_iterations</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4">
                max_iterations Guide
              </h1>
              <p className="text-xl text-gray-300">
                Control how many tool calls your agent can make. Master this to build efficient, reliable agents.
              </p>
            </div>

            <CopyMarkdownButton
              content={pageContent}
              filename="max-iterations-guide.md"
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Hero Info Box */}
        <div className="flex items-start gap-3 mb-12 p-4 bg-gradient-to-b from-purple-900/30 to-purple-800/10 border border-purple-500/30 rounded-lg">
          <Zap className="text-purple-400 w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-purple-200">
            <strong className="text-purple-100">Quick Facts:</strong>{' '}
            Default is 10 iterations (works for most tasks!). Fully customizable per-agent or per-task. Smart patterns included for auto-adjustment.
          </div>
        </div>

        {/* What Are Iterations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">What Are Iterations?</h2>
          <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
            <p className="body-base text-gray-200 mb-6">
              Think of iterations as "attempts" - how many times your agent can use tools to complete a task.
            </p>
            <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
              <SyntaxHighlighter 
                language="bash" 
                style={monokai}
                customStyle={{
                  background: 'transparent',
                  margin: 0,
                  padding: 0,
                  fontSize: '0.875rem'
                }}
                showLineNumbers={true}
              >
{`# Your agent tries to complete the task
# Iteration 1: "I need to search for info" → calls search tool
# Iteration 2: "Now I'll calculate something" → calls calculate tool
# Iteration 3: "Let me save the result" → calls save tool
# Done! Task completed in 3 iterations`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start - Super Simple</h2>
          
          <div className="space-y-6">
            {/* Basic Usage */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                The Basics (90% of cases)
              </h3>
              <div className="bg-black/30 rounded-lg overflow-hidden mb-4 custom-scrollbar">
                <SyntaxHighlighter 
                  language="python" 
                  style={monokai} 
                  customStyle={{ 
                    background: 'transparent', 
                    margin: 0, 
                    padding: '1rem', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                >
                  {examples.basic}
                </SyntaxHighlighter>
              </div>
              <button
                onClick={() => copyToClipboard(examples.basic, 'basic')}
                className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copiedSection === 'basic' ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy code
              </button>
            </div>

            {/* Complex Tasks */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                When You Need More Power
              </h3>
              <div className="bg-black/30 rounded-lg overflow-hidden mb-4 custom-scrollbar">
                <SyntaxHighlighter 
                  language="python" 
                  style={monokai} 
                  customStyle={{ 
                    background: 'transparent', 
                    margin: 0, 
                    padding: '1rem', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                >
                  {examples.complex}
                </SyntaxHighlighter>
              </div>
              <button
                onClick={() => copyToClipboard(examples.complex, 'complex')}
                className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copiedSection === 'complex' ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy code
              </button>
            </div>

            {/* Override */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Override for One Task
              </h3>
              <div className="bg-black/30 rounded-lg overflow-hidden mb-4 custom-scrollbar">
                <SyntaxHighlighter 
                  language="python" 
                  style={monokai} 
                  customStyle={{ 
                    background: 'transparent', 
                    margin: 0, 
                    padding: '1rem', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                >
                  {examples.override}
                </SyntaxHighlighter>
              </div>
              <button
                onClick={() => copyToClipboard(examples.override, 'override')}
                className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copiedSection === 'override' ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy code
              </button>
            </div>
          </div>
        </section>

        {/* Real Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Real Examples</h2>
          
          <div className="space-y-6">
            {/* Calculator Example */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Simple Calculator Bot
              </h3>
              <p className="body-base text-gray-200 mb-4">
                Calculator needs very few iterations - math is straightforward.
              </p>
              <div className="bg-black/30 rounded-lg overflow-hidden mb-4 custom-scrollbar">
                <SyntaxHighlighter 
                  language="python" 
                  style={monokai} 
                  customStyle={{ 
                    background: 'transparent', 
                    margin: 0, 
                    padding: '1rem', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                >
                  {examples.calculator}
                </SyntaxHighlighter>
              </div>
              <button
                onClick={() => copyToClipboard(examples.calculator, 'calculator')}
                className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copiedSection === 'calculator' ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy code
              </button>
            </div>

            {/* Error Message */}
            <div className="bg-yellow-900/20 rounded-lg border border-yellow-500/30 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                What Happens When You Hit The Limit?
              </h3>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-sm mb-4">
                <span className="text-red-300">"Task incomplete: Maximum iterations (10) reached."</span>
              </div>
              <p className="body-base text-gray-200">
                <strong className="text-yellow-300">Solution:</strong> Increase <code className="bg-black/40 px-2 py-1 rounded text-purple-300">max_iterations</code> for the agent or this specific task.
              </p>
            </div>
          </div>
        </section>

        {/* Cool Tricks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-yellow-500 flex-shrink-0" />
            Cool Tricks & Advanced Patterns
          </h2>

          <div className="space-y-6">
            {/* Auto-Retry */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Trick 1: Auto-Retry with Higher Limit
              </h3>
              <p className="body-base text-gray-200 mb-4">
                Automatically increases iterations if task fails.
              </p>
              <div className="bg-black/30 rounded-lg overflow-x-auto mb-4">
                <SyntaxHighlighter 
                  language="python" 
                  style={monokai} 
                  customStyle={{ 
                    background: 'transparent', 
                    margin: 0, 
                    padding: '1rem', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                >
                  {examples.autoRetry}
                </SyntaxHighlighter>
              </div>
              <button
                onClick={() => copyToClipboard(examples.autoRetry, 'autoRetry')}
                className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copiedSection === 'autoRetry' ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy code
              </button>
            </div>

            {/* Self-Adjusting */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Trick 2: Self-Adjusting Agent
              </h3>
              <p className="body-base text-gray-200 mb-4">
                Agent that learns optimal iterations from history.
              </p>
              <div className="bg-black/30 rounded-lg overflow-x-auto mb-4">
                <SyntaxHighlighter 
                  language="python" 
                  style={monokai} 
                  customStyle={{ 
                    background: 'transparent', 
                    margin: 0, 
                    padding: '1rem', 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                >
                  {examples.selfAdjusting}
                </SyntaxHighlighter>
              </div>
              <button
                onClick={() => copyToClipboard(examples.selfAdjusting, 'selfAdjusting')}
                className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copiedSection === 'selfAdjusting' ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy code
              </button>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Gauge className="w-6 h-6 mr-3 flex-shrink-0" />
            Quick Reference
          </h2>
          
          <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      What You're Doing
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Iterations
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900/30 divide-y divide-gray-800">
                  <tr className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-white">
                      Simple Q&A
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-purple-300 font-semibold">
                      3-5
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-200">
                      "What's the weather?"
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-white">
                      Calculations
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-purple-300 font-semibold">
                      5-10
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-200">
                      "Calculate my taxes"
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-white">
                      Multi-step tasks
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-purple-300 font-semibold">
                      10-20
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-200">
                      "Search and summarize"
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-white">
                      Complex workflows
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-purple-300 font-semibold">
                      20-40
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-200">
                      "Analyze all data and generate report"
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 lg:px-6 py-4 text-sm font-medium text-white">
                      Research projects
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-purple-300 font-semibold">
                      30-50
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-200">
                      "Research topic from multiple sources"
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* One Minute Summary */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 rounded-lg border border-emerald-500/30 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">⏱️</span>
              The One-Minute Summary
            </h2>
            <ol className="space-y-3 text-gray-200">
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-300 flex-shrink-0">1.</span>
                <span>Most agents are fine with default <code className="bg-black/40 px-2 py-1 rounded text-purple-300">max_iterations=10</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-300 flex-shrink-0">2.</span>
                <span>Simple bots can use 5, complex ones need 20-30</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-300 flex-shrink-0">3.</span>
                <span>Override per-task when needed: <code className="bg-black/40 px-2 py-1 rounded text-purple-300">agent.input(prompt, max_iterations=X)</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-300 flex-shrink-0">4.</span>
                <span>If you see "Maximum iterations reached", just increase the limit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-300 flex-shrink-0">5.</span>
                <span>Advanced: Build smart agents that adjust limits automatically</span>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
              <p className="body-large text-emerald-200 font-semibold">
                That's it! You now know everything about iteration control. Start simple, adjust when needed!
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  );
}