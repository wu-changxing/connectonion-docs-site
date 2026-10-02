import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'Canny CLI for AI agents (co canny) | ConnectOnion',
  description: 'Read canny through Co. Setup, commands and current limitations.',
  alternates: { canonical: '/cli/canny' },
}

export default function Page() {
  return <ReleaseCliGuide name="canny" />
}
