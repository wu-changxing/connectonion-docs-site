import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co server: register, check and deploy onto servers you own | ConnectOnion",
  "description": "Register a machine, preflight it and name the requirement that failed, then deploy onto it with co deploy --to.",
  "alternates": {
    "canonical": "/cli/server"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="server" />
}
