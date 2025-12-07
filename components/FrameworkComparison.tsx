'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'

type ComparisonType = 'calculator' | 'browser' | 'react' | 'memory' | 'events'
type Framework = 'connectonion' | 'openai' | 'google' | 'langchain'

interface CodeExample {
  framework: Framework
  label: string
  lines: string
  code: string
}

const comparisons: Record<ComparisonType, {
  title: string
  subtitle: string
  examples: CodeExample[]
}> = {
  calculator: {
    title: 'Calculator Agent',
    subtitle: 'LangChain requires Tool wrappers, string parsing, and manual prompt templates',
    examples: [
      {
        framework: 'connectonion',
        label: 'ConnectOnion',
        lines: '8 lines',
        code: `from connectonion import Agent

def add(a: float, b: float) -> float:
    return a + b

def multiply(a: float, b: float) -> float:
    return a * b

agent = Agent("You are a calculator", tools=[add, multiply])
agent.input("What is 5 + 3, then multiply by 2?")`
      },
      {
        framework: 'langchain',
        label: 'LangChain',
        lines: '30+ lines',
        code: `from langchain.agents import Tool, AgentExecutor, create_react_agent
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate

def add(input_str: str) -> str:
    """Add two numbers. Input: 'a,b'"""
    a, b = map(float, input_str.split(','))
    return str(a + b)

def multiply(input_str: str) -> str:
    """Multiply two numbers. Input: 'a,b'"""
    a, b = map(float, input_str.split(','))
    return str(a * b)

tools = [
    Tool(name="add", func=add, description="Add two numbers. Input: 'a,b'"),
    Tool(name="multiply", func=multiply, description="Multiply. Input: 'a,b'"),
]

template = """You are a calculator assistant.
Available tools: {tools}
Tool names: {tool_names}
Question: {input}
{agent_scratchpad}"""

prompt = PromptTemplate.from_template(template)
llm = ChatOpenAI(model="gpt-4", temperature=0)
agent = create_react_agent(llm=llm, tools=tools, prompt=prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
result = executor.invoke({"input": "What is 5 + 3, then multiply by 2?"})`
      }
    ]
  },
  browser: {
    title: 'Browser Automation',
    subtitle: 'OpenAI SDK requires RunContextWrapper, dataclass, and manual context passing',
    examples: [
      {
        framework: 'connectonion',
        label: 'ConnectOnion',
        lines: '16 lines',
        code: `from connectonion import Agent

class BrowserAutomation:
    def __init__(self):
        self._browser = None
        self._page = None
        self._screenshots = []

    def start_browser(self):
        self._browser = launch_browser()
        self._page = self._browser.new_page()
        return "Browser started"

    def navigate(self, url: str):
        self._page.goto(url)  # Uses shared state via self
        return f"Navigated to {url}"

    def take_screenshot(self, path: str):
        self._page.screenshot(path=path)
        self._screenshots.append(path)
        return f"Saved: {path}"

browser = BrowserAutomation()
agent = Agent("You automate browsers", tools=[browser])`
      },
      {
        framework: 'openai',
        label: 'OpenAI SDK',
        lines: '30+ lines',
        code: `from dataclasses import dataclass
from agents import Agent, Runner, function_tool
from agents.types import RunContextWrapper

@dataclass
class BrowserContext:
    browser: object = None
    page: object = None
    screenshots: list = None

    def __post_init__(self):
        self.screenshots = self.screenshots or []

@function_tool
def start_browser(wrapper: RunContextWrapper[BrowserContext]):
    wrapper.context.browser = launch_browser()
    wrapper.context.page = wrapper.context.browser.new_page()
    return "Browser started"

@function_tool
def navigate(wrapper: RunContextWrapper[BrowserContext], url: str):
    wrapper.context.page.goto(url)  # Access via wrapper.context
    return f"Navigated to {url}"

@function_tool
def take_screenshot(wrapper: RunContextWrapper[BrowserContext], path: str):
    wrapper.context.page.screenshot(path=path)
    wrapper.context.screenshots.append(path)
    return f"Saved: {path}"

agent = Agent(name="browser", instructions="...",
    tools=[start_browser, navigate, take_screenshot])

ctx = BrowserContext()
result = await Runner.run(agent, "Open google", context=ctx)`
      }
    ]
  },
  react: {
    title: 'ReAct Reasoning',
    subtitle: 'Google ADK requires PlanReActPlanner class; we use a simple plugin',
    examples: [
      {
        framework: 'connectonion',
        label: 'ConnectOnion',
        lines: '1 line to add',
        code: `from connectonion import Agent
from connectonion.useful_plugins import re_act

def search(query: str) -> str:
    return f"Results for: {query}"

# Just add plugins=[re_act] - that's it!
agent = Agent(
    "You are a research assistant",
    tools=[search],
    plugins=[re_act]  # Plan + Act + Reflect loop
)

agent.input("Research the history of Python")`
      },
      {
        framework: 'google',
        label: 'Google ADK',
        lines: 'Planner class',
        code: `from google.adk import Agent
from google.adk.planners import PlanReActPlanner

def search(query: str) -> dict:
    """Search for information.

    Args:
        query: The search query.

    Returns:
        dict with search results.
    """
    return {"status": "success", "results": f"Results for: {query}"}

# Must use special planner class
agent = Agent(
    model="gemini-2.0-flash",
    planner=PlanReActPlanner(),  # Special planner object
    tools=[search],
)
# Run with: adk web`
      }
    ]
  },
  memory: {
    title: 'Memory System',
    subtitle: 'Other frameworks require services, sessions, or deprecated APIs',
    examples: [
      {
        framework: 'connectonion',
        label: 'ConnectOnion',
        lines: '8 lines',
        code: `from connectonion import Agent, Memory

memory = Memory()  # That's it!

agent = Agent(
    "You remember user preferences",
    tools=[memory]  # Memory is just a tool
)

agent.input("Remember: I prefer dark mode")
agent.input("What are my preferences?")`
      },
      {
        framework: 'openai',
        label: 'OpenAI SDK',
        lines: '15+ lines',
        code: `from agents import Agent, Runner, SQLiteSession

agent = Agent(
    name="Assistant",
    instructions="You remember preferences",
)

# Need to manually manage session objects
session = SQLiteSession("conversation_123")

# First call
result = await Runner.run(
    agent,
    "Remember: I prefer dark mode",
    session=session  # Must pass session every time
)

# Second call - must pass same session
result = await Runner.run(
    agent,
    "What are my preferences?",
    session=session
)`
      },
      {
        framework: 'langchain',
        label: 'LangChain',
        lines: 'DEPRECATED',
        code: `from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts.chat import MessagesPlaceholder

# Choose from 6+ memory types:
# - ConversationBufferMemory
# - ConversationSummaryMemory
# - ConversationBufferWindowMemory
# - ConversationKGMemory
# - VectorStoreRetrieverMemory
# ... and more

prompt = ChatPromptTemplate([
    MessagesPlaceholder(variable_name="chat_history"),
    # ... more setup
])

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# DEPRECATED in v0.3.1 - must migrate to LangGraph`
      }
    ]
  },
  events: {
    title: 'Event Hooks',
    subtitle: 'We give you 9 event types with full agent access; others have limited callbacks',
    examples: [
      {
        framework: 'connectonion',
        label: 'ConnectOnion',
        lines: '9 event types',
        code: `from connectonion import after_tools

def my_hook(agent):
    # Access EVERYTHING:
    session = agent.current_session
    messages = session['messages']      # All conversation
    trace = session['trace']            # Every LLM call
    user_input = session['user_prompt'] # Original request

    # Modify ANYTHING:
    session['messages'].append({
        'role': 'assistant',
        'content': 'Thinking about next step...'
    })

# That's it - just pass it
agent = Agent("assistant", tools=[...],
    on_events=[after_tools(my_hook)])

# Available: after_user_input, before_llm, after_llm,
# before_tools, before_each_tool, after_each_tool,
# after_tools, on_error, on_complete`
      },
      {
        framework: 'openai',
        label: 'OpenAI SDK',
        lines: 'Guardrails only',
        code: `from agents import Agent, output_guardrail
from agents.types import OutputGuardrailTripwireTriggered

# OpenAI SDK has NO event system
# Only "guardrails" for input/output validation

@output_guardrail
async def check_output(ctx, agent, output):
    # Can only validate, not modify behavior
    # No access to tool execution
    # No access to conversation history
    if "bad" in output:
        raise OutputGuardrailTripwireTriggered("Invalid")
    return output

# Want ReAct? Build it yourself
# Want custom logging? No standard way
# Want approval flows? No standard way`
      },
      {
        framework: 'google',
        label: 'Google ADK',
        lines: 'Few callbacks',
        code: `from google.adk.agents import LlmAgent
from google.adk.agents.callback_context import CallbackContext

# Limited callback types, not composable
async def before_turn(callback_context: CallbackContext):
    # Limited to CallbackContext - not full agent
    # Cannot access conversation history easily
    # Cannot modify agent behavior
    print("Starting turn...")

agent = LlmAgent(
    model="gemini-2.0-flash",
    name="Assistant",
    instruction="You are helpful",
    before_turn_callback=before_turn,  # One callback per type
    # Can't combine multiple behaviors
)`
      }
    ]
  }
}

