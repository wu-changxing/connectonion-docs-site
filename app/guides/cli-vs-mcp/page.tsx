import type { Metadata } from 'next'
import { GuideArticle } from '../../../components/guides/GuideArticle'
import { guideMetadata } from '../../../lib/guide-metadata'

export const metadata: Metadata = guideMetadata('cli-vs-mcp')

export default function Page() {
  return <GuideArticle slug="cli-vs-mcp" />
}
