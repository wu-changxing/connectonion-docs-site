/**
 * @purpose Route-to-markdown file path mapping for copy-to-clipboard functionality
 * @llm-note
 *   Dependencies: imports from [] | imported by [hooks/useCopyMarkdown.ts, components/DocsSidebar.tsx]
 *   Data flow: pathname string → routeToMarkdownMap lookup → returns /tutorials/*.md path or null
 *   State/Effects: pure data module | no side effects | ~50 route mappings
 *   Integration: exposes getMarkdownPath(pathname), hasMarkdownContent(pathname)
 *   Usage: enables per-page markdown copying for AI context sharing
 */

const routeToMarkdownMap: Record<string, string> = {
  // Getting Started
  '/': '/tutorials/getting-started.md',
  '/quickstart': '/tutorials/quickstart.md',
  '/vibe-coding': '/tutorials/vibe-coding.md',
  '/cli': '/tutorials/cli.md',
  
  // Core Concepts
  '/prompts': '/tutorials/prompts.md',
  '/tools': '/tutorials/tools.md',
  '/max-iterations': '/tutorials/max_iterations.md',
  '/llm_do': '/tutorials/llm_do.md',
  '/trust': '/tutorials/trust.md',
  '/xray': '/tutorials/xray.md',
  '/logging': '/tutorials/log.md',
  
  // Useful Tools
  '/agent-emails': '/agent-emails.md',
  '/agent-emails/send': '/send-email.md',
  '/agent-emails/receive': '/get-emails.md',
  '/gmail': '/gmail.md',
  '/web-fetch': '/web-fetch.md',
  '/memory': '/memory.md',
  '/google-integration': '/google-integration.md',
  '/useful-tools/codex': '/useful-tools/codex.md',
  
  // Advanced Features
  '/xray/trace': '/tutorials/xray.md', // Uses same xray.md for now
  '/prompts/formats': '/tutorials/prompts.md', // Uses prompts.md for now
  
  // Security
  '/threat-model': '/tutorials/threat-model.md',
  
  // Examples
  '/examples': '/tutorials/examples.md',
  '/examples/hello-world': '/tutorials/examples.md', // Part of examples.md
  '/examples/calculator': '/tutorials/examples.md', // Part of examples.md
  '/examples/weather-bot': '/tutorials/examples.md', // Part of examples.md
  
  // Blog posts
  '/blog/network-protocol-design': '/tutorials/network-protocol.md',
  '/blog/trust-keyword': '/tutorials/choosing-trust-keyword.md',
  '/blog/llm-do': '/tutorials/choosing-llm-function-name.md',
  '/blog/input-method': '/tutorials/choosing-input-method.md',
  '/blog/oip-native-coding-adapters': '/tutorials/oip-native-coding-adapters.md',
  '/blog/the-owner-needs-a-door': '/tutorials/the-owner-needs-a-door.md',
  '/blog/a-page-should-not-become-a-wall': '/tutorials/a-page-should-not-become-a-wall.md',
  
  // Contributing
  '/website-maintenance': '/tutorials/website-maintenance.md',
  
  // API Reference
  '/api': '/tutorials/api.md',
  
  // Note: Pages without markdown files return null
  // '/blog': null (index page)
  // '/roadmap': null (dynamic content)
}

/**
 * Get the markdown file path for a given route
 * @param pathname - The route pathname (e.g., '/quickstart')
 * @returns The path to the markdown file in public folder, or null if not found
 */
export function getMarkdownPath(pathname: string): string | null {
  // Normalize pathname (remove trailing slash except for root)
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  
  return routeToMarkdownMap[normalizedPath] || null
}

/**
 * Check if a route has an associated markdown file
 * @param pathname - The route pathname
 * @returns True if the route has a markdown file
 */
export function hasMarkdownContent(pathname: string): boolean {
  return getMarkdownPath(pathname) !== null
}
