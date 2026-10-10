import fs from 'node:fs'
import path from 'node:path'
import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'
import { renderBlogMarkdown } from '../../../lib/blog-content.mjs'

export const metadata = {
  "title": "Hand work to a teammate's Codex (co handoff) | ConnectOnion",
  "description": "Experimental, coming next: hand a task, its decisions and rejected options to a teammate's Codex or Claude Code. Preview exactly what leaves, then send with --yes.",
  "alternates": {
    "canonical": "/cli/handoff"
  }
}

// handoff.md is the framework's guide, copied by scripts/sync-from-release.py;
// the scenario, privacy notes and diagram above it are this site's own.
export default function Page() {
  const overview = fs.readFileSync(path.join(process.cwd(), 'public', 'cli', 'handoff-overview.md'), 'utf8')
  const intro = <div className="blog-prose break-words mb-10" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(overview) }} />
  return <ReleaseCliGuide name="handoff" coming intro={intro} />
}
