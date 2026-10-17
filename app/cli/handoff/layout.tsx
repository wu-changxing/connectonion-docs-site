import { buildMetadata } from '../../../lib/seo'

export const metadata = buildMetadata('/cli/handoff')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
