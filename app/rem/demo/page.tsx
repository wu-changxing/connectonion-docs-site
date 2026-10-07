import Link from 'next/link'
import type { Metadata } from 'next'
import { REM_SAMPLE_DATE, REM_SAMPLE_VERSION } from '../../../lib/rem-sample'
import styles from './demo.module.css'

const URL = 'https://docs.connectonion.com/rem/demo'
const TITLE = 'co rem sample reader: explore an invented notebook | ConnectOnion'
const DESCRIPTION =
  'Explore the co rem 1.9.0 reader with invented people, projects, connected context, archived sources, and a morning recall prompt.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website' },
}

export default function RemDemoPage() {
  return (
    <main className={styles.stage}>
      <header className={styles.bar}>
        <Link className={styles.back} href="/rem" aria-label="Back to co rem overview">← <span>co rem</span></Link>
        <div className={styles.label}>
          <h1>Explore a sample notebook</h1>
          <span className={styles.metaDesktop}>Invented people and sources · frozen {REM_SAMPLE_DATE} · sample {REM_SAMPLE_VERSION}</span>
          <span className={styles.metaMobile}>Invented · frozen {REM_SAMPLE_DATE} · v{REM_SAMPLE_VERSION}</span>
        </div>
        <Link className={styles.install} href="/rem#start">Try with your notebook ↗</Link>
      </header>
      <iframe
        className={styles.reader}
        src="/rem/sample-reader.html"
        title="Interactive co rem reader with invented notebook data"
        loading="eager"
      />
    </main>
  )
}
