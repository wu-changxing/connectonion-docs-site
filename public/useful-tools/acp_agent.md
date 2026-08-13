# acp_agent

Delegate one bounded task to Claude Code, Codex, Gemini CLI, or another
reviewed ACP agent through one typed client.

> Status: this tool accompanies ConnectOnion PR #901. It is planned for a later
> 1.7 preview and is not part of the current stable package or published
> preview until that PR is merged and released.

## One client, named engines

ConnectOnion is the ACP client and the selected coding engine is the child ACP
agent. The model may choose a reviewed engine name, prompt, working directory,
and prior session ID. Process commands, approval policy, and the workspace root
remain operator-owned.

```python
from connectonion import Agent
from connectonion.useful_tools import acp_agent

agent = Agent("lead", tools=[acp_agent])
agent.input("Ask Claude Code over ACP to inspect the failing tests")
```

## API

```python
acp_agent(
    prompt: str,
    engine: str = "",       # claude-code | codex | gemini
    session_id: str = "",   # exact ACP session to resume
    cwd: str = "",          # operator workspace or a descendant
    timeout: int = 600,
) -> str                    # bounded JSON envelope
```

Custom ACP commands use an operator-created `ACPAgent` instance. They are
intentionally absent from the model-facing function schema.

## Engine permission contract

| Engine | Route | Supported policy |
|---|---|---|
| `claude-code` | `claude-agent-acp@0.66.0` | manual, auto, deny |
| `codex` | `codex-acp@1.1.14` | explicit operator-selected auto only |
| `gemini` | `gemini --experimental-acp` | manual, auto, deny when advertised |

Real testing found that the pinned Codex adapter's read-only mode can run shell
and outbound network work without an ACP permission request. ConnectOnion
therefore rejects named Codex ACP under manual or deny before spawning it. Use
the native `codex` tool for approval-aware Codex work.

## Exact resume

```python
import json

first = json.loads(acp_agent("Inspect the tests", engine="claude-code"))
second = json.loads(acp_agent(
    "Now propose the smallest fix",
    engine="claude-code",
    session_id=first["session_id"],
))

assert second["resumed"] is True
```

A failed `session/load` never falls back to a fresh child session.
Authentication failures also return an explicit error; the tool does not
silently start a browser login flow.

## What reaches the parent and browser

- The bounded final child message and stable tool lifecycle IDs/titles cross
  the edge.
- Raw child tool inputs and outputs do not become ordinary progress events.
- Child thought chunks do not become persisted ConnectOnion thoughts.
- A child plan does not replace the parent agent's canonical TodoList.
- The React package owns browser protocol decoding; O Chat renders the
  normalized state.

## Workspace boundary, not an OS sandbox

The child working directory must resolve inside the operator-bound workspace,
including through symlinks. That limits launch-directory selection; hostile
child code still requires an operator-provided container or operating-system
sandbox.
