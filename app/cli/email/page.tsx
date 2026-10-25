import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co email CLI reference | ConnectOnion',
  description: 'Account mailbox commands, explicit send budgets, status recovery and address management.',
  alternates: { canonical: '/cli/email' },
}

export default function Page() {
  return <ReleaseCliGuide name="email" preview />
}
