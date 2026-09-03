import type { ReactNode } from 'react'
import { makeMetadata } from '../metadata'
import { pageSEO } from '../../lib/seo'

const seo = pageSEO['/deploy']
export const metadata = makeMetadata(seo.title, seo.description, seo.path)

export default function DeployLayout({ children }: { children: ReactNode }) {
  return children
}
