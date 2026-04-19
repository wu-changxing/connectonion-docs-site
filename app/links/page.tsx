'use client'

import { useState, useEffect } from 'react'
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineShare,
  HiOutlineQrCode,
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineCodeBracket,
  HiOutlineEnvelope,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineBugAnt,
  HiOutlineLink as LinkIcon,
  HiOutlineArrowRight
} from 'react-icons/hi2'
import { SiGithub, SiDiscord, SiX, SiYoutube, SiLinkedin, SiInstagram, SiTiktok, SiPypi } from 'react-icons/si'
import { FaUsers } from 'react-icons/fa6'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import QRCode from 'qrcode'

interface LinkRow {
  title: string
  url: string
  icon: React.ElementType
  action?: string
  external?: boolean
  available?: boolean
}

interface LinkSection {
  marker: string
  title: string
  epigraph: string
  rows: LinkRow[]
}

const sections: LinkSection[] = [
  {
    marker: '§ I',
    title: 'Core Platform',
    epigraph: 'Where the protocol lives — source, package, canonical docs.',
    rows: [
      { title: 'GitHub Repository', url: 'https://github.com/wu-changxing/connectonion', icon: SiGithub, action: 'VISIT', external: true, available: true },
      { title: 'PyPI Package', url: 'https://pypi.org/project/connectonion/', icon: SiPypi, action: 'INSTALL', external: true, available: true },
      { title: 'Documentation', url: 'https://docs.connectonion.com', icon: HiOutlineBookOpen, action: 'READ', external: true, available: true }
    ]
  },
  {
    marker: '§ II',
    title: 'Community',
    epigraph: 'People building with ConnectOnion — ask, share, argue.',
    rows: [
      { title: 'Discord Server', url: 'https://discord.gg/4xfD9k8AUF', icon: SiDiscord, action: 'JOIN', external: true, available: true },
      { title: 'GitHub Discussions', url: 'https://github.com/wu-changxing/connectonion/discussions', icon: FaUsers, action: 'BROWSE', external: true, available: true }
    ]
  },
  {
    marker: '§ III',
    title: 'Social',
    epigraph: 'Release notes, demos, and the occasional onion joke.',
    rows: [
      { title: 'X / Twitter', url: 'https://x.com/ConnectOnionAI', icon: SiX, action: 'FOLLOW', external: true, available: true },
      { title: 'YouTube', url: 'https://www.youtube.com/@openonionai', icon: SiYoutube, action: 'SUBSCRIBE', external: true, available: true },
      { title: 'LinkedIn', url: 'https://www.linkedin.com/company/openonion/', icon: SiLinkedin, action: 'CONNECT', external: true, available: true },
      { title: 'Instagram', url: 'https://www.instagram.com/openonionai/', icon: SiInstagram, action: 'FOLLOW', external: true, available: true },
      { title: 'TikTok', url: 'https://www.tiktok.com/@closeonion', icon: SiTiktok, action: 'FOLLOW', external: true, available: true }
    ]
  },
  {
    marker: '§ IV',
    title: 'Resources',
    epigraph: 'Longer-form writing — blog posts, examples, reference.',
    rows: [
      { title: 'Blog', url: 'https://docs.connectonion.com/blog', icon: HiOutlineDocumentText, action: 'READ', external: true, available: true },
      { title: 'Examples', url: 'https://docs.connectonion.com/examples', icon: HiOutlineCodeBracket, action: 'BROWSE', external: true, available: true },
      { title: 'API Reference', url: 'https://docs.connectonion.com/tools', icon: HiOutlineBookOpen, action: 'READ', external: true, available: true }
    ]
  },
  {
    marker: '§ V',
    title: 'Support',
    epigraph: 'Something broken, missing, or on your mind — tell us.',
    rows: [
      { title: 'Report Issues', url: 'https://github.com/wu-changxing/connectonion/issues', icon: HiOutlineBugAnt, action: 'FILE', external: true, available: true },
      { title: 'Email Contact', url: 'mailto:contact@connectonion.com', icon: HiOutlineEnvelope, action: 'SOON', external: true, available: false }
    ]
  }
]

