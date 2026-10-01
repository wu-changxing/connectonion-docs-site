import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'
import { renderBlogMarkdown } from '../../lib/blog-content.mjs'
import { PREVIEW_VERSION, STABLE_VERSION } from '../../lib/version'
import styles from './rem.module.css'

const URL = 'https://docs.connectonion.com/rem'
const TITLE = 'REM — wake up with the context you need | ConnectOnion'
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
    copy: 'The reader leads with pages touched by the latest pass, existing links between them, and what remains open.',
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
            <span className={styles.wordmark}><span className={styles.moon} aria-hidden="true" /> CONNECTONION / REM</span>
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
              <a className={styles.primaryAction} href="#start">Try the preview <span aria-hidden="true">↗</span></a>
              <a className={styles.secondaryAction} href="#experience">See the memory loop <span aria-hidden="true">↓</span></a>
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
              alt="REM reader showing three pages updated in the latest pass, a connected page, a recall prompt, and open threads"
              width={1440}
              height={900}
              loading="eager"
            />
            <Image
              className={styles.phoneShot}
              src="/rem/reader-phone.png"
              alt="REM morning reader at phone width showing the latest pass and updated pages"
              width={390}
              height={844}
            />
          </div>
          <p className={styles.frameNote}>A real reader frame from the {preview ?? 'latest'} preview. Names and sources in the image are invented for review.</p>
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
              A morning card links back to its page and sources. A connection appears only when
              a page actually links to another. Proposed connections remain questions for review.
            </p>
            <p>
              This preview knows which <em>pages</em> the latest pass updated. It does not yet
              prove which claim was learned that night. Revealing an older answer does not
              measure retention. Both are tracked openly in the{' '}
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
