import { spawnSync } from 'node:child_process'

const production = spawnSync('npm', ['audit', '--omit=dev', '--audit-level=moderate'], { stdio: 'inherit' })
if (production.status !== 0) process.exit(production.status ?? 1)

const audit = spawnSync('npm', ['audit', '--json', '--audit-level=moderate'], { encoding: 'utf8' })
if (audit.error) throw audit.error
if (![0, 1].includes(audit.status)) throw new Error(audit.stderr || 'npm audit failed')

const findings = JSON.parse(audit.stdout).vulnerabilities ?? {}
const expected = {
  braces: ['https://github.com/advisories/GHSA-vfj7-8cjw-p6xm'],
  micromatch: ['braces'],
  'fast-glob': ['micromatch'],
  '@next/eslint-plugin-next': ['fast-glob'],
  'eslint-config-next': ['@next/eslint-plugin-next'],
}

for (const [name, finding] of Object.entries(findings)) {
  const actualVia = finding.via.map((item) => typeof item === 'string' ? item : item.url).sort()
  const expectedVia = expected[name]?.slice().sort()
  if (!expectedVia || JSON.stringify(actualVia) !== JSON.stringify(expectedVia)) {
    throw new Error(`Unreviewed npm advisory in ${name}: ${actualVia.join(', ')}`)
  }
}

if (Object.keys(findings).length !== 0 && Object.keys(findings).length !== Object.keys(expected).length) {
  throw new Error('The known ESLint-only advisory chain changed; review the full npm audit report')
}

console.log(Object.keys(findings).length === 0
  ? 'npm audit passed with no findings'
  : 'Only the unpatched, development-only braces advisory remains; production audit passed')
