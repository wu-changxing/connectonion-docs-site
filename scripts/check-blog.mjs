import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  BLOG_CONTENT_DIRECTORY,
  HANDCRAFTED_POSTS,
  getAllBlogPosts,
  getDynamicBlogPosts,
  getMarkdownPosts,
  renderBlogMarkdown,
} from '../lib/blog-content.mjs'

const failures = []
const fail = (message) => failures.push(message)
const sourceFiles = readdirSync(BLOG_CONTENT_DIRECTORY).filter((file) => file.endsWith('.md'))
const markdownPosts = getMarkdownPosts()
const allPosts = getAllBlogPosts()
const dynamicPosts = getDynamicBlogPosts()

if (sourceFiles.length < 96) fail(`expected at least 96 published Markdown files, found ${sourceFiles.length}`)
if (markdownPosts.length !== sourceFiles.length) fail('not every Markdown file parsed into a post')

const slugs = allPosts.map((post) => post.slug)
if (new Set(slugs).size !== slugs.length) fail('canonical blog slugs are not unique')
if (dynamicPosts.some((post) => post.isHandcrafted)) fail('a handcrafted route leaked into dynamic static params')

for (const post of markdownPosts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) fail(`${post.filename}: unsafe route slug ${post.slug}`)
  if (post.title.length < 8) fail(`${post.filename}: title is too short`)
  if (post.description.length < 40 || post.description.length > 180) fail(`${post.filename}: description must be 40–180 characters (${post.description.length})`)
  if (post.wordCount < 80) fail(`${post.filename}: article body is unexpectedly short (${post.wordCount} words)`)
  if (!existsSync(join(process.cwd(), 'public', post.sourcePath))) fail(`${post.filename}: public Markdown source is missing`)
}

for (const post of HANDCRAFTED_POSTS) {
  if (!existsSync(join(process.cwd(), 'app', 'blog', post.slug, 'page.tsx'))) fail(`${post.slug}: legacy public route was not preserved`)
}

const escaped = renderBlogMarkdown('A raw <agent> placeholder.\n\n<script>alert(1)</script>')
if (escaped.includes('<script>') || escaped.includes('<agent>')) fail('Markdown renderer allows raw HTML through')
if (!escaped.includes('&lt;agent&gt;')) fail('Markdown renderer did not preserve an escaped placeholder')

const requiredFiles = [
  'app/blog/[slug]/page.tsx',
  'app/blog/feed.xml/route.ts',
  'app/blog/llms.txt/route.ts',
  'app/blog/og/[slug]/route.tsx',
  'app/sitemap.ts',
]
for (const filename of requiredFiles) {
  if (!existsSync(join(process.cwd(), filename))) fail(`missing discovery surface: ${filename}`)
}

const dynamicPage = readFileSync(join(process.cwd(), 'app/blog/[slug]/page.tsx'), 'utf8')
for (const signal of ['generateMetadata', 'alternates: { canonical:', "'@type': 'BlogPosting'", "'@type': 'BreadcrumbList'", 'openGraph:', 'twitter:']) {
  if (!dynamicPage.includes(signal)) fail(`dynamic article route is missing ${signal}`)
}
const sitemap = readFileSync(join(process.cwd(), 'app/sitemap.ts'), 'utf8')
if (!sitemap.includes('getAllBlogPosts')) fail('sitemap is not generated from the blog catalog')
const redirectConfig = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8')
if (!redirectConfig.includes('/blog/one-mailbox-two-limits')) fail('known renamed article does not have a redirect')

if (failures.length) {
  failures.forEach((message) => console.error(`FAIL: ${message}`))
  process.exit(1)
}

console.log(`blog source checks passed: ${sourceFiles.length} Markdown files, ${allPosts.length} canonical routes, ${dynamicPosts.length} generated article pages`)
