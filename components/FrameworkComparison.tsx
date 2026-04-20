'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ComparisonSection {
  title: string
  subtitle: string
  vsFramework: string
  connectonion: { lines: string; code: string }
  other: { framework: string; lines: string; code: string }
}

const comparisons: ComparisonSection[] = [
  {
    title: 'Calculator Agent',
    subtitle: 'Type hints = automatic tool conversion. No wrappers needed.',
    vsFramework: 'LangChain',
    connectonion: {
      lines: '8 lines',
      code: `from connectonion import Agent

def add(a: float, b: float) -> float:
    return a + b

def multiply(a: float, b: float) -> float:
    return a * b

agent = Agent("You are a calculator", tools=[add, multiply])
agent.input("What is 5 + 3, then multiply by 2?")`
    },
    other: {
      framework: 'LangChain',
      lines: '30+ lines',
      code: `from langchain.agents import Tool, AgentExecutor, create_react_agent
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate

def add(input_str: str) -> str:
    """Add two numbers. Input: 'a,b'"""
    a, b = map(float, input_str.split(','))
    return str(a + b)

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
executor.invoke({"input": "What is 5 + 3, then multiply by 2?"})`
    }
  },
  {
    title: 'Browser Automation',
    subtitle: 'Pass a class — public methods become tools, self = shared state.',
    vsFramework: 'OpenAI SDK',
    connectonion: {
      lines: '16 lines',
      code: `from connectonion import Agent

class BrowserAutomation:
    def __init__(self):
        self._browser = None
        self._page = None

    def start_browser(self):
        self._browser = launch_browser()
        self._page = self._browser.new_page()
        return "Browser started"

    def navigate(self, url: str):
        self._page.goto(url)
        return f"Navigated to {url}"

browser = BrowserAutomation()
agent = Agent("You automate browsers", tools=[browser])`
    },
    other: {
      framework: 'OpenAI SDK',
      lines: '30+ lines',
      code: `from dataclasses import dataclass
from agents import Agent, Runner, function_tool
from agents.types import RunContextWrapper

@dataclass
class BrowserContext:
    browser: object = None
    page: object = None

@function_tool
def start_browser(wrapper: RunContextWrapper[BrowserContext]):
    wrapper.context.browser = launch_browser()
    wrapper.context.page = wrapper.context.browser.new_page()
    return "Browser started"

@function_tool
def navigate(wrapper: RunContextWrapper[BrowserContext], url: str):
    wrapper.context.page.goto(url)
    return f"Navigated to {url}"

agent = Agent(name="browser", instructions="...",
    tools=[start_browser, navigate])
ctx = BrowserContext()
result = await Runner.run(agent, "Open google", context=ctx)`
    }
  },
  {
    title: 'ReAct Reasoning',
    subtitle: 'One line adds Plan + Act + Reflect. No planner classes.',
    vsFramework: 'Google ADK',
    connectonion: {
      lines: '1 line to add',
      code: `from connectonion import Agent
from connectonion.useful_plugins import re_act

def search(query: str) -> str:
    return f"Results for: {query}"

agent = Agent(
    "You are a research assistant",
    tools=[search],
    plugins=[re_act]  # Plan + Act + Reflect loop
)

agent.input("Research the history of Python")`
    },
    other: {
      framework: 'Google ADK',
      lines: 'Planner class required',
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

# Must instantiate a special planner class
agent = Agent(
    model="gemini-2.0-flash",
    planner=PlanReActPlanner(),
    tools=[search],
)
# Run with: adk web`
    }
  },
  {
    title: 'Memory System',
    subtitle: 'Memory is just a tool. No services, sessions, or deprecated APIs.',
    vsFramework: 'LangChain',
    connectonion: {
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
    other: {
      framework: 'LangChain',
      lines: 'DEPRECATED',
      code: `from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain

# Choose from 6+ memory types:
# - ConversationBufferMemory
# - ConversationSummaryMemory
# - ConversationBufferWindowMemory
# - ConversationKGMemory
# - VectorStoreRetrieverMemory

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# ⚠ DEPRECATED in v0.3.1 — must migrate to LangGraph`
    }
  },
  {
    title: 'Event Hooks',
    subtitle: '9 event types with full agent access. Not just guardrails.',
    vsFramework: 'OpenAI SDK',
    connectonion: {
      lines: '9 event types',
      code: `from connectonion import after_tools

def my_hook(agent):
    session = agent.current_session
    messages = session['messages']
    trace = session['trace']

    # Modify anything
    session['messages'].append({
        'role': 'assistant',
        'content': 'Thinking...'
    })

agent = Agent("assistant", tools=[...],
    on_events=[after_tools(my_hook)])

# after_user_input, before_llm, after_llm,
# before_tools, after_tools, on_error, on_complete`
    },
    other: {
      framework: 'OpenAI SDK',
      lines: 'Guardrails only',
      code: `from agents import Agent, output_guardrail

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
# Want logging? No standard way`
    }
  }
]

export function FrameworkComparison() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = comparisons[activeIdx]

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-gray-300" />
            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">Why ConnectOnion</span>
            <div className="h-px w-12 bg-gray-300" />
          </div>
          <h2 className="heading-2 mb-4">
            See the <span className="accent-italic text-[1.05em]">Difference</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Same task, dramatically less code. Real comparisons against LangChain, OpenAI SDK, and Google ADK.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="relative mb-8">
          {/* Right fade — signals more tabs exist on mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10 md:hidden" />
          <div className="flex overflow-x-auto hide-scrollbar gap-1 border-b border-gray-200 pb-px">
            {comparisons.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
                  i === activeIdx
                    ? 'text-gray-900 border-b-2 border-gray-900 -mb-px bg-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
          {/* Dot indicators for mobile */}
          <div className="flex items-center justify-center gap-1.5 mt-3 md:hidden">
            {comparisons.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`transition-all rounded-full ${i === activeIdx ? 'w-4 h-1.5 bg-gray-900' : 'w-1.5 h-1.5 bg-gray-300'}`}
                aria-label={`View ${comparisons[i].title}`}
              />
            ))}
          </div>
        </div>

        {/* Active Comparison */}
        <div>
          <div className="mb-5">
            <p className="text-sm text-gray-500">{active.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            {/* ConnectOnion */}
            <div className="rounded-xl border-2 border-gray-900 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-700">
                <span className="text-xs font-bold px-2 py-1 rounded bg-white text-gray-900">ConnectOnion</span>
                <span className="text-xs font-mono text-gray-300">{active.connectonion.lines}</span>
              </div>
              <div className="overflow-x-auto flex-1" style={{ background: '#111827' }}>
                <SyntaxHighlighter
                  language="python"
                  style={okaidia}
                  customStyle={{ margin: 0, padding: '1rem', background: '#111827', fontSize: '0.8125rem', lineHeight: '1.6', height: '100%' }}
                  wrapLongLines={false}
                >
                  {active.connectonion.code}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Other Framework */}
            <div className="rounded-xl border-2 border-gray-900 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-700">
                <span className="text-xs font-bold px-2 py-1 rounded bg-gray-500 text-white">{active.other.framework}</span>
                <span className={`text-xs font-mono ${active.other.lines === 'DEPRECATED' ? 'text-red-500' : 'text-gray-300'}`}>
                  {active.other.lines}
                </span>
              </div>
              <div className="overflow-x-auto flex-1" style={{ background: '#111827' }}>
                <SyntaxHighlighter
                  language="python"
                  style={okaidia}
                  customStyle={{ margin: 0, padding: '1rem', background: '#111827', fontSize: '0.8125rem', lineHeight: '1.6', height: '100%' }}
                  wrapLongLines={false}
                >
                  {active.other.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Comparison counter */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {comparisons.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIdx ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-500'}`}
                aria-label={`View ${comparisons[i].title} comparison`}
              />
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Quick Comparison</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-gray-500 font-medium text-xs uppercase tracking-wide">Feature</th>
                  <th className="px-4 py-3 text-left text-gray-900 font-semibold text-xs uppercase tracking-wide">ConnectOnion</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium text-xs uppercase tracking-wide">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Tool definition', 'Just a function', 'Decorators, wrappers, classes'],
                  ['Shared state', 'self.field', 'wrapper.context, dataclass, services'],
                  ['Add ReAct', 'plugins=[re_act]', 'Planner classes, different agent types'],
                  ['Memory', 'Memory as tool', 'Sessions, services, deprecated APIs'],
                  ['Event hooks', '9 types, full access', 'Guardrails only, limited callbacks'],
                  ['Built-in AI programmer', 'co ai', 'None'],
                  ['Approval system', 'Plugin-based', 'Build your own'],
                  ['Free credits', '$5 free', '—'],
                ].map(([feature, co, other]) => (
                  <tr key={feature} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-600">{feature}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{co}</td>
                    <td className="px-4 py-3 text-gray-500">{other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
