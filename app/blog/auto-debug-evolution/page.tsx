'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bug, Terminal, Zap, Menu as MenuIcon } from 'lucide-react'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import CopyButton from '../../../components/CopyButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

export default function AutoDebugEvolutionBlogPost() {

  const codeIteration1 = `🔍 Debug Mode Active

Modes:
- CHAT: Talk to agent normally
- EDIT: Modify execution state
- SIM: Simulate different scenarios
- VIEW: Inspect execution trace

Current: CHAT mode
agent>`

  const codeIteration2 = `agent> Hello                    # Send to agent
agent> ? why did it fail        # Ask AI for help
agent> >>> result = []          # Python code`

  const codeIteration3 = `agent> Send email to John       # To agent

ai> why did it send wrong email # To AI

>>> result = "correct@email"    # Python`

  const codeFinal = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
@xray BREAKPOINT: search_emails

Local Variables:
  query = "John"
  result = "Found 1 email from john@company.com"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What do you want to do?
  → Continue execution       [Enter or c]
    Ask AI for help          [a]
    Edit variables (Python)  [e]
    View execution trace     [v]
    Toggle step mode        [s]
    Stop debugging          [q]

💡 Use ↑↓ arrows and Enter, or type shortcuts
>`

  const codeUsage = `from connectonion import Agent
from connectonion.decorators import xray

@xray
def search_emails(query: str):
    return api.search(query)

agent = Agent("assistant", tools=[search_emails])
agent.auto_debug()  # Launch interactive debugging`

  const content = `# Auto-Debug Design Evolution: Five Iterations to Simplicity

*The story of how we almost built the wrong thing - five times - and what we learned from user feedback*

When we set out to build interactive debugging for AI agents, we thought we knew what developers needed. We were wrong. Four complete redesigns and countless user feedback sessions later, we finally arrived at a design that just works.

This is the story of that journey.

## The Problem: Debugging AI Agents in the Dark

AI agents make decisions we can't see. They call tools, process results, iterate through problems - all invisible to developers. When something goes wrong, you're left guessing:

\`\`\`python
agent = Agent("assistant", tools=[search, send_email])
agent.input("Send email to John")
# *mysterious processing happens*
# Wrong email sent... but why? what happened?
\`\`\`

We needed a way to see inside agent execution, understand decisions, and test "what if" scenarios. The question was: **how?**

## Iteration 1: The Complex Four-Mode System

Our first instinct was to build something comprehensive - a debugging system with four distinct modes for different tasks.

### The Design
${codeIteration1.split('\n').map(line => line ? `> ${line}` : '>').join('\n')}

### User Feedback
*"I think 4 is too complicated, two or three at most"*

### What We Learned
- Too many modes = high learning curve
- Users didn't know when to use which mode
- Violated "keep simple things simple"

**Lesson #1: More features ≠ better UX**

## Iteration 2: Prefix-Based Mode Switching

We simplified by using prefix characters to switch between targets:

### The Design
${codeIteration2.split('\n').map(line => line ? `> ${line}` : '>').join('\n')}

### User Feedback
*"When we do auto-debug, the input to the agent should default have a mode"*

### What We Learned
- Prefix characters (\`?\`, \`>>>\`) not discoverable
- Unclear who receives the input
- Default mode wasn't obvious

**Lesson #2: Symbolic shortcuts require learning**

## Iteration 3: Mode Indicators with Prompts

We added clear, named mode indicators to show where input goes:

### The Design
${codeIteration3.split('\n').map(line => line ? `> ${line}` : '>').join('\n')}

### User Feedback
*"The AI should be something more intuitive like 'AI Ask' or something like that"*

### Progress Made
- ✅ Clear visual mode indicators
- ✅ Default to agent input
- ✅ Separate AI help and Python modes

### Still Needed Work
- Mode names not intuitive enough
- Mode switching unclear
- Missing visual guidance

**Lesson #3: Names matter - "AI" is ambiguous**

## The Breakthrough Question

After three failed designs, we asked a different question:

**"What would Unix creators or Steve Jobs design?"**

This forced us to apply timeless design principles instead of following our assumptions.

## Iteration 4: Agent-First Menu with Universal Commands ✅

### Unix Philosophy Applied
- **Do one thing well** → Each mode has single purpose
- **Composition** → Modes flow naturally together
- **Ship early** → Validate with users quickly

### Steve Jobs Principles Applied
- **Eliminate unnecessary** → Remove mode switching complexity
- **Focus on essence** → What do users REALLY need? Continue execution.
- **Intuitive over learnable** → No manual required

### The Final Design

${codeFinal.split('\n').map(line => line ? `> ${line}` : '>').join('\n')}

### Why This Works

1. **Agent-first by default** - Press Enter to continue (simplest action)
2. **Progressive disclosure** - See options, discover gradually
3. **Multiple input methods** - Arrow keys (beginner) OR shortcuts (expert)
4. **Always visible help** - Tips on every screen
5. **Universal commands** - \`/menu\` and \`/continue\` work everywhere
6. **No dead ends** - Always a way back or forward

## The Design Principles That Won

### 1. Intuitive > Learnable
- \`agent.auto_debug()\` - Discovered via autocomplete
- Arrow keys - Everyone knows these
- Menu - Visual discovery, no memorization

**If it requires docs for basic usage, it's not intuitive enough.**

### 2. Default Matters Most
Press Enter to continue - the simplest possible action.

**If the default is perfect, 80% of users never need advanced features.**

### 3. Progressive Disclosure
\`\`\`
First use: See menu, press Enter (10 seconds)
Get curious: Try 'a' for AI help
Need power: Discover 'e' for Python
Deep debug: Enable step mode
\`\`\`

**Reveal complexity gradually, never upfront.**

### 4. Consistent Patterns
- All commands use \`/\` prefix
- All modes show tips
- All screens offer \`/menu\` and \`/continue\`

**Consistency enables muscle memory.**

## Real-World Example

\`\`\`python
${codeUsage}
\`\`\`

**What happens:**

1. Agent pauses at \`@xray\` decorated tool
2. Menu appears with all options
3. Press Enter to continue (default)
4. OR press \`a\` to ask AI for help
5. OR press \`e\` to edit variables in Python
6. OR press \`v\` to view full execution trace

**Zero learning curve. Just use it.**

## Key Lessons from Five Iterations

### 1. Listen to User Feedback - It Saves You
We almost built the wrong thing FIVE times. User feedback redirected us every time.

**"Too complicated" → Simplified from 4 modes**
**"Agent should be default" → Made agent-first explicit**
**"AI Ask more intuitive" → Clarified naming**
**"What would Unix/Jobs design?" → Final breakthrough**

### 2. Ask "What Would Masters Design?"
Unix and Steve Jobs principles aren't abstract - they're actionable:
- Do one thing well → Single purpose per mode
- Eliminate unnecessary → Removed mode switching
- Make it intuitive → Visual menu, not commands

### 3. Default Action Should Be Effortless
Most users just want to continue. Make that one keystroke: Enter.

### 4. Visual Discovery > Command Recall
Menu navigation beats typed commands for discoverability.

### 5. Iteration Beats Planning
We couldn't have designed the final version first. Each failure taught us something essential.

## The Uncomfortable Truth

We were wrong four times before getting it right. And that's okay.

**The best design decision is often admitting your previous one was wrong.**

## What This Means for ConnectOnion

This isn't just about auto-debug. It's our design process:

1. **Start with user problems** (invisible agent behavior)
2. **Prototype solutions** (CLI, modes, prompts)
3. **Get feedback early** (reject what doesn't work)
4. **Apply timeless principles** (Unix, Jobs)
5. **Iterate until simple** (5 tries for auto-debug)
6. **Ship when intuitive** (zero learning curve)

**We don't just build features. We solve problems through iteration.**

## Try It Yourself

\`\`\`python
pip install connectonion

# In your code
from connectonion import Agent
from connectonion.decorators import xray

@xray
def my_tool(param: str):
    return process(param)

agent = Agent("debugger", tools=[my_tool])
agent.auto_debug()  # Interactive debugging starts
\`\`\`

Press Enter to continue, or explore the menu. No manual required.

## The Final Design: Simple After Five Tries

- \`agent.auto_debug()\` - One method to remember
- Press Enter - Simplest action
- Arrow keys - Navigation everyone knows
- Menu - Visual discovery
- Shortcuts - Power when ready
- Universal \`/commands\` - Escape hatches everywhere

**The result: Debugging that feels natural, not learned.**

---

*"Simplicity is the ultimate sophistication." - Leonardo da Vinci*

*We iterated five times to find the simplest solution.*

## Read More

- [Interactive Debugging Docs](/auto-debug-exception) - Complete guide
- [\`@xray\` Decorator](/xray) - Mark breakpoints
- [Design Decision Doc](https://github.com/wu-changxing/connectonion/blob/main/docs/design-decisions/011-interactive-auto-debug-design.md) - Full technical details

---

*Have feedback on auto-debug? Join the discussion on [Discord](https://discord.gg/4xfD9k8AUF)*`

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
            <CopyMarkdownButton content={content} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
              <Bug className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Design Decision</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Auto-Debug Design Evolution
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-300">
            Five iterations to simplicity: How user feedback and timeless design principles shaped our interactive debugging experience
          </p>
          <div className="mt-4 text-sm text-gray-500">
            October 6, 2025 · 12 min read
          </div>
        </div>

        {/* The Problem */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-blue-400" />
            The Problem: Debugging AI Agents in the Dark
          </h2>
          <p className="text-gray-300 mb-4">
            AI agents make decisions we can't see. They call tools, process results, iterate through problems - all invisible to developers. When something goes wrong, you're left guessing.
          </p>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <CopyButton text={`agent = Agent("assistant", tools=[search, send_email])\nagent.input("Send email to John")\n# *mysterious processing happens*\n# Wrong email sent... but why? what happened?`} />
            <pre className="text-sm text-gray-300">
              <code>{`agent = Agent("assistant", tools=[search, send_email])
agent.input("Send email to John")
# *mysterious processing happens*
# Wrong email sent... but why? what happened?`}</code>
            </pre>
          </div>
          <p className="text-gray-300 mt-4">
            We needed a way to <strong className="text-white">see inside agent execution</strong>, understand decisions, and test "what if" scenarios. The question was: <strong className="text-white">how?</strong>
          </p>
        </section>

        {/* Iteration 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Iteration 1: The Complex Four-Mode System ❌
          </h2>
          <p className="text-gray-300 mb-4">
            Our first instinct was to build something comprehensive - a debugging system with four distinct modes for different tasks.
          </p>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6 mb-4">
            <CopyButton text={codeIteration1} />
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {codeIteration1}
            </pre>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <div className="text-red-400 font-semibold mb-2">User Feedback:</div>
            <div className="text-gray-300 italic">"I think 4 is too complicated, two or three at most"</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Lesson #1:</div>
            <div className="text-gray-300">More features ≠ better UX. High learning curve before being productive.</div>
          </div>
        </section>

        {/* Iteration 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Iteration 2: Prefix-Based Mode Switching ❌
          </h2>
          <p className="text-gray-300 mb-4">
            We simplified by using prefix characters to indicate different targets:
          </p>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6 mb-4">
            <CopyButton text={codeIteration2} />
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {codeIteration2}
            </pre>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <div className="text-red-400 font-semibold mb-2">User Feedback:</div>
            <div className="text-gray-300 italic">"When we do auto-debug, the input to the agent should default have a mode"</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Lesson #2:</div>
            <div className="text-gray-300">Symbolic shortcuts (?, {'>>>'}) require learning. Not discoverable without docs.</div>
          </div>
        </section>

        {/* Iteration 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Iteration 3: Mode Indicators with Prompts 🟡
          </h2>
          <p className="text-gray-300 mb-4">
            We added clear, named mode indicators to show where input goes:
          </p>
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6 mb-4">
            <CopyButton text={codeIteration3} />
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {codeIteration3}
            </pre>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <div className="text-yellow-400 font-semibold mb-2">User Feedback:</div>
            <div className="text-gray-300 italic">"The AI should be something more intuitive like 'AI Ask' or something like that"</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Lesson #3:</div>
            <div className="text-gray-300">Names matter. "AI" is ambiguous - "AI Ask" is self-explanatory. Progress made but still not simple enough.</div>
          </div>
        </section>

        {/* The Breakthrough */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              The Breakthrough Question
            </h2>
            <p className="text-gray-300 text-lg">
              "What would <strong className="text-white">Unix creators</strong> or <strong className="text-white">Steve Jobs</strong> design?"
            </p>
          </div>
          <p className="text-gray-300 mb-4">
            This forced us to apply timeless design principles instead of following our assumptions:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="text-blue-400 font-semibold mb-2">Unix Philosophy</div>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Do one thing well</li>
                <li>• Compose simply</li>
                <li>• Ship early, validate</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="text-purple-400 font-semibold mb-2">Steve Jobs</div>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Eliminate unnecessary</li>
                <li>• Focus on essence</li>
                <li>• Intuitive over learnable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final Design */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <MenuIcon className="w-6 h-6 text-green-400" />
            Iteration 4: Agent-First Menu ✅
          </h2>
          <p className="text-gray-300 mb-4">
            The final design that actually works:
          </p>
          <div className="bg-gray-900/50 rounded-lg border border-green-500/30 p-6 mb-4">
            <CopyButton text={codeFinal} />
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {codeFinal}
            </pre>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-green-400 font-semibold mb-3">Why This Works:</div>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✅ <strong className="text-white">Agent-first by default</strong> - Press Enter to continue (simplest action)</li>
              <li>✅ <strong className="text-white">Progressive disclosure</strong> - See options, discover gradually</li>
              <li>✅ <strong className="text-white">Multiple input methods</strong> - Arrow keys (beginner) OR shortcuts (expert)</li>
              <li>✅ <strong className="text-white">Always visible help</strong> - Tips on every screen, zero memorization</li>
              <li>✅ <strong className="text-white">Universal commands</strong> - <code className="bg-gray-800 px-1 rounded">/menu</code> and <code className="bg-gray-800 px-1 rounded">/continue</code> work everywhere</li>
              <li>✅ <strong className="text-white">No dead ends</strong> - Always a way back or forward</li>
            </ul>
          </div>
        </section>

        {/* Key Lessons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Key Lessons from Five Iterations
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">1. Listen to User Feedback</h3>
              <p className="text-gray-300 text-sm">
                We almost built the wrong thing FIVE times. User feedback redirected us every time. Without it, we'd have shipped a complex, unusable debugger.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">2. Ask "What Would Masters Design?"</h3>
              <p className="text-gray-300 text-sm">
                Unix and Steve Jobs principles aren't abstract - they're actionable. Single purpose per mode. Eliminate unnecessary. Visual over cognitive load.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">3. Default Action Should Be Effortless</h3>
              <p className="text-gray-300 text-sm">
                Most users just want to continue. Make that one keystroke: Enter. If the default is perfect, 80% never need advanced features.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">4. Visual Discovery {'>'}Command Recall</h3>
              <p className="text-gray-300 text-sm">
                Menu navigation beats typed commands for discoverability. See all options immediately. No memorization required.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">5. Iteration Beats Planning</h3>
              <p className="text-gray-300 text-sm">
                We couldn't have designed the final version first. Each failure taught us something essential. Embrace iteration.
              </p>
            </div>
          </div>
        </section>

        {/* Try It */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Try It Yourself</h2>
            <div className="bg-black/50 rounded-lg p-6 mb-4">
              <CopyButton text={codeUsage} />
              <pre className="text-sm text-gray-300">
                <code>{codeUsage}</code>
              </pre>
            </div>
            <p className="text-gray-300 text-sm">
              Press Enter to continue, or explore the menu. <strong className="text-white">No manual required.</strong>
            </p>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
