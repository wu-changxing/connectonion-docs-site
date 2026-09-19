# co whatsapp

WhatsApp as an inbox, on a number a person already uses. A linked device sees
the groups that number is in, writes every message to a directory of files, and
answers only where it was addressed.

```bash
pip install 'connectonion[whatsapp]'
co whatsapp listen          # a QR code appears; scan it from the phone
```

Scan from **Settings → Linked devices**. Use a number dedicated to this, never
a personal one or an employee's main one — a linked device can read every chat
that number is in.

## The twelve verbs

```bash
co whatsapp listen                  # hold the connection, write the directory; Ctrl-C stops
co whatsapp receive                 # take the next message, print it as one JSON line
co whatsapp receive -t 300          # give up after 5 minutes (exit 124, like timeout(1))
co whatsapp send <chat> "text"      # prints the new message id
co whatsapp reply <id> "text"       # back to the chat that message came from
co whatsapp edit <id> "new text"    # replace the text of a message this account sent
co whatsapp delete <id>             # remove a message for everyone
co whatsapp done <id>               # took it, chose not to answer; don't bring it back
co whatsapp check                   # credentials, listener, connection; exit 3 on a problem
co whatsapp ls                      # unread: id, chat, sender, text
co whatsapp chats                   # conversations seen: chat id, kind, counts, last activity
co whatsapp log -f                  # every message ever received, one JSON line each
co whatsapp consume -- ./answer.sh  # the loop: receive, run the command, reply with its stdout
```

`co feishu` and `co lark` are the same verbs against those platforms, minus
`edit` and `delete` — see [Not everywhere yet](#not-everywhere-yet).

## Taking back what the bot said

An agent answering in a group gets things wrong in public. Without an undo the
only repair is a second message, which leaves the wrong one above it forever,
where the next person to scroll finds it first.

```bash
ID=$(co whatsapp send "$CHAT" "deploy finished at **14:02**")
co whatsapp edit "$ID" "deploy finished at **14:20**"    # same bubble, new text
co whatsapp delete "$ID"                                  # gone for everyone
```

Both take the id `send` and `reply` print, and find the chat themselves — the id
is the only string you keep.

- **`edit` is your own messages only.** WhatsApp stamps an edit as coming from
  you and the server checks it. Asking to edit a message you *received* says
  "no record of sending" rather than "no such message": the id is usually right
  and the assumption is what is wrong.
- **`delete` reaches further.** Your own message always; another member's when
  this account is an admin of that group. WhatsApp decides that, and gives its
  own reason when it refuses.

## Addressed, not merely present

A bot in a group sees everything and should answer almost none of it. A message
is for us when it `@`s us — **or when it quotes something we said**. A reply to
the bot is addressed to the bot, and that case contains no `@` anywhere.

Every received message carries `mentioned`, so a consumer never has to guess:

```json
{"id":"3EB0…","chat":"1203…@g.us","sender":"1261…@lid","sender_name":"aaronplus1996",
 "text":"@1327… look at the deploy","kind":"text","quoted":null,"mentioned":true,
 "at":"2026-09-19T01:04:43Z"}
```

`kind` says what arrived — `text`, `image`, `audio`, `document`, `sticker`,
`location`, `reaction` — so an empty `text` is distinguishable from someone
sending nothing. `quoted` carries the message being replied to, including its
text, so context does not have to be looked up.

## Your text is read as Markdown

The thing writing these messages is usually a model, and a model writes
Markdown. WhatsApp does not read Markdown: `**ready**` sent untranslated arrives
with the asterisks still attached.

| you write | it arrives as |
|---|---|
| `**ready**` | **ready** in bold |
| `*maybe*` | *maybe* in italic |
| `~~dropped~~` | dropped, struck through |
| `# Deploy failed` | **Deploy failed** in bold |
| `- one` | • one |
| `[the run](https://ci/42)` | the run: https://ci/42 |

Nothing inside a fenced block or `` `backticks` `` is touched — a code block is
literal, which is the point of one. `--plain` sends the characters exactly as
typed.

## Is it actually connected?

`check` answers two separate questions, because they are two claims:

```bash
$ co whatsapp check
✓ whatsapp configured · listener pid 83467 · 0 unread · ~/.co/inbox/whatsapp
✓ connected as 61410724095 since 2026-09-19T04:00:47Z
```

*Configured* is about this machine. *Connected* comes from the listener's own
record of its socket, with an account and a time, so it can be disagreed with.
A `connected` record left behind by a process that has since exited does not
become a green tick — it is read only while the pid that wrote it is the pid
holding the lock. Otherwise:

```
not connected: no listener is running, so nothing is arriving.
listener 13813 is running; it has not said whether its socket is up.
```

That second sentence is the one worth having: *I cannot tell* is a different
answer from *it is broken*, and `check` can now say it.

Exit codes are the same on every verb: `0` done, `1` the platform refused (its
own sentence is on stderr), `2` usage, `3` not configured or not connected,
`124` `receive -t N` saw nothing in N seconds.

## One connection per linked device

WhatsApp allows a single socket per linked device. A second process opening the
same session would take the connection away from the listener, so `send` hands
its text to the running listener and waits for the answer — and says so plainly
when no listener is running, rather than opening a second one and dropping the
first.

## Not everywhere yet

- **`edit` and `delete` are WhatsApp-only.** `co feishu edit` and `co lark edit`
  name the endpoints that exist for it (`PUT` and `DELETE` on
  `/im/v1/messages/<id>`) and say nobody has wired them up, so a missing feature
  never reads as a bad message id.
- **No sender allowlist yet** (planned for 1.9): a bot in a group answers anyone
  in that group who addresses it.
- **`chat_name` is not populated**: a group's subject needs an API call per
  group and is not kept in the local session.
- Media is recorded with its `kind` and caption; downloading attachments is not
  part of this command yet.

## Where it lives

```
~/.co/inbox/whatsapp/
├── session.db          # the linked device's key material — deleting it unlinks
├── new/                # queued messages, one file each
├── cur/                # taken, not yet answered
├── received.jsonl      # every message ever received
├── sent.jsonl          # what was sent, as it was sent
├── connection.json     # what the listener last said about its socket
└── log                 # the tool's own log
```

`sent.jsonl` records the text **as the platform received it**, not as it was
typed, so the log and the chat never disagree.
