'use client'

import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'

export default function TodoListPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'Todo List' }
          ]}
          icon={HiOutlineClipboardDocumentList}
          iconColor="text-yellow-400"
          iconBgFrom="from-yellow-600/20"
          iconBgTo="to-orange-600/20"
          iconBorderColor="border-yellow-500/30"
          title="TodoList"
          description="Task tracking tool for agents to manage complex, multi-step tasks."
          markdownPath="/useful-tools/todo-list.md"
          markdownFilename="todo-list.md"
        />

        {/* Installation */}
        <section className="mb-12">
          <h2 className="heading-2">Installation</h2>
          <CodeWithResult
            code={`from connectonion import TodoList

todo = TodoList()`}
            language="python"
          />
          <p className="text-slate-100 mt-4 text-sm">
            Want to customize? Run <code className="bg-gray-800 px-2 py-1 rounded">co copy todo_list</code> to get an editable copy.
          </p>
        </section>

        {/* Why Use TodoList */}
        <section className="mb-12">
          <h2 className="heading-2">Why Use TodoList?</h2>
          <ul className="space-y-2 text-slate-100">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Track progress</strong> on complex tasks with multiple steps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Show users</strong> what the agent is working on</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Organize</strong> multi-step workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Prevent</strong> forgetting steps in complex tasks</span>
            </li>
          </ul>
        </section>

        {/* When to Use */}
        <section className="mb-12">
          <h2 className="heading-2">When to Use</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-2">Use when:</h3>
              <ul className="text-slate-100 text-sm space-y-1">
                <li>• Task requires <strong>3+ distinct steps</strong></li>
                <li>• User provides <strong>multiple tasks</strong></li>
                <li>• Task requires <strong>careful planning</strong></li>
                <li>• You want to show <strong>progress</strong></li>
              </ul>
            </div>
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <h3 className="text-red-400 font-semibold mb-2">Don't use when:</h3>
              <ul className="text-slate-100 text-sm space-y-1">
                <li>• Task is <strong>trivial</strong> (1-2 simple steps)</li>
                <li>• Task is <strong>purely conversational</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>

          <h3 className="text-lg font-semibold text-white mb-3">add(content, active_form)</h3>
          <p className="text-slate-100 mb-4">Add a new pending task.</p>
          <CodeWithResult
            code={`todo.add("Fix authentication bug", "Fixing authentication bug")
todo.add("Run tests", "Running tests")
todo.add("Update docs", "Updating docs")`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">start(content)</h3>
          <p className="text-slate-100 mb-4">Mark a task as in_progress. Only one task can be in_progress at a time.</p>
          <CodeWithResult
            code={`todo.start("Fix authentication bug")
# Shows: ◐ Fixing authentication bug`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">complete(content)</h3>
          <p className="text-slate-100 mb-4">Mark a task as completed.</p>
          <CodeWithResult
            code={`todo.complete("Fix authentication bug")
# Shows: ● Fix authentication bug`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">remove(content)</h3>
          <p className="text-slate-100 mb-4">Remove a task from the list.</p>
          <CodeWithResult
            code={`todo.remove("Update docs")`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">list()</h3>
          <p className="text-slate-100 mb-4">Get all todos as text.</p>
          <CodeWithResult
            code={`print(todo.list())
# ○ Fix authentication bug
# ◐ Running tests
# ● Update docs`}
            language="python"
          />
        </section>

        {/* Task States */}
        <section className="mb-12">
          <h2 className="heading-2">Task States</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-slate-200">Icon</th>
                  <th className="px-4 py-3 text-slate-200">Status</th>
                  <th className="px-4 py-3 text-slate-200">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 text-2xl">○</td>
                  <td className="px-4 py-3 font-mono text-yellow-300">pending</td>
                  <td className="px-4 py-3 text-slate-100">Not yet started</td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 text-2xl">◐</td>
                  <td className="px-4 py-3 font-mono text-yellow-300">in_progress</td>
                  <td className="px-4 py-3 text-slate-100">Currently working on</td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 text-2xl">●</td>
                  <td className="px-4 py-3 font-mono text-yellow-300">completed</td>
                  <td className="px-4 py-3 text-slate-100">Finished</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Display */}
        <section className="mb-12">
          <h2 className="heading-2">Visual Display</h2>
          <p className="text-slate-100 mb-4">When tasks change, TodoList shows a panel:</p>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-400">╭─── Tasks (1/3) ───────────────────────────────╮</div>
            <div className="text-slate-100">│ ● Fix authentication bug                       │</div>
            <div className="text-yellow-400">│ ◐ Running tests                                │</div>
            <div className="text-slate-500">│ ○ Update docs                                  │</div>
            <div className="text-slate-400">╰────────────────────────────────────────────────╯</div>
          </div>
        </section>

        {/* Use with Agent */}
        <section className="mb-12">
          <h2 className="heading-2">Use with Agent</h2>
          <CodeWithResult
            code={`from connectonion import Agent, TodoList

todo = TodoList()
agent = Agent("worker", tools=[todo])

agent.input("""
Implement user authentication:
1. Create User model
2. Add login endpoint
3. Add logout endpoint
4. Write tests
""")

# Agent will:
# 1. Add all tasks to todo list
# 2. Start each task before working on it
# 3. Complete each task when done
# 4. Show progress throughout`}
            language="python"
          />
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="heading-2">Best Practices</h2>

          <h3 className="text-lg font-semibold text-white mb-3">Task Naming</h3>
          <p className="text-slate-100 mb-4">Use both forms:</p>
          <CodeWithResult
            code={`todo.add("Fix authentication bug", "Fixing authentication bug")
#         ^-- content              ^-- active_form`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">One In-Progress at a Time</h3>
          <p className="text-slate-100 mb-4">Only one task should be in_progress. Complete current before starting next.</p>
          <CodeWithResult
            code={`todo.add("Task A", "Doing A")
todo.add("Task B", "Doing B")

todo.start("Task A")
todo.start("Task B")  # Error: Another task is in progress
todo.complete("Task A")
todo.start("Task B")  # Now works`}
            language="python"
          />

          <h3 className="text-lg font-semibold text-white mb-3 mt-8">Mark Complete Immediately</h3>
          <p className="text-slate-100 mb-4">Complete tasks as soon as done, don't batch.</p>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
