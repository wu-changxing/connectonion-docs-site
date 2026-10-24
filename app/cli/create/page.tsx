import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co create: start an agent project with complete local setup | ConnectOnion',
  description: 'Create a hosted agent project and prepare local identity, profile, bundled skills and coding-agent command indexes in the same command.',
  alternates: { canonical: '/cli/create' },
}

export default function Page() {
  return <ReleaseCliGuide name="create" preview />
}
