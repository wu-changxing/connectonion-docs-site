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

Session updates preserve Agent event order: thinking, tool starts, tool results, and the final assistant answer. JSON-native tool arguments and supported results remain structured in ACP `rawInput` and `rawOutput`. Turn usage and stop reasons come from the Agent's structured terminal record.

Cancellation is cooperative, and late events from a retired turn are not forwarded into a later prompt. The final assistant answer is currently one ACP chunk rather than live token streaming.

Safe mode continues to use ConnectOnion's existing tool policy. When a sensitive call needs human approval, the ACP client receives `session/request_permission` with choices to allow that call, allow for the current session, or reject the turn. Session grants persist only after a successful prompt commit and can be restored with that session. Cancellation, close, stdio EOF, client errors, malformed responses, and late replies all fail closed.

## Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--acp` | — | off | Serve ACP JSON-RPC over stdin/stdout |
| `--port` | `-p` | `8000` | Port for web server |
| `--model` | `-m` | `co/claude-opus-4-5` | LLM model to use |
| `--max-iterations` | `-i` | `100` | Max tool iterations per turn |

```bash
co ai --port 9000
co ai --model co/gemini-2.5-pro
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
