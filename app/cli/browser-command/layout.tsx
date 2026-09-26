import type { ReactNode } from 'react'
import { makeMetadata } from '../../metadata'

export const metadata = makeMetadata(
  'Browser automation CLI for AI agents (co browser) | ConnectOnion',
  'Give an AI agent one real, logged-in browser: log in by hand once, 2FA included, then run direct functions or one quoted browser task. System Chrome is free by default.',
  '/cli/browser-command',
)

export default function BrowserCommandLayout({ children }: { children: ReactNode }) {
  return children
}
