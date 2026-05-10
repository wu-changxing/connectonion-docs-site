'use client'

import Link from 'next/link'
import { HiOutlineCpuChip, HiOutlineBookmark, HiOutlineMagnifyingGlass, HiOutlineCircleStack, HiOutlineArrowRight, HiOutlineDocumentText, HiOutlineFolderOpen, HiOutlineLightBulb } from 'react-icons/hi2'
import { CommandBlock } from '../../components/CommandBlock'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'
import { PageHeader } from '../../components/PageHeader'

export default function MemoryPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Memory' }
          ]}
          icon={HiOutlineCpuChip}
          title="Memory System"
          description="Give your agents persistent memory using markdown-based storage."
          markdownPath="/memory.md"
          markdownFilename="memory.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineLightBulb className="w-6 h-6 text-gray-400" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <CodeWithResult 
            code={`from connectonion import Agent, Memory

memory = Memory()
agent = Agent(
    name="assistant",
    system_prompt="You are a helpful assistant with memory.",
    tools=[memory]
)

# Agent can now remember things
agent.input("Remember that Alice prefers email communication")
agent.input("What do I know about Alice?")`}
            language="python"
            fileName="quickstart.py"
          />
        </section>

        {/* What is Memory? */}
        <section className="mb-16">
          <h2 className="heading-2">What is Memory?</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Memory is a simple, file-based storage system that lets your agents:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <HiOutlineBookmark className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Persistent Storage</p>
                  <p className="text-sm text-gray-600">Save information across sessions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCircleStack className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Key-Value Retrieval</p>
                  <p className="text-sm text-gray-600">Retrieve information by specific keys</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineMagnifyingGlass className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Regex Search</p>
                  <p className="text-sm text-gray-600">Search across all memories with patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineDocumentText className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Markdown Format</p>
                  <p className="text-sm text-gray-600">Organize knowledge in human-readable format</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
              <HiOutlineFolderOpen className="w-5 h-5" />
              Storage Strategy
            </h3>
            <p className="text-gray-700">
              Memories start in a single <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">memory.md</code> file. When the file exceeds 3000 lines, it automatically splits into a directory structure with separate <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.md</code> files per memory key.
            </p>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="heading-2">Installation</h2>
          <p className="text-gray-700 mb-4">Memory is included in ConnectOnion:</p>
          <CommandBlock commands={['pip install connectonion']} />
        </section>

        {/* Basic Usage */}
        <section className="mb-16">
          <h2 className="heading-2">Basic Usage</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Creating a Memory Instance</h3>
              <CodeWithResult 
                code={`from connectonion import Memory

# Default (creates memory.md)
memory = Memory()

# Custom file path
memory = Memory(memory_file="agent_knowledge.md")

# Legacy: directory structure (creates directory immediately)
memory = Memory(memory_dir="agent_knowledge")`}
                language="python"
                fileName="init_memory.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Adding Memory to an Agent</h3>
              <CodeWithResult 
                code={`from connectonion import Agent, Memory

memory = Memory()
agent = Agent("assistant", tools=[memory])`}
                language="python"
                fileName="agent_with_memory.py"
              />
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-gray-700 mb-4">Now your agent has access to 4 memory methods:</p>
                <ul className="space-y-2 text-sm font-mono text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-500">write_memory(key, content)</span>
                    <span className="text-gray-500">- Save or update information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-500">read_memory(key)</span>
                    <span className="text-gray-500">- Retrieve information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-500">list_memories()</span>
                    <span className="text-gray-500">- Show all stored memories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-500">search_memory(pattern)</span>
                    <span className="text-gray-500">- Search with regex</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Memory Methods */}
        <section className="mb-16">
          <h2 className="heading-2">Memory Methods</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 font-mono">write_memory</h3>
              <p className="text-gray-700 mb-4">Save information to memory:</p>
              <CodeWithResult 
                code={`memory.write_memory("alice-notes", "Alice prefers email\\nAlice works at TechCorp")
# Returns: "Memory saved: alice-notes"`}
                language="python"
                fileName="write.py"
              />
              <div className="mt-4 text-sm text-gray-600">
                <strong>Keys are sanitized:</strong> Only alphanumeric, hyphens, and underscores allowed. Converted to lowercase.
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 font-mono">read_memory</h3>
              <p className="text-gray-700 mb-4">Retrieve saved information:</p>
              <CodeWithResult 
                code={`memory.read_memory("alice-notes")
# Returns:
# Memory: alice-notes
#
# Alice prefers email
# Alice works at TechCorp`}
                language="python"
                fileName="read.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 font-mono">list_memories</h3>
              <p className="text-gray-700 mb-4">Show all stored memories:</p>
              <CodeWithResult 
                code={`memory.list_memories()
# Returns:
# Stored Memories (3):
# 1. alice-notes (85 bytes)
# 2. bob-notes (62 bytes)
# 3. project-x (120 bytes)`}
                language="python"
                fileName="list.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 font-mono">search_memory</h3>
              <p className="text-gray-700 mb-4">Search across all memories using regex:</p>
              <CodeWithResult 
                code={`# Simple text search (case-sensitive by default)
memory.search_memory("email")

# Case-insensitive search with (?i) flag
memory.search_memory("(?i)email")

# Regex patterns
memory.search_memory(r"\\w+@\\w+\\.\\w+")  # Find email addresses
memory.search_memory(r"Project [A-Z]")  # Find project names`}
                language="python"
                fileName="search.py"
              />
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="heading-2">Examples</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Example 1: Customer Notes</h3>
              <CodeWithResult 
                code={`from connectonion import Agent, Memory

memory = Memory(memory_dir="customer_notes")
agent = Agent(
    name="sales-assistant",
    system_prompt="You help track customer information.",
    tools=[memory]
)

# Save customer info
agent.input("Remember that Alice from TechCorp is interested in our API product and prefers email contact")

# Later, recall the information
agent.input("What do I know about Alice?")
# Agent will use read_memory() to retrieve Alice's info`}
                language="python"
                fileName="customer_notes.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Example 2: Project Tracker</h3>
              <CodeWithResult 
                code={`from connectonion import Agent, Memory

memory = Memory(memory_dir="projects")
agent = Agent(
    name="project-manager",
    system_prompt="You track project status and notes.",
    tools=[memory]
)

# Save project updates
agent.input("Remember: Project Alpha is 80% complete, needs final testing")
agent.input("Remember: Project Beta is blocked, waiting on API keys")

# Search for blocked projects
agent.input("Which projects are blocked?")
# Agent will use search_memory("blocked") to find relevant projects`}
                language="python"
                fileName="project_tracker.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Example 3: Research Assistant</h3>
              <CodeWithResult
                code={`from connectonion import Agent, Memory

def web_search(query: str) -> str:
    """Search the web for information."""
    # Your search implementation
    return f"Results for {query}"

memory = Memory(memory_dir="research")
agent = Agent(
    name="researcher",
    system_prompt="You research topics and save key findings.",
    tools=[web_search, memory]
)

# Research and save
agent.input("Research the history of Python programming and save key points")
# Agent will search, then use write_memory() to save findings

# Later, recall research
agent.input("What did I learn about Python's history?")`}
                language="python"
                fileName="research_assistant.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Example 4: Multi-Agent Shared Memory</h3>
              <p className="text-gray-700 mb-4">Pass the same Memory instance to multiple agents so they share knowledge:</p>
              <CodeWithResult
                code={`from connectonion import Agent, Memory

# Shared memory between agents
shared_memory = Memory(memory_dir="shared_knowledge")

researcher = Agent(
    name="researcher",
    system_prompt="You research and document findings.",
    tools=[shared_memory]
)

writer = Agent(
    name="writer",
    system_prompt="You write articles based on research.",
    tools=[shared_memory]
)

# Researcher saves findings
researcher.input("Research AI trends and save the findings")

# Writer uses the same memory
writer.input("Write an article based on AI trends research")`}
                language="python"
                fileName="multi_agent_memory.py"
              />
            </div>
          </div>
        </section>

        {/* Advanced Patterns */}
        <section className="mb-16">
          <h2 className="heading-2">Advanced Patterns</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Memory with Different Tools</h3>
              <p className="text-gray-700 mb-4">Memory works alongside any other tools:</p>
              <CodeWithResult
                code={`from connectonion import Agent, Memory

def calculate(expression: str) -> float:
    """Calculate math expressions."""
    return eval(expression)

def send_email(to: str, subject: str, body: str) -> str:
    """Send an email."""
    # Implementation
    return "Email sent"

memory = Memory()

agent = Agent(
    name="multi-tool-agent",
    tools=[calculate, send_email, memory]
)`}
                language="python"
                fileName="multi_tool.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Custom File Organization</h3>
              <p className="text-gray-700 mb-4">Use separate Memory files for different purposes:</p>
              <CodeWithResult
                code={`# Separate memory files for different purposes
customer_memory = Memory(memory_file="data/customers.md")
project_memory = Memory(memory_file="data/projects.md")
research_memory = Memory(memory_file="data/research.md")

agent = Agent(
    name="organized-agent",
    tools=[customer_memory, project_memory, research_memory]
)`}
                language="python"
                fileName="organized.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Regex Search Patterns</h3>
              <p className="text-gray-700 mb-4">Powerful pattern matching across all stored memories:</p>
              <CodeWithResult
                code={`# Find email addresses
memory.search_memory(r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b")

# Find phone numbers
memory.search_memory(r"\\d{3}-\\d{3}-\\d{4}")

# Find dates (YYYY-MM-DD)
memory.search_memory(r"\\d{4}-\\d{2}-\\d{2}")

# Find URLs
memory.search_memory(r"https?://[^\\s]+")

# Case-insensitive keyword with word boundaries
memory.search_memory(r"(?i)\\bproject\\b")`}
                language="python"
                fileName="regex_patterns.py"
              />
            </div>
          </div>
        </section>

        {/* File Format */}
        <section className="mb-16">
          <h2 className="heading-2">File Format</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Single File (Default)</h3>
              <p className="text-gray-700 mb-4">Memories start in a single <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">memory.md</code> file using section headers:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700">
                <div className="text-gray-700 font-bold">## alice-notes</div>
                <div className="mt-2">Alice prefers email communication<br/>Works at TechCorp</div>
                <div className="text-gray-700 font-bold mt-4">## bob-notes</div>
                <div className="mt-2">Bob from Marketing<br/>Prefers phone calls</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Auto-Split to Directory</h3>
              <p className="text-gray-700 mb-4">When <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">memory.md</code> exceeds 3000 lines, it automatically migrates:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700">
                <div>memory/</div>
                <div className="pl-4">├── alice-notes.md</div>
                <div className="pl-4">├── bob-notes.md</div>
                <div className="pl-4">└── project-x.md</div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="heading-2">Best Practices</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">1. Use Descriptive Keys</h3>
              <CodeWithResult 
                code={`# Good
memory.write_memory("alice-techcorp-contact-info", content)

# Bad
memory.write_memory("note1", content)`}
                language="python"
                fileName="keys.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">2. Structure Your Content</h3>
              <p className="text-gray-700 mb-2">Use markdown formatting for better organization:</p>
              <CodeWithResult
                code={`content = """# Alice - TechCorp

## Contact Info
- Email: alice@techcorp.com

## Projects
- Interested in API product
"""
memory.write_memory("alice-techcorp", content)`}
                language="python"
                fileName="structure.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">3. Keep Memories Updated</h3>
              <p className="text-gray-700 mb-2">Periodically prune or refresh stale notes:</p>
              <CodeWithResult
                code={`# Update or overwrite outdated memories
agent.input("Review and update any memories older than 6 months")`}
                language="python"
                fileName="updates.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">4. Search Before Creating</h3>
              <p className="text-gray-700 mb-2">Avoid duplicates by checking first:</p>
              <CodeWithResult
                code={`# Check if similar memory exists
agent.input("Do we have any notes about Alice?")
# Agent will search before creating duplicate memory`}
                language="python"
                fileName="search_first.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">5. Use Consistent Naming</h3>
              <p className="text-gray-700 mb-2">Pick a key prefix convention and stick to it:</p>
              <CodeWithResult
                code={`memory.write_memory("customer-alice-techcorp", ...)
memory.write_memory("customer-bob-acmecorp", ...)
memory.write_memory("project-alpha", ...)
memory.write_memory("project-beta", ...)`}
                language="python"
                fileName="naming.py"
              />
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-16">
          <h2 className="heading-2">Limitations</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Storage</h3>
              <p className="text-sm text-gray-700">All memories are loaded during search. For very large stores (&gt;1000 files or &gt;100MB), consider a database backend.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Concurrency</h3>
              <p className="text-sm text-gray-700">File-based storage isn&apos;t optimized for high concurrency. Multiple agents writing to the same memory may race.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Search Performance</h3>
              <p className="text-sm text-gray-700">Regex search scans linearly. For large-scale search, consider Elasticsearch or similar.</p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="heading-2">Troubleshooting</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">&ldquo;Memory not found&rdquo;</h3>
              <p className="text-gray-700 mb-3">Keys are sanitized — list all stored memories to see actual keys:</p>
              <CodeWithResult
                code={`print(memory.list_memories())`}
                language="python"
                fileName="check_keys.py"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">&ldquo;Invalid key name&rdquo;</h3>
              <p className="text-gray-700 mb-3">Use only alphanumeric characters, hyphens, and underscores:</p>
              <CodeWithResult
                code={`# Good
memory.write_memory("alice-notes", content)

# Bad — will be rejected or sanitized
memory.write_memory("alice@notes!", content)`}
                language="python"
                fileName="key_format.py"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Memory file not created</h3>
              <p className="text-gray-700 mb-3">The file is created on first write, not on construction:</p>
              <CodeWithResult
                code={`import os
memory = Memory()
memory.write_memory("test", "content")
print(os.path.exists("memory.md"))  # True`}
                language="python"
                fileName="creation.py"
              />
            </div>
          </div>
        </section>

        {/* Customizing */}
        <section className="mb-16">
          <h2 className="heading-2">Customizing</h2>
          <p className="text-gray-700 mb-4">
            Need to modify Memory&apos;s behavior? Copy the source into your project and import from there:
          </p>
          <CommandBlock commands={['co copy memory']} />
          <div className="mt-6">
            <CodeWithResult
              code={`# from connectonion import Memory  # Before
from tools.memory import Memory      # After — customize freely`}
              language="python"
              fileName="custom_import.py"
            />
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
