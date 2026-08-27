import { makeMetadata } from '../metadata'
import { pageSEO } from '../../lib/seo'

const seo = pageSEO['/tui']
export const metadata = makeMetadata(seo.title, seo.description, seo.path)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
