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
3. O Chat shows cards such as `Claude Code › Read`, `Claude Code › Edit`, and
   `Claude Code › Bash` as they start and finish.
4. Claude returns one resumable result. The parent agent inspects the diff and
   tests, then answers the user.

```text
User → co ai → claude_code(task)
                    ├─ Claude Code › Read
                    ├─ Claude Code › Edit
                    ├─ Claude Code › Bash
                    └─ final result + session_id

             co ai reviews → User
```

## Why a normal tool is enough

ConnectOnion already has the useful boundary: an Agent decides to call a
function, and Agent IO delivers live tool events to terminal, WebSocket, and
React clients. The Claude adapter only has to translate the provider's event
shapes into that boundary. It does not need to turn the browser into a Claude
client or make ACP the internal execution model.

Each Claude tool-use ID receives a `claude:` namespace so the start and result
share one stable card. Provider, child-session, and parent-tool metadata are
preserved. Current clients can render the cards flat; a later UI can group them
beneath the delegated call.

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

Headless Claude can run actions already allowed by that policy and local
settings. If it encounters an unmatched interactive permission prompt, this
first slice cannot send the question to O Chat and wait for the answer. It
fails closed. A future approval bridge needs a real request-response channel,
not a label placed on top of a tool event.

## Why we did not weaken MCP

On August 12, 2026, `claude-agent-sdk 0.2.136` declares `mcp>=1.23,<2` while
ConnectOnion 1.7 declares `mcp>=2,<3`. Those ranges cannot be installed together.
Downgrading the framework's protocol baseline for one provider callback would
spread risk across every ACP and MCP integration.

The documented CLI stream gives us the product's first priority—live tool
cards—without making that compromise. We will revisit the Agent SDK when it
supports MCP 2, or isolate it behind a separately versioned process if
interactive approval justifies that complexity.

## Current status

The implementation is being prepared for a ConnectOnion 1.7 preview. Until the
linked feature is merged and included in a published preview, installed
packages keep their existing behavior. Follow
[issue #902](https://github.com/openonion/connectonion/issues/902) for
implementation and release evidence.

## Related resources

- [Claude Code headless mode](https://code.claude.com/docs/en/headless)
- [Claude Code streaming output](https://code.claude.com/docs/en/agent-sdk/streaming-output)
- [Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS](https://docs.connectonion.com/blog/alpha-beta-rc-before-lts)
