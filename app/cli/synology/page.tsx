import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Synology NAS CLI for AI agents (co syno) | ConnectOnion",
  "description": "Connect a verified Synology profile, upload or download files, track copy and move operations, and verify password-protected expiring share links.",
  "alternates": {
    "canonical": "/cli/synology"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="synology" />
}
