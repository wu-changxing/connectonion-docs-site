'use client'

import { HiOutlineCommandLine } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'

export default function ShellPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'Shell' }
          ]}
          icon={HiOutlineCommandLine}
          iconColor="text-orange-400"
          iconBgFrom="from-orange-600/20"
          iconBgTo="to-red-600/20"
          iconBorderColor="border-orange-500/30"
          title="Shell"
          description="Shell command execution tool."
          markdownPath="/useful-tools/shell.md"
          markdownFilename="shell.md"
        />

        {/* Installation */}
        <section className="mb-12">
          <h2 className="heading-2">Installation</h2>
          <CodeWithResult
            code={`from connectonion import Shell

shell = Shell()`}
            language="python"
          />
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>

          <h3 className="text-lg font-semibold text-white mb-3">run(command)</h3>
          <p className="text-slate-100 mb-4">Execute a shell command, returns output.</p>
          <CodeWithResult
            code={`result = shell.run("ls -la")
# Returns: "total 12\\ndrwxr-xr-x  8 user staff..."

result = shell.run("git status")
# Returns: "On branch main\\nnothing to commit..."

result = shell.run("python --version")
# Returns: "Python 3.11.0"`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">run_in_dir(command, directory)</h3>
          <p className="text-slate-100 mb-4">Execute command in a specific directory.</p>
          <CodeWithResult
            code={`result = shell.run_in_dir("npm install", "/path/to/project")
# Returns: "added 100 packages..."

result = shell.run_in_dir("pytest", "/path/to/tests")
# Returns: "5 passed in 0.5s"`}
            language="python"
          />
        </section>

        {/* Use with Agent */}
        <section className="mb-12">
          <h2 className="heading-2">Use with Agent</h2>
          <CodeWithResult
            code={`from connectonion import Agent, Shell

shell = Shell()
agent = Agent("coder", tools=[shell])

agent.input("list all python files in current directory")
# Agent runs: shell.run("ls *.py")

agent.input("run the tests")
# Agent runs: shell.run("pytest")

agent.input("install requests package")
# Agent runs: shell.run("pip install requests")`}
            language="python"
          />
        </section>

        {/* Common Use Cases */}
        <section className="mb-12">
          <h2 className="heading-2">Common Use Cases</h2>
          <CodeWithResult
            code={`# Git operations
shell.run("git status")
shell.run("git add .")
shell.run("git commit -m 'update'")

# Package management
shell.run("pip install requests")
shell.run("npm install express")

# Build and test
shell.run("pytest")
shell.run("npm run build")

# System info
shell.run("pwd")
shell.run("whoami")
shell.run("df -h")`}
            language="python"
          />
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
