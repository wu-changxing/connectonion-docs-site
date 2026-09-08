import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Select global or project configuration | ConnectOnion",
  "description": "Choose global keys.env or an explicit project file with co --env-file. Understand process overrides and whole-account provider credentials.",
  "alternates": {
    "canonical": "/cli/environment"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="environment" />
}
