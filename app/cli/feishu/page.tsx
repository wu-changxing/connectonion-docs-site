import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co feishu and co lark: a Feishu or Lark bot as an inbox | ConnectOnion",
  "description": "Turn a Feishu or Lark bot into a directory of files: listen, receive the next message as JSON, send and reply from the terminal.",
  "alternates": {
    "canonical": "/cli/feishu"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="feishu" />
}
