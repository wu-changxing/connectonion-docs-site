import type { ReactNode } from 'react'
import { makeMetadata } from '../metadata'

export const metadata = makeMetadata(
  'ConnectOnion Roadmap: 1.7 Maintenance and 1.8 Browser Preview',
  'Track stable 1.7.1 maintenance and the pending 1.8.0a4 Linux browser candidate, including engine choice, price, and release gates.',
  '/roadmap',
)

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return children
}
