import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Hand a Claude Code or Codex session to a teammate's AI (co handoff) | ConnectOnion",
  "description": "co handoff sends the session you had with Claude Code or Codex to another person's coding agent: every message word for word, private sentences removed, sent only on your yes. Their agent does the work and sends the patch back. Preview in 1.9.2.",
  "alternates": { "canonical": "/cli/handoff" }
}

export default function Page() {
  return <ReleaseCliGuide name="handoff" preview />
}
