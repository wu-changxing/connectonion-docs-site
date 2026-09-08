import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co create: scaffold a runnable AI agent | ConnectOnion",
  "description": "Create an agent project with its own configuration, tools and skills. Choose an explicit project directory and reuse global credentials deliberately.",
  "alternates": {
    "canonical": "/cli/create"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="create" />
}
