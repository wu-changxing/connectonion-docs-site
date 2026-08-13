# co ai

AI coding agent that works in your project — in the terminal, via web chat, or through an ACP client.

## Quick Start

```bash
co ai
```

Opens a web chat at `chat.openonion.ai` connected to a coding agent running locally. The agent can read and edit your project files, run shell commands, manage tasks, and more.

## Three Modes

### Web Server Mode (default)

```bash
co ai
```

- Starts an agent server on `localhost:8000`
- Opens `chat.openonion.ai/{your-address}` in your browser
- You chat with the agent through the web UI
- Agent runs in your project directory

#### Delegate to Claude Code

In the 1.7 preview implementation, `co ai` can call the installed Claude Code
CLI as one peer tool and resume its session. O Chat receives Claude's inner
Read, Edit, and Bash activity as live tool cards while the parent agent owns
the final review.

The cards provide visibility, not extra authority. Delegated runs use Claude's
safe mode, which disables ordinary project and user customizations while
preserving authentication and admin policy. The launch directory stays inside
the operator-bound project root; an unmatched interactive permission prompt
cannot yet round-trip through O Chat and fails closed. Read the [stream-json
design decision](/blog/stream-claude-code-tools-to-web).

### One-Shot Mode

```bash
co ai "Create a calculator tool"
co ai "Fix the failing test in tests/unit/test_agent.py"
co ai "Refactor agent.py to use the new event system"
```

Runs the prompt, prints the result, and exits. No server started.

### ACP Mode

```bash
co ai --acp
```

Serves Agent Client Protocol JSON-RPC over stdin/stdout for compatible editors and clients. Each ACP session owns one persistent coding agent, so later prompts reuse its conversation and tool state.

For automation or concurrent acceptance tests, isolate one process's mutable
state explicitly:

```bash
co ai --acp --state-dir /private/tmp/co-acp-test
```

The selected directory owns that process's ACP snapshots, Agent logs, and eval
records. It does not copy credentials or create another identity: the Agent
name and provider configuration still come from the normal global setup. POSIX
directories are private at mode `0700`, symlink roots are rejected, and the
default remains `~/.co` when the option is absent. `--state-dir` is ACP-only in
this first slice.

Session updates preserve Agent event order: thinking, tool starts, tool results, and the final assistant answer. JSON-native tool arguments and supported results remain structured in ACP `rawInput` and `rawOutput`. Turn usage and stop reasons come from the Agent's structured terminal record.

Cancellation is cooperative, and late events from a retired turn are not forwarded into a later prompt. The final assistant answer is currently one ACP chunk rather than live token streaming.

Safe mode continues to use ConnectOnion's existing tool policy. When a sensitive call needs human approval, the ACP client receives `session/request_permission` with choices to allow that call, allow for the current session, or reject the turn. Session grants persist only after a successful prompt commit and can be restored with that session. Cancellation, close, stdio EOF, client errors, malformed responses, and late replies all fail closed.

#### Session modes and authority

| Mode | Behavior |
|------|----------|
| Safe | Ask before tools with side effects |
| Auto | Apply file edits automatically; ask before other risky tools |
| ULW | Skip approvals for a bounded number of autonomous turns |

Safe and Auto are always available through ACP `session/set_mode`, and the committed mode survives close and resume. Mode changes are idle-only: if a prompt is running, wait for it to finish and retry.

ULW is advertised and accepted only when the operator starts the server with launch-time authority:

```bash
co ai --acp --yolo --yolo-turns 20
```

The client cannot grant itself ULW. A resumed ULW session must also fit within the new process's remaining-turn ceiling; malformed or over-authorized saved state is rejected instead of silently downgraded.

#### Connect an ACP host

ConnectOnion is the ACP agent. Editors such as Zed and JetBrains are clients that start it as a local subprocess. Make sure `co` is on the editor's PATH and run `co auth login` first when using managed models.

**Zed:** Open Agent Settings, add a custom agent, then replace the generated entry:

```json
{
  "agent_servers": {
    "ConnectOnion": {
      "type": "custom",
      "command": "co",
      "args": ["ai", "--acp"],
      "env": {}
    }
  }
}
```

