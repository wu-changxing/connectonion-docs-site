import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'
import { renderBlogMarkdown } from '../../lib/blog-content.mjs'
import { PREVIEW_VERSION, STABLE_VERSION } from '../../lib/version'
import { REM_SAMPLE_VERSION } from '../../lib/rem-sample'
import styles from './rem.module.css'

const URL = 'https://docs.connectonion.com/rem'
const TITLE = 'co rem: Overnight AI Memory and Morning Recall | ConnectOnion'
const DESCRIPTION =
  'REM works through approved sources while you sleep, carries context into the morning, and helps you remember it. Explore the opt-in co rem preview and its limits.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ['co rem', 'AI memory', 'overnight memory', 'personal knowledge', 'Codex', 'Claude Code'],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    images: [{ url: '/rem/reader-desktop.png', width: 1440, height: 900, alt: 'REM morning reader with sample notebook context' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/rem/reader-desktop.png'] },
}

const moments = [
  {
    number: '01',
    time: 'During the night',
    title: 'Keep the thread.',
    copy: 'A scheduled pass reads the sources you approved and updates local pages for people and projects.',
  },
  {
    number: '02',
    time: 'In the morning',
    title: 'See what carried forward.',
    copy: 'The reader separates cited fact changes from page rewrites, then shows what needs your answer and what remains connected.',
  },
  {
    number: '03',
    time: 'When it matters',
    title: 'Try to remember.',
    copy: 'An older page becomes a question. Pause before revealing the answer REM already wrote.',
  },
]

export default function Page() {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'public', 'rem.md'), 'utf8')
  const technicalDetails = markdown.slice(markdown.indexOf('## Sources and storage'))
  const preview = PREVIEW_VERSION

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="rem-title">
          <div className={styles.heroMeta}>
            <span className={styles.wordmark}>
              <svg className={styles.eyeMark} viewBox="0 0 32 32" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#1b2548" />
                <path d="M4.5 16c3.2-5.1 7.1-7.6 11.5-7.6S24.3 10.9 27.5 16c-3.2 5.1-7.1 7.6-11.5 7.6S7.7 21.1 4.5 16Z" fill="none" stroke="#dbe3ff" strokeWidth="1.65" />
                <circle cx="16" cy="16" r="4" fill="#dbe3ff" />
                <path d="M8.5 25.5c4.8 3 11.6 3 16.1-.6" fill="none" stroke="#dfa75a" strokeWidth="1.65" strokeLinecap="round" />
              </svg>
              CONNECTONION / REM
            </span>
            <span className={styles.previewBadge}>Opt-in alpha {preview ?? 'preview'}</span>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>A memory with a night cycle</p>
            <h1 id="rem-title">Wake up with the <em>context</em> you need.</h1>
            <p className={styles.heroLead}>
              REM works through sources you approve while you sleep. In the morning,
              it brings forward the people, projects, and open threads worth remembering.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/rem/demo">Explore a sample notebook <span aria-hidden="true">↗</span></Link>
              <a className={styles.secondaryAction} href="#start">Try the preview <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className={styles.readerFrame}>
            <div className={styles.frameBar}>
              <span><span className={styles.liveDot} aria-hidden="true" /> THE MORNING READER</span>
              <span>Local snapshot · invented notebook</span>
            </div>
            <Image
              className={styles.desktopShot}
              src="/rem/reader-desktop.png"
              alt="REM reader showing the morning brief, an older memory to recall, and open threads"
              width={1440}
              height={900}
              loading="eager"
            />
            <Image
              className={styles.phoneShot}
              src="/rem/reader-phone.png"
              alt="REM morning reader at phone width showing today's context and open threads"
              width={390}
              height={844}
            />
          </div>
          <p className={styles.frameNote}>A real reader frame from the {REM_SAMPLE_VERSION} preview. Names and sources in the image are invented for review.</p>
          <Link className={styles.frameOpen} href="/rem/demo">Open the full-size sample reader →</Link>
        </section>

        <section id="experience" className={styles.experience} aria-labelledby="experience-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionKicker}>The loop</p>
            <h2 id="experience-title">Memory should move with you.</h2>
            <p>REM is designed around the return to work, when context is useful again.</p>
          </div>
          <ol className={styles.moments}>
            {moments.map((moment) => (
              <li key={moment.number}>
                <span className={styles.momentNumber}>{moment.number} / {moment.time}</span>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.truth} aria-labelledby="truth-title">
          <div>
            <p className={styles.sectionKicker}>What you can trust</p>
            <h2 id="truth-title">A memory has to show its basis.</h2>
          </div>
          <div className={styles.truthBody}>
            <p>
              A morning card links back to its page and sources. The reader labels direct links,
              cited mentions and backlinks differently. A name mention helps navigation; it is
              not a verified relationship.
            </p>
            <p>
              This preview compares cited, keyed Facts and Contact values before and after a pass.
              A rewritten page alone is not called a new fact. Prose-level change detection and
              durable recall feedback remain open work in the{' '}
              <Link href="https://github.com/openonion/connectonion/blob/main/docs/design-evidence/rem-product-audit-2026-10-01.md">product audit</Link>.
            </p>
          </div>
        </section>

        <section id="start" className={styles.start} aria-labelledby="start-title">
          <div>
            <p className={styles.sectionKicker}>Start with your own notebook</p>
            <h2 id="start-title">Try REM on your machine.</h2>
            <p>
              The reader is a local snapshot. An exact version pin opts you into the alpha;
              ordinary installs stay on stable {STABLE_VERSION}.
            </p>
          </div>
          <div className={styles.terminal}>
            <div className={styles.terminalTop}><span>TERMINAL</span><span>{preview ?? 'preview'}</span></div>
            {preview ? (
              <pre><code>{`python -m pip install --upgrade 'connectonion==${preview}'\nco rem init --days 5\nco rem open\nco rem start`}</code></pre>
            ) : (
              <p>The next REM preview is being prepared. Use the stable channel until its exact version is published.</p>
            )}
            <p>Connect a mailbox first with <code>co auth google</code> or <code>co auth microsoft</code>. <code>co rem start</code> shows sources and asks before scheduling.</p>
          </div>
        </section>

        <div className={styles.below}>
          <details className={styles.reference}>
            <summary>Sources, storage, and release limits <span aria-hidden="true">↗</span></summary>
            <div className="blog-prose break-words" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(technicalDetails) }} />
          </details>
          <div className={styles.footerLinks}>
            <Link href="/cli/rem">Read the CLI reference</Link>
            <Link href="/releases">Compare release channels</Link>
            <CopyMarkdownButton markdownPath="/rem.md" filename="rem.md" floatingMobile={false} />
          </div>
          <ContentNavigation />
        </div>
      </div>
    </main>
  )
}
