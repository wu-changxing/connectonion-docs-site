import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co setup: customize your profile and import skills | ConnectOnion',
  description: 'Customize the profile created by co init, import your skill library, and repair local coding-agent integration without replacing your own skills.',
  alternates: { canonical: '/cli/setup' },
}

export default function Page() {
  return <ReleaseCliGuide name="setup" reviewUrl="https://github.com/openonion/connectonion/issues/2675" />
}
