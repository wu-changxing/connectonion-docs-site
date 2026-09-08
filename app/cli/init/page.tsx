import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co init: set up global credentials or a project | ConnectOnion",
  "description": "Initialize global keys.env with co init, or select an explicit project directory. Preserve existing settings and use co env to inspect their source.",
  "alternates": {
    "canonical": "/cli/init"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="init" />
}
