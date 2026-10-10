> **Experimental, coming next.** `co handoff` is not in any ConnectOnion release
> yet ([#2351](https://github.com/openonion/connectonion/issues/2351)). This page
> follows the code on the branch that ships it; check `co handoff --help` once
> it is installed.

## The scenario: "hand this to Ody"

You have spent an hour with your Codex on a task. You decided things, you
rejected things, and you know why. Now Ody should carry on with it. You tell
your Codex:

> Hand the login token task to Ody.

Codex runs `co handoff send`. The draft comes from the session you are in: your
decisions, the options you rejected and why, and the exact words of the
discussion. You read the preview, and the handoff is sent only after you
approve it. On his machine Ody runs `co handoff inbox`, reads the handoff with
`show`, and `open` starts his own Codex session with it already loaded. He asks
"why not the other option?", gets an answer from what you sent, and carries on.
Nobody rewrites the background.

## Privacy: the preview is what leaves

- **Nothing is sent without `--yes`.** The first `send` only previews: the
  recipient, the source session, the summary, the decisions and the full
  excerpt. The draft is saved, and `--draft <id> --yes` sends exactly that file.
- **When an agent runs the command, you approve, not the agent.** The preview
  tells the agent to show it to you and send only after you approve.
- **Only the bundle leaves.** No files, no co rem pages, no other mail. Tool
  calls, tool output, reasoning, and whatever the client injects into the
  session (AGENTS.md, skill bodies) are not read at all.
- **Secrets are refused.** A bundle containing anything that looks like a
  credential, or the value of any KEY/TOKEN/SECRET/PASSWORD variable in your
  environment, is not sent.
- **The recipient can verify the copy.** A content hash covers the whole
  bundle.
- **Know where the excerpt goes.** One `llm_do` call, using your default model,
  drafts the summary from the excerpt. Opening a handoff runs one read-only
  seed turn in the recipient's own Codex or Claude Code.

## How it flows

Only the steps the first version implements:

```mermaid
sequenceDiagram
    actor Alice
    participant AC as Alice's Codex
    participant A as co handoff (Alice)
    participant M as Ody's agent mailbox
    participant B as co handoff (Ody)
    participant BC as Ody's Codex
    actor Ody
    Alice->>AC: Hand this task to Ody
    AC->>A: co handoff send ody "the login token task"
    A->>A: Read this session, draft with one llm_do call, scan for secrets
    A-->>Alice: Preview (draft saved; nothing sent)
    Alice->>AC: Approve
    AC->>A: co handoff send ody --draft <id> --yes
    A->>M: Deliver the bundle by agent mail
    Ody->>B: co handoff inbox / show <id>
    B->>M: Fetch and decode the bundle
    Ody->>B: co handoff open <id>
    B->>BC: Write HANDOFF.md, excerpt.md, bundle.json; one read-only seed turn
    BC-->>Ody: codex resume <session>
    Ody->>BC: Why not the other option? Continue the work
```

The full design in #2351 goes further: auto-approval grants, acceptance
policies on the recipient's side, replies that return to the sender, and native
Codex notifications. None of that is in this version; see **Not yet** at the
end of the reference below.

---
