import type { Metadata } from 'next'
import { GuideArticle } from '../../../components/guides/GuideArticle'
import { guideMetadata } from '../../../lib/guide-metadata'

export const metadata: Metadata = guideMetadata('what-is-an-agent-cli-harness')

export default function Page() {
  return <GuideArticle slug="what-is-an-agent-cli-harness" />
}
