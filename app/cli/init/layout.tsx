import { buildMetadata } from '../../../lib/seo'

export const metadata = buildMetadata('/cli/init')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
