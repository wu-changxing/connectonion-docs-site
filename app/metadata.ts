/**
 * @purpose Shared SEO metadata helpers for ConnectOnion documentation site
 * @context Used by individual pages to generate per-page metadata with correct canonical URLs
 */
import type { Metadata, Viewport } from "next";

const BASE_URL = 'https://docs.connectonion.com'

/** Generate per-page metadata with correct canonical URL and OG tags. */
export function makeMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = `${BASE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ConnectOnion Docs",
      type: "website",
      locale: "en_US",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
      creator: "@connectonion",
    },
  }
}

// Viewport must be exported separately in Next.js 15+
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,  // Allow user zoom — required for accessibility
};
