
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
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-12 pt-16 lg:pt-12">
      {/* Navigation */}

      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-8 h-8 text-purple-400" />
                <h1 className="text-4xl font-bold text-white">Senior Code Reviewer</h1>
                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm font-medium">
                  Advanced
                </span>
              </div>
              <p className="text-xl text-gray-300">
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
      <div className="mb-12 p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-purple-400" />
          Key Learning Concepts
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-1">Review Framework</h3>
              <p className="text-purple-200 text-sm">5 systematic focus areas ensure comprehensive code analysis</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-1">Priority Classification</h3>
              <p className="text-purple-200 text-sm">Critical/Major/Minor system helps developers focus on important issues</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-1">Constructive Feedback</h3>
              <p className="text-purple-200 text-sm">Balance criticism with positive recognition and actionable suggestions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Prompt Content */}
        <div className="space-y-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">System Prompt</h3>
              <button
                onClick={() => copyToClipboard(promptContent, 'prompt')}
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
              >
                {copiedId === 'prompt' ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
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
          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Usage Example</h3>
              <button
                onClick={() => copyToClipboard(usageExample, 'usage')}
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
              >
                {copiedId === 'usage' ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
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
          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Expected Output</h3>
            </div>
            
            <div className="p-6">
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-purple-200 whitespace-pre-wrap">
                  {expectedOutput}
                </pre>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Professional Techniques</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">🎯 Systematic Analysis</h4>
                <p className="text-gray-300">5 focus areas ensure no important aspects are missed during review.</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">🚦 Priority System</h4>
                <p className="text-gray-300">Color-coded severity levels help developers prioritize their fixes effectively.</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">💡 Solution-Oriented</h4>
                <p className="text-gray-300">Provides concrete code examples and actionable improvement suggestions.</p>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Download & Customize</h3>
            <div className="space-y-3">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(promptContent)}`}
                download="code_reviewer.md"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                Download Prompt File
              </a>
              <p className="text-xs text-gray-300 text-center">
                Perfect for automated code review and development workflows
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
