'use client'

import { HiOutlineBolt, HiOutlineArrowPath, HiOutlineShieldCheck } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function UlwPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'ulw' }
          ]}
          icon={HiOutlineBolt}
          iconColor="text-orange-400"
          iconBgFrom="from-orange-600/20"
          iconBgTo="to-yellow-600/20"
          iconBorderColor="border-orange-500/30"
          title="ulw"
          description="Ultra Light Work — autonomous mode where the agent keeps working turn after turn without approval prompts, until it reaches a checkpoint."
          markdownPath="/useful-plugins/ulw.md"
          markdownFilename="ulw.md"
        />

        <div className="bg-orange-950/50 border border-orange-400/40 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-orange-100">
            Tell the agent to "just do it" — no approval prompts, no interruptions. Agent works until done or until the turn limit.
          </p>
        </div>

        {/* Usage */}
        <section className="mb-20">
          <h2 className="heading-2">Usage</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import tool_approval, ulw

# ulw requires tool_approval to work
agent = Agent("worker", plugins=[tool_approval, ulw], model="co/claude-opus-4-5")`}
            language="python"
          />
          <p className="text-slate-300 mt-4 text-sm">ULW mode works by setting a <code className="bg-gray-800 px-1 rounded">skip_tool_approval</code> flag that tells the <code className="bg-gray-800 px-1 rounded">tool_approval</code> plugin to skip all checks.</p>
        </section>

        {/* Trigger */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-cyan-400" />
            Triggering ULW Mode
          </h2>

          <h3 className="text-xl font-semibold mb-4">From the web UI</h3>
          <p className="text-slate-100 mb-4">In <code className="bg-gray-800 px-2 py-1 rounded">co ai</code>, use the mode selector to switch to ULW mode. The frontend sends:</p>
          <CodeWithResult
            code={`{ "type": "mode_change", "mode": "ulw", "turns": 10 }`}
            language="json"
          />

          <h3 className="text-xl font-semibold mt-8 mb-4">Programmatically</h3>
          <CodeWithResult
            code={`from connectonion.useful_plugins.ulw import handle_ulw_mode_change

handle_ulw_mode_change(agent, turns=10)
agent.input("Refactor all Python files to use type annotations")`}
            language="python"
          />
        </section>

        {/* Checkpoint flow */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-green-400" />
            Turn Checkpoints
          </h2>
          <p className="text-slate-100 mb-6">When the agent reaches <code className="bg-gray-800 px-2 py-1 rounded">ulw_turns</code>, it pauses and the frontend receives:</p>
          <CodeWithResult
            code={`{ "type": "ulw_turns_reached", "turns_used": 10, "max_turns": 10 }`}
            language="json"
          />
          <p className="text-slate-100 mt-6 mb-4">The user can respond with:</p>
          <div className="space-y-3">
            <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <code className="text-orange-300">{"{ \"action\": \"continue\", \"turns\": 10 }"}</code>
              <p className="text-slate-300 text-sm mt-1">Extend by N more turns and keep going</p>
            </div>
            <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <code className="text-orange-300">{"{ \"action\": \"switch_mode\", \"mode\": \"safe\" }"}</code>
              <p className="text-slate-300 text-sm mt-1">Return to safe mode (approval prompts back on)</p>
            </div>
          </div>
        </section>

        {/* Prompt update */}
        <section className="mb-20">
          <h2 className="heading-2">Updating goal mid-session</h2>
          <p className="text-slate-100 mb-4">Send a <code className="bg-gray-800 px-2 py-1 rounded">prompt_update</code> message to steer the agent while it works:</p>
          <CodeWithResult
            code={`{ "type": "prompt_update", "prompt": "Focus on the authentication module" }`}
            language="json"
          />
          <p className="text-slate-300 mt-4 text-sm">Injected into the system prompt before each LLM call. The agent remembers the updated goal for all subsequent turns.</p>
        </section>

        {/* Events */}
        <section className="mb-20">
          <h2 className="heading-2">Events used</h2>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-slate-100">Event</th>
                  <th className="text-left py-2 text-slate-100">Handler</th>
                  <th className="text-left py-2 text-slate-100">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="py-2"><code className="text-orange-300">on_complete</code></td>
                  <td className="py-2 text-slate-300">ulw_keep_working</td>
                  <td className="py-2 text-slate-100">Start next turn if turns remain</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-orange-300">before_iteration</code></td>
                  <td className="py-2 text-slate-300">poll_prompt_update</td>
                  <td className="py-2 text-slate-100">Check for goal updates from frontend</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-orange-300">before_llm</code></td>
                  <td className="py-2 text-slate-300">inject_ulw_prompt</td>
                  <td className="py-2 text-slate-100">Inject current goal into system prompt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
