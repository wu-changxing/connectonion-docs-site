/**
 * @purpose Give the release-channel page its own search and sharing metadata
 * @context The page is a client component, so route metadata lives in this server layout
 */
import type { ReactNode } from 'react'
import { makeMetadata } from '../metadata'

export const metadata = makeMetadata(
  'Release Channels',
  'Stable, stabilizing, and preview ConnectOnion releases with exact installation commands.',
  '/releases',
)

export default function ReleasesLayout({ children }: { children: ReactNode }) {
  return children
}
