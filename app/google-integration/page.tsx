'use client'

import Link from 'next/link'
import { CommandBlock } from '../../components/CommandBlock'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'

const services = [
  ['co gmail', 'Gmail', 'gmail.readonly, gmail.send, gmail.modify', '/cli/gmail'],
  ['co gdrive', 'GDrive', 'drive', '/cli/gdrive'],
  ['co gcalendar', 'GoogleCalendar', 'calendar', '/cli/gcalendar.md'],
  ['co youtube', 'YouTube', 'youtube', '/cli/youtube.md'],
]

export default function GoogleIntegrationPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-gray-900">
      <header className="space-y-4">
        <Link href="/">Docs</Link>
        <h1 className="heading-1">One local Google login</h1>
        <p>Gmail, Drive, Calendar and YouTube share one consent flow and one locally saved login.</p>
        <p className="rounded-lg border p-4">1.8.3 candidate documentation. The package is being prepared, not announced as published.</p>
        <CopyMarkdownButton markdownPath="/integrations/google.md" filename="google.md" />
      </header>
      <section className="space-y-4">
        <h2 className="heading-2">Connect and choose a tool</h2>
        <CommandBlock commands={['co auth', 'co auth google', 'co gmail inbox', 'co gdrive list', 'co gcalendar list', 'co youtube channel']} />
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr><th className="p-3">CLI</th><th className="p-3">Python</th><th className="p-3">Default scopes</th></tr></thead>
            <tbody>{services.map(([cli, python, scopes, href]) => (
              <tr key={cli} className="border-t"><td className="p-3"><Link href={href} className="underline">{cli}</Link></td><td className="p-3">{python}</td><td className="p-3">{scopes}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <p>Identity also requests userinfo.email and userinfo.profile. These are broad permissions for supported services, not every Google API. Actual granted scopes are saved; declined permissions are never assumed.</p>
        <CommandBlock commands={['co auth google --scopes youtube.readonly']} />
      </section>
      <section className="space-y-4">
        <h2 className="heading-2">Credentials stay on this computer</h2>
        <p>The CLI creates an ephemeral key and a loopback callback. The broker exchanges the Google code, seals the credential bundle for that key, and sends it directly to the CLI. No Google credential row or scope column is written.</p>
        <p>Access token, refresh token, expiry, scopes and account email are saved in ~/.co/keys.env, or AGENT_CONFIG_PATH/keys.env, with owner-only permissions. An existing project .env is updated too. Cancellation preserves the prior login.</p>
        <p>Refresh sends the local refresh token over TLS to the stateless broker. The Google application secret stays server-side; user tokens exist there transiently during exchange, not as durable credentials. Content requests go directly from the computer to Google.</p>
      </section>
      <section className="space-y-4">
        <h2 className="heading-2">Review before writing</h2>
        <p>Calendar mutations preview locally until --yes. YouTube uploads and metadata edits require the exact preview digest with --confirm. Gmail draft send asks for confirmation. Direct Gmail send/reply and Drive writes execute immediately, so invoke them only for an approved action.</p>
        <p>Calendar uses the primary calendar; free slots cover 09:00–17:00 UTC, not other attendees. YouTube reads metadata, not video bytes. Consent does not prove upload approval, processing or quota. TikTok is not included.</p>
      </section>
      <section className="space-y-4">
        <h2 className="heading-2">Upgrade and recover</h2>
        <p>The broker needs the matching local-token CLI. Older polling and bodyless-refresh clients must upgrade. Existing database rows are untouched, not migrated or reset; existing local refresh tokens remain usable.</p>
        <CommandBlock commands={['co status', 'co auth google']} />
        <p>Keep the browser and CLI on the same computer. Consent waits up to five minutes. Never print token files. To revoke, use Google Account permissions and remove local GOOGLE_* entries; a dashboard cannot erase credentials from this computer.</p>
      </section>
      <ContentNavigation />
    </main>
  )
}
