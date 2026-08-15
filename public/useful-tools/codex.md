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

## Why the native route is the adapter

ConnectOnion drives Codex's built-in app-server directly from Python. The
adapter preserves Codex session identity, sandbox selection, approvals, and
native tool events without introducing another browser or child-agent protocol.

```python
codex(
    prompt: str = "",
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

Omit `prompt` to create or resume the native thread without calling
`account/read` or `turn/start`; the result includes `opened: true`. This lets O
Chat open a real Work Room before the user has supplied work.

In `co ai`, explicit run/use/start/open Codex intent always selects this native
adapter. Executable Codex commands in shell chains, command substitutions,
package runners, and background wrappers are rejected before approval and
process creation. Searches and prose that only mention Codex remain allowed.

Codex inner steps use stable native `tool_call` and `tool_result` events. The
`@connectonion/react` connection layer maps those events to browser chat state;
O Chat renders the correlated provider invocation in its interactive Work Room
without a second protocol parser.
