import Link from 'next/link'
import type { IconType } from 'react-icons'
import { SiAnthropic, SiClaude, SiDiscord, SiGithub, SiGmail, SiGooglecalendar, SiGooglechrome, SiGoogledrive, SiGooglegemini, SiGooglemeet, SiLinear, SiOllama, SiOpenai, SiSlack, SiTelegram, SiTiktok, SiWhatsapp, SiX, SiYoutube } from 'react-icons/si'
import { LuAtSign, LuBird, LuBookOpen, LuBot, LuBrain, LuClipboardCheck, LuClock, LuCoins, LuCpu, LuFileDown, LuFlaskConical, LuGlobe, LuHardDrive, LuKeyRound, LuMail, LuMessageSquareText, LuMonitor, LuMousePointer2, LuNetwork, LuNotebook, LuPackage, LuSearch, LuServer, LuShieldCheck, LuTerminal } from 'react-icons/lu'
import { PiMicrosoftOutlookLogoFill, PiMicrosoftTeamsLogoFill } from 'react-icons/pi'

type Connection = {
  name: string
  command: string
  href: string
  icon: IconType
  color: string
  upcoming?: boolean
}

const GROUPS: { label: string; items: Connection[] }[] = [
  {
    label: 'identity & memory',
    items: [
      { name: '0x address', command: 'co init', href: '/cli/init', icon: LuAtSign, color: '#15803d' },
      { name: 'Agent mailbox', command: 'co email', href: '/cli/email', icon: LuMail, color: '#15803d' },
      { name: 'Memory', command: 'co rem', href: '/cli/rem', icon: LuBrain, color: '#15803d' },
      { name: 'Secrets', command: 'co env', href: '/cli/env', icon: LuKeyRound, color: '#15803d' },
      { name: 'Credits', command: 'co transfer', href: '/cli', icon: LuCoins, color: '#15803d' },
    ],
  },
  {
    label: 'mail, calendar & notes',
    items: [
      { name: 'Gmail', command: 'co gmail', href: '/cli/gmail', icon: SiGmail, color: '#EA4335' },
      { name: 'Outlook', command: 'co outlook', href: '/cli/outlook', icon: PiMicrosoftOutlookLogoFill, color: '#0078D4' },
      { name: 'Google Calendar', command: 'co gcalendar', href: '/cli/gcalendar', icon: SiGooglecalendar, color: '#4285F4' },
      { name: 'Google Meet', command: 'co gcalendar meet', href: '/cli/gcalendar', icon: SiGooglemeet, color: '#00897B' },
      { name: 'OneNote', command: 'co onenote', href: '/cli/onenote', icon: LuNotebook, color: '#7719AA' },
      { name: 'Teams meetings', command: 'co outlook calendar', href: '/cli/outlook', icon: PiMicrosoftTeamsLogoFill, color: '#5059C9' },
    ],
  },
  {
    label: 'chat apps',
    items: [
      { name: 'WhatsApp', command: 'co whatsapp', href: '/cli/whatsapp', icon: SiWhatsapp, color: '#128C7E' },
      { name: 'Telegram', command: 'co telegram', href: '/cli/telegram', icon: SiTelegram, color: '#0088CC' },
      { name: 'Discord', command: 'co discord', href: '/cli/discord', icon: SiDiscord, color: '#5865F2' },
      { name: 'Slack', command: 'co slack', href: '/cli/slack', icon: SiSlack, color: '#4A154B' },
      { name: 'Feishu', command: 'co feishu', href: '/cli/feishu', icon: LuBird, color: '#3370FF' },
      { name: 'Lark', command: 'co lark', href: '/cli/feishu', icon: LuBird, color: '#3370FF' },
      { name: 'SMS', command: 'co sms', href: '/cli/sms', icon: LuMessageSquareText, color: '#15803d' },
    ],
  },
  {
    label: 'browser & files',
    items: [
      { name: 'Your Chrome', command: 'co browser', href: '/cli/browser-command', icon: SiGooglechrome, color: '#4285F4' },
      { name: 'Remote browser', command: 'co remote-browser', href: '/cli/browser-command', icon: LuMonitor, color: '#15803d' },
      { name: 'Google Drive', command: 'co gdrive', href: '/cli/gdrive', icon: SiGoogledrive, color: '#188038' },
      { name: 'YouTube', command: 'co youtube', href: '/cli/youtube', icon: SiYoutube, color: '#FF0000' },
      { name: 'TikTok plans', command: 'co tiktok', href: '/cli/tiktok', icon: SiTiktok, color: '#24292F' },
      { name: 'Synology NAS', command: 'co syno', href: '/cli/synology', icon: LuHardDrive, color: '#0086D1' },
      { name: 'Web search', command: 'co search', href: '/cli/search', icon: LuSearch, color: '#15803d' },
      { name: 'Web fetch', command: 'co fetch', href: '/web-fetch', icon: LuFileDown, color: '#15803d' },
    ],
  },
  {
    label: 'issues & feedback',
    items: [
      { name: 'GitHub', command: 'co github', href: '/cli/github', icon: SiGithub, color: '#24292F', upcoming: true },
      { name: 'Linear', command: 'co linear', href: '/cli/linear', icon: SiLinear, color: '#5E6AD2' },
      { name: 'Canny', command: 'co canny', href: '/cli/canny', icon: LuMessageSquareText, color: '#525DF9' },
    ],
  },
  {
    label: 'coding agents',
    items: [
      { name: 'co ai', command: 'co ai', href: '/cli/ai', icon: LuBot, color: '#15803d' },
      { name: 'Claude Code', command: 'co claude', href: '/cli', icon: SiClaude, color: '#C15F3C' },
      { name: 'Codex', command: 'co skills link', href: '/cli/skills', icon: SiOpenai, color: '#0C1A11' },
      { name: 'Your skills', command: 'co skills', href: '/cli/skills', icon: LuBookOpen, color: '#15803d' },
      { name: 'Shared skills', command: 'co sub', href: '/cli/sub', icon: LuPackage, color: '#15803d' },
      { name: 'Evals', command: 'co eval', href: '/useful-plugins/eval', icon: LuFlaskConical, color: '#15803d' },
      { name: 'CLI audit', command: 'co audit', href: '/cli/audit', icon: LuClipboardCheck, color: '#15803d' },
      { name: 'Cursor', command: 'co skills discover', href: '/cli/skills', icon: LuMousePointer2, color: '#0C1A11' },
      { name: 'Kiro', command: 'co skills discover', href: '/cli/skills', icon: LuTerminal, color: '#9046FF' },
    ],
  },
  {
    label: 'models',
    items: [
      { name: 'Managed keys', command: 'co/… ($5 credit)', href: '/models', icon: LuKeyRound, color: '#15803d' },
      { name: 'OpenAI', command: 'gpt-…', href: '/models', icon: SiOpenai, color: '#0C1A11' },
      { name: 'Anthropic', command: 'claude-…', href: '/models', icon: SiAnthropic, color: '#191919' },
      { name: 'Gemini', command: 'gemini-…', href: '/models', icon: SiGooglegemini, color: '#8E75B2' },
      { name: 'Mistral', command: 'mistral/…', href: '/models', icon: LuCpu, color: '#D9480F' },
      { name: 'Groq', command: 'groq/…', href: '/models', icon: LuCpu, color: '#D63C24' },
      { name: 'Grok', command: 'grok/…', href: '/models', icon: SiX, color: '#0C1A11' },
      { name: 'OpenRouter', command: 'openrouter/…', href: '/models', icon: LuNetwork, color: '#6467F2' },
      { name: 'Ollama (local)', command: 'ollama/…', href: '/models', icon: SiOllama, color: '#0C1A11' },
    ],
  },
  {
    label: 'agents & servers',
    items: [
      { name: 'Remote agents', command: 'co call', href: '/cli/call', icon: LuNetwork, color: '#15803d' },
      { name: 'Trust', command: 'co trust', href: '/features/trust', icon: LuShieldCheck, color: '#15803d' },
      { name: 'Your internet', command: 'co proxy', href: '/cli/proxy', icon: LuGlobe, color: '#15803d' },
      { name: 'Your servers', command: 'co deploy --to', href: '/cli/server', icon: LuServer, color: '#15803d' },
      { name: 'SSH', command: 'co server ssh', href: '/cli/server', icon: LuTerminal, color: '#15803d' },
      { name: 'Schedules', command: 'co schedule', href: '/cli/schedule', icon: LuClock, color: '#15803d' },
    ],
  },
]

export function CommandLogoWall() {
  return (
    <section aria-labelledby="connections-heading" className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h2 id="connections-heading" className="m-0 font-mono text-xs font-medium text-gray-700">$ co commands · one command per connection</h2>
        <Link href="/cli" className="font-mono text-xs font-medium text-green-700 hover:underline">Browse all commands →</Link>
      </div>
      {GROUPS.map((group) => (
        <div key={group.label} className="border-b border-gray-100 px-3 py-3 last:border-b-0 sm:px-4">
          <h3 className="mb-2 px-1 font-mono text-xs font-medium text-green-700"># {group.label}</h3>
          <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {group.items.map(({ name, command, href, icon: Icon, color, upcoming }) => (
              <li key={name}>
                <Link href={href} className="group flex h-full min-w-0 items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50 focus-visible:bg-gray-50">
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-md" style={{ color, backgroundColor: `color-mix(in srgb, ${color} 10%, white)` }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold leading-tight text-gray-900">{name}{upcoming && <span className="ml-1 text-[10px] font-normal text-amber-800">next preview</span>}</span>
                    <span className="block break-words font-mono text-[11px] leading-tight text-gray-600">{command}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
