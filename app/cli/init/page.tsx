import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'co init: complete local setup or initialize a project | ConnectOnion',
  description: 'Initialize identity, a local profile, bundled skill links and command indexes. Re-run local or project setup to repair missing integration while preserving your edits.',
  alternates: { canonical: '/cli/init' },
}

export default function Page() {
  return <ReleaseCliGuide name="init" reviewUrl="https://github.com/openonion/connectonion/issues/2675" />
}
