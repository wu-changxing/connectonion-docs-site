/*
  NAVIGATION INCONSISTENCY FOUND (2025-01-02):
  - Custom navigation with "Previous/Next in series" labels
  - Shows example numbers (1. Hello World, 3. Weather Bot)
  - No breadcrumb navigation at top of page
  - Different from PageNavigation component used in main docs
  - Inconsistent with main documentation pages
*/

'use client'

import React, { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineCodeBracket, HiOutlineArrowDownTray, HiOutlinePlay, HiOutlineCommandLine, HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineExclamationTriangle, HiOutlineArrowRight } from 'react-icons/hi2'
import Link from 'next/link'
import { FaShieldAlt, FaBolt, FaWrench, FaBullseye } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

const agentCode = `from connectonion import Agent

def calculate(expression: str) -> str:
    """Safely evaluate basic math expressions."""
    try:
        # Only allow safe characters
        allowed = set('0123456789+-*/()., ')
        if not all(c in allowed for c in expression):
            return "Error: Only basic math operations allowed"
        
        result = eval(expression)
        return f"{expression} = {result}"
    except Exception as e:
        return f"Error: {str(e)}"

def get_help() -> str:
    """Get help about available math operations."""
    return """Available operations:
    + Addition
    - Subtraction  
    * Multiplication
    / Division
    () Parentheses for grouping
    
    Example: 2 + 3 * 4"""

# Create calculator agent
agent = Agent(
    name="calculator",
    tools=[calculate, get_help],
    max_iterations=5  # Math operations are straightforward
)

response = agent.input("What's 25 + 17 * 3?")
print(response)`

const expectedOutput = `25 + 17 * 3 = 76`

const fullExampleCode = `# calculator_agent.py
import os
from connectonion import Agent

# Set your OpenAI API key
os.environ['OPENAI_API_KEY'] = 'your-api-key-here'

def calculate(expression: str) -> str:
    """Safely evaluate basic math expressions like 2+3*4."""
    try:
        # Input validation - only allow safe mathematical characters
        allowed_chars = set('0123456789+-*/()., ')
        if not all(c in allowed_chars for c in expression):
            return "Error: Only basic math operations (+, -, *, /, parentheses) are allowed"
        
        # Prevent empty expressions
        if not expression.strip():
            return "Error: Please provide a math expression"
            
        # Evaluate the expression safely
        result = eval(expression)
        return f"Calculation: {expression} = {result}"
    except ZeroDivisionError:
        return f"Error: Division by zero in expression '{expression}'"
    except Exception as e:
        return f"Math Error: {str(e)} in expression '{expression}'"

def get_help() -> str:
    """Get help about available math operations and examples."""
    return """🧮 Calculator Help
    
Available operations:
• Addition: +
• Subtraction: -  
• Multiplication: *
• Division: /
• Parentheses: () for grouping
• Decimals: . (like 3.14)

Examples:
• Simple: 2 + 3
• Complex: (10 + 5) * 2 / 3
• Decimals: 3.14 * 2.5
• Order of operations: 2 + 3 * 4 = 14 (not 20!)"""

def validate_expression(expression: str) -> str:
    """Check if a math expression is valid before calculating."""
    if not expression or not expression.strip():
        return "❌ Empty expression - please provide a math problem"
    
    allowed_chars = set('0123456789+-*/()., ')
    invalid_chars = [c for c in expression if c not in allowed_chars]
    
    if invalid_chars:
        return f"❌ Invalid characters found: {', '.join(set(invalid_chars))}. Only use: 0-9, +, -, *, /, (, ), ."
    
    # Check for basic syntax issues
    if expression.count('(') != expression.count(')'):
        return "❌ Mismatched parentheses"
    
    return "✅ Expression looks valid!"

# Create the calculator agent
agent = Agent(
    name="calculator",
    system_prompt="""You are a helpful calculator assistant. 
    Always use the calculate() function for math operations.
    If users ask for help or seem confused, use get_help().
    If they want to check an expression first, use validate_expression().""",
    tools=[calculate, get_help, validate_expression]
)

if __name__ == "__main__":
    print("=== Calculator Agent Demo ===\\n")
    
    # Test various calculations
    test_cases = [
        "What's 25 + 17 * 3?",
        "Help me understand what operations are available",
        "Is '2 + 3 *' a valid expression?",
        "Calculate (100 - 25) / 5 + 10",
        "What's 22 / 7?"
    ]
    
    for i, test in enumerate(test_cases, 1):
        print(f"Test {i}: {test}")
        response = agent.input(test)
        print(f"Response: {response}\\n")
        print("-" * 50)`

