import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'Linear CLI for AI agents (co linear) | ConnectOnion',
  description: 'Read linear through Co. Setup, commands and current limitations.',
  alternates: { canonical: '/cli/linear' },
}

export default function Page() {
  return <ReleaseCliGuide name="linear" />
}
