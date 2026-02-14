# Agent

The heart of ConnectOnion. Give it tools, and it figures out the rest.

## Quick Start (60 Seconds)

```python
from connectonion import Agent

# Define what your agent can do
def calculate(expression: str) -> str:
    """Do math calculations."""
    return str(eval(expression))

# Create agent
agent = Agent("math_bot", tools=[calculate])

# Use it
result = agent.input("What is 42 * 17?")
```

**Output:**
```
To calculate 42 * 17, I'll use the calculator tool.
The result is 714.
```

**That's it.** Your first AI agent in 5 lines.

## What Agent Can Do - Full API Overview

After that simple example, here's **everything** an Agent can do:

### Creating an Agent

```python
Agent(
    name="my_bot",                        # Required: agent identifier
    tools=[func1, func2],                 # Optional: functions agent can call
    system_prompt="You are helpful",      # Optional: personality/behavior
    model="co/o4-mini",                   # Optional: LLM model (OpenAI/Claude/Gemini)
    max_iterations=10,                    # Optional: how many tool calls allowed
    api_key="sk-...",                     # Optional: override environment variable
    llm=custom_llm,                       # Optional: bring your own LLM instance
    trust="tested",                       # Optional: security verification
    log=True                              # Optional: logging configuration
)
```

### Using Your Agent

```python
# Give it a task
result = agent.input("Do something")

# Override iterations for complex tasks
result = agent.input("Complex task", max_iterations=20)

# Execute a tool directly (for testing)
result = agent.execute_tool("tool_name", {"arg": "value"})
```

### Managing Tools

```python
# Add tools after creation
agent.add_tool(new_function)

# Remove tools
agent.remove_tool("function_name")

# See what tools are available
tools = agent.list_tools()
```

### Conversations & State

```python
# Multi-turn conversations work automatically
agent.input("What is 10 + 5?")       # Turn 1: "15"
agent.input("Multiply that by 2")    # Turn 2: "30" (remembers context)

# Start fresh
agent.reset_conversation()

# Access internal state (advanced)
session = agent.current_session      # Messages, trace, turn count
```

### Attributes You Can Access

```python
agent.name                  # str: Agent identifier
agent.tools                 # ToolRegistry: All available tools
agent.tools.names()         # list[str]: Tool names
agent.tools.get("name")     # Tool: Get tool by name
agent.tools.tool_name       # Tool: Attribute access to tools
agent.system_prompt         # str: Agent's personality
agent.max_iterations        # int: Default iteration limit
agent.current_session       # dict | None: Runtime state
```

**That's the complete API.** Now let's dive into each feature.
