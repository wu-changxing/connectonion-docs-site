/**
 * @purpose Help readers choose the stable release or an exact-pin preview
 * @context Public counterpart of connectonion/docs/releases.md
 */

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { PREVIEW_VERSION, STABLE_VERSION } from '../../lib/version'
import { ReleasesClient } from './ReleasesClient'

export default function ReleasesPage() {
  const hasStableNotes = existsSync(join(process.cwd(), 'public', 'releases', `${STABLE_VERSION}.md`))
  const hasPreviewNotes = Boolean(
    PREVIEW_VERSION && existsSync(join(process.cwd(), 'public', 'releases', `${PREVIEW_VERSION}.md`)),
  )

  return <ReleasesClient hasStableNotes={hasStableNotes} hasPreviewNotes={hasPreviewNotes} />
}
