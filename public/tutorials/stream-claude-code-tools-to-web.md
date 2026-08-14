# How co ai Streams Claude Code Tool Calls to the Web

*August 12, 2026 · Design Decision*

When a user asks `co ai` to delegate coding work to Claude Code, the web chat
should not go quiet until a final answer appears. It should show the files
Claude reads, the edits it makes, and the commands it runs, while ConnectOnion
remains the agent responsible for the plan and final review.

## The decision

Keep Claude Code as one ordinary `co ai` tool call, read its documented
`stream-json` events, and translate inner tool activity into the live cards O
Chat already understands.

## The user experience we are building

1. The user opens `co ai` and asks it to have Claude Code implement a bounded
   task.
2. The parent agent calls `claude_code` once. There is no ACP switch or second
   chat window.
3. O Chat shows one expandable Claude Code invocation card, with `Read`, `Edit`,
   and `Bash` activity nested inside it as those steps start and finish.
4. Claude returns one resumable result. The parent agent inspects the diff and
   tests, then answers the user.

```text
User → co ai → claude_code(task)
                    └─ Claude Code · Running
                       ├─ Read
                       ├─ Edit
                       ├─ Bash
                       └─ final result + session_id

             co ai reviews → User
```

## Why a normal tool is enough

ConnectOnion already has the useful boundary: an Agent decides to call a
function, and Agent IO delivers live tool events to terminal, WebSocket, and
React clients. The Claude adapter only has to translate the provider's event
shapes into that boundary. It does not need to turn the browser into a Claude
client or make ACP the internal execution model.

In the browser, `@connectonion/react` owns protocol decoding and typed session
state; O Chat renders that state. The standalone TypeScript SDK is retired, so
this feature does not add another frontend protocol implementation.

Each outer delegation receives a stable provider invocation ID correlated to
the parent ConnectOnion tool call. Claude tool-use IDs retain their `claude:`
namespace and carry that parent correlation, so React can rebuild one card
after reconnect without duplicating child steps. Unknown providers and older
events still render through the generic tool-card fallback.

## Why the provider is a plugin now

The original `co ai` wrapper proved the transport, but it was the wrong public
installation boundary: a third-party Agent would have to copy COAI policy to
get the same behavior. Alpha.2 therefore makes `CodexPlugin` and
`ClaudeCodePlugin` the operator-owned boundary. Each plugin registers its
model-callable tool while keeping workspace root, provider command, and
permission ceiling out of the model schema.

The browser receives one provider-neutral object with the parent tool-call ID,
provider, bounded task summary, status, elapsed time, child activity, and a
terminal result. React owns normalization and O Chat owns only the shared
collapsed/expanded presentation. Child thoughts never become a second
top-level author.

This candidate intentionally stops short of a session browser, persistent tabs,
or a general Agent graph. Those become justified only when users need durable
concurrent provider work rather than one linear delegated call.

## The options we considered

- **Final JSON only:** simple, but leaves the user staring at an opaque
  long-running call.
- **Claude Agent SDK in the same Python environment:** offers richer callbacks,
  but its current Python package requires MCP 1.x while ConnectOnion 1.7
  requires MCP 2.x.
- **ACP first:** useful when third-party clients need to drive ConnectOnion, but
  it solves a different direction from today's parent-agent delegation.
- **Claude Code stream-json:** provides the tool lifecycle we need through the
  installed, authenticated CLI without adding a conflicting Python dependency.

## What crosses the live boundary

Claude `tool_use` events become native tool starts. Matching `tool_result`
events complete or fail the same card. Duplicate starts are ignored, and an
out-of-order result gets a synthetic start so clients never receive an orphan
result.

Tool arguments and results are bounded before they reach the browser. Common
credential-shaped keys such as authorization, token, secret, cookie, and
password are redacted. Cancellation remains owned by the parent call:
interrupting the turn terminates Claude's process group and rejects late UI
events.

## Seeing a tool is not approving a tool

Streaming shows what Claude is doing. It does not grant permission to do it.
Safe, Accept Edits, and explicit autonomous modes are still selected by operator
policy before launch, and `co ai` never selects Claude's bypass-permissions
mode.

