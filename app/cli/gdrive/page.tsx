import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co gdrive: list and transfer Google Drive files | ConnectOnion",
  "description": "List Google Drive files with account-bound references, upload or download files, and manage Drive-backed Gmail draft attachments from the CLI.",
  "alternates": {
    "canonical": "/cli/gdrive"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="gdrive" />
}
