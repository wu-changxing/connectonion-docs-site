import type { ReactNode } from 'react'
import { makeMetadata } from '../../metadata'

export const metadata = makeMetadata(
  'BrowserAutomation Engine Modes and Python API | ConnectOnion',
  'Automate navigation, clicks, typing, and screenshots with BrowserAutomation; use the free system engine or explicitly choose auto/onion paid engines.',
  '/useful-tools/browser-tools',
)

export default function BrowserToolsLayout({ children }: { children: ReactNode }) {
  return children
}
