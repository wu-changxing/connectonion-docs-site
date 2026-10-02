import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'GitHub CLI for AI agents (co github) | ConnectOnion',
  description: 'Upcoming preview: collect GitHub issues, pull requests, comments and reviews in a durable local inbox using your existing gh login. Not released yet.',
  alternates: { canonical: '/cli/github' },
}

export default function Page() {
  return <ReleaseCliGuide name="github" upcoming />
}
