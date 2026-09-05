import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getAllBlogPosts, getDynamicBlogPosts } from '../lib/blog-content.mjs'

const failures = []
const fail = (message) => failures.push(message)
const dynamicPosts = getDynamicBlogPosts()
const allPosts = getAllBlogPosts()

for (const post of dynamicPosts) {
  const path = join(process.cwd(), '.next/server/app/blog', `${post.slug}.html`)
  if (!existsSync(path)) {
    fail(`${post.href}: static HTML was not emitted`)
    continue
  }
  const html = readFileSync(path, 'utf8')
  const head = html.split('</head>')[0]
  const expectedCanonical = `https://docs.connectonion.com${post.href}`
  if (!/<title>[^<]{8,}<\/title>/.test(head)) fail(`${post.href}: built title is missing`)
  if (!/<meta name="description" content="[^"]{40,}"/.test(head)) fail(`${post.href}: built description is missing or too short`)
  if (!head.includes(`<link rel="canonical" href="${expectedCanonical}"`)) fail(`${post.href}: built self-canonical is missing`)
  if (!head.includes(`property="og:image" content="https://docs.connectonion.com/blog/og/${post.slug}"`)) fail(`${post.href}: social image is missing`)
  if (!html.includes('"@type":"BlogPosting"')) fail(`${post.href}: BlogPosting structured data is missing`)
}

const blogIndex = readFileSync(join(process.cwd(), '.next/server/app/blog.html'), 'utf8')
if (!blogIndex.includes(allPosts[0].title)) fail('blog index does not server-render the newest article')
if (!blogIndex.includes('"@type":"Blog"')) fail('blog index structured data is missing')

const feed = readFileSync(join(process.cwd(), '.next/server/app/blog/feed.xml.body'), 'utf8')
if ((feed.match(/<item>/g) || []).length !== allPosts.length) fail('RSS feed does not contain every canonical article')
const llms = readFileSync(join(process.cwd(), '.next/server/app/blog/llms.txt.body'), 'utf8')
if (!allPosts.every((post) => llms.includes(`https://docs.connectonion.com${post.href}`))) fail('AI blog catalog is missing one or more canonical URLs')
const sitemap = readFileSync(join(process.cwd(), '.next/server/app/sitemap.xml.body'), 'utf8')
if (!allPosts.every((post) => sitemap.includes(`<loc>https://docs.connectonion.com${post.href}</loc>`))) fail('sitemap is missing one or more canonical blog URLs')
const robots = readFileSync(join(process.cwd(), '.next/server/app/robots.txt.body'), 'utf8')
if (robots.includes('Disallow: /_next/')) fail('robots.txt blocks render-critical Next.js assets')
if (!robots.includes('Sitemap: https://docs.connectonion.com/sitemap.xml')) fail('robots.txt does not advertise the sitemap')

if (failures.length) {
  failures.forEach((message) => console.error(`FAIL: ${message}`))
  process.exit(1)
}
console.log(`blog build checks passed: ${dynamicPosts.length} generated articles and ${allPosts.length} feed/sitemap entries`)
