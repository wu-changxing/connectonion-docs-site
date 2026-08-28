// seo-gate's first door: deterministic checks on the BUILT html.
//
// Source-level checks lie — a page can export metadata and still inherit the
// homepage canonical through a parent layout (63 pages did exactly that until
// 2026-08-28). The built page under .next/server/app/ is what Google reads,
// so that is what gets checked.
//
// Usage: node scripts/check-seo.mjs <changed-file>...
//   Pass the PR's changed file paths; only routes those files render are
//   checked, so untouched legacy pages don't block unrelated PRs.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const BASE_URL = 'https://docs.connectonion.com'
const HOME_TITLE_RE = /Python AI Agents from a Working Template/

const routes = new Set()
const newBlogSlugs = new Set()

for (const file of process.argv.slice(2)) {
  const m = file.match(/^app\/(.*?)(?:page|layout)\.tsx$/)
  if (!m) continue
  const route = '/' + m[1].replace(/\/$/, '')
  routes.add(route === '/' ? '/' : route.replace(/\/$/, ''))
  const blog = file.match(/^app\/blog\/([^/]+)\/page\.tsx$/)
  if (blog) newBlogSlugs.add(blog[1])
}

if (routes.size === 0) {
  console.log('no app routes in this diff — nothing to check.')
  process.exit(0)
}

let failed = false
const fail = (msg) => { console.error(`::error::${msg}`); failed = true }
const checkedHtml = []

for (const route of routes) {
  const htmlPath = `.next/server/app${route === '/' ? '/index' : route}.html`
  if (!existsSync(htmlPath)) {
    console.log(`${route}: no static html (${htmlPath}) — skipped (dynamic route).`)
    continue
  }
  const head = readFileSync(htmlPath, 'utf8').split('</head>')[0]

  const title = head.match(/<title[^>]*>([^<]*)<\/title>/)?.[1]
  const desc = head.match(/<meta name="description" content="/)
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const expected = `${BASE_URL}${route === '/' ? '' : route}`

  if (!title) fail(`${route}: built page has no <title>.`)
  else if (route !== '/' && HOME_TITLE_RE.test(title))
    fail(`${route}: <title> is the homepage title — the page inherits root metadata. Wire pageSEO['${route}'] via makeMetadata in a layout.tsx.`)
  if (!desc) fail(`${route}: built page has no meta description.`)
  if (!canonical)
    fail(`${route}: built page has no canonical. Wire pageSEO['${route}'] via makeMetadata — a page without a self-canonical competes with every duplicate of itself.`)
  else if (canonical.replace(/\/$/, '') !== expected.replace(/\/$/, ''))
    fail(`${route}: canonical is ${canonical}, expected ${expected}. An inherited canonical tells Google this page is a copy of another one.`)

  if (title && desc && canonical) console.log(`${route}: title/description/canonical ok — "${title}"`)
  checkedHtml.push(htmlPath)
}

// Hand the checked pages to the LLM step so the route→html mapping lives once.
writeFileSync('.next/seo-gate-pages.txt', checkedHtml.join('\n') + '\n')

// A new blog post that isn't registered is invisible: three registries, all in
// this repo, all forgotten at least once for real posts.
if (newBlogSlugs.size > 0) {
  const sitemap = readFileSync('app/sitemap.ts', 'utf8')
  const llms = readFileSync('public/llms.txt', 'utf8')
  const blogIndex = readFileSync('app/blog/page.tsx', 'utf8')
  for (const slug of newBlogSlugs) {
    if (!sitemap.includes(`/blog/${slug}`)) fail(`/blog/${slug}: missing from app/sitemap.ts.`)
    if (!llms.includes(`/blog/${slug}`)) fail(`/blog/${slug}: missing from public/llms.txt.`)
    if (!blogIndex.includes(slug)) fail(`/blog/${slug}: not linked from the blog index (app/blog/page.tsx).`)
  }
}

process.exit(failed ? 1 : 0)
