import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Call your Codex connectors from the terminal (co mcp) | ConnectOnion",
  "description": "List and call the MCP servers and account connectors you already have in Codex, such as Gmail and Calendar, from the terminal: no second login, no model turn.",
  "alternates": {
    "canonical": "/cli/mcp"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="mcp" preview />
}
