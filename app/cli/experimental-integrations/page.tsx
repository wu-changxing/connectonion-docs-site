import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  title: 'Experimental CLI integrations | ConnectOnion',
  description: 'Try the development branch for Google Docs, Sheets, Slides, Forms and 19 more small API or official CLI integrations. Setup, current scope and feedback.',
  alternates: { canonical: '/cli/experimental-integrations' },
}

export default function Page() {
  return <ReleaseCliGuide name="experimental-integrations" development />
}
