import type { ReactNode } from 'react'
import { makeMetadata } from '../../metadata'

export const metadata = makeMetadata(
  'co browser — Free Chrome and Explicit Onion Sessions | ConnectOnion',
  'Drive a shared browser from the CLI. System Chrome is free by default; select paid Onion explicitly and handle typed navigation failures.',
  '/cli/browser-command',
)

export default function BrowserCommandLayout({ children }: { children: ReactNode }) {
  return children
}
