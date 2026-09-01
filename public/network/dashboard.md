# Dashboard — your agent's Home page

Every hosted agent can have a **Home page**: a single file, `dashboard.html`, in the
project root. A chat client renders it beside the conversation, so opening your agent
shows something useful before you type anything.

> **Preview architecture:** Full Web Control Center keeps HTML as the authoring
> surface but expands it into a complete,
> multi-file Web app. An independently reviewed, content-addressed build is served
> over HTTPS in a cross-origin iframe, so ordinary JavaScript, modules, frameworks,
> assets, storage, Workers, Canvas/WebGL/WASM, and network APIs work normally.
> `co create` and `co init` now scaffold its editable source in
> `.co/control-center/`; upload, immutable hosting, independent review, and Host
> activation are still preview work. `.co/dashboard.html` remains the
> backwards-compatible locked-down path described on this page.

```
my-agent/
├── agent.py
├── dashboard.html      ← the Home page
└── .co/
```

The browser can't read a file inside your agent's container, so the Host reads
`dashboard.html` and sends it over the WebSocket the client is already authenticated
on. There's no extra endpoint, no build step, and no sidecar JSON.

## It starts working on its own

The first time you run `host()`, if there's no `dashboard.html`, ConnectOnion writes a
starter one: your agent's name, and up to four of its skills as one-click buttons.

```python
from connectonion import Agent
from connectonion.network import host

host(lambda: Agent("lisa", tools=[...]))
# → Created dashboard.html — your agent's Home page.
```

After that the file is yours. ConnectOnion never overwrites it.

## Editing it

`dashboard.html` is a plain HTML file — edit it with any editor. Or ask the agent: the
built-in `dashboard` skill teaches it the file's contract.

```
/dashboard put this week's numbers on my home page
```

Write plain HTML and inline CSS. Two constraints, both enforced by the client's
sandbox rather than by convention:

- **No scripting.** `<script>` tags and inline `onclick` handlers are stripped by a
  Content-Security-Policy. Action buttons (below) are the only way to make something
  happen.
- **No external URLs.** No CDN stylesheets, no remote images, no fonts from the
  network. Inline your styles and use `data:` URIs for images.
- **No links out.** A Home page is one self-contained page. A client cancels clicks
  on `<a href="https://…">`, so such a link renders as dead text — use a
  `data-ochat-skill` button when you want the user to *do* something. Same-page
  anchors (`href="#section"`) work normally.

Keep it under **2MB**. The Host won't send a larger file, and the Home pane goes
blank. Inline images are base64, which is ~33% larger than the source file — compress
screenshots before embedding them.

> **Why so locked down?** The client renders your `dashboard.html` in a sandboxed
> iframe with a strict Content-Security-Policy, because from its side the file is
> untrusted, agent-authored HTML. Everything above follows from that: nothing loads
> from the network, nothing scripts, and nothing navigates away. A Home page is a
> glanceable, self-contained page whose one action is running a skill.
>
> Supporting external links later is a deliberate change to that contract, not a
> setting — it means deciding what a dashboard may navigate to and how (in-sandbox,
> where the destination still can't be trusted, or handed to a real browser tab).
> Until then, treat the page as a closed surface.

## Action buttons

A button that runs something declares the skill it runs:

```html
<button data-ochat-skill="daily-brief">Build today's brief</button>
```

Clicking it runs `/daily-brief` as a visible turn in the chat — the same as typing it.
Arguments are optional:

```html
<button data-ochat-skill="meeting-prep" data-ochat-args="2pm sync">
  Prepare my next meeting
</button>
```

**Only project skills work as buttons** — the ones in `.co/skills/` or
`.claude/skills/`. Your personal skills (`~/.co/skills/`) and ConnectOnion's builtin
skills aren't published to clients, so a button naming one renders but silently
refuses to run. The starter dashboard follows this rule automatically; if you hand-write
a button, check the skill's location first.

The client validates every button name against the skills your agent published, so a
button can only ever start a skill you actually have.

### Full Web Control Center buttons

The preview app runtime replaces HTML data attributes with a typed `MessageChannel`
SDK. `sendMessage` and `runSkill` still become visible, attributable user turns rather
than invisible side effects. They target the current Agent conversation by default:
an invoice button and the user's follow-up therefore share context. On the Agent
landing page, the first action creates that conversation. A product opens another
chat only when it explicitly requests `conversation: "new"`.

The iframe never opens a second Agent connection. O Chat owns the authenticated React
SDK session, checks that a requested skill is published, and returns a correlated
acknowledgement with the resulting session ID. Host trust, approval, and permission
rules continue to govern the turn.

The default full-Web template receives the authenticated skill list and creates its
buttons dynamically. Its message form requests `send_message`; each skill button
requests `run_skill`. This means invoice and other project skills work without being
hard-coded into the template.

The iframe `src` is exactly `CONTROL_CENTER_APP.app.url`. The test fixture
`https://control-center.e2e.test/invoices/` is deliberately not a live website. The
intended production shape is:

```text
https://apps.openonion.ai/<agent-address>/<sha256-revision>/index.html
```

The upload service must create that immutable URL and an independent reviewer must
approve the same revision. Until those services land, do not hand-author an
`"approved"` descriptor; released clients continue to use the legacy snapshot.

## When it updates

The Host sends the file at two moments:

| When | Why |
|------|-----|
| On connect, right after `CONNECTED` | Home paints before the first message |
| After each run, right after `OUTPUT` | A run that rewrote the dashboard shows the new version |

The post-run send is skipped when the file hasn't changed since that connection last
saw it, so an unchanged Home costs nothing per turn. Nothing is polled and nothing
watches the filesystem — if you edit `dashboard.html` by hand while a client is
connected, the change shows up after the next run.

An agent with no `dashboard.html` sends nothing, and clients simply show no Home pane.

## Wire format

One frame, client-opaque to the relay:

```json
{
  "type": "DASHBOARD_SNAPSHOT",
  "html": "<!DOCTYPE html>…",
  "session_id": "550e8400-…"
}
```

See [websocket-protocol.md](websocket-protocol.md) for the full frame reference.

## Reference

`connectonion/network/host/ws_router/dashboard.py`:

| Function | Purpose |
|----------|---------|
| `read_dashboard_snapshot(session_id=None)` | Build the frame, or `None` if the file is missing, too large, unreadable, or not UTF-8 |
| `send_dashboard(send_msg, session_id, conn=None)` | Send it unless this connection already has the current file; reads off the event loop |
| `ensure_dashboard(agent_metadata, project_dir=None)` | Write the starter if absent, and anchor the directory later reads resolve against |
| `render_starter(agent_metadata)` | The day-zero HTML |
| `MAX_DASHBOARD_BYTES` | 2MB size cap |

The path is resolved against the project directory captured at host startup, not the
live working directory — so a tool that changes directories mid-run can't redirect
which file gets served.

## See also

- [host.md](host.md) — making an agent network-accessible
- [websocket-protocol.md](websocket-protocol.md) — the full protocol
- [../features/skills.md](../features/skills.md) — skills and their locations
