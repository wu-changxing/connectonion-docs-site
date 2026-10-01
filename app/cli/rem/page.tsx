import Link from 'next/link'
import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co rem CLI reference for the opt-in preview | ConnectOnion',
  description: 'Commands, source controls, review steps, and limits for the opt-in co rem 1.9.0 preview. Read the exact release-synced CLI guide.',
  alternates: { canonical: '/cli/rem' },
}

export default function Page() {
  return (
    <ReleaseCliGuide
      name="rem"
      preview
      intro={
        <p className="mb-8 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-950">
          This guide is copied from the published preview tag.{' '}
          <Link href="/rem" className="underline underline-offset-4">See the night-to-morning experience →</Link>
        </p>
      }
    />
  )
}