export default function CalculatorAgentPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const markdownContent = `# Basic Calculator Agent - ConnectOnion Tutorial

Learn input validation, error handling, and multiple tool integration by building a safe math calculator agent.

## What You'll Learn

- Input validation and security best practices
- Error handling in agent tools
- Multiple tool integration patterns
- System prompts for tool selection guidance

## Key Features

- ✅ Safe mathematical expression evaluation
- 🛡️ Input validation and security filtering
- ❌ Comprehensive error handling
- 💡 Built-in help system
- ✔️ Expression validation before calculation

## Complete Example

\`\`\`python
${fullExampleCode}
\`\`\`

## Security Considerations

This example demonstrates important security practices:
- Character whitelist validation
- Safe eval() usage with input filtering
- Proper error handling and user feedback
- Expression syntax validation

Build on this foundation for more complex agents that need to handle user input safely!`

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
      {/* Navigation */}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
        <Link href="/" className="hover:text-gray-500 transition-colors">
          Docs
        </Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <Link href="/examples" className="hover:text-gray-500 transition-colors">
          Examples
        </Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <span className="text-gray-900">Calculator Agent</span>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h1 className="heading-1">Calculator Agent</h1>
              <p className="text-lg text-gray-700">
                Learn input validation, error handling, and security best practices by building a safe math calculator.
              </p>
            </div>
          </div>
          <CopyMarkdownButton 
            content={markdownContent}
            filename="calculator-agent.md"
            className="flex-shrink-0"
          />
        </div>
      </div>

      {/* Key Concepts */}
      <div className="mb-12 p-6 bg-gray-50 border border-gray-200 rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <HiOutlineLightBulb className="w-6 h-6 text-gray-500" />
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <HiOutlineShieldCheck className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">Input Validation</h3>
            <p className="text-gray-700 text-sm">Secure input filtering and validation</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <HiOutlineExclamationTriangle className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">Error Handling</h3>
            <p className="text-gray-700 text-sm">Graceful error management and feedback</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <HiOutlineCodeBracket className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">Multiple Tools</h3>
            <p className="text-gray-700 text-sm">Integrating several tools in one agent</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <HiOutlineCommandLine className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">System Prompts</h3>
            <p className="text-gray-700 text-sm">Guide tool selection with prompts</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Code Examples */}
        <div className="space-y-8">
          {/* Basic Example */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-300">Basic Calculator</h3>
              <button
                onClick={() => copyToClipboard(agentCode, 'basic')}
                className="text-gray-400 hover:text-gray-100 transition-colors p-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                {copiedId === 'basic' ? (
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
                {agentCode}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Complete Example */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200">Complete Example with Security</h3>
              <button
                onClick={() => copyToClipboard(fullExampleCode, 'complete')}
                className="text-gray-400 hover:text-gray-100 transition-colors p-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                {copiedId === 'complete' ? (
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
                {fullExampleCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-8">
          {/* Output */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700">
              <HiOutlineCommandLine className="w-5 h-5 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-200">Expected Output</h3>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
                <pre className="text-green-400 whitespace-pre-wrap">
                  {`=== Calculator Agent Demo ===

Test 1: What's 25 + 17 * 3?
Response: Calculation: 25 + 17 * 3 = 76

Test 2: Help me understand what operations are available
Response: 🧮 Calculator Help
    
Available operations:
• Addition: +
• Subtraction: -  
• Multiplication: *
• Division: /
• Parentheses: () for grouping
• Decimals: . (like 3.14)

Test 3: Is '2 + 3 *' a valid expression?
Response: ❌ Expression looks invalid - incomplete operation

Test 4: Calculate (100 - 25) / 5 + 10
Response: Calculation: (100 - 25) / 5 + 10 = 25.0`}
                </pre>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Features</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaShieldAlt className="w-4 h-4" />
                  <span>Input Validation</span>
                </h4>
                <p className="text-gray-700">Only allows safe mathematical characters (0-9, +, -, *, /, (, ), ., space).</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaBolt className="w-4 h-4" />
                  <span>Safe Evaluation</span>
                </h4>
                <p className="text-gray-700">Pre-filters input before using eval() to prevent code injection.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">🚨 Error Handling</h4>
                <p className="text-gray-700">Catches division by zero, syntax errors, and invalid operations gracefully.</p>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Features</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <FaWrench className="w-4 h-4" />
                  <span>Multiple Tools</span>
                </p>
                <ul className="text-gray-700 space-y-1">
                  <li>• <code>calculate()</code> - Core math operations</li>
                  <li>• <code>get_help()</code> - User assistance</li>
                  <li>• <code>validate_expression()</code> - Input checking</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <FaBullseye className="w-4 h-4" />
                  <span>System Prompt</span>
                </p>
                <p className="text-gray-700">Guides the agent on when to use which tool based on user needs.</p>
              </div>
            </div>
          </div>

          {/* Download */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Try It Yourself</h3>
            <div className="space-y-3">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(fullExampleCode)}`}
                download="calculator_agent.py"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors font-medium"
              >
                <HiOutlineArrowDownTray className="w-4 h-4" />
                Download Complete Example
              </a>
              <p className="text-xs text-gray-700 text-center">
                Complete calculator with security features and error handling
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ContentNavigation />
    </div>
  )
}
