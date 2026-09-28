import Link from 'next/link'
import type { IconType } from 'react-icons'
import { SiClaude, SiDiscord, SiGmail, SiGooglecalendar, SiGooglechrome, SiGoogledrive, SiGooglemeet, SiOpenai, SiTelegram, SiWhatsapp, SiYoutube } from 'react-icons/si'
import { LuAtSign, LuBookOpen, LuBrain, LuClock, LuGlobe, LuHardDrive, LuKeyRound, LuMail, LuPackage, LuServer, LuWorkflow } from 'react-icons/lu'
import { PiMicrosoftOutlookLogoFill } from 'react-icons/pi'

type Connection = {
  name: string
  command: string
  href: string
  icon: IconType
  color: string
}

const GROUPS: { label: string; items: Connection[] }[] = [
  {
    label: 'identity & memory',
    items: [
      { name: '0x address', command: 'co init', href: '/cli/init', icon: LuAtSign, color: '#15803d' },
      { name: 'Agent mailbox', command: 'co email', href: '/cli/email', icon: LuMail, color: '#15803d' },
      { name: 'Memory', command: 'co wiki', href: '/cli/wiki', icon: LuBrain, color: '#15803d' },
      { name: 'Secrets', command: 'co env', href: '/cli/env', icon: LuKeyRound, color: '#15803d' },
    ],
  },
  {
    label: 'mail & calendar',
    items: [
      { name: 'Gmail', command: 'co gmail', href: '/cli/gmail', icon: SiGmail, color: '#EA4335' },
      { name: 'Outlook', command: 'co outlook', href: '/cli/outlook', icon: PiMicrosoftOutlookLogoFill, color: '#0078D4' },
      { name: 'Google Calendar', command: 'co gcalendar', href: '/cli/gcalendar', icon: SiGooglecalendar, color: '#4285F4' },
      { name: 'Google Meet', command: 'co gcalendar meet', href: '/cli/gcalendar', icon: SiGooglemeet, color: '#00897B' },
    ],
  },
  {
    label: 'chat apps',
    items: [
      { name: 'WhatsApp', command: 'co whatsapp', href: '/cli/whatsapp', icon: SiWhatsapp, color: '#128C7E' },
      { name: 'Telegram', command: 'co telegram', href: '/cli/telegram', icon: SiTelegram, color: '#0088CC' },
      { name: 'Discord', command: 'co discord', href: '/cli/discord', icon: SiDiscord, color: '#5865F2' },
      { name: 'SMS', command: 'co sms', href: '/cli/sms', icon: LuMail, color: '#15803d' },
    ],
  },
  {
    label: 'browser & files',
    items: [
      { name: 'Your Chrome', command: 'co browser', href: '/cli/browser-command', icon: SiGooglechrome, color: '#4285F4' },
      { name: 'Google Drive', command: 'co gdrive', href: '/cli/gdrive', icon: SiGoogledrive, color: '#188038' },
      { name: 'YouTube', command: 'co youtube', href: '/cli/youtube', icon: SiYoutube, color: '#FF0000' },
      { name: 'Synology NAS', command: 'co syno', href: '/cli/synology', icon: LuHardDrive, color: '#0086D1' },
    ],
  },
  {
    label: 'coding agents & skills',
    items: [
      { name: 'Claude Code', command: 'co claude', href: '/cli', icon: SiClaude, color: '#C15F3C' },
      { name: 'Codex', command: 'co skills link', href: '/cli/skills', icon: SiOpenai, color: '#0C1A11' },
      { name: 'Your skills', command: 'co skills', href: '/cli/skills', icon: LuBookOpen, color: '#15803d' },
      { name: 'Shared skills', command: 'co sub', href: '/cli/sub', icon: LuPackage, color: '#15803d' },
    ],
  },
  {
    label: 'agents & servers',
    items: [
      { name: 'Remote agents', command: 'co call', href: '/cli/call', icon: LuWorkflow, color: '#15803d' },
      { name: 'Your internet', command: 'co proxy', href: '/cli/proxy', icon: LuGlobe, color: '#15803d' },
      { name: 'Your servers', command: 'co server', href: '/cli/server', icon: LuServer, color: '#15803d' },
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
            {group.items.map(({ name, command, href, icon: Icon, color }) => (
              <li key={command}>
                <Link href={href} className="group flex h-full min-w-0 items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50 focus-visible:bg-gray-50">
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-md" style={{ color, backgroundColor: `color-mix(in srgb, ${color} 10%, white)` }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold leading-tight text-gray-900">{name}</span>
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
