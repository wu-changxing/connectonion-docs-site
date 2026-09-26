import type { Metadata } from 'next'
import { GuideArticle } from '../../../components/guides/GuideArticle'
import { guideMetadata } from '../../../lib/guide-metadata'

export const metadata: Metadata = guideMetadata('ai-agent-whatsapp')

export default function Page() {
  return <GuideArticle slug="ai-agent-whatsapp" />
}
