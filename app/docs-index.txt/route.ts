import { existsSync, readdirSync } from 'node:fs'
import { getPageMetadata } from '../../lib/seo'
import { getMarkdownPath } from '../../lib/markdownMapping'

export const dynamic = 'force-static'

export function GET() {
  const routes = (readdirSync('app', { recursive: true }) as string[])
    .filter((file) => file.endsWith('page.tsx') && !file.includes('[') && !file.startsWith('blog/'))
    .map((file) => '/' + file.replace(/\/?page\.tsx$/, ''))
    .sort()
  const lines = [
    '# ConnectOnion documentation catalog',
    '',
    'Official documentation for ConnectOnion, the open-source Python agent toolkit maintained by OpenOnion.',
    'Source: https://github.com/openonion/connectonion',
    'Package: https://pypi.org/project/connectonion/',
    'Engineering articles: https://docs.connectonion.com/blog/llms.txt',
    '',
  ]
  for (const route of routes) {
    const page = getPageMetadata(route)
    const markdown = getMarkdownPath(route)
    lines.push('## ' + page.title, 'https://docs.connectonion.com' + route, page.description)
    if (markdown && existsSync('public' + markdown)) lines.push('Markdown: https://docs.connectonion.com' + markdown)
    lines.push('')
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