export default function LinksPage() {
  const [showQR, setShowQR] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')

  useEffect(() => {
    QRCode.toDataURL('https://docs.connectonion.com/links', {
      width: 256,
      margin: 1,
      color: { dark: '#111827', light: '#FFFFFF' },
      errorCorrectionLevel: 'H'
    }).then(setQrCodeDataUrl)
  }, [])

  const handleSharePage = () => {
    const url = 'https://docs.connectonion.com/links'
    if (navigator.share) {
      navigator.share({
        title: 'ConnectOnion — All Links',
        text: 'Build AI agents with simple, powerful Python code',
        url
      }).catch(() => navigator.clipboard.writeText(url))
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
        <Link href="/" className="hover:text-gray-900 transition-colors">Docs</Link>
        <HiOutlineArrowRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">Links</span>
      </div>

      {/* Header */}
      <header className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Index / Directory</span>
            </div>
            <h1 className="heading-1 mb-3">
              ConnectOnion <span className="accent-italic">links</span>.
            </h1>
            <p className="text-lg text-gray-700 max-w-[52ch]">
              Everything — source, docs, community, socials — indexed in one page. Scannable, linkable, shareable.
            </p>
          </div>
          <CopyMarkdownButton markdownPath="/links.md" filename="links.md" className="flex-shrink-0" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleSharePage}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <HiOutlineShare className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={() => setShowQR(!showQR)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            aria-expanded={showQR}
          >
            <HiOutlineQrCode className="w-4 h-4" />
            {showQR ? 'Hide QR' : 'Show QR'}
          </button>
        </div>

        {showQR && qrCodeDataUrl && (
          <div className="mt-6 inline-block bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="relative w-[200px]">
              <img src={qrCodeDataUrl} alt="QR code for docs.connectonion.com/links" className="w-[200px] h-[200px] rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-md p-1 shadow-sm">
                  <img src="/onion-logo.png" alt="" width={32} height={32} className="rounded" />
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs font-mono text-gray-500 text-center">docs.connectonion.com/links</p>
          </div>
        )}
      </header>

      {/* Directory — editorial index with dot-leaders */}
      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.marker}>
            <div className="mb-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">{section.marker}</span>
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">{section.title}</h2>
              </div>
              <p className="italic text-gray-500 max-w-[52ch]" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: '0.9375rem' }}>
                {section.epigraph}
              </p>
            </div>

            <ul className="border-t border-gray-200">
              {section.rows.map((row) => {
                const Icon = row.icon
                const isClickable = row.available !== false
                const inner = (
                  <div className="group flex items-center gap-4 py-4 border-b border-gray-200 transition-colors">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white group-hover:border-gray-400 group-hover:bg-gray-50 transition-colors flex-shrink-0">
                      <Icon className="w-[18px] h-[18px] text-gray-700 group-hover:text-gray-900 transition-colors" aria-hidden />
                    </div>
                    <span className="text-[15px] text-gray-900 group-hover:text-gray-900 whitespace-nowrap">
                      {row.title}
                    </span>
                    <span
                      className="flex-1 text-gray-300 overflow-hidden whitespace-nowrap select-none"
                      style={{ letterSpacing: '0.35em', transform: 'translateY(-3px)' }}
                      aria-hidden
                    >
                      {'·'.repeat(200)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-gray-500 group-hover:text-green-700 transition-colors whitespace-nowrap">
                      {row.action || 'VISIT'}
                      {isClickable && <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" aria-hidden />}
                    </span>
                  </div>
                )

                if (!isClickable) {
                  return (
                    <li key={row.title} className="opacity-50">
                      {inner}
                    </li>
                  )
                }

                return (
                  <li key={row.title}>
                    {row.external ? (
                      <a href={row.url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus-visible:bg-gray-50 rounded">
                        {inner}
                      </a>
                    ) : (
                      <Link href={row.url} className="block focus:outline-none focus-visible:bg-gray-50 rounded">
                        {inner}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-10 border-t border-gray-200">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span>Open source.</span>
            <span className="text-gray-300">·</span>
            <span>Community-driven.</span>
            <span className="text-gray-300">·</span>
            <span className="inline-flex items-center gap-1">
              Made with <HiOutlineHeart className="w-3.5 h-3.5 text-green-600" aria-hidden /> by the ConnectOnion team.
            </span>
          </div>
          <p className="text-xs text-gray-500 inline-flex items-center gap-1.5">
            <HiOutlineSparkles className="w-3 h-3" aria-hidden />
            Add your link? Ping us on Discord.
          </p>
        </div>
      </footer>

      <ContentNavigation />
    </div>
  )
}
