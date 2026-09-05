import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { Marked, Renderer } from 'marked'

export const BLOG_BASE_URL = 'https://docs.connectonion.com'
export const BLOG_CONTENT_DIRECTORY = join(process.cwd(), 'public', 'blog')
const BLOG_SEO = JSON.parse(readFileSync(join(process.cwd(), 'lib', 'blog-seo.json'), 'utf8'))

const CANONICAL_SLUG_OVERRIDES = {
  'one-mailbox-two-limits': 'a-page-should-not-become-a-wall',
}

export const HANDCRAFTED_POSTS = [
  ['connectonion-1-7', '2026-08-25', 'co ai Delegates to Codex and Claude Code — and You Watch It Work', 'ConnectOnion 1.7.0 introduced a live, resumable Work Room, three clear permission modes, and intent-led tool activity.', ['Release', 'Work Rooms']],
  ['what-makes-an-agent-10x', '2026-08-23', 'What Makes an Agent 10x', 'Five capabilities that make an AI agent safe to stop watching: verifiable work, durable time, learned experience, bounded delegation, and real-world reach.', ['Vision', 'Reliability']],
  ['headless-does-not-mean-unconfigured', '2026-08-25', 'Headless Does Not Mean Unconfigured', 'How unattended Auto honors deliberate command grants without turning a broad legacy wildcard into unlimited authority.', ['Permissions', 'Automation']],
  ['an-image-prefix-is-not-an-image', '2026-08-25', 'An Image Prefix Is Not an Image', 'Why strict completeness checks keep truncated data URLs and base64-looking text out of the image upload path.', ['Reliability', 'Testing']],
  ['a-patch-must-move-forward', '2026-08-25', 'A Patch Must Move Forward', 'Why stable patches require tracked forward-ports into every active higher release line.', ['Release', 'CI']],
  ['connectonion-1-6-12', '2026-08-19', 'Your Servers, Your Regions, Your Shared Mailboxes', 'ConnectOnion 1.6.12 added server regions, shared mailboxes, safer Outlook downloads, and steadier scheduled runs.', ['Release', 'Email']],
  ['workroom-is-a-view', '2026-08-17', 'The Work Room Is a Client, Not a Status Panel', 'Why native Codex and Claude Code Work Rooms keep conversation, input, lifecycle, and provider controls in one remote-client shell.', ['Work Rooms', 'OIP']],
  ['a-work-room-is-a-summary-not-a-transcript', '2026-08-16', 'A Work Room Is a Summary, Not a Transcript', 'Why long native coding work needs a finite OIP summary, verified decisions, and honest evidence.', ['Work Rooms', 'OIP']],
  ['an-approval-is-not-execution-time', '2026-08-16', 'An Approval Is Not Execution Time', 'Why a manual Codex approval pauses the active-work budget instead of becoming a provider timeout.', ['Permissions', 'Codex']],
  ['a-tool-transaction-is-not-a-work-room', '2026-08-16', 'A Tool Transaction Is Not a Work Room', 'Why OIP streams native coding activity and approvals live while keeping raw terminal detail out of the default chat surface.', ['Work Rooms', 'OIP']],
  ['the-owner-needs-a-door', '2026-08-15', 'The Owner Needs a Door', 'Why secure first-owner onboarding needs a private recovery path that stays out of logs.', ['Security', 'Onboarding']],
  ['a-page-should-not-become-a-wall', '2026-08-15', 'A Page Should Not Become a Wall', 'Why finite mailbox pages must make every remaining page reachable instead of silently hiding data.', ['Email', 'API Design']],
  ['gemini-37-default', '2026-08-15', 'Changing the Default Model Is a Backend Decision First', 'Why a default model change must be supported by the backend before any client requests it.', ['Models', 'Release']],
  ['deployed-agent-identity', '2026-08-15', 'The Agent That Was Itself, and Billed Someone Else', 'What a deployed process should inherit from its operator, and which identity and billing authority it must not.', ['Security', 'Deployment']],
  ['oip-native-coding-adapters', '2026-08-15', 'One Browser Protocol, Native Coding Adapters', 'Why ConnectOnion uses OIP for the browser boundary while Codex and Claude Code remain native backend adapters.', ['OIP', 'Architecture']],
  ['connectonion-1-6', '2026-08-09', 'ConnectOnion 1.6.0', 'ConnectOnion 1.6.0 made remote agents safer to operate and drew a clearer boundary around credentials.', ['Release', 'Security']],
  ['auto-debug-evolution', '2025-01-02', 'Auto-Debug Design Evolution', 'Five iterations that turned interactive AI-agent debugging from a complex mode system into a focused developer workflow.', ['Debugging', 'UX']],
  ['network-protocol-design', '2024-12-01', 'Designing the ConnectOnion Network Protocol', 'How the agent network protocol moved from complex identity and session machinery to addresses, messages, and direct connections.', ['Architecture', 'Network']],
  ['trust-keyword', '2024-12-02', 'Why We Chose “Trust”', 'Why trust became the bidirectional, human-readable keyword for agent-to-agent authorization.', ['API Design', 'Security']],
  ['llm-do', '2024-12-03', 'Why We Chose llm_do() Over llm()', 'Why one-shot LLM calls use a verb that makes the action and intent clear in Python code.', ['API Design', 'Naming']],
  ['input-method', '2024-12-04', 'Why We Chose input() Over run()', 'How aligning the primary Agent method with a user’s mental model reduced first-use friction.', ['API Design', 'UX']],
  ['agent-address-format', '2024-12-05', 'Why Agent Addresses Use Hex-Encoded Ed25519 Keys', 'Why ConnectOnion agent addresses use full Ed25519 public keys with a familiar hexadecimal representation.', ['Security', 'Network']],
  ['naming-is-hard', '2024-12-06', 'Why “Address” Beats “Identity”', 'Why precise network language keeps routing separate from identity, reputation, and trust.', ['API Design', 'Naming']],
  ['cli-ux-progressive-disclosure', '2024-12-07', 'Progressive Disclosure in CLI Design', 'How the ConnectOnion CLI starts with a working project and reveals configuration only when it becomes relevant.', ['CLI', 'UX']],
].map(([slug, date, title, description, tags]) => ({
  slug,
  date,
  title,
  description,
  tags,
  author: 'ConnectOnion Team',
  href: `/blog/${slug}`,
  isHandcrafted: true,
  readMinutes: 6,
  wordCount: 0,
  sourcePath: null,
}))

