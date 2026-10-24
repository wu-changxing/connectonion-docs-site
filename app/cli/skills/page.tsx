import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co skills: discover, import and link agent skills | ConnectOnion',
  description: 'Discover and import your skill library, link bundled skills to coding agents, and inspect the command index that initialization maintains.',
  alternates: { canonical: '/cli/skills' },
}

export default function Page() {
  return <ReleaseCliGuide name="skills" preview />
}
