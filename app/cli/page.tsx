import { ReleaseCliGuide } from '../../components/ReleaseCliGuide'

/**
 * Every co command, generated from `co commands` into public/cli/commands.md.
 * This page used to be 1,200 hand-written lines covering ten commands and a
 * template list that no longer shipped; the CLI has 42. Regenerate the
 * Markdown when the CLI changes rather than editing it by hand.
 */
export default function Page() {
  return <ReleaseCliGuide name="commands" />
}
