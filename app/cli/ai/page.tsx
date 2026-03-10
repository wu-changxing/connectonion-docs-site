/**
 * @purpose CLI AI command documentation
 * @context Shows how to use `co ai` for coding agent
 */

'use client'

import { HiOutlineCommandLine, HiOutlineSparkles, HiOutlineCodeBracket, HiOutlineServer, HiOutlineBolt } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliAiPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co ai' }
            ]}
            icon={HiOutlineSparkles}
            iconColor="text-purple-400"
            iconBgFrom="from-purple-600/20"
            iconBgTo="to-pink-600/20"
            iconBorderColor="border-purple-500/30"
            title="co ai"
            description="AI coding agent in your terminal. Run one-shot prompts or start an interactive agent with full tool access."
          />

          <div className="bg-purple-950/50 border border-purple-400/40 rounded-lg p-6">
            <p className="text-lg font-semibold text-purple-100">
              <strong>Quick Start:</strong> Type <code className="bg-gray-800 px-2 py-1 rounded">co ai "create a FastAPI hello world app"</code> and watch the AI write code for you.
            </p>
          </div>
        </section>

        {/* One-Shot Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-yellow-400" />
            One-Shot Mode
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Run a single prompt and exit - perfect for quick code generation:
          </p>

          <CodeWithResult
            code={`co ai "create a FastAPI app with hello world endpoint"`}
            result={`[agent] Creating FastAPI hello world app...
[agent] Writing main.py...

✓ Created main.py with FastAPI hello world endpoint

main.py:
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

Done! Run with: python main.py`}
            language="bash"
          />

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-4">More Examples</h3>
              <div className="space-y-3">
                <CodeWithResult
                  code={`# Fix a bug
co ai "fix the authentication error in app.py"

# Add a feature
co ai "add database connection to main.py using SQLAlchemy"

# Refactor code
co ai "refactor utils.py to use async functions"

# Write tests
co ai "write pytest tests for the User model"`}
                  language="bash"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-cyan-400" />
            Interactive Mode
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Start without a prompt for multi-turn conversation:
          </p>

          <CodeWithResult
            code={`co ai`}
            result={`[agent] AI coding agent ready. What would you like me to do?

> create a todo app with FastAPI

[agent] I'll create a FastAPI todo application...
[agent] Writing main.py...
[agent] Writing models.py...

✓ Created todo API with FastAPI

> now add authentication

[agent] Adding authentication to the todo app...
[agent] Updating main.py with auth...

✓ Added JWT authentication

> exit`}
            language="bash"
          />
        </section>

        {/* Web Server Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineServer className="w-8 h-8 text-emerald-400" />
            Web Server Mode
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Start a web server to interact with the agent via browser:
          </p>

          <CodeWithResult
            code={`co ai --port 8000`}
            result={`[agent] Starting AI coding agent web server...
[agent] Server running at http://localhost:8000
[agent] Open in browser to interact with the agent`}
            language="bash"
          />

          <div className="mt-6 bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-100 mb-4">Web Interface Features</h3>
            <div className="space-y-2 text-slate-100">
              <div className="flex items-start gap-2">
                <span className="text-blue-300">•</span>
                <span>Chat interface for multi-turn conversations</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-300">•</span>
                <span>File upload support for context</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-300">•</span>
                <span>Code syntax highlighting</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-300">•</span>
                <span>Tool execution logs in real-time</span>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-indigo-400" />
            Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Model Selection</h3>
              <CodeWithResult
                code={`# Use specific model
co ai "create app" --model co/gpt-4o

# Use faster model for simple tasks
co ai "fix typo" --model co/gpt-4o-mini

# Use most powerful model
co ai "design complex system" --model co/claude-opus-4-5`}
                language="bash"
              />
              <p className="text-slate-300 mt-4">
                Default model: <code className="bg-gray-800 px-2 py-1 rounded">co/claude-opus-4-5</code>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Max Iterations</h3>
              <p className="text-slate-100 mb-4">
                Control how many times the agent can iterate:
              </p>
              <CodeWithResult
                code={`# Allow more iterations for complex tasks
co ai "refactor entire codebase" --max-iterations 200

# Limit iterations for simple tasks
co ai "add comment" --max-iterations 10`}
                language="bash"
              />
              <p className="text-slate-300 mt-4">
                Default: <code className="bg-gray-800 px-2 py-1 rounded">100</code> iterations
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Combined Options</h3>
              <CodeWithResult
                code={`co ai "build microservice" \\
  --model co/claude-opus-4-5 \\
  --max-iterations 150 \\
  --port 9000`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Available Tools */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-orange-400" />
            Available Tools
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            The AI agent has access to powerful tools:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-green-300 mb-2">File Operations</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Read files</li>
                <li>• Write new files</li>
                <li>• Edit existing files</li>
                <li>• Search with glob/grep</li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-blue-300 mb-2">Code Execution</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Run bash commands</li>
                <li>• Execute tests</li>
                <li>• Install packages</li>
                <li>• Git operations</li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-purple-300 mb-2">Planning</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Create task lists</li>
                <li>• Track progress</li>
                <li>• Plan implementation</li>
                <li>• Design architecture</li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-pink-300 mb-2">Sub-Agents</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Explore codebase</li>
                <li>• Plan features</li>
                <li>• Run specialized tasks</li>
                <li>• Parallel execution</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-yellow-400" />
            Common Use Cases
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Rapid Prototyping</h3>
              <CodeWithResult
                code={`co ai "create a REST API for blog posts with CRUD operations"`}
                language="bash"
              />
              <p className="text-slate-300 mt-2">
                Generates complete working code in seconds
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2. Bug Fixing</h3>
              <CodeWithResult
                code={`co ai "fix the TypeError in api/routes.py on line 45"`}
                language="bash"
              />
              <p className="text-slate-300 mt-2">
                Analyzes code, identifies issue, applies fix
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">3. Adding Features</h3>
              <CodeWithResult
                code={`co ai "add pagination to the /users endpoint"`}
                language="bash"
              />
              <p className="text-slate-300 mt-2">
                Understands existing code, adds feature cleanly
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">4. Code Migration</h3>
              <CodeWithResult
                code={`co ai "migrate from requests to httpx in all API clients"`}
                language="bash"
              />
              <p className="text-slate-300 mt-2">
                Refactors across multiple files consistently
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">5. Test Generation</h3>
              <CodeWithResult
                code={`co ai "write comprehensive pytest tests for models/user.py"`}
                language="bash"
              />
              <p className="text-slate-300 mt-2">
                Generates test cases with proper fixtures and assertions
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-20">
          <div className="bg-yellow-950/50 border border-yellow-400/40 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-100 mb-4">Best Practices</h3>
            <div className="space-y-3 text-slate-100">
              <div>
                <strong className="text-green-300">✅ DO:</strong> Be specific in your prompts - "add user authentication with JWT" is better than "add auth"
              </div>
              <div>
                <strong className="text-green-300">✅ DO:</strong> Use one-shot mode for quick tasks, interactive for complex projects
              </div>
              <div>
                <strong className="text-green-300">✅ DO:</strong> Review generated code before running in production
              </div>
              <div>
                <strong className="text-red-300">❌ DON'T:</strong> Run destructive commands without confirmation
              </div>
              <div>
                <strong className="text-red-300">❌ DON'T:</strong> Use for critical security-sensitive code without review
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-indigo-400" />
            Command Reference
          </h2>

          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-100 font-semibold">Option</th>
                  <th className="text-left px-4 py-3 text-slate-100 font-semibold">Short</th>
                  <th className="text-left px-4 py-3 text-slate-100 font-semibold">Default</th>
                  <th className="text-left px-4 py-3 text-slate-100 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-purple-300">--port</td>
                  <td className="px-4 py-3 font-mono text-slate-400">-p</td>
                  <td className="px-4 py-3 text-slate-300">8000</td>
                  <td className="px-4 py-3 text-slate-100">Web server port</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-purple-300">--model</td>
                  <td className="px-4 py-3 font-mono text-slate-400">-m</td>
                  <td className="px-4 py-3 text-slate-300">co/claude-opus-4-5</td>
                  <td className="px-4 py-3 text-slate-100">Model to use</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-purple-300">--max-iterations</td>
                  <td className="px-4 py-3 font-mono text-slate-400">-i</td>
                  <td className="px-4 py-3 text-slate-300">100</td>
                  <td className="px-4 py-3 text-slate-100">Maximum iterations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
