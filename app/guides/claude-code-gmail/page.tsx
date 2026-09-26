import type { Metadata } from 'next'
import { GuideArticle } from '../../../components/guides/GuideArticle'
import { guideMetadata } from '../../../lib/guide-metadata'

export const metadata: Metadata = guideMetadata('claude-code-gmail')

export default function Page() {
  return <GuideArticle slug="claude-code-gmail" />
}
