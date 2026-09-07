import { buildMetadata } from '../../lib/seo'

export const metadata = buildMetadata('/auto-debug')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
