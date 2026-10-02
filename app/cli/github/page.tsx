import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'GitHub CLI for AI agents (co github) | ConnectOnion',
  description: 'Read github through Co. Setup, commands and current limitations.',
  alternates: { canonical: '/cli/github' },
}

export default function Page() {
  return <ReleaseCliGuide name="github" upcoming />
}
