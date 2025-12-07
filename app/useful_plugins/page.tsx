/*
  @date: 2025-12-07
  @description: Built-in Plugins Reference Page

  Design Goals:
  - Single page listing all built-in plugins
  - Quick reference table with links to sections
  - Usage examples for each plugin
  - Copy-all-content button (CLAUDE.md requirement)
*/

'use client'

import {
  HiOutlineCube,
  HiOutlineArrowRight,
  HiOutlineLightBulb,
  HiOutlineBeaker,
  HiOutlinePhoto,
  HiOutlineShieldCheck,
  HiOutlinePlay
} from 'react-icons/hi2'
import CodeWithResult from '../../components/CodeWithResult'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function UsefulPluginsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Plugins', href: '/plugin' },
            { label: 'Built-in Plugins' }
          ]}
          icon={HiOutlineCube}
          iconColor="text-purple-400"
          iconBgFrom="from-purple-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-purple-500/30"
          title="Built-in Plugins"
          description="Pre-built plugins that extend agent behavior via event hooks."
          markdownPath="/useful_plugins/useful_plugins.md"
          markdownFilename="useful_plugins.md"
        />

        {/* Quick Reference */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlinePlay className="text-purple-400 w-7 h-7" />
            Quick Reference
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-slate-200">Plugin</th>
                  <th className="px-4 py-3 text-slate-200">Purpose</th>
                  <th className="px-4 py-3 text-slate-200">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3">
                    <a href="#re_act" className="font-mono text-purple-300 hover:underline">re_act</a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">ReAct reasoning pattern (plan + reflect)</td>
                  <td className="px-4 py-3 text-slate-400">Reasoning</td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3">
                    <a href="#eval" className="font-mono text-purple-300 hover:underline">eval</a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">Task evaluation for debugging</td>
                  <td className="px-4 py-3 text-slate-400">Debugging</td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3">
                    <a href="#image_result_formatter" className="font-mono text-purple-300 hover:underline">image_result_formatter</a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">Format images for vision models</td>
                  <td className="px-4 py-3 text-slate-400">Media</td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3">
                    <a href="#shell_approval" className="font-mono text-purple-300 hover:underline">shell_approval</a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">Approve shell commands before execution</td>
                  <td className="px-4 py-3 text-slate-400">Security</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act, eval, image_result_formatter, shell_approval

agent = Agent(
    "assistant",
    tools=[search],
    plugins=[re_act, eval]  # Combine multiple plugins
)`}
            language="python"
          />
        </section>

        {/* re_act */}
        <section id="re_act" className="mb-16 scroll-mt-24">
          <h2 className="heading-2">
            <HiOutlineLightBulb className="text-yellow-400 w-7 h-7" />
            re_act
          </h2>

          <p className="text-slate-100 mb-4">
            ReAct (Reason + Act) - Adds planning before action and reflection after tools.
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act

agent = Agent("assistant", tools=[search], plugins=[re_act])

agent.input("Search for Python tutorials")
# /planning...
# Will search for Python tutorials first.
# ... tool executes ...
# /reflecting...
# Found Python basics, task complete.`}
            language="python"
          />

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">Events Used</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li><code className="text-purple-300">after_user_input</code> - Generate initial plan</li>
              <li><code className="text-purple-300">after_tools</code> - Reflect on results</li>
            </ul>
          </div>
        </section>

        {/* eval */}
        <section id="eval" className="mb-16 scroll-mt-24">
          <h2 className="heading-2">
            <HiOutlineBeaker className="text-green-400 w-7 h-7" />
            eval
          </h2>

          <p className="text-slate-100 mb-4">
            Debug and test agent prompts and tools during development.
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import eval

agent = Agent("assistant", tools=[search], plugins=[eval])

agent.input("Search for Python docs")
# ... agent executes ...
# /evaluating...
# Task completed successfully`}
            language="python"
          />

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">Events Used</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li><code className="text-purple-300">after_user_input</code> - Generate expected outcome</li>
              <li><code className="text-purple-300">on_complete</code> - Evaluate actual vs expected</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
            <p className="text-sm text-green-100">
              <strong>Tip:</strong> Combine with <code>re_act</code> - the plan becomes the expected outcome.
            </p>
          </div>
        </section>

        {/* image_result_formatter */}
        <section id="image_result_formatter" className="mb-16 scroll-mt-24">
          <h2 className="heading-2">
            <HiOutlinePhoto className="text-blue-400 w-7 h-7" />
            image_result_formatter
          </h2>

          <p className="text-slate-100 mb-4">
            Automatically formats base64 image results for vision models.
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import image_result_formatter

agent = Agent("assistant", tools=[take_screenshot], plugins=[image_result_formatter])

agent.input("Take a screenshot and describe what you see")
# Formatted 'take_screenshot' result as image
# Agent can now see and analyze the image visually`}
            language="python"
          />

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">Supported Formats</h4>
            <p className="text-sm text-slate-300">PNG, JPEG/JPG, WebP, GIF</p>
          </div>

          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">Use Cases</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>Screenshot tools</li>
              <li>Image generation tools</li>
              <li>Camera/webcam capture</li>
              <li>PDF to image conversion</li>
            </ul>
          </div>
        </section>

        {/* shell_approval */}
        <section id="shell_approval" className="mb-16 scroll-mt-24">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="text-red-400 w-7 h-7" />
            shell_approval
          </h2>

          <p className="text-slate-100 mb-4">
            Prompts for user approval before executing shell commands.
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, Shell
from connectonion.useful_plugins import shell_approval

shell = Shell()
agent = Agent("assistant", tools=[shell], plugins=[shell_approval])

agent.input("Clean up temp files")
# Shell Command: rm -rf /tmp/test
# Execute this command?
#   > Yes, execute
#     Auto approve 'rm' in this session
#     No, tell agent what I want`}
            language="python"
          />

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">Safe Commands (Auto-approved)</h4>
            <p className="text-sm text-slate-300 font-mono">
              ls, cat, head, tail, grep, find, pwd, echo, date, git status, git log, git diff...
            </p>
          </div>

          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">Approval Options</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li><strong>Yes, execute</strong> - Run once</li>
              <li><strong>Auto approve</strong> - Auto-approve this command type for session</li>
              <li><strong>No</strong> - Provide feedback to agent</li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineArrowRight className="text-purple-400 w-6 h-6" />
            Next Steps
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <Link
              href="/plugin"
              className="group bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineCube className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Plugin System
              </h3>
              <p className="text-purple-100 text-sm">
                Learn how to create custom plugins
              </p>
            </Link>

            <Link
              href="/on_events"
              className="group bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineLightBulb className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Events
              </h3>
              <p className="text-blue-100 text-sm">
                Available event hooks
              </p>
            </Link>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
