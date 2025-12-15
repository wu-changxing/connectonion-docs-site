# Useful Plugins

Pre-built plugins from `connectonion.useful_plugins`

## What is a Plugin?

A plugin is a reusable list of event handlers. Use `plugins=[...]` to add pre-packaged functionality to any agent.

```python
from connectonion import Agent
from connectonion.useful_plugins import re_act, image_result_formatter

# Combine multiple plugins
agent = Agent(
    "assistant",
    tools=[search, screenshot],
    plugins=[re_act, image_result_formatter]
)
```

Learn how to build custom plugins in the [Plugin System documentation](/plugin).

## Available Plugins

### ReAct Pattern

Implements Reason + Act pattern with planning before action and reflection after tool execution

**Events used**: `after_user_input (plan)`, `after_tools (reflect)`

**Usage**:
```python
from connectonion.useful_plugins import re_act

agent = Agent("assistant", tools=[search], plugins=[re_act])
```

### Code Evaluation

Safe code evaluation and execution in a sandboxed environment

**Events used**: `after_tools`

**Usage**:
```python
from connectonion.useful_plugins import eval

agent = Agent("assistant", tools=[generate_code], plugins=[eval])
```

### Image Result Formatter

Automatically formats base64 images in tool results for vision models (GPT-4o, etc.)

**Events used**: `after_each_tool`

**Usage**:
```python
from connectonion.useful_plugins import image_result_formatter

agent = Agent("assistant", tools=[screenshot], plugins=[image_result_formatter])
```

### Gmail Plugin

Pre-configured event handlers for Gmail integration workflows

**Events used**: `after_user_input`, `after_tools`

**Usage**:
```python
from connectonion.useful_plugins import gmail_plugin

agent = Agent("email_assistant", plugins=[gmail_plugin])
```

### Calendar Plugin

Pre-configured event handlers for calendar management workflows

**Events used**: `after_user_input`, `after_tools`

**Usage**:
```python
from connectonion.useful_plugins import calendar_plugin

agent = Agent("scheduler", plugins=[calendar_plugin])
```

### Shell Approval

Requires user confirmation before executing shell commands for safety

**Events used**: `before_each_tool`

**Usage**:
```python
from connectonion.useful_plugins import shell_approval

agent = Agent("devops", tools=[run_command], plugins=[shell_approval])
```

## Combining Plugins

Plugins can be combined for powerful agent behaviors:

```python
from connectonion import Agent
from connectonion.useful_plugins import (
    re_act,              # Planning + Reflection
    image_result_formatter,  # Vision support
    shell_approval       # Safety for shell commands
)

agent = Agent(
    "devops_assistant",
    tools=[run_command, screenshot, analyze],
    plugins=[re_act, image_result_formatter, shell_approval]
)

# Now the agent will:
# 1. Plan before acting (re_act)
# 2. Format images for vision models (image_result_formatter)
# 3. Ask for approval before shell commands (shell_approval)
# 4. Reflect after tool execution (re_act)
```

## Build Your Own Plugin

Learn how to create custom plugins using the event system in the [Plugin System documentation](/plugin).

