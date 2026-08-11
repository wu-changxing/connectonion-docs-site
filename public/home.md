# ConnectOnion - Homepage

## Philosophy

**Keep simple things simple, make complicated things possible.**

---

## Quick Start

```bash
pip install connectonion
```

This installs the current stable release. Preview versions require an explicit
`--pre` flag or an exact candidate pin.

```python
from connectonion import Agent

agent = Agent("You are helpful", tools=[get_weather])
agent.input("What's the weather in NYC?")
```

---

## Framework Comparisons

### 1. Calculator Agent: ConnectOnion vs LangChain

**ConnectOnion (8 lines):**
```python
from connectonion import Agent

def add(a: float, b: float) -> float:
    return a + b

def multiply(a: float, b: float) -> float:
    return a * b

agent = Agent("You are a calculator", tools=[add, multiply])
agent.input("What is 5 + 3, then multiply by 2?")
```

**LangChain (30+ lines):**
```python
from langchain.agents import Tool, AgentExecutor, create_react_agent
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
result = executor.invoke({"input": "What is 5 + 3, then multiply by 2?"})
```

**Key differences:**
- ConnectOnion: Functions with type hints = automatic tool conversion
- LangChain: Tool class wrappers, string parsing, manual descriptions

---

### 2. Browser Automation: ConnectOnion vs OpenAI SDK

**ConnectOnion (16 lines):**
```python
from connectonion import Agent

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
agent = Agent("You automate browsers", tools=[browser])
```

**OpenAI SDK (30+ lines):**
```python
from dataclasses import dataclass
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
result = await Runner.run(agent, "Open google", context=ctx)
```

**Key differences:**
- ConnectOnion: `self.field` for shared state
- OpenAI SDK: `wrapper.context.field` + dataclass + manual context passing

---

### 3. ReAct Reasoning: ConnectOnion vs Google ADK

**ConnectOnion (1 line to add):**
```python
from connectonion import Agent
from connectonion.useful_plugins import re_act

def search(query: str) -> str:
    return f"Results for: {query}"

# Just add plugins=[re_act] - that's it!
agent = Agent(
    "You are a research assistant",
    tools=[search],
    plugins=[re_act]  # Plan + Act + Reflect loop
)

agent.input("Research the history of Python")
```

**Google ADK (Planner class):**
```python
from google.adk import Agent
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
# Run with: adk web
```

**Key differences:**
- ConnectOnion: `plugins=[re_act]` - composable, customizable
- Google ADK: `PlanReActPlanner()` - one planner only, not composable

---

### 4. Memory System: ConnectOnion vs All

**ConnectOnion (8 lines):**
```python
from connectonion import Agent, Memory

memory = Memory()  # That's it!

agent = Agent(
    "You remember user preferences",
    tools=[memory]  # Memory is just a tool
)

agent.input("Remember: I prefer dark mode")
agent.input("What are my preferences?")
```

**OpenAI SDK (15+ lines):** SQLiteSession, manual session passing
**Google ADK (25+ lines):** SessionService + MemoryService + Runner
**LangChain (30+ lines):** ConversationBufferMemory - DEPRECATED in v0.3.1

---

### 5. Event Hooks: ConnectOnion vs All

**ConnectOnion (9 event types, full agent access):**
```python
from connectonion import after_tools

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

agent = Agent("assistant", tools=[...],
    on_events=[after_tools(my_hook)])

# Available: after_user_input, before_llm, after_llm,
# before_tools, before_each_tool, after_each_tool,
# after_tools, on_error, on_complete
```

**Others:**
- OpenAI SDK: Guardrails only (input/output validation)
- Google ADK: Few callbacks, CallbackContext only
- LangChain: Must choose agent type upfront, not composable

---

## Quick Comparison Table

| Feature | ConnectOnion | OpenAI SDK | Google ADK | LangChain |
|---------|--------------|------------|------------|-----------|
| Tool definition | **Just a function** | @function_tool | Dict + docstring | Tool class |
| Shared context | **self.field** | wrapper.context | tool_context.state | Custom |
| Add ReAct | **plugins=[re_act]** | Build yourself | PlanReActPlanner | Different agent |
| Combine behaviors | **List of functions** | No | One planner | LangGraph |
| Memory | **Memory as tool** | SQLiteSession | SessionService | DEPRECATED |
| Free credits | Yes | No | No | No |

---

## Core Capabilities

### Functions = Tools
```python
def search(q: str):
    return results
```
No wrappers. No decorators. Just functions.

### Deploy Anywhere
```python
agent.serve()
# Globally accessible from your laptop
```

### Connect Agents
```python
other = connect("0x...")
# Agents as tools
```

---

## Production Ready

- **Auto Log**: .co/logs/
- **@xray**: Breakpoints for debugging
- **Plugins**: Just functions
- **Human Loop**: Approval flows

---

## Free Credits

```python
model="co/gemini-2.5-pro"  # Free credits included
```
Check balance: `co status`

---

## Community

- Discord: https://discord.gg/4xfD9k8AUF
- GitHub: https://github.com/wu-changxing/connectonion

---

## Get Started

```bash
pip install connectonion
```

```python
from connectonion import Agent

agent = Agent("You are helpful", tools=[your_function])
agent.serve()  # Deploy from laptop, globally accessible
```

60 seconds to your first agent. No AWS. Just code.
