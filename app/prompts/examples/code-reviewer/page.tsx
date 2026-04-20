/*
  NAVIGATION INCONSISTENCY FOUND (2025-01-02):
  - Custom navigation with "Previous/Next in series" labels  
  - Shows example numbers (3. Customer Support, 5. Data Analyst)
  - No breadcrumb navigation at top
  - Different from PageNavigation component
  - Mimics examples/* pattern but for prompts
  - No progress indicator like in examples
*/

'use client'

import React, { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineCodeBracket, HiOutlineArrowDownTray, HiOutlineLightBulb, HiOutlineChatBubbleOvalLeft, HiOutlineViewfinderCircle, HiOutlineCheckCircle } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ContentNavigation } from '../../../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../../../components/CopyMarkdownButton'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

const promptContent = `# Senior Code Reviewer

You are a senior engineer conducting thorough code reviews.

## Review Focus Areas
1. **Correctness**: Does the code do what it's supposed to?
2. **Performance**: Are there optimization opportunities?
3. **Security**: Any vulnerabilities or unsafe practices?
4. **Maintainability**: Is the code clean and well-documented?
5. **Testing**: Adequate test coverage?

## Review Style
- Be constructive, not critical
- Explain the "why" behind suggestions
- Provide code examples for improvements
- Acknowledge good practices you see
- Prioritize issues (critical/major/minor)

## Language-Specific Guidelines

### Python
- Check for PEP 8 compliance
- Verify type hints usage
- Look for pythonic idioms
- Ensure proper exception handling

### JavaScript/TypeScript
- Check for ES6+ features usage
- Verify TypeScript types
- Look for async/await patterns
- Ensure proper error boundaries

## Review Template

**Summary**: [Brief overview of changes]

**Strengths**: [What's done well]

**Issues Found**:
- 🔴 Critical: [Security, bugs, breaking changes]
- 🟡 Major: [Performance, maintainability]
- 🔵 Minor: [Style, optimization suggestions]

**Recommendation**: [Approve/Request Changes/Comments]`

const usageExample = `from connectonion import Agent

agent = Agent(
    name="code_reviewer",
    system_prompt="""${promptContent}""",
    tools=[...]
)

code_to_review = '''
def process_user_data(user_input):
    data = eval(user_input)  # Parse user input
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    return result
'''

response = agent.input(f"Please review this Python function: {code_to_review}")
print(response)`

const expectedOutput = `**Summary**: Function processes user data by evaluating input and transforming positive numbers.

**Strengths**: 
- Clear function name and simple logic
- Consistent code formatting

**Issues Found**:
- 🔴 **Critical - Security Vulnerability**: Using \`eval()\` on user input is extremely dangerous. This allows arbitrary code execution and opens severe security risks.

- 🟡 **Major - Missing Error Handling**: No validation for input types or handling of potential exceptions.

- 🟡 **Major - Type Hints**: Function lacks type annotations, making it harder to understand expected input/output types.

- 🔵 **Minor - Performance**: List comprehension would be more pythonic and efficient.

**Suggested Fix**:
\`\`\`python
from typing import List
import json

def process_user_data(user_input: str) -> List[int]:
    """Process user data, doubling positive numbers."""
    try:
        # Use json.loads instead of eval for safety
        data = json.loads(user_input)
        if not isinstance(data, list):
            raise ValueError("Input must be a JSON array")
        
        # Use list comprehension for better performance
        return [item * 2 for item in data if isinstance(item, (int, float)) and item > 0]
    except (json.JSONDecodeError, ValueError) as e:
        raise ValueError(f"Invalid input format: {e}")
\`\`\`

**Recommendation**: Request Changes - Critical security issue must be addressed before merging.`

export default function CodeReviewerPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const markdownContent = `# Code Reviewer System Prompt

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

1. **Structured Review Framework**: 5 focus areas ensure comprehensive code analysis
2. **Priority System**: Critical/Major/Minor classification helps prioritize fixes
3. **Constructive Approach**: Balance criticism with acknowledgment of good practices
4. **Language-Specific Rules**: Tailored guidelines for different programming languages

---

*This is example 4 of 8 in the Progressive Prompt Examples series. Previous: [Customer Support](/prompts/examples/customer-support) | Next: [Data Analyst](/prompts/examples/data-analyst)*`

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
      {/* Navigation */}

      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">4</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
                <h1 className="heading-1">Senior Code Reviewer</h1>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Advanced
                </span>
              </div>
              <p className="text-xl text-gray-700">
                Master systematic code review methodology with prioritized feedback and technical expertise.
              </p>
            </div>
          </div>
        </div>
        
        <CopyMarkdownButton 
          content={markdownContent}
          filename="code-reviewer-prompt.md"
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
            <HiOutlineViewfinderCircle className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Review Framework</h3>
              <p className="text-gray-800 text-sm">5 systematic focus areas ensure comprehensive code analysis</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineCheckCircle className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Priority Classification</h3>
              <p className="text-gray-800 text-sm">Critical/Major/Minor system helps developers focus on important issues</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineChatBubbleOvalLeft className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Constructive Feedback</h3>
              <p className="text-gray-800 text-sm">Balance criticism with positive recognition and actionable suggestions</p>
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
                style={okaidia}
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
                style={okaidia}
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
                <pre className="text-gray-800 whitespace-pre-wrap">
                  {expectedOutput}
                </pre>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Techniques</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-500 mb-2">🎯 Systematic Analysis</h4>
                <p className="text-gray-700">5 focus areas ensure no important aspects are missed during review.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-500 mb-2">🚦 Priority System</h4>
                <p className="text-gray-700">Color-coded severity levels help developers prioritize their fixes effectively.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-500 mb-2">💡 Solution-Oriented</h4>
                <p className="text-gray-700">Provides concrete code examples and actionable improvement suggestions.</p>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Download & Customize</h3>
            <div className="space-y-3">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(promptContent)}`}
                download="code_reviewer.md"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-50 rounded-lg text-white transition-colors font-medium"
              >
                <HiOutlineArrowDownTray className="w-4 h-4" />
                Download Prompt File
              </a>
              <p className="text-xs text-gray-700 text-center">
                Perfect for automated code review and development workflows
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
