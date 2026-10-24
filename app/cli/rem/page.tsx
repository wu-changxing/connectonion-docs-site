import Link from 'next/link'
import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co rem CLI reference | ConnectOnion',
  description: 'Commands, source controls, progress, page review, and nightly upkeep for co rem.',
  alternates: { canonical: '/cli/rem' },
}

export default function Page() {
  return (
    <ReleaseCliGuide
      name="rem"
      intro={
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-950">
          <p>
            This guide covers the stable co rem release.{' '}
            <Link href="/rem" className="underline underline-offset-4">See the night-to-morning experience →</Link>
          </p>
          <p className="mt-2">
            Preview 1.9.3rc21 adds Codex Scheduled for eligible Macs. Keep Codex open
            and the computer awake.{' '}
            <Link href="/releases/1.9.3rc21" className="underline underline-offset-4">Setup and limits →</Link>
          </p>
          <details className="mt-3">
            <summary className="cursor-pointer font-medium">Native scheduling compatibility</summary>
            <p className="mt-2">
              rc21 uses Codex&apos;s legacy local registration. Registration in newer account storage
              has not passed REM&apos;s live acceptance. A saved task does not prove that its timer
              runs: check <code>co rem status</code> before relying on unattended upkeep.
              You can run <code>co rem sync</code> by hand meanwhile.
            </p>
          </details>
          <details className="mt-3">
            <summary className="cursor-pointer font-medium">How REM checks pages</summary>
            <p className="mt-2">
            Every page a model writes is reviewed before it is saved: quotations must match their cited
            source, a second model audits cited claims on people, organisation and project pages, and
            the writer gets two repair turns before only the refuted sentences are removed. Contact
            details stay only when the mail shows they are the person&apos;s own. A refused page is
            retried once a day, three times at most on the same material.
          </p>
          </details>
        </div>
      }
    />
  )
}
