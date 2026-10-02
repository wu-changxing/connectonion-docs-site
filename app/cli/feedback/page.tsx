import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'CLI feedback and Agent mailbox listener | ConnectOnion',
  description: 'Report ConnectOnion CLI problems through GitHub, Discord or the Agent mailbox. Inspect report links and run the maintainer-only read-only feedback collector.',
  alternates: { canonical: '/cli/feedback' },
}

export default function Page() {
  return <ReleaseCliGuide name="feedback" development />
}
