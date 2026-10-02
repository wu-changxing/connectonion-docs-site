import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'Linear CLI for AI agents (co linear) | ConnectOnion',
  description: 'Search, read, create and update Linear issues from the terminal with co linear. Add comments and inspect teams, projects, states and labels.',
  alternates: { canonical: '/cli/linear' },
}

export default function Page() {
  return <ReleaseCliGuide name="linear" />
}