export const HANDCRAFTED_SLUGS = new Set(HANDCRAFTED_POSTS.map((post) => post.slug))

function unquote(value) {
  const trimmed = value.trim()
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/^\uFEFF/, '')
  if (!normalized.startsWith('---\n')) return { data: {}, body: normalized }
  const end = normalized.indexOf('\n---\n', 4)
  if (end === -1) return { data: {}, body: normalized }

  const data = {}
  for (const line of normalized.slice(4, end).split('\n')) {
    const separator = line.indexOf(':')
    if (separator === -1) continue
    const key = line.slice(0, separator).trim()
    const value = unquote(line.slice(separator + 1))
    if (key === 'tags') {
      data.tags = value.replace(/^\[|\]$/g, '').split(',').map((tag) => unquote(tag)).filter(Boolean)
    } else {
      data[key] = value
    }
  }
  return { data, body: normalized.slice(end + 5).trimStart() }
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*>\d.]+\s+/gm, '')
    .replace(/[\*_~]/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function firstParagraph(markdown) {
  for (const block of markdown.split(/\n\s*\n/)) {
    const candidate = block.trim()
    if (!candidate || /^(#|```|[-*+]\s|\d+\.\s|>\s)/.test(candidate)) continue
    const text = plainText(candidate)
    if (text.length >= 40) return text
  }
  return plainText(markdown)
}

function summarize(markdown, maxLength = 170) {
  const text = firstParagraph(markdown)
  if (text.length <= maxLength) return text
  const clipped = text.slice(0, maxLength + 1)
  const sentence = clipped.match(/^(.{80,}?[.!?])(?:\s|$)/)?.[1]
  if (sentence) return sentence
  return `${clipped.slice(0, clipped.lastIndexOf(' ')).replace(/[,:;\s]+$/, '')}…`
}

function inferTags(title, body, provided = []) {
  if (provided.length) return provided.map((tag) => tag.replace(/(^|-)(\w)/g, (_, dash, letter) => `${dash ? ' ' : ''}${letter.toUpperCase()}`)).slice(0, 4)
  const text = `${title} ${body}`.toLowerCase()
  const rules = [
    ['Remote Browser', /browser|chromium|proxy|egress|tab|upload/],
    ['Permissions', /approval|permission|full access|authori[sz]/],
    ['Release', /release|candidate|version|stable|alpha|beta|\brc\d|patch/],
    ['Testing', /\btest|evidence|gate|snapshot/],
    ['Work Rooms', /work ?room|codex|claude code/],
    ['Email', /email|mailbox|outlook/],
    ['Deployment', /deploy|server|quota/],
    ['Runtime', /async|thread|loop|daemon|process/],
    ['API Design', /\bapi\b|default|naming|argument/],
  ]
  const tags = rules.filter(([, pattern]) => pattern.test(text)).map(([tag]) => tag)
  return (tags.length ? tags : ['Engineering']).slice(0, 3)
}

function sourceSlug(filename) {
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

export function parseBlogFile(filename, markdown) {
  const { data, body: sourceBody } = parseFrontmatter(markdown)
  const heading = sourceBody.match(/^#\s+(.+)$/m)?.[1]
  const title = data.title || plainText(heading || sourceSlug(filename).replaceAll('-', ' '))
  const body = sourceBody.replace(/^#\s+.+\n+/, '').trim()
  const filenameDate = filename.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1]
  const date = data.date || filenameDate
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`${filename}: missing a valid publication date`)

  const words = plainText(body).split(/\s+/).filter(Boolean).length
  const rawSlug = sourceSlug(filename)
  const slug = CANONICAL_SLUG_OVERRIDES[rawSlug] || rawSlug
  return {
    slug,
    rawSlug,
    title,
    seoTitle: data.seoTitle || BLOG_SEO[slug]?.title || title,
    description: data.description || BLOG_SEO[slug]?.description || summarize(body),
    date,
    author: data.author || 'ConnectOnion Team',
    tags: inferTags(title, body, data.tags || []),
    href: `/blog/${slug}`,
    sourcePath: `/blog/${filename}`,
    filename,
    readMinutes: Math.max(2, Math.ceil(words / 220)),
    wordCount: words,
    body,
    isHandcrafted: HANDCRAFTED_SLUGS.has(slug),
  }
}

export function getMarkdownPosts() {
  return readdirSync(BLOG_CONTENT_DIRECTORY)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => parseBlogFile(filename, readFileSync(join(BLOG_CONTENT_DIRECTORY, filename), 'utf8')))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

export function getAllBlogPosts() {
  const posts = new Map(getMarkdownPosts().map((post) => [post.slug, post]))
  for (const legacy of HANDCRAFTED_POSTS) {
    const content = posts.get(legacy.slug)
    posts.set(legacy.slug, { ...content, ...legacy, seoTitle: BLOG_SEO[legacy.slug]?.title || legacy.title, description: BLOG_SEO[legacy.slug]?.description || legacy.description, sourcePath: content?.sourcePath || legacy.sourcePath })
  }
  return [...posts.values()].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

export function getDynamicBlogPosts() {
  return getMarkdownPosts().filter((post) => !post.isHandcrafted)
}

export function getMarkdownPostBySlug(slug) {
  return getMarkdownPosts().find((post) => post.slug === slug) || null
}

export function getRelatedBlogPosts(post, limit = 3) {
  const candidates = getAllBlogPosts().filter((candidate) => candidate.slug !== post.slug)
  return candidates
    .map((candidate) => ({
      ...candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length * 10 + (candidate.date <= post.date ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date))
    .slice(0, limit)
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}

function headingId(value, seen) {
  const base = plainText(value).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-') || 'section'
  const count = seen.get(base) || 0
  seen.set(base, count + 1)
  return count ? `${base}-${count + 1}` : base
}

export function renderBlogMarkdown(markdown) {
  const renderer = new Renderer()
  const seenHeadings = new Map()
  renderer.html = ({ text }) => escapeHtml(text)
  renderer.heading = function ({ tokens, depth }) {
    const inner = this.parser.parseInline(tokens)
    const id = headingId(inner, seenHeadings)
    return `<h${depth} id="${id}">${inner}</h${depth}>\n`
  }
  const parser = new Marked({ gfm: true, breaks: false, renderer })
  return parser.parse(markdown)
}

export function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[character])
}