This default command does not grant MCP process-launch authority, so disable every server under Settings → AI → MCP Servers. To forward configured servers deliberately, add `"--acp-mcp"` to `args`. Use `dev: open acp logs` in Zed to inspect protocol traffic. See [Zed External Agents](https://zed.dev/docs/ai/external-agents).

**JetBrains:** In AI Chat, choose Add Custom Agent and put this entry in `acp.json`:

```json
{
  "default_mcp_settings": {
    "use_idea_mcp": false,
    "use_custom_mcp": false
  },
  "agent_servers": {
    "ConnectOnion": {
      "command": "co",
      "args": ["ai", "--acp"],
      "env": {}
    }
  }
}
```

The safe default is to keep both MCP forwarding settings false. To enable them deliberately, add `"--acp-mcp"` after `"--acp"` in `args`, then opt in to the required JetBrains MCP settings. See [JetBrains: ACP configuration](https://www.jetbrains.com/help/ai-assistant/acp.html). If a desktop app cannot find your shell PATH, use the absolute path returned by `which co` as `command`.

MCP forwarding is disabled by default because an ACP-provided stdio server can launch a local process. With `--acp-mcp`, ConnectOnion accepts at most eight stdio servers whose commands are absolute paths; HTTP, SSE, and ACP-transport servers are rejected. Server tools still pass through the normal approval hook, and client-granted approvals expire when the MCP process pool closes. Resume requires the full server list again and does not restore client-granted approvals.

#### Compatibility and known limitations

| Boundary | Status | Notes |
|----------|--------|-------|
| Protocol and SDK | Tested | ACP `protocolVersion` 1 with Python SDK `>=0.12,<0.13` |
| Local stdio | Tested in CI | Official typed client plus raw framing, EOF, cancellation, resume, modes, and approvals |
| Zed / JetBrains | Custom-agent setup | Uses the local stdio command above; editor GUI binaries are not run in CI |
| Claude Code / Codex | Peer agents | They are not ACP clients that launch ConnectOnion |
| Additional directories | Not yet supported | Non-empty requests fail explicitly instead of being ignored |
| MCP servers | Opt-in stdio | Disabled by default; `--acp-mcp` accepts bounded, session-scoped stdio servers with absolute commands |
| Prompt content | Text and resource links | Links are passed as labeled references, not fetched automatically; image, audio, and embedded resources are not yet accepted |

The test claim is deliberately narrower than “works everywhere”: CI runs the production stdio adapter against the official ACP client SDK, while the Zed and JetBrains steps above are editor smoke paths.

## Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--acp` | — | off | Serve ACP JSON-RPC over stdin/stdout |
| `--acp-mcp` | — | off | With `--acp`, allow session-scoped stdio MCP launches |
| `--state-dir` | — | `~/.co` | With `--acp`, isolate mutable session, log, and eval state |
| `--yolo` | — | off | Authorize bounded ULW mode and skip tool approvals |
| `--yolo-turns` | — | `100` | Autonomous-turn ceiling when `--yolo` is enabled |
| `--port` | `-p` | `8000` | Port for web server |
| `--model` | `-m` | `co/claude-opus-4-5` | LLM model to use |
| `--max-iterations` | `-i` | `100` | Max tool iterations per turn |

```bash
co ai --port 9000
co ai --model co/gemini-2.5-pro
co ai --acp --state-dir /private/tmp/co-acp-test
co ai --acp --yolo --yolo-turns 20
co ai "Build an agent" --model co/gpt-4o --max-iterations 50
```

## What the Agent Can Do

The agent has a full suite of tools for coding tasks:

**File operations**
- Read, search (glob, grep), edit, and write files

**Shell**
- Run bash commands (with approval flow for destructive operations)

**Planning**
- Enter plan mode, write plans, exit and implement

**Task management**
- Create and track todos, run background tasks, get task output

**Skills**
- Load and run user-defined skills from `~/.claude/skills/`

## Project Context

When started, the agent automatically loads context from your project:

1. `.co/OO.md` — project-specific instructions (primary)
2. `CLAUDE.md` — Claude Code compatibility
3. `README.md` — project overview (truncated at 5000 chars)
4. Available skills from `~/.claude/skills/`
5. Git status — branch, uncommitted changes, recent commits
6. Working directory and current date

This means the agent understands your project without you having to explain it.

## Project Instructions

Create `.co/OO.md` in your project to give the agent persistent instructions:

```bash
mkdir -p .co
cat > .co/OO.md << 'EOF'
Always run tests before committing.
Use snake_case for function names.
The main entry point is src/main.py.
EOF
```

This is loaded every session, so the agent always follows your rules.

## Identity & Logs

`co ai` uses your global identity from `~/.co/`:

- Logs saved to `~/.co/logs/oo.log`
- Eval sessions saved to `~/.co/evals/`
- Same address across all `co ai` sessions

## Examples

```bash
# Start web chat
co ai

# Add a feature
co ai "Add rate limiting to the API endpoint in oo-api/routes/llm.py"

# Fix a bug
co ai "The test test_agent_loop is failing, investigate and fix it"

# Use a different model
co ai --model co/gemini-2.5-pro

# Run on a different port
co ai --port 9000
```

## Web Chat vs Terminal

| | Web Chat (`co ai`) | Terminal (`co ai "..."`) |
|--|-------------------|--------------------------|
| Interaction | Conversational, multi-turn | One-shot, exits after |
| Best for | Extended coding sessions | Quick tasks, scripting |
| Output | Web UI | Printed to stdout |
| Server | Runs on localhost | Not started |
