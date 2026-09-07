import { buildMetadata } from '../../lib/seo'

export const metadata = buildMetadata('/threat-model')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
