import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co telegram: send Telegram messages from an agent | ConnectOnion",
  "description": "Send a plain-text Telegram message from the terminal or an agent with a bot you own. It calls Telegram directly — no OpenOnion credits or credential.",
  "alternates": {
    "canonical": "/cli/telegram"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="telegram" />
}
