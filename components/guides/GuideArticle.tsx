import { GuideHeader } from './GuideHeader'
import { ContentNavigation } from '../ContentNavigation'
import { renderBlogMarkdown } from '../../lib/blog-content.mjs'
import { getGuide, guideMarkdown, GUIDES_UPDATED } from '../../lib/guides'

const BASE = 'https://docs.connectonion.com'

/** One guide: the answer first, then numbered steps, FAQ and related pages,
 *  with JSON-LD built from the same object as the visible text. */
export function GuideArticle({ slug }: { slug: string }) {
  const g = getGuide(slug)
  const md = guideMarkdown(g)
  const url = `${BASE}/guides/${g.slug}`
  const plain = (s: string) => s.replace(/`/g, '')
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: g.title,
        description: g.description,
        abstract: plain(g.answer),
        url,
        dateModified: GUIDES_UPDATED,
        inLanguage: 'en',
        keywords: g.keywords.join(', '),
        about: { '@type': 'SoftwareApplication', name: 'ConnectOnion', url: 'https://www.connectonion.com' },
        publisher: { '@type': 'Organization', name: 'OpenOnion', url: 'https://openonion.ai' },
      },
      {
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        name: g.title,
        description: plain(g.answer),
        tool: [{ '@type': 'HowToTool', name: 'ConnectOnion (pip install connectonion)' }],
        step: g.steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: plain(s.text) + (s.code ? ' ' + s.code.split('\n').filter((l) => !l.startsWith('#')).join('; ') : ''),
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: g.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Docs', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
          { '@type': 'ListItem', position: 3, name: g.title, item: url },
        ],
      },
    ],
  }
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <div className="max-w-4xl mx-auto min-w-0">
        <GuideHeader title={g.title} description={g.description} markdown={md} />
        <div className="blog-prose break-words" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(md.replace(/^# .*\n/, '')) }} />
        <p className="mt-10 text-sm text-gray-500">Updated {GUIDES_UPDATED}. Commands checked against ConnectOnion 1.8.8.</p>
        <ContentNavigation />
      </div>
    </div>
  )
}
