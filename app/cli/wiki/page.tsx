import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co wiki: a memory of your work, kept up to date | ConnectOnion",
  "description": "Experimental: a notebook about the people, projects and tools in your work, built and kept current from your mail and coding sessions.",
  "alternates": {
    "canonical": "/cli/wiki"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="wiki-help" />
}
