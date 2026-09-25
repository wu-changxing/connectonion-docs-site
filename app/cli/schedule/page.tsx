import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co schedule: an agent's recurring work | ConnectOnion",
  "description": "Write recurring work in .co/schedule.yaml, then see, check, run now, pause and resume it with co schedule.",
  "alternates": {
    "canonical": "/cli/schedule"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="schedule" />
}
