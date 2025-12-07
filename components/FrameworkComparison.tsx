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
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-purple-400 text-sm font-mono uppercase tracking-wider">Why ConnectOnion</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          <h2 className="heading-2 mb-4">
            See the <span className="text-purple-400">Difference</span>
          </h2>
          <p className="text-slate-100 text-lg max-w-2xl mx-auto">
            Same task, dramatically different complexity. Scroll to see real code comparisons.
          </p>
        </div>

        {/* Vertical Comparisons */}
        <div className="space-y-16">
          {comparisons.map((comparison, idx) => (
            <div key={idx} className="space-y-4">
              {/* Comparison Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-700" />
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{comparison.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">vs {comparison.vsFramework}</p>
                </div>
                <div className="flex-1 h-px bg-gray-700" />
              </div>

              <p className="text-center text-slate-100 mb-6">{comparison.subtitle}</p>

              {/* Code Blocks - Stack on mobile, side by side on desktop */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* ConnectOnion */}
                <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-purple-500/30">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-purple-500 text-white">
                      ConnectOnion
                    </span>
                    <span className="text-xs font-mono text-purple-400">
                      {comparison.connectonion.lines}
                    </span>
                  </div>
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
                      {comparison.connectonion.code}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Other Framework */}
                <div className="rounded-xl border border-gray-600 bg-gray-800/30 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-gray-600">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-gray-600 text-white">
                      {comparison.other.framework}
                    </span>
                    <span className={`text-xs font-mono ${comparison.other.lines === 'DEPRECATED' ? 'text-red-400' : 'text-slate-300'}`}>
                      {comparison.other.lines}
                    </span>
                  </div>
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
                      {comparison.other.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <div className="mt-16 bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-700">
            <h4 className="text-lg font-bold text-white">Quick Comparison</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-slate-100">Feature</th>
                  <th className="px-4 py-3 text-left text-purple-400">ConnectOnion</th>
                  <th className="px-4 py-3 text-left text-slate-100">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <tr>
                  <td className="px-4 py-3 text-slate-100">Tool definition</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">Just a function</td>
                  <td className="px-4 py-3 text-slate-300">Decorators, wrappers, classes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-100">Shared state</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">self.field</td>
                  <td className="px-4 py-3 text-slate-300">wrapper.context, dataclass, services</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-100">Add ReAct</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">plugins=[re_act]</td>
                  <td className="px-4 py-3 text-slate-300">Planner classes, different agent types</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-100">Memory</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">Memory as tool</td>
                  <td className="px-4 py-3 text-slate-300">Sessions, services, deprecated APIs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-100">Event hooks</td>
                  <td className="px-4 py-3 text-purple-400 font-medium">9 types, full access</td>
                  <td className="px-4 py-3 text-slate-300">Guardrails only, limited callbacks</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-100">Free credits</td>
                  <td className="px-4 py-3 text-green-400 font-medium">Yes</td>
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
