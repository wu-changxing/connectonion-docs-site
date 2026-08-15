'use client'

import React from 'react'
import { HiOutlineCodeBracket, HiOutlineCheckCircle, HiOutlineViewfinderCircle, HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function EvalPluginPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'eval' },
          ]}
          icon={HiOutlineCodeBracket}
          iconColor="icon-ui"
          title="eval"
          description="Debug and test your agent prompts and tools"
          markdownPath="/useful-plugins/eval.md"
          markdownFilename="eval.md"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <p className="text-gray-700">
            Evaluation is opt-in. Ordinary <code className="bg-gray-100 px-2 py-1 rounded">co ai</code> sessions keep bounded records for recent debugging but make no scoring calls. Use <code className="bg-gray-100 px-2 py-1 rounded">co ai --eval</code> to enable completion scoring.
          </p>
        </div>

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-gray-700 mb-6">
            The <code className="bg-gray-100 px-2 py-1 rounded">eval</code> plugin helps you debug agents during development:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineViewfinderCircle className="w-5 h-5 icon-ui" />
                <h3 className="font-semibold">Generate Expected (after_user_input)</h3>
              </div>
              <p className="text-sm text-gray-700">Generates what should happen once for each user turn, unless another plugin already set it for that turn.</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineCheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Evaluate (on_complete)</h3>
              </div>
              <p className="text-sm text-gray-700">After agent finishes, evaluates if the task was truly completed.</p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import eval

def calculate(expression: str) -> str:
    """Calculate a math expression."""
    return str(eval(expression))

agent = Agent("assistant", tools=[calculate], plugins=[eval])

agent.input("What is 25 * 4?")`}
            result={`[Expected: Should calculate 25 * 4 and return 100]
[Tool: calculate("25 * 4")]
Result: 100
/evaluating...
✓ Task complete: Calculated 25 * 4 = 100, which matches the expected result.`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">co copy eval</code></Link> to get an editable copy.
          </p>
        </section>

        {/* Use with re_act */}
        <section className="mb-12">
          <h2 className="heading-2">Combined with re_act</h2>
          <p className="text-gray-700 mb-4">
            Use <code className="bg-gray-100 px-2 py-1 rounded">re_act</code> for intent and reflection, then let <code className="bg-gray-100 px-2 py-1 rounded">eval</code> judge the completed turn independently:
          </p>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act, eval

agent = Agent("assistant", tools=[search], plugins=[re_act, eval])

agent.input("Search for Python tutorials")
# re_act: Understands the request and reflects after tools
# eval: Generates this turn's expected outcome and evaluates completion`}
            language="python"
          />
        </section>

        {/* Turn boundaries */}
        <section className="mb-12">
          <h2 className="heading-2">One evaluation per turn</h2>
          <p className="text-gray-700 mb-4">
            A continued session keeps its earlier messages and trace entries as conversation context. Evaluation evidence is narrower: it starts at the current turn&apos;s <code className="bg-gray-100 px-2 py-1 rounded">user_input</code> entry and includes only that turn&apos;s tool results and final response.
          </p>
          <p className="text-gray-700">
            The expected outcome and verdict are also refreshed for every new user input. A tool used in an earlier request therefore cannot create a false pass or failure in the next one.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="heading-2">How it works</h2>

          <h3 className="heading-3">1. Generate Expected</h3>
          <CodeWithResult
            code={`@after_user_input
def generate_expected(agent):
    # Eval first refreshes its transient state for this Agent turn.
    # Preserve an expected outcome another plugin set for this turn.
    if agent.current_session.get('expected'):
        return

    user_prompt = agent.current_session.get('user_prompt', '')
    tool_names = agent.tools.names()

    expected = llm_do(
        f"User request: {user_prompt}\\nTools: {tool_names}\\nWhat should happen?",
        model="co/gemini-3.7-flash"
    )

    agent.current_session['expected'] = expected`}
            language="python"
          />

          <h3 className="heading-3 mt-8">2. Evaluate Completion</h3>
          <CodeWithResult
            code={`@on_complete
def evaluate_completion(agent):
    user_prompt = agent.current_session.get('user_prompt', '')
    result = agent.current_session.get('result', '')
    expected = agent.current_session.get('expected', '')
    trace = current_turn_trace(agent)

    # Summarize actions taken
    actions = [f"- {t['name']}: {t['result'][:100]}"
               for t in trace if t['type'] == 'tool_result']

    evaluation = llm_do(
        f"Request: {user_prompt}\\nExpected: {expected}\\n"
        f"Actions: {actions}\\nResult: {result}\\n"
        f"Is this complete?",
        model="co/gemini-3.7-flash"
    )

    agent.current_session['evaluation'] = evaluation
    agent.logger.print(f"✓ {evaluation}")`}
            language="python"
          />
        </section>

        {/* Events used */}
        <section className="mb-12">
          <h2 className="heading-2">Events Used</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Event</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Handler</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code className="text-gray-700">after_user_input</code></td>
                  <td className="py-2">generate_expected</td>
                  <td className="py-2 text-gray-700">Set expected outcome</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-gray-700">on_complete</code></td>
                  <td className="py-2">evaluate_completion</td>
                  <td className="py-2 text-gray-700">Evaluate if task complete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="heading-2">Use Cases</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <HiOutlineClipboardDocumentCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Development:</strong> Verify your agent completes tasks correctly</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineClipboardDocumentCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Testing:</strong> Automated evaluation of agent responses</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineClipboardDocumentCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Debugging:</strong> Identify incomplete or incorrect tool usage</span>
            </li>
          </ul>
        </section>

        {/* Source */}
        <section className="mb-12">
          <h2 className="heading-2">Source</h2>
          <p className="text-gray-700">
            <code className="bg-gray-100 px-2 py-1 rounded">connectonion/useful_plugins/eval.py</code>
          </p>
          <CodeWithResult
            code={`# The plugin is just a list of event handlers
eval = [generate_expected, evaluate_completion]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
