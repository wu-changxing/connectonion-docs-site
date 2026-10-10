import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Hand work to a teammate's Codex (co handoff) | ConnectOnion",
  "description": "Preview, coming next: hand a task and its context, decisions and rejected options to a teammate's Codex. Preview exactly what leaves, then send with --yes.",
  "alternates": {
    "canonical": "/cli/handoff"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="handoff" coming />
}
