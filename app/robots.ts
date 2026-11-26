import { MetadataRoute } from 'next'

const DISALLOWED = ['/api/', '/evidence/', '/design-evidence/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED,
      },
      ...[
        'GPTBot',
        'OAI-SearchBot',
        'ChatGPT-User',
        'Google-Extended',
        'ClaudeBot',
        'Claude-SearchBot',
        'Claude-User',
        'PerplexityBot',
        'Applebot-Extended',
        'Meta-ExternalAgent',
        'Amazonbot',
        'Googlebot',
        'Bingbot',
      ].map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOWED,
      })),
    ],
    sitemap: 'https://docs.connectonion.com/sitemap.xml',
  }
}
