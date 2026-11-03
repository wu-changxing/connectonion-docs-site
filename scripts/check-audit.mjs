import { spawnSync } from 'node:child_process'

const production = spawnSync('npm', ['audit', '--omit=dev', '--audit-level=moderate'], { stdio: 'inherit' })
if (production.status !== 0) process.exit(production.status ?? 1)

const audit = spawnSync('npm', ['audit', '--json', '--audit-level=moderate'], { encoding: 'utf8' })
if (audit.error) throw audit.error
if (![0, 1].includes(audit.status)) throw new Error(audit.stderr || 'npm audit failed')

// Development-only advisories reviewed by hand: each is reached only through the
// ESLint toolchain, runs on our own sources, and has no fix short of a major
// ESLint upgrade. A new advisory, anywhere in the tree, still fails this check.
const reviewed = new Set([
  'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm', // braces: ReDoS (via micromatch, fast-glob)
  'https://github.com/advisories/GHSA-g3hv-75wg-m249', // minimatch <11.0.1: globparts DoS (via eslint)
])

const findings = JSON.parse(audit.stdout).vulnerabilities ?? {}
const advisories = Object.values(findings).flatMap((finding) => finding.via.filter((item) => typeof item !== 'string'))
const unreviewed = advisories.filter((item) => !reviewed.has(item.url))
if (unreviewed.length) {
  throw new Error(`Unreviewed npm advisory: ${unreviewed.map((item) => `${item.name} ${item.url}`).join(', ')}`)
}

console.log(Object.keys(findings).length === 0
  ? 'npm audit passed with no findings'
  : `Only reviewed development-only advisories remain (${Object.keys(findings).length} packages); production audit passed`)