const comparisonTabs: { key: ComparisonType; label: string; vs: string }[] = [
  { key: 'calculator', label: 'Calculator', vs: 'vs LangChain' },
  { key: 'browser', label: 'Browser', vs: 'vs OpenAI' },
  { key: 'react', label: 'ReAct', vs: 'vs Google' },
  { key: 'memory', label: 'Memory', vs: 'vs All' },
  { key: 'events', label: 'Events', vs: 'vs All' }
]

const frameworkColors: Record<Framework, string> = {
  connectonion: 'border-purple-500/50 bg-purple-500/10',
  openai: 'border-green-500/30 bg-green-500/5',
  google: 'border-blue-500/30 bg-blue-500/5',
  langchain: 'border-orange-500/30 bg-orange-500/5'
}

const frameworkBadgeColors: Record<Framework, string> = {
  connectonion: 'bg-purple-500 text-white',
  openai: 'bg-green-600 text-white',
  google: 'bg-blue-600 text-white',
  langchain: 'bg-orange-600 text-white'
}

export function FrameworkComparison() {
  const [activeTab, setActiveTab] = useState<ComparisonType>('calculator')
  const comparison = comparisons[activeTab]

  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-purple-400 text-sm font-mono uppercase tracking-wider">Why ConnectOnion</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          <h2 className="heading-2 mb-4">
            See the <span className="text-purple-400">Difference</span>
          </h2>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto">
            Same task, dramatically different complexity. Click each tab to see real code comparisons.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {comparisonTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-slate-200 hover:bg-gray-700'
              }`}
            >
              {tab.label} <span className="text-xs opacity-70">{tab.vs}</span>
            </button>
          ))}
        </div>

        {/* Comparison Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{comparison.title}</h3>
          <p className="text-slate-200 text-sm">{comparison.subtitle}</p>
        </div>

        {/* Code Examples */}
        <div className={`grid gap-6 ${comparison.examples.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {comparison.examples.map((example, idx) => (
            <div
              key={idx}
              className={`rounded-xl border-2 overflow-hidden ${frameworkColors[example.framework]}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${frameworkBadgeColors[example.framework]}`}>
                    {example.label}
                  </span>
                </div>
                <span className={`text-xs font-mono ${
                  example.framework === 'connectonion' ? 'text-purple-400' :
                  example.lines === 'DEPRECATED' ? 'text-red-400' : 'text-slate-300'
                }`}>
                  {example.lines}
                </span>
              </div>

              {/* Code */}
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language="python"
                  style={monokai}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.75rem',
                    lineHeight: '1.5'
                  }}
                  wrapLongLines={false}
                >
                  {example.code}
                </SyntaxHighlighter>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <div className="mt-12 bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-700">
            <h4 className="text-lg font-bold text-white">Quick Comparison</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-slate-200">Feature</th>
                  <th className="px-4 py-3 text-left text-purple-400">ConnectOnion</th>
                  <th className="px-4 py-3 text-left text-slate-200">OpenAI SDK</th>
                  <th className="px-4 py-3 text-left text-slate-200">Google ADK</th>
                  <th className="px-4 py-3 text-left text-slate-200">LangChain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="px-4 py-3 text-slate-200">Tool definition</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">Just a function</td>
                  <td className="px-4 py-3 text-slate-200">@function_tool</td>
                  <td className="px-4 py-3 text-slate-200">Dict + docstring</td>
                  <td className="px-4 py-3 text-slate-200">Tool class</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-200">Shared context</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">self.field</td>
                  <td className="px-4 py-3 text-slate-200">wrapper.context</td>
                  <td className="px-4 py-3 text-slate-200">tool_context.state</td>
                  <td className="px-4 py-3 text-slate-200">Custom</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-200">Add ReAct</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">plugins=[re_act]</td>
                  <td className="px-4 py-3 text-slate-200">Build yourself</td>
                  <td className="px-4 py-3 text-slate-200">PlanReActPlanner</td>
                  <td className="px-4 py-3 text-slate-200">Different agent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-200">Combine behaviors</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">List of functions</td>
                  <td className="px-4 py-3 text-red-400">No</td>
                  <td className="px-4 py-3 text-red-400">One planner</td>
                  <td className="px-4 py-3 text-red-400">LangGraph</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-200">Free credits</td>
                  <td className="px-4 py-3 text-green-400 font-medium">Yes</td>
                  <td className="px-4 py-3 text-red-400">No</td>
                  <td className="px-4 py-3 text-red-400">No</td>
                  <td className="px-4 py-3 text-red-400">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
