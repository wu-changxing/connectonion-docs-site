import { buildMetadata } from '../../lib/seo'

export const metadata = buildMetadata('/host')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
