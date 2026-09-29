import Link from 'next/link'
import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co wiki: a memory of your work, kept up to date | ConnectOnion",
  "description": "Experimental: a notebook about the people, projects and tools in your work, built and kept current from your mail and coding sessions.",
  "alternates": {
    "canonical": "/cli/wiki"
  }
}

export default function Page() {
  return (
    <ReleaseCliGuide
      name="wiki-help"
      intro={
        <p className="mb-8 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          co wiki becomes <strong>co rem</strong> in 1.9.0.{' '}
          <Link href="/rem" className="underline underline-offset-4">What co rem is, what it reads and what it costs →</Link>
        </p>
      }
    />
  )
}
