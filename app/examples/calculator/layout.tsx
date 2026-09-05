import { buildMetadata } from '../../../lib/seo'

export const metadata = buildMetadata('/examples/calculator')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
