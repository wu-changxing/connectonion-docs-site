'use client'

import React from 'react'
import { HiOutlineChatBubbleLeftRight, HiOutlineCommandLine, HiOutlineCog6Tooth, HiOutlineSparkles } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function ChatPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Chat' },
          ]}
          icon={HiOutlineChatBubbleLeftRight}
          iconColor="icon-ui"
          title="Chat"
          description="Full-featured terminal chat interface for AI agents"
          markdownPath="/tui/chat.md"
          markdownFilename="chat.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.tui import Chat

agent = Agent("assistant", tools=[search, analyze])

chat = Chat(agent=agent)
chat.run()`}
            result={`🤖 Assistant    ● Ready    co/gpt-4  0 tok  $0.0000

Welcome! How can I help?

┌─────────────────────────────────────────┐
│ Type a message... (/ for commands)      │
└─────────────────────────────────────────┘
/ commands  •  Enter send  •  Ctrl+D quit`}
            language="python"
          />
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="heading-2">Installation</h2>
          <CodeWithResult
            code={`pip install connectonion[tui]
# or
pip install textual textual-autocomplete`}
            language="bash"
          />
        </section>

        {/* Parameters */}
        <section className="mb-12">
          <h2 className="heading-2">Parameters</h2>
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-700">Parameter</th>
                  <th className="text-left py-2 text-gray-700">Type</th>
                  <th className="text-left py-2 text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">agent</td>
                  <td className="py-2 text-gray-700">Agent</td>
                  <td className="py-2 text-gray-700">ConnectOnion agent instance</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">handler</td>
                  <td className="py-2 text-gray-700">Callable</td>
                  <td className="py-2 text-gray-700">Custom message handler (alternative to agent)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">title</td>
                  <td className="py-2 text-gray-700">str</td>
                  <td className="py-2 text-gray-700">Window title</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">welcome</td>
                  <td className="py-2 text-gray-700">str</td>
                  <td className="py-2 text-gray-700">Welcome message (markdown supported)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">hints</td>
                  <td className="py-2 text-gray-700">list[str]</td>
                  <td className="py-2 text-gray-700">Footer hints</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">triggers</td>
                  <td className="py-2 text-gray-700">dict</td>
                  <td className="py-2 text-gray-700">Autocomplete triggers (/, @)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">on_error</td>
                  <td className="py-2 text-gray-700">Callable</td>
                  <td className="py-2 text-gray-700">Custom error handler</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Thinking Indicator */}
        <section className="mb-12">
          <h2 className="heading-2 flex items-center gap-2">
            <HiOutlineSparkles className="w-5 h-5 text-gray-400" />
            Thinking Indicator
          </h2>
          <p className="text-gray-700 mb-4">
            Shows real-time progress during LLM calls and tool execution:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm mb-4">
            <div className="text-emerald-600 mb-2">During LLM thinking:</div>
            <pre className="text-gray-700">⠹ Thinking... 5s (usually 3-10s)</pre>
            <div className="text-emerald-600 mt-4 mb-2">During tool execution:</div>
            <pre className="text-gray-700">{`⠹ Search emails in inbox
  └─ search_emails("aaron")`}</pre>
          </div>
          <p className="text-gray-700">
            Shows description (what&apos;s happening) and function call (technical detail).
          </p>
        </section>

        {/* Autocomplete Triggers */}
        <section className="mb-12">
          <h2 className="heading-2">Autocomplete Triggers</h2>
          <CodeWithResult
            code={`from connectonion.tui import Chat, CommandItem
from textual_autocomplete import DropdownItem

chat = Chat(
    agent=agent,
    triggers={
        "/": [
            CommandItem(main="/help", prefix="?", id="/help"),
            CommandItem(main="/clear", prefix="⌫", id="/clear"),
            CommandItem(main="/quit", prefix="→", id="/quit"),
        ],
        "@": [
            DropdownItem(main="John", id="@john@example.com"),
            DropdownItem(main="Jane", id="@jane@example.com"),
        ],
    }
)`}
            language="python"
          />
        </section>

        {/* Status Bar */}
        <section className="mb-12">
          <h2 className="heading-2 flex items-center gap-2">
            <HiOutlineCog6Tooth className="w-5 h-5 text-gray-400" />
            Status Bar
          </h2>
          <p className="text-gray-700 mb-4">
            Shows real-time information in a three-column layout:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-gray-700">🤖 Assistant    ◐ Thinking (1/10)    co/gpt-4  1,234 tok  $0.0012</pre>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Left:</strong> Agent name</li>
            <li><strong>Center:</strong> Current status with iteration</li>
            <li><strong>Right:</strong> Model, token count, cost</li>
          </ul>
        </section>

        {/* Customizing */}
        <section className="mb-12">
          <h2 className="heading-2">Customizing</h2>
          <p className="text-gray-700 mb-4">
            Copy and modify the Chat component:
          </p>
          <CodeWithResult
            code={`# Copy to ./tui/chat.py
co copy chat

# Then customize
from tui.chat import Chat, ThinkingIndicator

class MyThinkingIndicator(ThinkingIndicator):
    frames = ["◐", "◓", "◑", "◒"]  # Custom spinner`}
            language="bash"
          />
        </section>

        {/* Example */}
        <section className="mb-12">
          <h2 className="heading-2">Example: Gmail Agent</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.tui import Chat, CommandItem
from connectonion.useful_tools import Gmail

gmail = Gmail()
agent = Agent("gmail-agent", tools=[gmail])

chat = Chat(
    agent=agent,
    title="Gmail Agent",
    welcome="**Gmail Assistant**\\n\\nI can search, read, and send emails.",
    hints=["/ commands", "@ mentions", "Enter send"],
    triggers={
        "/": [
            CommandItem(main="/inbox", prefix="📥", id="/inbox"),
            CommandItem(main="/sent", prefix="📤", id="/sent"),
            CommandItem(main="/compose", prefix="✏️", id="/compose"),
        ]
    }
)

chat.run()`}
            language="python"
          />
        </section>

        {/* Widgets */}
        <section className="mb-12">
          <h2 className="heading-2">Included Widgets</h2>
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-700">Widget</th>
                  <th className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">ChatStatusBar</td>
                  <td className="py-2 text-gray-700">Top status bar</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">HintsFooter</td>
                  <td className="py-2 text-gray-700">Bottom hints</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">WelcomeMessage</td>
                  <td className="py-2 text-gray-700">Initial welcome</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">UserMessage</td>
                  <td className="py-2 text-gray-700">User message bubble</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">AssistantMessage</td>
                  <td className="py-2 text-gray-700">Agent response</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-600">ThinkingIndicator</td>
                  <td className="py-2 text-gray-700">Processing animation</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">TriggerAutoComplete</td>
                  <td className="py-2 text-gray-700">Trigger-based autocomplete</td>
                </tr>
              </tbody>
            </table>
          </div>
          <CodeWithResult
            code={`from connectonion.tui import (
    Chat,
    ChatStatusBar,
    ThinkingIndicator,
    TriggerAutoComplete,
)`}
            language="python"
          />
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
