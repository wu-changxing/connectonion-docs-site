# Use Any Agent, Anywhere, As If Local

Call `connect(address)` to create a proxy to a remote agent. Same interface as local agents, works across networks.

## 60-Second Quick Start

Connect to a remote agent with one function call:

```python
from connectonion import connect

# Connect to a remote agent
remote_agent = connect("0x3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c")

# Use it like a local agent
result = remote_agent.input("Search for Python documentation")
print(result)
```

## Complete Example: Two Terminals

### Terminal 1: Start a Serving Agent
```python
# serve_agent.py
from connectonion import Agent

def calculate(expression: str) -> str:
    """Perform calculations."""
    return str(eval(expression))

def get_weather(city: str) -> str:
    """Get weather information."""
    return f"Weather in {city}: Sunny, 72°F"

agent = Agent(
    "assistant",
    tools=[calculate, get_weather],
    system_prompt="You are a helpful assistant."
)

print("Starting agent...")
agent.serve()
```

### Terminal 2: Connect and Use
```python
# use_agent.py
from connectonion import connect

# Connect using the agent's address
assistant = connect("0x7a8f9d4c2b1e3f5a6c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b")

# Use it
result1 = assistant.input("What is 42 * 17?")
print(result1)

result2 = assistant.input("What's the weather in Seattle?")
print(result2)
```

## Common Patterns

### 1. Connect to Multiple Agents
Build workflows with specialized remote agents:

```python
from connectonion import connect

# Connect to specialized agents
searcher = connect("0xaaa...")
writer = connect("0xbbb...")
reviewer = connect("0xccc...")

# Use them together
research = searcher.input("Research AI trends")
draft = writer.input(f"Write article about: {research}")
final = reviewer.input(f"Review and improve: {draft}")

print(final)
```

### 2. Retry on Connection Failure
Handle network failures gracefully:

```python
import time
from connectonion import connect

def connect_with_retry(address, max_retries=3):
    for attempt in range(max_retries):
        try:
            return connect(address)
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"Retrying... ({attempt + 1}/{max_retries})")
                time.sleep(2)
            else:
                raise

agent = connect_with_retry("0x7a8f...")
```

### 3. Agent Pool (Load Balancing)
Distribute load across multiple identical agents:

```python
from connectonion import connect

# Pool of identical agents
agent_addresses = [
    "0xaaa...",
    "0xbbb...",
    "0xccc..."
]

agents = [connect(addr) for addr in agent_addresses]

# Simple round-robin
def get_agent():
    agent = agents.pop(0)
    agents.append(agent)
    return agent

# Use different agent each time
result1 = get_agent().input("Task 1")
result2 = get_agent().input("Task 2")
result3 = get_agent().input("Task 3")
```

## Multi-Turn Conversations

Remote agents maintain conversation state across multiple `input()` calls:

```python
remote = connect("0x7a8f...")

# Turn 1
response1 = remote.input("Calculate 100 + 50")
print(response1)

# Turn 2 - remembers context
response2 = remote.input("Multiply that by 2")
print(response2)
```

## Real-World: Distributed Workflow

Local orchestrator using remote specialized agents:

```python
from connectonion import Agent, connect

# Local orchestrator agent
def run_workflow(task: str) -> str:
    """Run distributed workflow."""

    # Connect to remote specialized agents
    researcher = connect("0xaaa...")
    analyst = connect("0xbbb...")
    writer = connect("0xccc...")

    # Step 1: Research
    research = researcher.input(f"Research: {task}")

    # Step 2: Analyze
    analysis = analyst.input(f"Analyze this data: {research}")

    # Step 3: Write report
    report = writer.input(f"Write report based on: {analysis}")

    return report

# Local agent with access to remote agents via tool
orchestrator = Agent("orchestrator", tools=[run_workflow])

# User just talks to local agent
result = orchestrator.input("Create a report on AI market trends")
print(result)
```

## Configuration

### Default Relay (Production)
```python
# Uses wss://oo.openonion.ai/ws/announce by default
agent = connect("0x7a8f...")
```

### Local Relay (Development)
```python
# Connect to local relay server
agent = connect("0x7a8f...", relay_url="ws://localhost:8000/ws/announce")
```

### Environment-Based
```python
import os

relay_url = os.getenv(
    "RELAY_URL",
    "wss://oo.openonion.ai/ws/announce"
)

agent = connect("0x7a8f...", relay_url=relay_url)
```

## Local vs Remote Agents

**Local Agent:**
*   `+` No network latency
*   `+` Works offline
*   `-` Limited to one machine
*   `-` No sharing

**Remote Agent:**
*   `+` Access from anywhere
*   `+` Share across team
*   `-` Network latency
*   `-` Requires connectivity
