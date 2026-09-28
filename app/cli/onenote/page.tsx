import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'OneNote in the terminal (co onenote) | ConnectOnion',
  description: 'List notebooks and pages by number, read notes, and safely create a new page from the terminal.',
  alternates: { canonical: '/cli/onenote' },
}

export default function Page() {
  return <ReleaseCliGuide name="onenote" preview />
}
