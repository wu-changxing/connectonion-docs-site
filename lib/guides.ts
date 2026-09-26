/**
 * Question-shaped guides: one page per thing people ask Google, Gemini or
 * ChatGPT about giving an agent real access. Each page answers in its first
 * paragraph, then shows the commands.
 *
 * One source per guide. The page, its JSON-LD (TechArticle + HowTo + FAQPage)
 * and its Copy-as-Markdown text all render from the object below, so Google's
 * rule that structured data must match visible content holds by construction.
 *
 * Every command and behaviour here is from the 1.8.8 CLI help or docs/cli in
 * the framework repo. Check `co <command> --help` before adding a claim.
 */

export type GuideStep = { name: string; text: string; code?: string }
export type Guide = {
  slug: string
  /** The question, as people type it. The page H1. */
  title: string
  /** <title> and og:title. Keyword-first, under ~60 characters. */
  seoTitle: string
  description: string
  /** The direct answer. First paragraph on the page; quoted by assistants. */
  answer: string
  steps: GuideStep[]
  faq: [string, string][]
  related: [string, string][]
  keywords: string[]
}

export const GUIDES_UPDATED = '2026-09-26'

export const GUIDES: Guide[] = [
  {
    slug: 'what-is-an-agent-cli-harness',
    title: 'What is an agent CLI harness?',
    seoTitle: 'What is an agent CLI harness? | ConnectOnion',
    description:
      'An agent CLI harness is a set of command-line tools an AI agent runs to reach email, chat apps, a browser, files and servers. How it works, and what ConnectOnion includes.',
    answer:
      'An agent CLI harness is a set of command-line tools that an AI agent runs to reach real services: email, chat apps, a browser, files and servers. Each capability is an ordinary shell command, so any agent that can run a shell can use it, including Claude Code, Codex and agents you build yourself. A person can run the same command to see exactly what the agent sees. ConnectOnion is an open-source agent CLI harness, and its commands all start with `co`.',
    steps: [
      {
        name: 'Install the harness',
        text: 'ConnectOnion is a Python package (3.10 or newer) that installs the `co` command.',
        code: 'pip install connectonion',
      },
      {
        name: 'Give the agent an identity',
        text: '`co init` creates a keypair and a 0x address, signs in to OpenOnion with $5 of model credit, and gives the agent a mailbox.',
        code: 'co init',
      },
      {
        name: 'Connect the services it needs',
        text: 'Each service is one command: `co auth google` for Gmail, Calendar and Drive, `co auth microsoft` for Outlook, `co whatsapp listen` for WhatsApp, `co browser` for a real browser.',
        code: 'co auth google\nco gmail inbox\nco browser go_to https://example.com',
      },
      {
        name: 'Hand it to your coding agent',
        text: '`co skills link` links ConnectOnion\'s bundled skills into Claude Code and Codex, so they know which `co` command to run.',
        code: 'co skills link',
      },
      {
        name: 'See everything it can do',
        text: '`co commands` prints every command and subcommand with a one-line summary. There are 42 top-level commands.',
        code: 'co commands',
      },
    ],
    faq: [
      [
        'Why commands instead of an SDK?',
        'A command works with any agent that has a shell, not only agents written in one language. Its output is text you can read, pipe and log, and you can run it yourself to check what the agent did. ConnectOnion also ships a Python SDK for building your own agent, and the SDK exposes the same capabilities as tools.',
      ],
      [
        'Which agents can use an agent CLI harness?',
        'Any agent that can run shell commands: Claude Code, Codex, Cursor and similar coding agents, ConnectOnion\'s own `co ai`, or a script. `co skills link` adds ConnectOnion\'s skills to Claude Code and Codex.',
      ],
      [
        'What does the ConnectOnion harness connect to?',
        'Gmail, Google Calendar, Meet, Drive and YouTube; Outlook mail, contacts, calendar and Teams meetings; WhatsApp, Telegram, Discord, Feishu, Lark and SMS; a real logged-in browser; a Synology NAS; remote agents; and servers you own. It also gives the agent its own address, mailbox and memory.',
      ],
      ['Is ConnectOnion open source?', 'Yes. It is Apache-2.0 licensed. The source is at github.com/openonion/connectonion and the package is on PyPI as connectonion.'],
    ],
    related: [
      ['All co commands', '/cli'],
      ['Quick Start', '/quickstart'],
      ['Give Claude Code access to Gmail', '/guides/claude-code-gmail'],
    ],
    keywords: ['agent CLI harness', 'AI agent CLI', 'CLI for AI agents', 'CLI is all you need', 'agent tools command line'],
  },
  {
    slug: 'claude-code-gmail',
    title: 'How to give Claude Code or Codex access to Gmail',
    seoTitle: 'Give Claude Code or Codex access to Gmail | ConnectOnion',
    description:
      'Connect Gmail to Claude Code or Codex in three commands: pip install connectonion, co auth google, co skills link. No Google Cloud project; credentials stay on your computer.',
    answer:
      'Install ConnectOnion, run `co auth google` to connect your Google account, then run `co skills link`. That links ConnectOnion\'s bundled skills, including co-google, into Claude Code and Codex. When you ask either agent about your mail, it can run `co gmail inbox`, `co gmail read` and `co gmail send` from its shell. You don\'t create a Google Cloud project, and the credentials are saved only on your computer.',
    steps: [
      {
        name: 'Install ConnectOnion and sign in',
        text: '`co init` creates your identity and signs in to OpenOnion, which the Google connection needs.',
        code: 'pip install connectonion\nco init',
      },
      {
        name: 'Connect your Google account',
        text: 'Consent runs through OpenOnion\'s Google app. The credentials come back encrypted to a one-time key your CLI generated. By default it asks for Gmail, Calendar, Drive and YouTube; pass `--scopes` to ask for less.',
        code: 'co auth google\n# Opening Google consent. Credentials will be saved only on this computer.\n# Google connected. Actual granted scopes saved locally. Next: co status',
      },
      {
        name: 'Link the skills into Claude Code and Codex',
        text: 'This links 30 bundled skills into both agents. co-google routes Google account work to the Gmail, Drive, Calendar and YouTube commands.',
        code: 'co skills link',
      },
      {
        name: 'Ask your agent',
        text: 'In Claude Code or Codex, ask something like "summarise my unread Gmail from today". The agent runs `co gmail` through its normal shell tool, so its usual command-approval settings apply.',
      },
      {
        name: 'Check it yourself',
        text: 'Every command the agent runs, you can run too. A row number needs the listing ID that `co gmail inbox` prints beside the rows.',
        code: 'co gmail inbox --unread\nco gmail read 3 --listing <listing-id>\nco gmail send alice@example.com "Hello" "Thanks for today."',
      },
    ],
    faq: [
      ['Does this work with Outlook too?', 'Yes. Run `co auth microsoft`, then the agent can use `co outlook inbox`, `co outlook read`, `co outlook send` and `co outlook calendar`.'],
      ['Where are the Gmail credentials stored?', 'In your global `~/.co/keys.env` by default, on your computer. To keep a project separate, put `--env-file /absolute/path/.env` before the command.'],
      ['Can I limit what the agent can access?', 'Yes. `co auth google --scopes` takes a comma-separated list of limited scopes instead of the default Gmail, Calendar, Drive and YouTube.'],
      ['Does it also work with Google Calendar and Drive?', 'Yes. The same login covers `co gcalendar` (events and Meet links) and `co gdrive` (list, search, download, upload).'],
      ['Do I need a Google Cloud project or OAuth client?', 'No. The consent runs through OpenOnion\'s Google app, so there is no cloud project, consent screen or verification review on your side.'],
    ],
    related: [
      ['co gmail reference', '/cli/gmail'],
      ['co skills reference', '/cli/skills'],
      ['Give any AI agent Gmail and Outlook', '/guides/ai-agent-gmail'],
    ],
    keywords: ['Claude Code Gmail', 'Codex Gmail', 'give Claude Code access to Gmail', 'Claude Code email', 'Gmail CLI for AI agents'],
  },
  {
    slug: 'ai-agent-gmail',
    title: 'How to give an AI agent access to Gmail and Outlook',
    seoTitle: 'Give an AI agent access to Gmail and Outlook | ConnectOnion',
    description:
      'Connect an AI agent to Gmail with co auth google or Outlook with co auth microsoft. No OAuth app to register; the agent reads, searches, sends and replies with co gmail and co outlook.',
    answer:
      'Run `co auth google` for Gmail or `co auth microsoft` for Outlook. The consent runs through OpenOnion\'s OAuth app, so you don\'t register an app of your own, and the credentials are saved only on your computer. After that, any agent that can run a shell uses `co gmail` or `co outlook` to list, read, search, send and reply. Both also cover the calendar.',
    steps: [
      { name: 'Install and sign in', text: 'Install the package and create the agent\'s identity.', code: 'pip install connectonion\nco init' },
      { name: 'Connect the account', text: 'Pick the provider. Each opens the provider\'s consent page once.', code: 'co auth google       # Gmail, Calendar, Drive, YouTube\nco auth microsoft    # Outlook mail, contacts, calendar' },
      {
        name: 'Read and search mail',
        text: 'Listings are numbered. To use a row number, pass the listing ID printed beside it.',
        code: 'co gmail inbox --unread\nco gmail search "from:billing@example.com newer_than:7d"\nco gmail read 2 --listing <listing-id>\nco outlook inbox\nco outlook search "invoice"',
      },
      {
        name: 'Send and reply',
        text: 'Outlook can schedule a send with `--at` and cancel it before it goes out.',
        code: 'co gmail send alice@example.com "Weekly report" "Attached." --attach report.pdf\nco gmail reply <message-id> "Thanks, on it."\nco outlook send bob@example.com "Tomorrow" "See you at 10." --at +2h',
      },
      { name: 'Use the calendar', text: 'The same logins cover Google Calendar (with Meet links) and the Outlook calendar (with Teams meetings).', code: 'co gcalendar today\nco gcalendar free 2026-09-28 --minutes 30\nco outlook calendar today' },
    ],
    faq: [
      ['Do I need to register an OAuth app?', 'No. `co auth google` and `co auth microsoft` use OpenOnion\'s OAuth apps. The credentials come back encrypted to a one-time key your CLI generated and are saved only on your computer.'],
      ['Can the agent draft without sending?', 'Yes. `co gmail draft create` makes an unsent draft, and `co gmail draft send` requires a review token or an interactive confirmation.'],
      ['How does an agent written in Python use it?', 'It can call the same `co` commands through a shell tool, or use ConnectOnion\'s Gmail and Outlook tools from the Python SDK.'],
      ['Can I use more than one Google account?', 'Yes. Credentials are saved to the selected env file. Put `--env-file /absolute/path/.env` before a command to use a project\'s own file.'],
    ],
    related: [
      ['co gmail reference', '/cli/gmail'],
      ['co outlook reference', '/cli/outlook'],
      ['co gcalendar reference', '/cli/gcalendar'],
      ['Give Claude Code access to Gmail', '/guides/claude-code-gmail'],
    ],
    keywords: ['AI agent Gmail', 'AI agent Outlook', 'Gmail API AI agent', 'connect AI agent to email', 'agent email automation'],
  },
  {
    slug: 'ai-agent-email-address',
    title: 'How to give an AI agent its own email address',
    seoTitle: 'Give an AI agent its own email address | ConnectOnion',
    description:
      'co init gives an AI agent its own mailbox at 0x…@mail.openonion.ai with no DNS records or email provider. Send with co email send, read with co email inbox, claim a readable name.',
    answer:
      'Run `co init`. The agent gets a keypair, a 0x address and a mailbox at `0x…@mail.openonion.ai`. The mailbox is hosted by OpenOnion, so you don\'t need an email provider account or any DNS records. The agent sends with `co email send` and reads with `co email inbox`. To get a readable address, `co email name <name> --buy` claims `name@openonion.ai` from your credits.',
    steps: [
      { name: 'Create the agent\'s identity', text: '`co init` generates the keypair and signs in, which activates the mailbox.', code: 'pip install connectonion\nco init' },
      { name: 'Find its address', text: '`co status` shows the agent address, its email address and the credit balance.', code: 'co status\n# │ Email: 0xcbef…@mail.openonion.ai' },
      { name: 'Send an email', text: 'Recipient, subject, body.', code: 'co email send alice@example.com "Hello" "Sent by my agent."' },
      { name: 'Read what arrives', text: 'Reading does not mark a message read unless you pass `--mark-read`.', code: 'co email inbox --unread\nco email read 42' },
      { name: 'Claim a readable name (optional)', text: 'Check whether a name is free and what it costs, then claim it. The charge comes from your OpenOnion credits.', code: 'co email name support\nco email name support --buy' },
    ],
    faq: [
      ['Do I need to set up DNS or an email provider?', 'No. The mailbox is an OpenOnion-hosted service, so there are no SPF, DKIM or MX records and no SendGrid or Resend account.'],
      ['Can people reply to the agent?', 'Yes. Replies arrive in the agent\'s inbox, where `co email inbox` lists them and `co email read` shows the body.'],
      ['Can another account use the same address?', 'Yes. `co email share` lets another account send and/or read as one of your addresses without moving it, and `co email unshare` revokes that.'],
      ['How is this different from connecting Gmail?', 'This is the agent\'s own address. Connecting Gmail with `co auth google` lets the agent work in your mailbox instead.'],
    ],
    related: [
      ['co email reference', '/cli/email'],
      ['Give an AI agent Gmail and Outlook', '/guides/ai-agent-gmail'],
    ],
    keywords: ['AI agent email address', 'email for AI agent', 'agent mailbox', 'AI agent send email without DNS', 'agent inbox'],
  },
  {
    slug: 'ai-agent-browser',
    title: 'How to give an AI agent a real, logged-in browser',
    seoTitle: 'Give an AI agent a logged-in browser | ConnectOnion',
    description:
      'co browser keeps one real Chrome open between commands. Log in by hand once, 2FA included, and every later command or co browser do task runs in that session. No Playwright script.',
    answer:
      'Use `co browser`. It keeps one real browser open between commands, using your system Chrome by default with a persistent profile. You log in to a site by hand once, including 2FA, and every later command runs in that logged-in session: `co browser go_to`, `co browser get_text`, `co browser take_screenshot`, or `co browser do "…"` to hand a whole task to an AI agent. You don\'t write a Playwright script.',
    steps: [
      { name: 'Open a page', text: 'The first command starts the browser. It is visible by default; add `--headless` for scripts.', code: 'pip install connectonion\nco browser go_to https://example.com' },
      { name: 'Log in by hand', text: 'Type the password and the 2FA code yourself in the window. The profile persists, so the login stays valid for later commands.' },
      { name: 'Read and act', text: '`co browser help` lists more than forty functions: clicking, typing, extracting, screenshots, uploads, network and cookies.', code: 'co browser get_text\nco browser click "the Export button"\nco browser take_screenshot page.png' },
      { name: 'Hand over a whole task', text: '`do` puts ConnectOnion\'s browser agent on the same live browser. It is billed to your OpenOnion account.', code: 'co browser do "export every overdue row to arrears.csv"' },
      { name: 'Share it between agents', text: 'Each agent opens its own tab and passes `-t` to every command, so several agents can use one browser without clashing.', code: 'co browser tab open research --who claude --for "pricing research"\nco browser -t research go_to https://example.com\nco browser tab ls' },
    ],
    faq: [
      ['Which browser does it use?', 'Your system Chrome by default, through Patchright, at no cost. A paid engine is optional with `--engine wtf`.'],
      ['Does the login survive between commands?', 'Yes. A daemon owns the browser and its profile is persistent, so cookies and logins carry over to later commands.'],
      ['Can Claude Code or Codex drive it?', 'Yes. `co skills link` links the co-browser skill into both, and they run `co browser` from their shell.'],
      ['Can I export the login?', 'Yes. `co browser save_state <path>` writes a portable Playwright storage_state JSON, and `co browser cookies save` saves the current site\'s cookies.'],
    ],
    related: [
      ['co browser reference', '/cli/browser-command'],
      ['co proxy (use your network)', '/cli/proxy'],
    ],
    keywords: ['AI agent browser', 'browser automation for AI agents', 'logged-in browser AI agent', 'Claude Code browser', 'Playwright alternative for agents'],
  },
  {
    slug: 'ai-agent-whatsapp',
    title: 'How to connect an AI agent to WhatsApp',
    seoTitle: 'Connect an AI agent to WhatsApp | ConnectOnion',
    description:
      'co whatsapp links a number as a companion device by QR, writes every message to ~/.co/inbox/whatsapp/, and lets an agent receive, reply and send from the command line.',
    answer:
      'Install the WhatsApp extra with `pip install \'connectonion[whatsapp]\'`, then run `co whatsapp listen` and scan the QR code from WhatsApp (Settings → Linked devices → Link a device). Every message is written to `~/.co/inbox/whatsapp/`. The agent takes the next message with `co whatsapp receive` and answers with `co whatsapp reply`. The linked device sees every chat on that number, so use a number meant for the agent.',
    steps: [
      { name: 'Install the WhatsApp extra', text: 'It needs the system library libmagic. If it is missing, the first `co whatsapp listen` stops and names the command for your platform.', code: "pip install 'connectonion[whatsapp]'" },
      { name: 'Link the number', text: 'A QR code appears in the terminal. On the phone: Settings → Linked devices → Link a device. The pairing is stored in `~/.co/inbox/whatsapp/session.db`.', code: 'co whatsapp listen' },
      { name: 'Check the setup', text: '`check` names anything missing: the extra, an unlinked device, or the listener.', code: 'co whatsapp check' },
      { name: 'Receive and reply', text: '`receive` prints the next message as one JSON line and takes it off the queue.', code: 'co whatsapp receive\nco whatsapp reply <message-id> "On it."\nco whatsapp send <chat> "Deploy finished."' },
      { name: 'Let an agent answer every message', text: '`consume` runs a command per message with the message on stdin and replies with its stdout.', code: 'co whatsapp consume -- claude -p' },
    ],
    faq: [
      ['Does the agent answer in groups?', 'A group message counts as addressed when it @-mentions the linked number, replies to something it said, or contains its number. Set `mention_only` on the channel and the agent answers only those; leave it off and it answers everything in the group.'],
      ['Is this the official WhatsApp Business API?', 'No. It links a companion device, the same mechanism as WhatsApp Web, so it sees every chat that number is in. Use a number meant for the agent.'],
      ['Can it edit or delete what it sent?', 'Yes. `co whatsapp edit` replaces the text of a message this account sent, `co whatsapp delete` deletes one for everyone, and `co whatsapp react` reacts to any message.'],
      ['Can it create groups?', 'Yes. `co whatsapp group create` starts a group with the people you name, and `co whatsapp group add` adds people to a group the account administers.'],
    ],
    related: [
      ['co whatsapp reference', '/cli/whatsapp'],
      ['Telegram, Discord, Feishu and SMS', '/guides/ai-agent-chat-apps'],
    ],
    keywords: ['AI agent WhatsApp', 'WhatsApp bot AI agent', 'connect Claude to WhatsApp', 'WhatsApp CLI', 'WhatsApp inbox agent'],
  },
  {
    slug: 'ai-agent-chat-apps',
    title: 'How to connect an AI agent to Telegram, Discord, Feishu or SMS',
    seoTitle: 'Connect an AI agent to Telegram, Discord, Feishu or SMS | ConnectOnion',
    description:
      'Each chat app becomes an inbox of files an agent reads with receive and answers with reply: co telegram, co discord, co feishu, co lark and co sms. The listeners dial out, so no public webhook.',
    answer:
      'Each chat app is one `co` command that turns a bot into an inbox of files: `co telegram`, `co discord`, `co feishu` (and `co lark`) and `co sms`. `listen` holds the connection and writes every message to `~/.co/inbox/`, `receive` hands the agent the next one as a JSON line, and `reply` answers it. The listeners dial out, so you don\'t host a webhook server or open a public endpoint.',
    steps: [
      { name: 'Telegram', text: 'Create a bot with @BotFather and put its token in `~/.co/keys.env` as `TELEGRAM_BOT_TOKEN`. Sending is stable; listen, receive and reply are experimental.', code: 'co telegram send 123456789 "The deployment needs attention"\nco telegram listen\nco telegram receive' },
      { name: 'Discord (experimental)', text: 'Create an application at discord.com/developers, add a bot and put its token in `~/.co/keys.env` as `DISCORD_BOT_TOKEN`. The listener uses Discord\'s Gateway, so no public endpoint.', code: 'co discord check\nco discord listen\nco discord receive' },
      { name: 'Feishu or Lark', text: '`co auth feishu` prints a QR code; scan it and the bot application is created in your own tenant. It uses the official SDK\'s long connection, so it runs behind NAT.', code: 'pip install lark-oapi\nco auth feishu\nco feishu listen' },
      { name: 'SMS', text: 'Pair an Android phone running OpenOnion Messages. The phone gets an upload-only credential; SMS are decrypted locally.', code: 'co sms pair\nco sms inbox --pending' },
      { name: 'Answer every message with an agent', text: 'Every inbox has the same verbs. `consume` runs a command per message and replies with its stdout.', code: 'co telegram consume -- claude -p\nco feishu consume -- claude -p' },
    ],
    faq: [
      ['Do I need a server or public URL?', 'No. The Telegram, Discord and Feishu listeners dial out to the platform, so they run on a laptop behind NAT.'],
      ['Does it use OpenOnion credits?', 'Telegram, Discord and Feishu call the platform directly with your own bot, so no OpenOnion credit or credential is involved.'],
      ['Which verbs are the same across apps?', '`listen`, `receive`, `send`, `reply`, `done`, `check`, `ls`, `chats`, `log` and `consume`, on Telegram, Discord, Feishu and Lark (and WhatsApp).'],
      ['Which parts are experimental?', '`co discord` as a whole, and Telegram\'s listen, receive and reply. Both were tested against fakes and not yet a live bot, and they say so in their help.'],
    ],
    related: [
      ['co telegram', '/cli/telegram'],
      ['co discord', '/cli/discord'],
      ['co feishu · co lark', '/cli/feishu'],
      ['co sms', '/cli/sms'],
      ['Connect an AI agent to WhatsApp', '/guides/ai-agent-whatsapp'],
    ],
    keywords: ['AI agent Telegram bot', 'AI agent Discord bot', 'Feishu bot AI agent', 'Lark bot', 'AI agent SMS', 'chat app AI agent CLI'],
  },
]

export function getGuide(slug: string): Guide {
  const g = GUIDES.find((x) => x.slug === slug)
  if (!g) throw new Error(`Unknown guide: ${slug}`)
  return g
}

/** The same guide as Markdown, for the Copy button and anyone who wants it. */
export function guideMarkdown(g: Guide): string {
  const out = [`# ${g.title}`, '', g.answer, '']
  g.steps.forEach((s, i) => {
    out.push(`## ${i + 1}. ${s.name}`, '', s.text, '')
    if (s.code) out.push('```bash', s.code, '```', '')
  })
  out.push('## FAQ', '')
  for (const [q, a] of g.faq) out.push(`### ${q}`, '', a, '')
  out.push('## Related', '')
  for (const [t, h] of g.related) out.push(`- [${t}](https://docs.connectonion.com${h})`)
  return out.join('\n') + '\n'
}
