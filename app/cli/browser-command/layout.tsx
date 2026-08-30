import type { ReactNode } from 'react'
import { makeMetadata } from '../../metadata'

export const metadata = makeMetadata(
  'co browser CLI: System and Onion Engines | ConnectOnion',
  'Use co browser with the free system default; the pending 1.8.0a4 candidate adds explicit auto/onion modes at $0.025 per 15 minutes.',
  '/cli/browser-command',
)

export default function BrowserCommandLayout({ children }: { children: ReactNode }) {
  return children
}
