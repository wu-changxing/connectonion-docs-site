import { buildMetadata } from '../../../lib/seo'

export const metadata = buildMetadata('/cli/setup')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
