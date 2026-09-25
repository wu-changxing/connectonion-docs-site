import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co proxy: lend an agent this computer's internet connection | ConnectOnion",
  "description": "Share this computer's internet connection with an agent you authorize, so it browses from your network.",
  "alternates": {
    "canonical": "/cli/proxy"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="proxy" />
}
