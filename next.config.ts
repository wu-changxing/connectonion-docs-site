/**
 * @purpose Next.js configuration for the ConnectOnion documentation site
 * @llm-note
 *   Dependencies: imports from [next] | imported by [Next.js build system]
 *   Data flow: exports nextConfig → consumed by Next.js at build/dev time
 *   State/Effects: configuration only | no runtime side effects
 *   Integration: configures images, server actions, React compiler, and performance options
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode for catching bugs early
  reactStrictMode: true,

  // Remove x-powered-by header for security
  poweredByHeader: false,

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
  },

  experimental: {
    // Optimize package imports for faster builds
    optimizePackageImports: [
      'react-icons',
      'framer-motion',
      'react-syntax-highlighter',
    ],
    // Server Actions body size limit (default 1mb, increased for doc copy features)
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  async redirects() {
    return [
      {
        source: '/blog/one-mailbox-two-limits',
        destination: '/blog/a-page-should-not-become-a-wall',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
