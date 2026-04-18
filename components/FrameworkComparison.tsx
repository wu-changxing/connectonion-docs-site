/**
 * @purpose Side-by-side code comparison showcasing ConnectOnion vs other frameworks
 * @llm-note
 *   Dependencies: imports from [react-syntax-highlighter] | imported by [app/page.tsx (homepage)]
 *   Data flow: renders static comparisons[] array → SyntaxHighlighter for Python code → comparison table
 *   State/Effects: pure render component | no state | no side effects
 *   Integration: exposes FrameworkComparison component
 *   Content: 5 comparisons (Calculator, Browser, ReAct, Memory, Events) vs LangChain/OpenAI SDK/Google ADK
 *   UX: purple border for ConnectOnion | gray for others | line counts shown | responsive grid layout
 */
'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ComparisonSection {
  title: string
  subtitle: string
  vsFramework: string
  connectonion: {
    lines: string
    code: string
  }
  other: {
    framework: string
    lines: string
    code: string
  }
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
  },
  {
    title: 'Browser Automation',
    subtitle: 'Just pass a class. Public methods become tools, self = shared state.',
    vsFramework: 'OpenAI SDK',
    connectonion: {
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
  },
  {
    title: 'ReAct Reasoning',
    subtitle: 'plugins=[re_act] - one line adds Plan + Act + Reflect loop.',
    vsFramework: 'Google ADK',
    connectonion: {
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
    other: {
      framework: 'Google ADK',
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
  },
  {
    title: 'Memory System',
    subtitle: 'Memory is just a tool. No services, no sessions, no deprecated APIs.',
    vsFramework: 'All Frameworks',
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
  },
  {
    title: 'Event Hooks',
    subtitle: '9 event types with full agent access. Not just guardrails.',
    vsFramework: 'All Frameworks',
    connectonion: {
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
    other: {
      framework: 'OpenAI SDK',
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
    }
  }
]

export function FrameworkComparison() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-green-300" />
            <span className="text-green-700 text-sm font-mono uppercase tracking-wider">Why ConnectOnion</span>
            <div className="h-px w-12 bg-green-300" />
          </div>
          <h2 className="heading-2 mb-4">
            See the <span className="text-green-700">Difference</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Same task, dramatically different complexity. Scroll to see real code comparisons.
          </p>
        </div>

        {/* Vertical Comparisons */}
        <div className="space-y-14">
          {comparisons.map((comparison, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">{comparison.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">vs {comparison.vsFramework}</p>
                </div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-center text-gray-500 text-sm mb-5">{comparison.subtitle}</p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* ConnectOnion */}
                <div className="rounded-xl border-2 border-green-500 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-green-50 border-b border-green-200">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-green-600 text-white">ConnectOnion</span>
                    <span className="text-xs font-mono text-green-700">{comparison.connectonion.lines}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <SyntaxHighlighter
                      language="python"
                      style={monokai}
                      customStyle={{ margin: 0, padding: '1rem', background: '#111827', fontSize: '0.8125rem', lineHeight: '1.6' }}
                      wrapLongLines={false}
                    >
                      {comparison.connectonion.code}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Other Framework */}
                <div className="rounded-xl border border-gray-300 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 border-b border-gray-200">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-gray-500 text-white">{comparison.other.framework}</span>
                    <span className={`text-xs font-mono ${comparison.other.lines === 'DEPRECATED' ? 'text-red-500' : 'text-gray-500'}`}>
                      {comparison.other.lines}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <SyntaxHighlighter
                      language="python"
                      style={monokai}
                      customStyle={{ margin: 0, padding: '1rem', background: '#111827', fontSize: '0.8125rem', lineHeight: '1.6' }}
                      wrapLongLines={false}
                    >
                      {comparison.other.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <div className="mt-14 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h4 className="text-base font-bold text-gray-900">Quick Comparison</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Feature</th>
                  <th className="px-4 py-3 text-left text-green-700 font-medium">ConnectOnion</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Tool definition', 'Just a function', 'Decorators, wrappers, classes'],
                  ['Shared state', 'self.field', 'wrapper.context, dataclass, services'],
                  ['Add ReAct', 'plugins=[re_act]', 'Planner classes, different agent types'],
                  ['Memory', 'Memory as tool', 'Sessions, services, deprecated APIs'],
                  ['Event hooks', '12 types, full access', 'Guardrails only, limited callbacks'],
                  ['Built-in AI programmer', 'co ai', 'None'],
                  ['Frontend + Backend', 'Built-in', 'Build your own'],
                  ['Approval system', 'Plugin-based, built-in', 'Build your own'],
                ].map(([feature, co, other]) => (
                  <tr key={feature}>
                    <td className="px-4 py-3 text-gray-700">{feature}</td>
                    <td className="px-4 py-3 text-green-700 font-medium">{co}</td>
                    <td className="px-4 py-3 text-gray-500">{other}</td>
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-3 text-gray-700">Free credits</td>
                  <td className="px-4 py-3 text-green-700 font-medium">$5 free</td>
                  <td className="px-4 py-3 text-red-500">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