Delegated runs use Claude's `--safe-mode`. It disables ordinary `CLAUDE.md`,
skills, plugins, hooks, MCP servers, commands, and custom agents so local
customizations cannot raise the selected mode's authority. The parent prompt
carries relevant project instructions. The child receives only a small process
and locale environment plus Claude authentication variables, and its launch
directory must resolve inside the operator-bound workspace.

If headless Claude encounters an unmatched interactive permission prompt, this
first slice cannot send the question to O Chat and wait for the answer. It
fails closed. A future approval bridge needs a real request-response channel,
not a label placed on top of a tool event. Resume likewise accepts only the
exact canonical UUID returned by an earlier invocation, not Claude CLI's fuzzy
session search.

## Why we did not weaken MCP

On August 12, 2026, `claude-agent-sdk 0.2.136` declares `mcp>=1.23,<2` while
ConnectOnion 1.7 declares `mcp>=2,<3`. Those ranges cannot be installed together.
Downgrading the framework's protocol baseline for one provider callback would
spread risk across every ACP and MCP integration.

The documented CLI stream gives us the product's first priority—live tool
cards—without making that compromise. We will revisit the Agent SDK when it
supports MCP 2, or isolate it behind a separately versioned process if
interactive approval justifies that complexity.

## Why one ACP client is not one permission model

The generic `acp_agent` track is still useful: one typed client can drive
Claude Code, Codex, Gemini CLI, and future ACP agents. It remains a separate
downward edge rather than replacing the native Claude and Codex routes.
Exact-version adapters make protocol behavior reviewable, but the shared wire
format cannot guarantee that two engines interpret a permission label the same
way.

Provider support is also part of conformance. [Google stopped serving Gemini
CLI requests](https://github.com/google-gemini/gemini-cli/discussions/28017) for
individual OAuth accounts on June 18, 2026. We keep the exact Gemini ACP route
for API-key, Vertex, and enterprise Code Assist authentication, but a legacy
OAuth file is no longer a readiness signal. We will not substitute Antigravity
until it exposes a documented ACP entry point and passes the same version,
permission, environment, and real-provider review.

A controlled test of `codex-acp@1.1.14` proved the difference. ConnectOnion
selected its read-only mode under outer `deny`, then asked the child to run
`curl`. The child reached the network and returned HTTP 200 without sending
`session/request_permission`. The adapter maps read-only to Codex's
`on-request` policy; the native ConnectOnion Codex tool can select the stricter
approval-aware policy directly.

We therefore reject named Codex ACP under manual or deny before the adapter
starts. Only an explicit, operator-selected Full Access grant may choose that
generic route; ordinary work uses the native Codex tool. The `co ai` wrapper is
authorized only inside its local session and never enters shared remote EXEC
rules. Hosted non-admin requesters fail before a local child process is
constructed.

The same evidence rule applies to data crossing the edge. Stable child tool
IDs and bounded titles are useful browser activity. A child thought is not a
ConnectOnion-persisted thought, and a child plan is not the parent's canonical
TodoList. Raw child tool payloads, thoughts, and plans therefore stay out of
the ordinary parent event stream. `@connectonion/react` continues to own
browser decoding; O Chat renders the normalized result instead of implementing
another protocol parser.

We will revisit Codex manual and deny only when a pinned adapter passes real
conformance tests for file writes, shell execution, and outbound network
access. See [issue #900](https://github.com/openonion/connectonion/issues/900)
and the [ACP Agent contract](/useful-tools/acp-agent) for the current
preview-candidate boundary.

## Current status

The implementation is being prepared for a ConnectOnion 1.7 preview. Until the
linked feature is merged and included in a published preview, installed
packages keep their existing behavior. Follow
[issue #902](https://github.com/openonion/connectonion/issues/902) for
implementation and release evidence.

## Related resources

- [Claude Code headless mode](https://code.claude.com/docs/en/headless)
- [Claude Code streaming output](https://code.claude.com/docs/en/agent-sdk/streaming-output)
- [ACP Agent contract](https://docs.connectonion.com/useful-tools/acp-agent)
- [Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS](https://docs.connectonion.com/blog/alpha-beta-rc-before-lts)
