import { buildMetadata } from '../../lib/seo'

export const metadata = buildMetadata('/web-fetch')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
