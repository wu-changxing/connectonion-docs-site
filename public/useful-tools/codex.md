# codex

Drive the installed OpenAI Codex CLI through its native app-server protocol,
with exact resume, live tool activity, and per-action approval.

## Installation

```bash
npm install -g @openai/codex
codex login
```

## Quick start

```python
from connectonion import Agent
from connectonion.useful_tools import codex

agent = Agent("architect", tools=[codex])
agent.input("Ask Codex to fix the failing tests in ./myrepo")
```

## Why the native route remains preferred

ConnectOnion drives Codex's built-in app-server directly from Python. It does
not require the external Node ACP adapter, and it can select the stricter
approval-aware policy that the generic `codex-acp@1.1.14` modes do not expose.

```python
codex(
    prompt: str,
    session_id: str = "",
    cwd: str = "",
    sandbox: str = "workspace-write",
    model: str = "",
    timeout: int = 600,
    approval: str = "manual",
) -> str
```

The JSON result contains the provider, canonical session ID, resume state,
final message, usage when reported, exit code, and an `error` only when the run
failed. Reusing the exact session ID resumes the same Codex thread.

Codex inner steps use stable native `tool_call` and `tool_result` events. The
`@connectonion/react` connection layer maps those events to browser chat state;
O Chat renders it without a second protocol parser.
