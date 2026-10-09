import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { LuEye } from 'react-icons/lu'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'
import { renderBlogMarkdown } from '../../lib/blog-content.mjs'
import { STABLE_VERSION } from '../../lib/version'
import { REM_SAMPLE_VERSION } from '../../lib/rem-sample'
import styles from './rem.module.css'

const URL = 'https://docs.connectonion.com/rem'
const TITLE = 'co rem: Overnight AI Memory and Morning Recall | ConnectOnion'
const DESCRIPTION =
  'co rem works through approved sources while you sleep, carries context into the morning, and helps you remember it. Explore the stable 1.9.1 release and its limits.'

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
    images: [{ url: '/rem/reader-desktop.png', width: 1440, height: 900, alt: 'co rem morning reader with sample notebook context' }],
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
    copy: 'An older page becomes a question. Pause before revealing the answer co rem already wrote.',
  },
]

export default function Page() {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'public', 'rem.md'), 'utf8')
  const technicalDetails = markdown.slice(markdown.indexOf('## Sources and storage'))

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="rem-title">
          <div className={styles.heroMeta}>
            <span className={styles.wordmark}>
              <LuEye className={styles.eyeMark} aria-hidden="true" />
              CONNECTONION / co rem
            </span>
            <span className={styles.previewBadge}>Stable {STABLE_VERSION}</span>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>A memory with a night cycle</p>
            <h1 id="rem-title">Wake up with the <em>context</em> you need.</h1>
            <p className={styles.heroLead}>
              Your first run investigates every eligible person, mapped project, related organization and installed skill in its 180-day source window, then deepens people with up to two years of older mail.
              After you approve a schedule, co rem keeps that context current overnight.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/rem/demo">Explore a sample notebook <span aria-hidden="true">↗</span></Link>
              <a className={styles.secondaryAction} href="#start">Get started <span aria-hidden="true">↓</span></a>
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
              alt="co rem reader showing the morning brief, an older memory to recall, and open threads"
              width={1440}
              height={900}
              loading="eager"
            />
            <Image
              className={styles.phoneShot}
              src="/rem/reader-phone.png"
              alt="co rem morning reader at phone width showing today's context and open threads"
              width={390}
              height={844}
            />
          </div>
          <p className={styles.frameNote}>A reader frame from stable {REM_SAMPLE_VERSION}. Names and sources in the image are invented for review.</p>
          <Link className={styles.frameOpen} href="/rem/demo">Open the full-size sample reader →</Link>
        </section>

        <section id="experience" className={styles.experience} aria-labelledby="experience-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionKicker}>The loop</p>
            <h2 id="experience-title">Memory should move with you.</h2>
            <p>co rem is designed around the return to work, when context is useful again.</p>
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
              Completed nightly passes can compare cited Facts and Contact fields before and
              after the run. Other prose changes remain page-level, and older run logs have
              no field comparison. A rewritten page alone is not a new fact, and revealing
              an older answer does not measure retention. These limits are tracked in the{' '}
              <Link href="https://github.com/openonion/connectonion/blob/main/docs/design-evidence/rem-product-audit-2026-10-01.md">product audit</Link>.
            </p>
          </div>
        </section>

        <section id="start" className={styles.start} aria-labelledby="start-title">
          <div>
            <p className={styles.sectionKicker}>Start with your own notebook</p>
            <h2 id="start-title">Try co rem on your machine.</h2>
            <p>
              The reader is a local snapshot. Ordinary installs now receive stable {STABLE_VERSION}.
            </p>
            <p>
              <code>co rem init</code> investigates approved sources with your configured model.
              Written project pages lead with supported findings and link to their evidence.
              The <Link href="/cli/rem">CLI guide</Link> explains source controls, progress and nightly limits,
              and <code>co rem status</code>.
            </p>
          </div>
          <div className={styles.terminal}>
            <div className={styles.terminalTop}><span>TERMINAL</span><span>{STABLE_VERSION}</span></div>
            <pre><code>{`python -m pip install --upgrade connectonion\nco rem init\nco rem open`}</code></pre>
            <p>Connect a mailbox first with <code>co auth google</code> or <code>co auth microsoft</code>. On macOS, <code>co rem start</code> shows sources and asks before scheduling. On Linux and Windows, run <code>co rem sync</code> manually when you want an update; background scheduling is macOS-only.</p>
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
