import { ReleaseCliGuide } from '../../../components/ReleaseCliGuide'

export const metadata = {
  "title": "co benchmark and co eval: test a skill before you change it | ConnectOnion",
  "description": "Write the standard before editing a skill with co benchmark, then run every case on the real agent and read scored reports with co eval.",
  "alternates": {
    "canonical": "/cli/benchmark"
  }
}

export default function Page() {
  return <ReleaseCliGuide name="benchmark" />
}
