// Validate emitted pages and discovery surfaces, including static parameters.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'

const BASE_URL = 'https://docs.connectonion.com'
const manifest = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'))
const files = process.argv.includes('--all')
  ? readdirSync('app', { recursive: true }).filter((file) => file.endsWith('page.tsx')).map((file) => 'app/' + file)
  : process.argv.slice(2)
const routes = new Set()
for (const file of files) {
  const match = file.match(/^app\/(.*?)(?:page|layout)\.tsx$/)
  if (!match) continue
  const route = '/' + match[1].replace(/\/$/, '')
  if (route.includes('[')) {
    for (const [path, data] of Object.entries(manifest.routes)) {
      if (data.srcRoute === route) routes.add(path)
    }
  } else {
    routes.add(route)
  }
}
let failed = false
const fail = (message) => { console.error('::error::' + message); failed = true }
const checked = []
const sitemap = readFileSync('.next/server/app/sitemap.xml.body', 'utf8')
const blogIndex = readFileSync('.next/server/app/blog.html', 'utf8')
const blogCatalog = readFileSync('.next/server/app/blog/llms.txt.body', 'utf8')
for (const route of routes) {
  const path = '.next/server/app' + (route === '/' ? '/index' : route) + '.html'
  if (!existsSync(path)) { fail(route + ': static HTML missing'); continue }
  const head = readFileSync(path, 'utf8').split('</head>')[0]
  const title = head.match(/<title[^>]*>([^<]+)<\/title>/)?.[1]
  const description = head.match(/<meta name="description" content="([^"]+)"/)?.[1]
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const expected = BASE_URL + (route === '/' ? '' : route)
  if (!title || (route !== '/' && title.includes('Python AI Agents from a Working Template'))) fail(route + ': missing or inherited title')
  if (!description) fail(route + ': missing description')
  if (canonical?.replace(/\/$/, '') !== expected) fail(route + ': canonical ' + canonical + ', expected ' + expected)
  if (!sitemap.includes('<loc>' + BASE_URL + route + '</loc>') && !sitemap.includes('<loc>' + expected + '</loc>')) fail(route + ': absent from built sitemap')
  if (route.startsWith('/blog/')) {
    if (!blogIndex.includes('href="' + route + '"')) fail(route + ': absent from server-rendered blog index')
    if (!blogCatalog.includes(expected)) fail(route + ': absent from AI blog catalog')
  }
  checked.push(path)
}
writeFileSync('.next/seo-gate-pages.txt', checked.join('\n') + (checked.length ? '\n' : ''))
console.log('SEO checks: ' + checked.length + ' emitted pages, ' + (failed ? 'FAILED' : 'passed'))
process.exit(failed ? 1 : 0)
