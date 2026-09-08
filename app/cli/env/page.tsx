import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co env: inspect and edit environment settings | ConnectOnion",
  "description": "Inspect configuration sources with values redacted, set or remove settings, and diagnose malformed keys.env files with co env.",
  "alternates": {
    "canonical": "/cli/env"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="env" />
}
