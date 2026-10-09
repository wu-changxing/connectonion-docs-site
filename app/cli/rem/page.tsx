import Link from 'next/link'
import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co rem CLI reference | ConnectOnion',
  description: 'Commands, source controls, progress, review steps, and nightly upkeep for co rem 1.9.1.',
  alternates: { canonical: '/cli/rem' },
}

export default function Page() {
  return (
    <ReleaseCliGuide
      name="rem"
      intro={
        <p className="mb-8 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-950">
          This guide covers the stable co rem release.{' '}
          <Link href="/rem" className="underline underline-offset-4">See the night-to-morning experience →</Link>
        </p>
      }
    />
  )
}
