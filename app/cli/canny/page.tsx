import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'Canny CLI for AI agents (co canny) | ConnectOnion',
  description: 'Read Canny feedback posts, votes and comments with co canny. Find feature requests, change their status, reply to users and write changelog entries.',
  alternates: { canonical: '/cli/canny' },
}

export default function Page() {
  return <ReleaseCliGuide name="canny" />
}
