'use client'

import React, { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineUser, HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineArrowDownTray, HiOutlineLightBulb, HiOutlineChatBubbleOvalLeft, HiOutlineHeart } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../../components/CopyMarkdownButton'

const promptContent = `# Friendly Assistant

You are a helpful and friendly AI assistant.

## Personality
- Always be polite and courteous
- Use a warm, conversational tone
- Show enthusiasm for helping users
- Keep responses clear and concise

## Behavior
- Greet users warmly
- Ask clarifying questions when needed
- Provide step-by-step help
- Thank users at the end of interactions

## Example Interactions

**User:** "I need help"
**You:** "Hello! I'd be happy to help you today. What can I assist you with?"

**User:** "Thanks for your help"
**You:** "You're very welcome! I'm glad I could help. Feel free to ask if you need anything else!"`

const usageExample = `from connectonion import Agent

agent = Agent(
    name="friendly_assistant",
    system_prompt="""${promptContent}""",
    tools=[...]
)

response = agent.input("Hi, can you help me with something?")
print(response)`

const expectedOutput = `Hello! I'd be happy to help you today. What can I assist you with? I'm here to make sure you get the support you need, so please don't hesitate to share what's on your mind!`

export default function FriendlyAssistantPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const markdownContent = `# Friendly Assistant System Prompt

${promptContent}

## Usage Example

\`\`\`python
${usageExample}
\`\`\`

## Expected Output

\`\`\`
${expectedOutput}
\`\`\`

## Key Learning Points

1. **Clear Personality Definition**: The prompt establishes specific traits like being "polite," "warm," and "enthusiastic"
2. **Behavioral Guidelines**: Concrete instructions on how to interact (greet, ask questions, provide help, thank users)
3. **Example Interactions**: Shows the assistant exactly what good responses look like
4. **Consistent Tone**: Every interaction maintains the same helpful, friendly approach

---

*This is example 1 of 8 in the Progressive Prompt Examples series. Next: [Math Tutor](/prompts/examples/math-tutor)*`

  return (
    <div className="max-w-4xl mx-auto px-8 py-16 md:py-24 lg:py-16 md:py-24 pt-16 lg:pt-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-700 mb-8">
        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <Link href="/prompts" className="hover:text-gray-900 transition-colors">System Prompts</Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <Link href="/prompts/examples" className="hover:text-gray-900 transition-colors">Examples</Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <span className="text-gray-900">Friendly Assistant</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <HiOutlineUser className="w-8 h-8 text-gray-500" />
                <h1 className="heading-1">Friendly Assistant</h1>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Beginner
                </span>
              </div>
              <p className="text-xl text-gray-700">
                Learn the fundamentals of personality-driven system prompts with this basic conversational agent.
              </p>
            </div>
          </div>
        </div>
        
        <CopyMarkdownButton 
          content={markdownContent}
          filename="friendly-assistant-prompt.md"
          className="ml-8 flex-shrink-0"
        />
      </div>

      {/* Key Concepts */}
      <div className="mb-12 p-6 bg-gray-50 border border-gray-200 rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <HiOutlineLightBulb className="w-6 h-6 text-gray-500" />
          Key Learning Concepts
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <HiOutlineHeart className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Personality Definition</h3>
              <p className="text-gray-700 text-sm">Clear traits like "polite," "warm," and "enthusiastic" establish consistent behavior</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineChatBubbleOvalLeft className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Behavioral Guidelines</h3>
              <p className="text-gray-700 text-sm">Concrete instructions on greeting, questioning, helping, and thanking users</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineUser className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Example Interactions</h3>
              <p className="text-gray-700 text-sm">Shows the assistant exactly what good responses look like in practice</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Prompt Content */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">System Prompt</h3>
              <button
                onClick={() => copyToClipboard(promptContent, 'prompt')}
                className="text-gray-700 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
              >
                {copiedId === 'prompt' ? (
                  <>
                    <HiOutlineCheck className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <HiOutlineClipboard className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="p-6">
              <SyntaxHighlighter 
                language="markdown" 
                style={monokai}
                customStyle={{
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.6'
                }}
                wrapLines={true}
                wrapLongLines={true}
                showLineNumbers={true}
                lineNumberStyle={{ 
                  color: '#6b7280', 
                  paddingRight: '1rem',
                  userSelect: 'none'
                }}
              >
                {promptContent}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Usage Example */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Usage Example</h3>
              <button
                onClick={() => copyToClipboard(usageExample, 'usage')}
                className="text-gray-700 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
              >
                {copiedId === 'usage' ? (
                  <>
                    <HiOutlineCheck className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <HiOutlineClipboard className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
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
                  lineHeight: '1.6'
                }}
                showLineNumbers={true}
                lineNumberStyle={{ 
                  color: '#6b7280', 
                  paddingRight: '1rem',
                  userSelect: 'none'
                }}
              >
                {usageExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-8">
          {/* Expected Output */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
              <HiOutlineChatBubbleOvalLeft className="w-5 h-5 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-900">Expected Output</h3>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-300 whitespace-pre-wrap">
                  {expectedOutput}
                </pre>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why This Works</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">🎯 Clear Personality</h4>
                <p className="text-gray-700">The prompt defines specific traits that create a consistent, recognizable personality.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">📝 Actionable Instructions</h4>
                <p className="text-gray-700">Behavioral guidelines give concrete actions: greet, ask, help, thank.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">💡 Learning by Example</h4>
                <p className="text-gray-700">Example interactions show the desired tone and response style.</p>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Download & Customize</h3>
            <div className="space-y-3">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(promptContent)}`}
                download="friendly_assistant.md"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-700 rounded-lg text-white transition-colors font-medium"
              >
                <HiOutlineArrowDownTray className="w-4 h-4" />
                Download Prompt File
              </a>
              <p className="text-xs text-gray-700 text-center">
                Save as .md file and customize for your use case
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-12 mt-12 border-t border-gray-200">
        <Link
          href="/prompts/examples"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          All Examples
        </Link>
        <div className="text-center">
          <p className="text-sm text-gray-700 mb-1">Next in series</p>
          <Link
            href="/prompts/examples/math-tutor"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            2. Math Tutor
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>
    </div>
  )
}