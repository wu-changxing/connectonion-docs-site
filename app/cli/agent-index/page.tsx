import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Agents know co: the command index for Codex and Claude Code | ConnectOnion",
  "description": "Preview, coming next: co init writes a generated co command index into ~/.codex/AGENTS.md and ~/.claude/CLAUDE.md. Why it exists, and how to remove it.",
  "alternates": {
    "canonical": "/cli/agent-index"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="agent-index" coming />
}
