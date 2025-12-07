# Built-in Plugins

Pre-built plugins that extend agent behavior via event hooks.

## Quick Reference

| Plugin | Purpose | Category |
|--------|---------|----------|
| [re_act](#re_act) | ReAct reasoning pattern (plan + reflect) | Reasoning |
| [eval](#eval) | Task evaluation for debugging | Debugging |
| [image_result_formatter](#image_result_formatter) | Format images for vision models | Media |
| [shell_approval](#shell_approval) | Approve shell commands before execution | Security |

```python
from connectonion import Agent
from connectonion.useful_plugins import re_act, eval, image_result_formatter, shell_approval

agent = Agent(
    "assistant",
    tools=[search],
    plugins=[re_act, eval]  # Combine multiple plugins
)
```

## re_act

ReAct (Reason + Act) - Adds planning before action and reflection after tools.

```python
from connectonion import Agent
from connectonion.useful_plugins import re_act

agent = Agent("assistant", tools=[search], plugins=[re_act])

agent.input("Search for Python tutorials")
# /planning...
# Will search for Python tutorials first.
# ... tool executes ...
# /reflecting...
# Found Python basics, task complete.
```

**Events Used:**
- `after_user_input` - Generate initial plan
- `after_tools` - Reflect on results

## eval

Debug and test agent prompts and tools during development.

```python
from connectonion import Agent
from connectonion.useful_plugins import eval

agent = Agent("assistant", tools=[search], plugins=[eval])

agent.input("Search for Python docs")
# ... agent executes ...
# /evaluating...
# Task completed successfully
```

**Events Used:**
- `after_user_input` - Generate expected outcome
- `on_complete` - Evaluate actual vs expected

**Tip:** Combine with `re_act` - the plan becomes the expected outcome.

## image_result_formatter

Automatically formats base64 image results for vision models.

```python
from connectonion import Agent
from connectonion.useful_plugins import image_result_formatter

agent = Agent("assistant", tools=[take_screenshot], plugins=[image_result_formatter])

agent.input("Take a screenshot and describe what you see")
# Formatted 'take_screenshot' result as image
# Agent can now see and analyze the image visually
```

**Supported Formats:** PNG, JPEG/JPG, WebP, GIF

**Use Cases:**
- Screenshot tools
- Image generation tools
- Camera/webcam capture
- PDF to image conversion

## shell_approval

Prompts for user approval before executing shell commands.

```python
from connectonion import Agent, Shell
from connectonion.useful_plugins import shell_approval

shell = Shell()
agent = Agent("assistant", tools=[shell], plugins=[shell_approval])

agent.input("Clean up temp files")
# Shell Command: rm -rf /tmp/test
# Execute this command?
#   > Yes, execute
#     Auto approve 'rm' in this session
#     No, tell agent what I want
```

**Safe Commands (Auto-approved):** ls, cat, head, tail, grep, find, pwd, echo, date, git status, git log, git diff...

**Approval Options:**
- **Yes, execute** - Run once
- **Auto approve** - Auto-approve this command type for session
- **No** - Provide feedback to agent

## Next Steps

- [Plugin System](/plugin) - Learn how to create custom plugins
- [Events](/on_events) - Available event hooks
