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
      preview
      intro={
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-950">
          <p>
            This guide covers preview 1.9.7rc25. Levels 1–3 use Luna at medium effort;
            level 4 and independent investigation use Sol at low effort.{' '}
            <Link href="/releases/1.9.7rc25" className="underline underline-offset-4">Preview notes →</Link>
          </p>
          <p className="mt-2">
            Check <code>co rem status</code> before relying on unattended upkeep.{' '}
            <Link href="/rem" className="underline underline-offset-4">See the night-to-morning experience →</Link>
          </p>
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
