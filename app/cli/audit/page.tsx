import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Is your CLI fit for an AI agent? (co audit) | ConnectOnion",
  "description": "co audit runs any CLI's --help pages, including every subcommand, and scores them for an agent: it prints, it does not hang or write files, it has usage, examples and documented flags. Preview in 1.8.9.",
  "alternates": { "canonical": "/cli/audit" }
}

export default function Page() {
  return <ReleaseCliGuide name="audit" preview />
}
