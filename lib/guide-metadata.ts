import type { Metadata } from 'next'
import { getGuide } from './guides'

export function guideMetadata(slug: string): Metadata {
  const g = getGuide(slug)
  const url = `https://docs.connectonion.com/guides/${slug}`
  return {
    title: { absolute: g.seoTitle },
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: url },
    openGraph: { title: g.title, description: g.description, url, type: 'article' },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description },
  }
}
