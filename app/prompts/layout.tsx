import { buildMetadata } from '../../lib/seo'

export const metadata = buildMetadata('/prompts')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
