import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "Web search CLI for AI agents (co search, co fetch) | ConnectOnion",
  "description": "Search the web and read a page as Markdown from the terminal or co ai: grounded answers with sources, or free DuckDuckGo results.",
  "alternates": {
    "canonical": "/cli/search"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="search" />
}
