import { buildMetadata } from '../../lib/seo'

export const metadata = buildMetadata('/website-maintenance')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
