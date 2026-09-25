import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co telegram: send Telegram messages from an agent | ConnectOnion",
  "description": "A Telegram bot you own: send from the terminal or an agent, plus experimental listen, receive and reply. It calls Telegram directly — no OpenOnion credits.",
  "alternates": {
    "canonical": "/cli/telegram"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="telegram" />
}
