# ConnectOnion - Homepage Content

---

## Hero Section

**Title:** ConnectOnion

**Tagline:** Building multi-agent collaboration, never been so easy

**Subheadline:** Build AI agents in **8 lines**, not 50

**Install Command:**
```bash
pip install connectonion
```

**Supporting Text:** Build once. Deploy anywhere. Connect from any language.

**Navigation Links:**
- Quick Start → `/quickstart`
- GitHub → `https://github.com/wu-changxing/connectonion`
- Discord → `https://discord.gg/4xfD9k8AUF`

---

## Trust Indicators Section

**Badges:**
- Status: Production Ready (https://connectonion.com)
- License: MIT (https://opensource.org/licenses/MIT)
- Python: 3.9+ (https://python.org)
- Downloads: PyPI stats (https://pepy.tech/projects/connectonion)
- Discord: Join (https://discord.gg/4xfD9k8AUF)

---

## Build a Single Agent

**Headline:** 8 Lines. That's All You Need.

**Why This Matters:**
Other frameworks force you to write 50+ lines of boilerplate. ConnectOnion gets you to working code in 8 lines. Simple things should be simple.

**The Equation:**
```
Agent = Prompt (Markdown) + Tools (Functions or Class)
```

---

### Option 1: Functions (Stateless Tools)
```python
from connectonion import Agent

# Pure Python functions
def calculate(expression: str) -> str:
    """Evaluate a mathematical expression"""
    return str(eval(expression))

def search(query: str) -> str:
    """Search for information"""
    return search_results

# Agent = Prompt + Functions
agent = Agent("You are a helpful assistant", tools=[calculate, search])

result = agent.input("What's 42 * 17?")
print(result)  # "42 * 17 equals 714"
```

**When to use:** Stateless operations, no shared context needed

---

### Option 2: Class (Stateful Tools with Shared Context)
```python
from connectonion import Agent

class Calculator:
    def __init__(self):
        self.history = []  # Shared context across tool calls

    def calculate(self, expression: str) -> str:
        """Evaluate a mathematical expression"""
        result = str(eval(expression))
        self.history.append(f"{expression} = {result}")
        return result

    def get_history(self) -> str:
        """Get calculation history"""
        return "\n".join(self.history)

calc = Calculator()

# Agent = Prompt + Class (uses all public methods)
agent = Agent("You are a helpful assistant", tools=calc)

agent.input("What's 42 * 17?")
agent.input("Show me the history")
# History persists across calls!
```

**When to use:** Need shared state/context between tool calls (database connections, conversation history, etc.)

---

**What Just Happened:**
- **Functions:** Pure Python functions → Automatic tool schema
- **Class:** Public methods → Automatic tools with shared context (instance state)
- **Prompt:** Plain markdown string
- No boilerplate, no framework inheritance, no config files

**Philosophy:**
- **Keep simple things simple** - 8 lines for basic agents
- **Make complicated things possible** - Full production features available

---

## Deploy from Your Laptop

**Headline:** One Line to Deploy. Globally Accessible in 5 Seconds.

**Why This Matters:**
AWS setup takes 3 days and costs $50/month. Your laptop is more powerful than EC2 but you're paying for both. Stop wasting time on infrastructure.

**How It Works:**

**Step 1: Build Your Agent**
```python
from connectonion import Agent

def translate(text: str, target_language: str) -> str:
    """Translate text to target language"""
    # Your translation logic here
    return translated_text

agent = Agent("You are a translator", tools=[translate])
```

**Step 2: Deploy in One Line**
```python
agent.serve()
```

**Output:**
```
🟢 Agent Online
Public Key: 0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4

Running on: Your MacBook Pro
Globally accessible via P2P network

Debug: https://oo.openonion.ai/debug/0x3d4017c3e892b7f1
Protocol: co://0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4

[Waiting for connections...]
```

**What You Get:**
- **Ed25519 Identity:** Cryptographic public key as address (no manual config)
- **Auto Relay:** NAT traversal handled automatically - works behind routers
- **Runs on Your Machine:** No AWS bills, no server setup
- **Globally Accessible:** Anyone can connect via public key
- **Web Debugger:** Test agents in browser instantly

**Real Impact:**
- Deploy: 5 seconds (vs 3 days for AWS)
- Cost: $0/month (vs $50+ for VPS)
- Iterate: Change code, restart - done (vs redeploy, wait, pray)

**Natural Scaling Path:**
- **0-100 users:** Run on your laptop ($0/month)
- **100-1000 users:** Move to your own VPS ($5-10/month)
- **1000+ users:** OpenOnion managed cloud (coming soon)

**Coming Soon: One-Command Deploy**
```bash
co deploy --openonion  # Auto-scaling, global CDN, monitoring
```

Preview access available now → Join beta

Same code. Zero changes. Just change where it runs.

---

## Connect from Any Language

**Headline:** Python, JavaScript, TypeScript, Swift, Kotlin - Same Agent Address

**Why This Matters:**
Build once in Python. Connect from anywhere. Your mobile app can use the same agent as your web app. One agent, multiple clients, zero configuration.

**The Agent Address:**
Every agent gets a cryptographic address (Ed25519 public key):
```
0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4
```

That's all you need to connect from any language.

---

### Python Client
```python
from connectonion import connect

# Connect to agent
translator = connect("0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4")

# Use it like any function
result = translator.input("Translate 'Hello' to Spanish")
print(result)  # "Hola"
```

---

### JavaScript/TypeScript Client
```typescript
import { connect } from 'connectonion';

// Same agent address
const translator = await connect("0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4");

// Same interface
const result = await translator.input("Translate 'Hello' to Spanish");
console.log(result);  // "Hola"
```

---

### Swift Client
```swift
import ConnectOnion

// Same agent address
let translator = try await ConnectOnion.connect("0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4")

// Same interface
let result = try await translator.input("Translate 'Hello' to Spanish")
print(result)  // "Hola"
```

---

### Kotlin Client
```kotlin
import com.connectonion.ConnectOnion

// Same agent address
val translator = ConnectOnion.connect("0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4")

// Same interface
val result = translator.input("Translate 'Hello' to Spanish")
println(result)  // "Hola"
```

---

**The Big Picture:**
```
┌─────────────────────────────────────────────────┐
│  Single Agent (Python)                          │
│  Address: 0x3d4017c3...                         │
│  agent.serve() ← Running on your laptop         │
└─────────────────────────────────────────────────┘
         ↑           ↑           ↑           ↑
         │           │           │           │
    Python      JavaScript   Swift      Kotlin
    Client       Client      Client     Client
```

**Real Impact:**
- Build once, connect from everywhere
- No API wrappers, no REST endpoints, no GraphQL schemas
- Direct P2P connection with end-to-end encryption
- Works across languages, platforms, and devices

---

## Multi-Agent Collaboration

**Headline:** Agents That Work Together

**Why This Matters:**
One agent is useful. Multiple agents collaborating is powerful. Agents can use other agents as tools - compose complexity from simplicity.

**Current: Connect to Known Agents**
```python
from connectonion import connect

# Connect using agent address
translator = connect("0x3d4017c3e892b7f1a5e4d3c2b1a0f9e8d7c6b5a4")

# Use it like any function
result = translator.input("Translate 'Hello' to Spanish")
```

**Build Agents That Use Other Agents:**
```python
from connectonion import Agent, connect

def write_report(topic: str) -> str:
    """Research and write comprehensive report"""
    researcher = connect("0x1234...")  # Known research agent
    writer = connect("0x5678...")      # Known writing agent

    research = researcher.input(f"Research {topic}")
    return writer.input(f"Write report: {research}")

coordinator = Agent("You coordinate tasks", tools=[write_report])
```

**Coming Soon: Semantic Discovery**
```python
from connectonion import use

# Discover agents by capability (not implemented yet)
translator = use("translate to Spanish", trust="tested")
researcher = use("deep research agent", trust="strict")
```

**Learn More:** `/docs/multi-agent`

---

## Debug a Single Agent

**Headline:** Interactive Debugging - See What Agents Think

**Why This Matters:**
LangChain gives you logs. AutoGen gives you verbose output. ConnectOnion gives you a **debugger**. Pause execution mid-run, inspect variables, test edge cases in real-time.

**How It Works:**

### @xray Breakpoints - Pause Agent Execution
Decorate any tool with `@xray` and the agent pauses automatically when that tool is called. See local variables, execution context, and full state.

**Example:**
```python
from connectonion import Agent
from connectonion.decorators import xray

@xray  # This tool becomes a breakpoint
def search_emails(query: str):
    return api.search(query)

def send_email(to: str, body: str):
    return api.send(to, body)

agent = Agent(
    name="email_assistant",
    tools=[search_emails, send_email]
)

# Debug with a prompt - starts immediately!
agent.auto_debug("Send email to John")
```

**Interactive Output:**
```
🔍 Interactive Debug Session Started
Agent: email_assistant | Tools: 2
Debugging: "Send email to John"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 @xray BREAKPOINT: search_emails

📊 Local Variables:
  query = "John"
  result = "Found 1 email from john@company.com"

📍 Context:
  User: "Send email to John"
  Iteration: 1/10
  Tools executed: 1/2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ What do you want to do?
  → Continue execution 🚀       [c or Enter]
    Edit variables 🔍           [e]
    Quit debugging 🚫          [q]

💡 Tip: Press 'c' to continue or '?' for help
> c

→ Tool: send_email(to="john@company.com", ...)
← Result: Email sent successfully

✓ Task complete (1.2s)
```

### Time-Travel Testing with Python REPL
Press `e` at any breakpoint to enter a Python REPL. Change variables, test "what if" scenarios, watch the entire agent behavior change based on your edits.

**Key Features:**
- **Zero Learning Curve:** Arrow keys or simple shortcuts (c/e/q). Tips always shown.
- **Full State Access:** See variables, context, iteration count, tool history.
- **Production Safe:** Only activates with `.auto_debug()` - regular `.input()` runs normally.

**Real Impact:** Debug agents in minutes, not hours. Fix edge cases before production.

**Learn More:** `/auto-debug` • Available in v0.3.2

---

## Advanced Features

**Headline:** Production-Ready Out of the Box

**Why This Matters:**
Other frameworks are great for demos. ConnectOnion is designed for production from day one. Everything you need is built-in.

---

### Automatic Activity Logging
Every agent interaction is logged to `.co/logs/[agent_name]/` with timestamps, tool calls, results, and errors. No custom logging code required.

**Example:**
```python
agent = Agent("assistant", tools=[search])
agent.input("Find latest news")

# Automatically creates:
# .co/logs/assistant/2025-01-14_15-30-45.json
# Contains: full conversation, tool calls, timing, model info
```

---

### Professional CLI - Project Setup in 5 Seconds
```bash
$ co init
✓ Project ready in 5 seconds

$ co init --template chat
✓ Created chat agent with best practices
```

**CLI Features:**
- Project templates (basic, chat, multi-agent)
- Environment management
- Best practices built-in
- Works out of the box

---

### Multi-LLM Support
Switch between providers with one parameter. Default: `co/o4-mini` (managed keys). Supports OpenAI, Anthropic, Google, and local models.

```python
agent = Agent("assistant", model="gpt-4o")           # OpenAI
agent = Agent("assistant", model="claude-opus-4")    # Anthropic
agent = Agent("assistant", model="gemini-2.0-flash") # Google
```

---

### Plugin System
A plugin is just a list of functions. No magic.

**The Concept:**
```python
# A plugin is a list of events
# An event is: when to call + what function to call
# The function gets the agent, you can change everything

from connectonion import after_tool

def log_tool(agent):  # Just a function, agent is the parameter
    trace = agent.current_session['trace'][-1]
    print(f"✓ {trace['tool_name']} completed")

# Plugin = list of (when, function)
logger = [after_tool(log_tool)]

agent = Agent("assistant", tools=[search], plugins=[logger])
```

**Built-in Plugins (Just Pre-Made Function Lists):**
```python
from connectonion.useful_plugins import reflection, react

agent = Agent("assistant", tools=[search], plugins=[reflection, react])

agent.input("Search for Python")
# 💭 We learned that Python is a popular programming language...
# 🤔 We should next explain its key features and use cases.
```

**Available:** `reflection`, `react`, `image_result_formatter`

---

### Framework Status (v0.3.2 - Production Ready)
- **Stable Features:** Core agent, tools, LLM integration, CLI, auto-logging
- **New Features:** Interactive debugging (@xray), Python REPL, breakpoints
- **Battle-Tested:** Used in production by teams worldwide

**Real Impact:** Ship production agents on day one. No custom infrastructure needed.

---

## Join the New Internet for AI Agents

**Headline:** A New Internet, Built for Agents

**Why This Matters:**
Today's internet was built for humans. Domain names. Google SEO. Marketing budgets. Agents don't need any of that. They need **semantic discovery**, **behavioral trust**, and **direct P2P connections**.

ConnectOnion is building the internet for AI agents.

---

### How Agent Discovery Works

**Search by Capability (Not Keywords)**
```python
from connectonion import use

# Find agent by what it does, not who built it
research_agent = use("I need a deep research agent")

# ConnectOnion searches globally
# Ranks by: speed, accuracy, uptime, user satisfaction
# Returns: Best agent for your need
```

**Ranking Algorithm:**
Agents are ranked by behavioral proof, not credentials:
- **Performance Metrics:** Speed, accuracy, success rate
- **Uptime:** Reliability over time
- **User Feedback:** Real usage satisfaction
- **Cost Efficiency:** Best results per API call

**No Identity Needed:**
Agents prove themselves through behavior, like humans prove themselves through job interviews. But agents can do 1 million "interviews" in 1ms to find the perfect match.

---

### Why This Changes Everything

**Human Internet vs Agent Internet:**

| Human Internet | Agent Internet (ConnectOnion) |
|---------------|------------------------------|
| Domain names ($12/year) | Ed25519 addresses (free) |
| Google SEO (6 months) | Behavioral ranking (instant) |
| Marketing budget | Quality speaks for itself |
| AWS/hosting ($50+/month) | Deploy from laptop ($0) |
| REST APIs | Direct P2P connections |
| OAuth/passwords | Cryptographic signatures |

**Real Impact:**
- Build great agent → Get discovered automatically
- No Google SEO (agents don't use search engines)
- No social media marketing (agents don't read Twitter)
- No sales team (agents evaluate quality themselves)

**Think:** Google for web pages. **ConnectOnion for AI agents.**

---

### Join the Movement

You're not just using a framework. You're building the future of how agents communicate.

**What You Can Do:**
1. **Build agents** - Quality agents rise automatically
2. **Contribute to discovery** - Help improve ranking algorithms
3. **Shape the protocol** - Join discussions on Discord
4. **Deploy infrastructure** - Run relay nodes, host agents

**Community Benefits:**
- Direct access to framework creators on Discord
- Feature requests reviewed immediately
- Bug fixes shipped in hours, not months
- Shape the framework with us
- Non-competitive, collaborative environment

**Vision:**
A world where:
- **Agents discover each other automatically** (no marketing)
- **Trust is earned through behavior** (no certificates)
- **Anyone can deploy from their laptop** (no AWS)
- **Quality agents rise naturally** (no politics)

**Join Us:** https://discord.gg/4xfD9k8AUF

---

## Built for AI Coding

**Headline:** Vibe Coding - Let AI Write Your Agents

**Why This Matters:**
The future of coding is AI-assisted. ConnectOnion is designed for Claude Code, Cursor, and other AI coding assistants to understand and generate perfectly. Simple patterns, minimal abstractions, comprehensive examples.

**How It Works:**
1. **Copy Documentation** - Click the button on any docs page
2. **Paste to Your AI** - Claude Code, Cursor, or any coding assistant
3. **Start Building** - AI writes perfect ConnectOnion code

**Why It Works:**
- Simple, consistent patterns AI can learn
- Minimal abstractions to confuse LLMs
- Comprehensive examples in every doc page
- Framework designed for AI comprehension

**Claude Code Integration:**
- Official Anthropic plugin
- Free to use
- 2-minute setup
- Direct access to framework authors on Discord

**Real Impact:** Non-technical founders build agents. Junior devs become productive in hours.

**Learn More:** `/vibe-coding` → Free plugin • Start coding with AI

---

## Compare with Other Frameworks

**Headline:** Same Result, 85% Less Code

**Why This Matters:**
Less code = fewer bugs, faster onboarding, easier maintenance. See the difference for yourself.

**Visual Comparison:**
- Lines of Code: **85% less**
- ConnectOnion: **8 lines** ⭐
- Other Frameworks: **~50 lines**

---

### ConnectOnion Code (8 lines)
```python
from connectonion import Agent

def calculate(expression: str) -> str:
    return str(eval(expression))

agent = Agent("You are a helpful assistant",
              tools=[calculate])

result = agent.input("What's 42 * 17?")
print(result)
```

---

### Other Frameworks Code (~50 lines)
```python
from langchain.agents import Tool, AgentExecutor
from langchain.agents import create_react_agent
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.schema import SystemMessage
import json

# Define the calculation tool
def calculate_tool(expression: str) -> str:
    try:
        result = eval(expression)
        return json.dumps({"result": result})
    except Exception as e:
        return json.dumps({"error": str(e)})

# Create tool wrapper
tools = [
    Tool(
        name="Calculator",
        func=calculate_tool,
        description="Useful for mathematical calculations"
    )
]

# Setup prompt template
template = """You are a helpful assistant.

{history}
Human: {input}
{agent_scratchpad}
"""

prompt = PromptTemplate(
    input_variables=["history", "input", "agent_scratchpad"],
    template=template
)

# Initialize LLM
llm = OpenAI(temperature=0)

# Setup memory
memory = ConversationBufferMemory(
    memory_key="history",
    return_messages=True
)

# Create agent
agent = create_react_agent(
    llm=llm,
    tools=tools,
    prompt=prompt
)

# Create executor
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True,
    handle_parsing_errors=True
)

# Finally use it
result = agent_executor.invoke({"input": "What's 42 * 17?"})
print(result["output"])
```

---

**Big Callout:**
Same result, **85% less code**
No boilerplate. No complexity. Just agents.

---

## Truly Open, Truly Community

**Headline:** Open Source Without Corporate Interests

**Why This Matters:**
Many "open source" frameworks are controlled by companies optimizing for enterprise sales. ConnectOnion is MIT-licensed and community-driven. Framework decisions are made by users, not a product roadmap.

---

### MIT License - Real Freedom
- Use commercially without restrictions
- Fork freely for your needs
- No CLA (Contributor License Agreement) required
- No dual licensing or premium tiers
- Community-owned, not company-controlled

**Comparison:**
- **ConnectOnion:** MIT, community-driven, no company interests
- **LangChain:** MIT but controlled by LangChain Inc with enterprise focus
- **Others:** Often have premium features or enterprise versions

---

### Active Community - Direct Access to Creators
Framework authors respond in Discord daily. Average response time: less than 4 hours. Feature requests go from idea to implementation in days, not quarters.

**Community Benefits:**
- Direct access to framework creators on Discord
- Feature requests reviewed immediately
- Bug fixes shipped in hours, not months
- Shape the framework with us
- Non-competitive, collaborative environment

**Discord Community:**
- Active daily discussions
- Help from creators and experienced users
- Share your agents and use cases
- Early access to new features
- Vote on roadmap priorities

**Real Impact:** You're not just using a framework, you're part of building it.

**Join Us:** https://discord.gg/4xfD9k8AUF

---

## Final CTA Section

**Headline:** Ready to Start?

**Subheadline:** Build, deploy, connect - all in 8 lines

**Install Command:**
```bash
pip install connectonion
```

**Quick Start:**
```python
from connectonion import Agent

agent = Agent("You are helpful", tools=[your_function])
agent.serve()  # Deploy from laptop, globally accessible
```

**Documentation Link:** View Documentation → `/quickstart`

**Supporting Text:** 60 seconds to your first agent. No AWS. No marketing. Just code.

---
