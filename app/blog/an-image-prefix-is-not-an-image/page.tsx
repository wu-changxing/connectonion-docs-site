import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'An Image Prefix Is Not an Image'
const description = 'Why truncated data URLs remain ordinary tool text instead of becoming fatal image uploads.'
const canonicalPath = '/blog/an-image-prefix-is-not-an-image'
const articleMarkdown = `# ${title}\n\n${description}\n\nA DOM scan shortened an image source for readability. A text regex mistook the prefix for a complete screenshot, and decoding inside after_tools ended the whole agent run.\n\n## The boundary\n\nCandidates now require strict base64 decoding, the declared image signature, and a complete PNG, JPEG, GIF, or WebP terminal structure. Invalid candidates stay as tool text; genuine upload failures remain loud.\n`

export const metadata: Metadata = {
  title: "Reject Truncated Base64 Image Uploads | ConnectOnion",
  alternates: { canonical: canonicalPath },
  openGraph: { title, description, url: canonicalPath, siteName: 'ConnectOnion Docs', type: 'article', publishedTime: '2026-08-25T00:00:00+10:00', authors: ['ConnectOnion Team'], tags: ['images', 'plugins', 'reliability'], images: [{ url: '/onion-logo.png', alt: title }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}
const articleJsonLd = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: title, description, datePublished: '2026-08-25', dateModified: '2026-08-25', author: { '@type': 'Organization', name: 'ConnectOnion' }, mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}` }

export default function ImagePrefixPage() {
  return <main className="px-5 md:px-10 py-14 md:py-20"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} /><article className="max-w-3xl mx-auto">
    <header className="mb-12 border-b border-gray-100 pb-10"><div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"><div><p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Design Journal · August 25, 2026 · Reliability</p><h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1><p className="text-lg text-gray-600 leading-relaxed">{description}</p></div><CopyMarkdownButton content={articleMarkdown} filename="an-image-prefix-is-not-an-image.md" /></div></header>
    <div className="prose prose-gray max-w-none [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_p]:my-4 [&_p]:leading-7 [&_p]:text-gray-700">
      <h2>A harmless excerpt ended the run</h2><p>A browser script returned JSON with a shortened image source. The formatter matched its base64-looking prefix, decoding failed inside <code>after_tools</code>, and an otherwise successful agent run terminated.</p>
      <h2>Length was not proof</h2><p>Catching one padding error or imposing a minimum length would still accept some truncated payloads. Text can decode successfully without being an image, and an image header alone does not prove the file reached its end.</p>
      <h2>The new boundary</h2><p>PNG, JPEG, GIF, and WebP candidates now require strict base64 decoding, the declared format signature, and complete terminal structure. Invalid candidates remain ordinary tool text. Genuine images still upload to oo-api, and genuine network or HTTP failures still fail loudly.</p>
      <h2>Evidence and limit</h2><p>The regression includes the exact production prefix from issue #1269 and decodable non-image text, while complete-image unit and plugin E2E paths still pass. A future format must add its own completeness rule.</p>
      <p>See <Link href="/useful-plugins/image-result-formatter">image_result_formatter</Link> for usage.</p>
    </div><ContentNavigation /></article></main>
}
