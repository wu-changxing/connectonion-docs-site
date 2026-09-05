import { buildMetadata } from '../../lib/seo'

export const metadata = buildMetadata('/roadmap')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
