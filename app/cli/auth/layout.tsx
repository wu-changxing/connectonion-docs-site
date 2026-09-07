import { buildMetadata } from '../../../lib/seo'

export const metadata = buildMetadata('/cli/auth')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
