import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Slack bot CLI for AI agents (co slack) | ConnectOnion",
  "description": "Experimental: a Slack bot as a directory of files over Socket Mode — listen, receive the next message as JSON, send and reply in the thread.",
  "alternates": {
    "canonical": "/cli/slack"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="slack" />
}
