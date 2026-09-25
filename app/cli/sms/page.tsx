import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co sms: an encrypted SMS inbox for your agent | ConnectOnion",
  "description": "Pair an Android phone, read locally decrypted SMS and revoke devices — the agent gets an SMS inbox from one command.",
  "alternates": {
    "canonical": "/cli/sms"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="sms" />
}
