'use client'

import { HiOutlineDocumentText } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'
import Link from 'next/link'

export default function FileToolsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'FileTools' }
          ]}
          icon={HiOutlineDocumentText}
          iconColor="text-blue-400"
          iconBgFrom="from-blue-600/20"
          iconBgTo="to-cyan-600/20"
          iconBorderColor="border-blue-500/30"
          title="FileTools"
          description="Claude Code-style file operations with read-before-edit tracking and permission control."
          markdownPath="/file_tools.md"
          markdownFilename="file_tools.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import FileTools

# Full access (read + write with snapshot tracking)
agent = Agent("coder", tools=[FileTools()])

# Read-only mode
agent = Agent("reader", tools=[FileTools(permission="read")])`}
            language="python"
          />
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="heading-2">Key Features</h2>

          <h3 className="text-lg font-semibold text-white mb-3 mt-6">1. Read-Before-Edit Validation</h3>
          <p className="text-slate-100 mb-4">FileTools tracks which files have been read and prevents edits without prior reads:</p>
          <CodeWithResult
            code={`ft = FileTools()

# This will fail - file not read yet
ft.edit("app.py", "old", "new")
# Error: Read 'app.py' before editing (use read_file first)

# Read first, then edit
ft.read_file("app.py")
ft.edit("app.py", "old", "new")  # ✓ Success`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">2. Stale Read Detection (MD5 Snapshots)</h3>
          <p className="text-slate-100 mb-4">Detects external file changes between read and edit:</p>
          <CodeWithResult
            code={`ft = FileTools()

ft.read_file("config.json")
# ... external process changes config.json ...
ft.edit("config.json", "old", "new")
# Error: 'config.json' changed since last read - re-read it first`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">3. write() for NEW Files Only</h3>
          <p className="text-slate-100 mb-4">write() prevents overwriting existing files:</p>
          <CodeWithResult
            code={`ft = FileTools()

# Create new file - works
ft.write("new.py", "print('hello')")  # ✓ Success

# Try to overwrite - fails with helpful message
ft.write("new.py", "print('world')")
# Error: File 'new.py' already exists. Use edit() or multi_edit() to modify existing files`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">4. Permission Modes</h3>
          <CodeWithResult
            code={`# Write mode (default) - full access
ft = FileTools(permission="write")
ft.read_file("app.py")    # ✓
ft.edit("app.py", ...)    # ✓
ft.write("new.py", ...)   # ✓

# Read-only mode
ft = FileTools(permission="read")
ft.read_file("app.py")    # ✓
ft.glob("**/*.py")        # ✓
ft.grep("pattern")        # ✓
ft.edit("app.py", ...)    # ✗ Permission denied
ft.write("new.py", ...)   # ✗ Permission denied`}
            language="python"
          />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="heading-2">API Reference</h2>

          <h3 className="text-lg font-semibold text-white mb-3">read_file(path, offset=None, limit=None)</h3>
          <p className="text-slate-100 mb-4">Read file with line numbers. Automatically tracks MD5 snapshot.</p>
          <CodeWithResult
            code={`ft.read_file("app.py")
# Returns: "1→import os\\n2→from pathlib import Path..."

ft.read_file("app.py", offset=10, limit=5)
# Returns: "10→def main():\\n11→    pass..."`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">edit(file_path, old_string, new_string, replace_all=False)</h3>
          <p className="text-slate-100 mb-4">Replace string in file. Validates read-before-edit and detects stale reads.</p>
          <CodeWithResult
            code={`ft.read_file("app.py")
ft.edit("app.py", "old_function", "new_function")
# ✓ Success - file edited

ft.edit("app.py", "import os", "import sys", replace_all=True)
# ✓ Replaces all occurrences`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">multi_edit(file_path, edits)</h3>
          <p className="text-slate-100 mb-4">Apply multiple edits atomically. All succeed or none applied.</p>
          <CodeWithResult
            code={`ft.read_file("app.py")
ft.multi_edit("app.py", [
    {"old_string": "foo", "new_string": "bar"},
    {"old_string": "hello", "new_string": "world", "replace_all": True}
])
# ✓ Both edits applied atomically`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">write(path, content)</h3>
          <p className="text-slate-100 mb-4">Create NEW files only. Returns error if file exists.</p>
          <CodeWithResult
            code={`ft.write("new_module.py", "def hello():\\n    print('world')")
# ✓ Creates parent directories automatically
# ✓ Tracks snapshot for subsequent edits
# ✗ Fails if file already exists`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">glob(pattern, path=None)</h3>
          <p className="text-slate-100 mb-4">Search files by glob pattern. Returns max 100 results.</p>
          <CodeWithResult
            code={`ft.glob("**/*.py")           # All Python files recursively
ft.glob("src/**/*.tsx")      # All TSX files in src/
ft.glob("*.md", "docs")      # Markdown in docs/ directory`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">grep(pattern, path=None, ...)</h3>
          <p className="text-slate-100 mb-4">Search file contents with regex. Supports multiple output modes.</p>
          <CodeWithResult
            code={`# Just file paths (default)
ft.grep("TODO", output_mode="files")

# Matching lines with context
ft.grep("class\\s+\\w+", output_mode="content", context_lines=2)

# Match counts per file
ft.grep("import", output_mode="count")`}
            language="python"
          />
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="heading-2">Usage Examples</h2>

          <h3 className="text-lg font-semibold text-white mb-3">File editing agent with safety</h3>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import FileTools

agent = Agent(
    "code-reviewer",
    model="co/gemini-2.5-pro",
    tools=[FileTools()],
    instructions="Review and fix code. Always read files before editing."
)

agent.input("Fix typos in README.md")`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">Read-only documentation agent</h3>
          <CodeWithResult
            code={`agent = Agent(
    "doc-analyzer",
    tools=[FileTools(permission="read")],
    instructions="Analyze codebase structure and document findings."
)`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">Code generation agent</h3>
          <CodeWithResult
            code={`agent = Agent(
    "code-gen",
    tools=[FileTools()],
    instructions="Generate new code files. Use write() for new files, edit() for modifications."
)

agent.input("Create a new FastAPI endpoint for user registration")`}
            language="python"
          />
        </section>

        {/* Backward Compatibility */}
        <section className="mb-12">
          <h2 className="heading-2">Backward Compatibility</h2>
          <p className="text-slate-100 mb-4">Individual functions still available without FileTools wrapper:</p>
          <CodeWithResult
            code={`from connectonion.useful_tools import read_file, edit, write, glob, grep

agent = Agent("custom", tools=[read_file, edit, write])
# No state tracking, no read-before-edit enforcement
# write() still prevents overwriting (built into function)`}
            language="python"
          />
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
