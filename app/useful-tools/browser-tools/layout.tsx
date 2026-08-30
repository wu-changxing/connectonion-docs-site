import type { ReactNode } from 'react'
import { makeMetadata } from '../../metadata'

export const metadata = makeMetadata(
  'BrowserAutomation Engine Modes and Python API | ConnectOnion',
  'Use the synchronous BrowserAutomation API with the free system default or explicit pending 1.8.0a4 auto/onion engine modes.',
  '/useful-tools/browser-tools',
)

export default function BrowserToolsLayout({ children }: { children: ReactNode }) {
  return children
}
