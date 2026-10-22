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
            In opt-in preview 1.9.3rc13, REM archives its internal Codex calls to keep active
            history clear, while retaining trace IDs and explicit resume. Upkeep still uses
            launchd; this preview does not migrate to Codex App Scheduled.{' '}
            <Link href="/releases/1.9.3rc13" className="underline underline-offset-4">Read the preview limits →</Link>
          </p>
          <p className="mt-2">
            Every page a model writes is reviewed before it is saved: quotations must match their cited
            source, a second model audits cited claims on people, organisation and project pages, and
            the writer gets two repair turns before only the refuted sentences are removed. Contact
            details stay only when the mail shows they are the person&apos;s own. A refused page is
            retried once a day, three times at most on the same material.
          </p>
        </div>
      }
    />
  )
}
